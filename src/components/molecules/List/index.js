import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import Button from '../../atom/Button';
import ListCard from '../../atom/ListCard';
import ListTitleButton from '../../atom/ListTitleButton';
import DeleteListButton from '../../atom/DeleteListButton';
import DeleteCardButton from '../../atom/DeleteCardButton';
import EditCardButton from '../../atom/EditCardButton';
import CardTextarea from '../../atom/CardTextarea';
import ListTitleTextarea from '../../atom/ListTitleTextarea';
import {addCard, editCardTitle, deleteCard} from '../../../api/card';
import {editListTitle, deleteList} from '../../../api/list';

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 10px;
`;

const ListTitleTextareaWrapper = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

const CardTextareaWrapper = styled(TextareaWrapper)`
  margin: 0 10px 10px 10px;
`;

const ComposerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #f8f8f8;
  padding: 0 0 10px 0;
  border: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const ListTitle = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 48px;
  align-items: center;
  color: rgb(46, 68, 78);
`;

const CardTitle = styled.div`
  background: white;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  margin: 0 10px 10px 10px;
  padding: 8px;
  border-radius: 5px;
  position: relative;
  overflow-wrap: break-word;
  overflow: visible;
  word-wrap: break-word;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover,
  &:active,
  &:focus {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonWrapper = styled.div`
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/* 보드 안에서 리스트 하나를 나타내는 컴포넌트 */
const List = ({dispatch, boardId, cards, list, setTriggerBoard}) => {
  const [newCardFormIsOpen, setNewCardFormIsOpen] = useState(false);
  const [isListTitleInEdit, setIsListTitleInEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardInEdit, setCardInEdit] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [tempCardTitle, setTempCardTitle] = useState('');

  /* 리스트 추가 시 토글하여 리스트 타이틀을 추가할 수 있도록 상태 값 반전 */
  const toggleCardComposer = () => setNewCardFormIsOpen(!newCardFormIsOpen);

  /* 추가하려는 리스트 타이틀의 상태 값이 바뀔 때 상태 값도 함께 변경 */
  const handleCardComposerChange = (event) => {
    setNewCardTitle(event.target.value);
  };

  /* 엔터키 입력 시 리스트 데이터 추가 진행할 수 있도록 콜백 */
  const handleKeyDown = (event, callback) => {
    if (event.keyCode === 13) {
      callback(event);
    }
  };

  /* 카드 등록 핸들러 */
  const handleSubmitCard = (event) => {
    event.preventDefault();
    setNewCardFormIsOpen(false);
    if (newCardTitle.length < 1) return;
    onSubmitCard();
  };

  /* card title을 수정할 수 있도록 하는 함수 */
  const openCardEditor = (event, card) => {
    event.preventDefault();
    setCardInEdit(card._id);
    setTempCardTitle(card.title);
  };

  /* 카드 수정 핸들러 */
  const handleCardEditorChange = (event) => {
    setTempCardTitle(event.target.value);
  };

  /* 리스트 타이틀 수정 핸들러 */
  const handleListTitleEditorChange = (event) => {
    setNewListTitle(event.target.value);
  };

  /* 카드 수정 핸들러 */
  const handleCardEdit = async (e) => {
    e.preventDefault();
    if (tempCardTitle.length < 1) {
      onDeleteCard(cardInEdit);
    } else {
      onEditCard();
    }
  };

  /* 카드 삭제 핸들러 */
  const handleDeleteCard = (event, cardId) => {
    event.preventDefault();
    onDeleteCard(cardId);
  };

  /* 타이틀 에디팅 할 수 있도록 하는 상태 설정 함수 */
  const openTitleEditor = () => {
    setIsListTitleInEdit(true);
    setNewListTitle(list.title);
  };

  /* 리스트 타이틀 저장 핸들러 */
  const handleSubmitListTitle = () => {
    if (newListTitle.length < 1) {
      setIsListTitleInEdit(false);
      return;
    }
    onEditListTitle(newListTitle.trim(), list._id, boardId);
  };

  /* 리스트 삭제 핸들러 */
  const handleDeleteListButtonClick = (event) => {
    event.preventDefault();
    onDeleteList(list.cards, list._id, boardId);
  };

  /* 카드 저장 이벤트 */
  const onSubmitCard = async () => {
    setIsLoading(true);
    await dispatch(addCard({cardTitle: newCardTitle, listId: list._id, boardId})).then(() => {
      setIsLoading(false);
      setNewCardTitle('');
    }).then(() => {
      setTriggerBoard(true);
    });
  };

  /* 카드 수정 이벤트 */
  const onEditCard = async () => {
    const isEditObj = (e) => (e._id === cardInEdit);
    await dispatch(
      editCardTitle({
        cardTitle: tempCardTitle.trim(),
        cardId: cardInEdit,
        cardIndex: list.cards.findIndex(isEditObj),
        listId: list._id,
        boardId
      })
    ).then(() => {
      setTempCardTitle('');
      setCardInEdit(null);
      setTriggerBoard(true);
    });
  };

  /* 카드 삭제 이벤트 */
  const onDeleteCard = (cardId) => {
    dispatch(deleteCard({cardId, listId: list._id, boardId}))
      .then(() => {
        setTriggerBoard(true);
      });
  };

  /* 리스트 타이틀 편집 이벤트 */
  const onEditListTitle = async (listTitle, listId, boardId) => {
    setIsListTitleInEdit(true);
    await dispatch(editListTitle({listTitle, listId, boardId})).then(() => {
      setNewListTitle('');
      setIsListTitleInEdit(false);
    }).then(() => {
      setTriggerBoard(true);
    });
  };

  /* 리스트 삭제 이벤트 */
  const onDeleteList = (cards, listId, boardId) => {
    dispatch(deleteList({cards, listId, boardId}))
      .then(() => {
        setTriggerBoard(true);
      });
  };

  return (
    <ListCard>
      {isListTitleInEdit ? (
        <ListTitleTextareaWrapper>
          <ListTitleTextarea
            value={newListTitle}
            onChange={handleListTitleEditorChange}
            onKeyDown={(e) => handleKeyDown(e, handleSubmitListTitle)}
            onBlur={handleSubmitListTitle}
          />
        </ListTitleTextareaWrapper>
      ) : (
        <ListTitle>
          <ListTitleButton onFocus={openTitleEditor} onClick={openTitleEditor} text={list.title} />
          <DeleteListButton onClick={(e) => handleDeleteListButtonClick(e)} />
        </ListTitle>
      )}
      <Droppable droppableId={list._id}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Draggable key={card._id} draggableId={card._id} index={index}>
                {({innerRef, draggableProps, dragHandleProps, placeholder}) => (
                  <div>
                    {cardInEdit !== card._id ? (
                      <CardTitle
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                        data-react-beautiful-dnd-draggable="0"
                        data-react-beautiful-dnd-drag-handle="0">
                        {card.title}
                        <ButtonWrapper>
                          <DeleteCardButton onClick={(e) => handleDeleteCard(e, card._id)} />
                          <EditCardButton onClick={(e) => openCardEditor(e, card)} />
                        </ButtonWrapper>
                      </CardTitle>
                    ) : (
                      <TextareaWrapper ref={innerRef} {...draggableProps} {...dragHandleProps}>
                        <CardTextarea
                          value={tempCardTitle}
                          onChange={handleCardEditorChange}
                          onKeyDown={(e) => handleKeyDown(e, handleCardEdit)}
                          onBlur={handleCardEdit}
                        />
                      </TextareaWrapper>
                    )}
                    {placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {(newCardFormIsOpen || isLoading) && (
              <CardTextareaWrapper>
                <CardTextarea
                  value={newCardTitle}
                  onChange={handleCardComposerChange}
                  onKeyDown={(e) => handleKeyDown(e, handleSubmitCard)}
                  onBlur={handleSubmitCard}
                />
                <Button variant="add" onClick={handleSubmitCard} text="Add" disabled={newCardTitle === ''} />
              </CardTextareaWrapper>
            )}
            {!newCardFormIsOpen &&
            !isLoading && (
              <ComposerWrapper>
                <Button variant="card" text="Add new card" onClick={toggleCardComposer}>
                  Add new card
                </Button>
              </ComposerWrapper>
            )}
          </div>
        )}
      </Droppable>
    </ListCard>
  );
};

const mapStateToProps = (state, props) => {
  /*console.log(props.list.cards);
  return {
    cards: props.list.cards.map((cardId) => state.cardsById[cardId])
  };*/
  // console.log(state);
  // console.log('props- -->', props.list.cards.map((card) => state.cardsById[card._id]));
  /*const boardData = state.boardsById['-ukBHjV23H'];
  const listData = boardData.lists.map((listId) => state.listsById[listId]);
  const cardDataTemp = listData.map((list) => {
    return list.cards.map((card) => {
      return state.cardsById[card]
    })
  });
  props.list.cards.map((cardId) => state.cardsById[cardId]);*/
  return { };
};

export default connect(mapStateToProps)(List);
