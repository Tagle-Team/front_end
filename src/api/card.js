import client from './client';

/* 카드 데이터를 추가하기 위한 axios 요청 함수 (API 호출) */
export const addCard = ({ cardTitle, listId, boardId }) => (dispatch) => {
  try {
    return client.post('/cards/card', {
      cardTitle,
      listId,
      boardId
    }).then(({ data }) => {
      dispatch({
        type: 'ADD_CARD',
        payload: {
          cardTitle,
          listId,
          cardId: data.cardId
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

/* 카드 데이터를 수정하기 위한 axios 요청 함수 (API 호출) */
export const editCardTitle = ({ cardTitle, cardId, cardIndex, listId, boardId }) => (dispatch) => {
  try {
    return client.put('/cards/card', {
      cardTitle,
      cardIndex,
      listId,
      boardId
    }).then(() => {
      dispatch({
        type: 'EDIT_CARD_TITLE',
        payload: {
          cardTitle,
          cardId,
          listId
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

/* 카드 데이터를 삭제하기 위한 axios 요청 함수 (API 호출) */
export const deleteCard = ({ cardId, listId, boardId }) => (dispatch) => {
  try {
    return client.delete('/cards/card', {
      data: {
        cardId,
        listId,
        boardId
      }
    }).then(() => {
      dispatch({
        type: 'DELETE_CARD',
        payload: {
          cardId,
          listId
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};
