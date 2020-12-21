import {arrayToObject} from '../utils';

/*
 * redux-thunk에서 상태 값 관리를 위해 사용하는 리듀서
 * action type 구분을 통해 상태를 업데이트한다.
 * cardsById, listsById, boardsById 상태로 나눠 관리한다.
 * */
const cardsById = (state = {}, action) => {
  switch (action.type) {
    /* 카드 추가나 수정 타입으로 넘어왔을 때 리덕스 상태 값에 반영한다. */
    case 'ADD_CARD':
    case 'EDIT_CARD_TITLE': {
      const {cardTitle, cardId} = action.payload;
      return {...state, [cardId]: {title: cardTitle, _id: cardId}};
    }
    /* 카드 삭제가 발생했을 때 리덕스 상태 값에 반영한다. */
    case 'DELETE_CARD': {
      const {cardId} = action.payload;
      const {[cardId]: deletedCard, ...restOfCards} = state;
      return restOfCards;
    }
    /* 리스트 삭제가 발생했을 때 해당 정보를 필터하여 리덕스 상태 값에 반영한다. */
    case 'DELETE_LIST': {
      const {cards: cardIds} = action.payload;
      return Object.keys(state)
        .filter((cardId) => !cardIds.includes(cardId))
        .reduce((newState, cardId) => ({...newState, [cardId]: state[cardId]}), {});
    }
    /* 리덕스 상태 값에 보드 정보를 반영한다. */
    case 'SET_BOARD': {
      const {cards} = action.payload;
      return {
        ...state,
        ...arrayToObject(cards)
      };
    }
    default:
      return state;
  }
};

const listsById = (state = {}, action) => {
  switch (action.type) {
    /* listsById에 카드 추가 타입 이벤트를 반영한다. */
    case 'ADD_CARD': {
      const {listId, cardId} = action.payload;
      return {
        ...state,
        [listId]: {...state[listId], cards: [...state[listId].cards, cardId]}
      };
    }
    /* listsById에 카드 삭제 타입 이벤트를 반영한다. */
    case 'DELETE_CARD': {
      const {cardId: newCardId, listId} = action.payload;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter((cardId) => cardId !== newCardId)
        }
      };
    }
    /* listsById에 리스트 추가 타입 이벤트를 반영한다. */
    case 'ADD_LIST': {
      const {listId, listTitle} = action.payload;
      return {
        ...state,
        [listId]: {_id: listId, title: listTitle, cards: []}
      };
    }
    /* listsById에 리스트 삭제 타입 이벤트를 반영한다. */
    case 'DELETE_LIST': {
      const {listId} = action.payload;
      const {[listId]: deletedList, ...restOfLists} = state;
      return restOfLists;
    }
    /* listsById에 리스트 이름 변경 타입 이벤트를 반영한다. */
    case 'EDIT_LIST_TITLE': {
      const {listId, listTitle} = action.payload;
      return {
        ...state,
        [listId]: {...state[listId], title: listTitle}
      };
    }
    /* listsById 상태에 리스트 위치 이동 이벤트에 대한 결과를 반영한다. */
    case 'REORDER_LIST': {
      const {sourceIndex, destinationIndex, sourceId, destinationId} = action.payload;
      if (sourceId === destinationId) {
        const newCards = Array.from(state[sourceId].cards);
        const [removedCard] = newCards.splice(sourceIndex, 1);
        newCards.splice(destinationIndex, 0, removedCard);
        return {
          ...state,
          [sourceId]: {...state[sourceId], cards: newCards}
        };
      }

      const sourceCards = Array.from(state[sourceId].cards);
      const [removedCard] = sourceCards.splice(sourceIndex, 1);
      const destinationCards = Array.from(state[destinationId].cards);
      destinationCards.splice(destinationIndex, 0, removedCard);
      return {
        ...state,
        [sourceId]: {...state[sourceId], cards: sourceCards},
        [destinationId]: {...state[destinationId], cards: destinationCards}
      };
    }
    /* listsById 상태에 리스트 setter 이벤트에 대한 결과를 반영한다. */
    case 'SET_BOARD': {
      const {lists} = action.payload;
      const newLists = lists.map((list) => {
        return {
          ...list,
          cards: list.cards.map((card) => card._id)
        };
      });
      return {
        ...state,
        ...arrayToObject(newLists)
      };
    }
    default:
      return state;
  }
};

const boardsById = (state = {}, action) => {
  switch (action.type) {
    /* boardsById 상태에 보드 추가 타입 이벤트에 대한 결과를 반영한다. */
    case 'ADD_BOARD': {
      const {boardId, boardTitle} = action.payload;
      return {
        ...state,
        [boardId]: {_id: boardId, title: boardTitle, lists: []}
      };
    }
    /* boardsById 상태에 보드 삭제 타입 이벤트에 대한 결과를 반영한다. */
    case 'DELETE_BOARD': {
      const {boardId} = action.payload;
      const {[boardId]: deletedBoard, ...restOfBoards} = state;
      return restOfBoards;
    }

    /* boardsById 상태에 리스트 추가 타입 이벤트에 대한 결과를 반영한다. */
    case 'ADD_LIST': {
      const {boardId, listId} = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: [...state[boardId].lists, listId]
        }
      };
    }
    /* boardsById 상태에 리스트 삭제 타입 이벤트에 대한 결과를 반영한다. */
    case 'DELETE_LIST': {
      const {listId: newListId, boardId} = action.payload;
      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          lists: state[boardId].lists.filter((listId) => listId !== newListId)
        }
      };
    }
    /* boardsById 상태에 카드 위치 이동 타입 이벤트에 대한 결과를 반영한다. */
    case 'REORDER_LISTS': {
      const {sourceIndex, destinationIndex, sourceId} = action.payload;
      const newLists = Array.from(state[sourceId].lists);
      const [removedList] = newLists.splice(sourceIndex, 1);
      newLists.splice(destinationIndex, 0, removedList);
      return {
        ...state,
        [sourceId]: {...state[sourceId], lists: newLists}
      };
    }
    /* boardsById 상태에 보드 전체 데이터 정보를 반영한다. */
    case 'SET_BOARD': {
      const {boardId, boardTitle, lists} = action.payload;
      return {
        ...state,
        [boardId]: {_id: boardId, title: boardTitle, lists: lists.map((list) => list._id)}
      };
    }
    default:
      return state;
  }
};

export default {cardsById, listsById, boardsById};
