import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {addList, reorderList} from '../../../api/list';
import {reorderBoard, getBoard, setBoard} from '../../../api/board';
import List from "../../molecules/List";
import ListAdder from "../../atom/ListAdder";

const StyledBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 111px);
  overflow-x: auto;
  overflow-y: auto;

  @media (max-width: 1436px) {
    align-items: ${(props) => props.numLists > 3 && 'self-start'};
  }

  @media (max-width: 1152px) {
    align-items: ${(props) => props.numLists > 2 && 'self-start'};
  }

  @media (max-width: 868px) {
    align-items: ${(props) => props.numLists > 1 && 'self-start'};
  }

  @media (max-width: 768px) {
    align-items: center;
    height: 100%;
  }
`;

const BoardTitle = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`;

const BoardTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ListsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const useStyles = makeStyles((theme) => ({
  inner: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '60px 50px 90px',
    marginBottom: '50px',
    borderRadius: '10px',
    boxShadow: '14px 18px 5px 0px rgba(0,0,0,0.3)',
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginTop: '15px',
    },
  },
}));

/* 공유보드 화면 컴포넌트 */
function Tag({dispatch, lists, boardTitle, boardId}) {
  const classes = useStyles();
  const history = useHistory();
  const [tagBoard, setTagBoard] = useState({
    lists: [],
    cards: [],
    boardTitle: '',
    boardId: ''
  });

  /* 보드정보 리프레시를 위해 사용하는 상태 변수 */
  const [triggerBoard, setTriggerBoard] = useState(true);

  /* redux로 관리되는 상태 값 */
  const storeState = useSelector(state => state);

  /* lists나 triggerBoard에 이벤트 발생 시 호출 */
  useEffect(() => {
    if (triggerBoard) {
      onGettingBoard();
      setTriggerBoard(false);
    }
  }, [lists, triggerBoard]);

  /* tagBoard 상태에 대한 이벤트 발생 시 호출 */
  useEffect(() => {
    onSettingBoard();
  }, [tagBoard]);

  const [showListAdder, setShowListAdder] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  /* 드래그앤드랍으로 화면 안에서 컴포넌트를 이동시켰을 때 호출되는 함수 */
  const handleDragEnd = ({draggableId, source, destination, type}) => {

    /* 타겟이 없을 경우 종료 */
    if (!destination) {
      return;
    }

    /* 위치가 바뀌지 않았을 경우 종료 */
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    /* 리스트 이동인지 카드에 대한 이동인지 체크 */
    if (type === 'COLUMN') {

      /* 리스트 위치 이동에 대한 nodejs express API 호출 */
      dispatch(
        reorderBoard({
          listId: draggableId,
          sourceId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index
        })
      ).then(() => {
        setTriggerBoard(true);
      });
      return;
    } else {
      /* 카드 위치 이동에 대한 nodejs express API 호출 */
      dispatch(
        reorderList({
          cardId: draggableId,
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          boardId: tagBoard.boardId
        })
      ).then(() => {
        setTriggerBoard(true);
      });
    }

    /* 상태 값 갱신 */
    console.log('state lists', lists);
    const boardData = storeState.boardsById['-ukBHjV23H'];
    const boardTitle = boardData.title;
    const listData = boardData.lists.map((listId) => storeState.listsById[listId]);
    const cardDataTemp = listData.map((list) => {
      return list.cards.map((card) => {
        return storeState.cardsById[card]
      })
    });
    for (let i = 0; i < listData.length; i++) {
      listData[i].cards = listData[i].cards.map((card) => storeState.cardsById[card]);
    }
    // console.log('lists------', listData);
    // console.log('cards-----', cardDataTemp.flat(Infinity));

    setTagBoard({
      lists: listData,
      cards: cardDataTemp.flat(Infinity),
      boardTitle: boardTitle,
      boardId: '-ukBHjV23H'
    });

    setTriggerBoard(true);
  };

  /* 새로운 리스트 추가 비동기 함수 */
  const onAddList = async () => {
    await dispatch(
      addList({
        listTitle: newListTitle,
        boardId: tagBoard.boardId
      })
    ).then(() => {
      setShowListAdder(false);
      setNewListTitle('');
      setTriggerBoard(true);
    });
  };

  /* 보드 정보를 세팅하기 위한 비동기 함수 */
  const onSettingBoard = async () => {
    await dispatch(
      setBoard(tagBoard.lists, tagBoard.boardTitle, tagBoard.boardId, tagBoard.cards)
    );
  }

  /* 보드 정보를 가져오기 위한 함수 */
  const onGettingBoard = async () => {
    /*await dispatch(
      getBoard()
    ).then((res) => {
    });*/
    getBoard().then((res) => {
      if (res.data) {
        setTagBoard({
          lists: res.data.lists,
          boardTitle: res.data.boardTitle,
          boardId: res.data.boardId,
          cards: res.data.cards
        });
      }
    });

  }

  return (
    <React.Fragment>
      <BoardTitleWrapper>
        <BoardTitle>{tagBoard.boardTitle}</BoardTitle>
      </BoardTitleWrapper>
      <StyledBoard numLists={tagBoard.lists.length}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {tagBoard.boardId &&
          <Droppable droppableId={tagBoard.boardId} type="COLUMN" direction="horizontal">
            {(droppableProvided) => (
              <ListsWrapper ref={droppableProvided.innerRef}>
                {tagBoard.lists.map((list, index) => (
                  <Draggable key={list._id} draggableId={list._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        data-react-beautiful-dnd-draggable="0"
                        data-react-beautiful-dnd-drag-handle="0">
                        <List list={list} boardId={tagBoard.boardId} cards={list.cards} setTriggerBoard={setTriggerBoard}/>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
                {tagBoard.lists.length < 5 && (
                  <ListAdder
                    numLeft={5 - tagBoard.lists.length}
                    onAddList={onAddList}
                    showListAdder={showListAdder}
                    setShowListAdder={setShowListAdder}
                    newListTitle={newListTitle}
                    setNewListTitle={setNewListTitle}
                  />
                )}
              </ListsWrapper>
            )}
          </Droppable>
          }
        </DragDropContext>
      </StyledBoard>
      }
    </React.Fragment>
  );
}

/* redux 상태를 컴포넌트로 전달하기 위한 함수 */
const mapStateToProps = (state, props) => {
  if (state.boardsById['-ukBHjV23H']) {
    const board = state.boardsById['-ukBHjV23H'];
    return {
      lists: board.lists.map((listId) => state.listsById[listId]),
      boardTitle: board.title,
      boardId: '-ukBHjV23H'
    };
  }
  return {};
};

/* connect와 위에 정의한 mapStateToProps를 통해 리덕스 상태를 컴포넌트에 연결 */
export default connect(mapStateToProps)(Tag);
