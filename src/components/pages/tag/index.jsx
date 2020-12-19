import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
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

function Tag({dispatch}) {
  const classes = useStyles();
  const history = useHistory();
  const [tagBoard, setTagBoard] = useState({
    lists: [],
    cards: [],
    boardTitle: '',
    boardId: ''
  });

  useEffect(() => {
    onGettingBoard();
  }, []);

  useEffect(() => {
    onSettingBoard();
  }, [tagBoard]);

  const [showListAdder, setShowListAdder] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const handleDragEnd = ({draggableId, source, destination, type}) => {
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'COLUMN') {
      dispatch(
        reorderBoard({
          listId: draggableId,
          sourceId: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index
        })
      );
      return;
    } else {
      dispatch(
        reorderList({
          cardId: draggableId,
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          boardId: tagBoard.boardId
        })
      );
    }
  };

  const onAddList = async () => {
    await dispatch(
      addList({
        listTitle: newListTitle,
        boardId: tagBoard.boardId
      })
    ).then(() => {
      setShowListAdder(false);
      setNewListTitle('');
    });
  };

  const onSettingBoard = async () => {
    await dispatch(
      setBoard(tagBoard.lists, tagBoard.boardTitle, tagBoard.boardId, tagBoard.cards)
    );
  }

  const onGettingBoard = async () => {
    /*await dispatch(
      getBoard()
    ).then((res) => {
    });*/
    getBoard().then((res) => {
      console.log(res);
      if (res.data) {
        console.log(res.data);
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
        {console.log(tagBoard.lists.length)}
        <DragDropContext onDragEnd={handleDragEnd}>
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
                        <List list={list} boardId={tagBoard.boardId} cards={list.cards} />
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
        </DragDropContext>
      </StyledBoard>
    </React.Fragment>
  );
}

const mapStateToProps = (state, props) => {
  /*const {boardId} = props.match.params;
  console.log(props);
  const board = state.boardsById[boardId];
  return {
    lists: board.lists.map((listId) => state.listsById[listId]),
    boardTitle: board.title,
    boardId
  };*/
  console.log(props);
  return {};
};

export default connect(mapStateToProps)(Tag);
