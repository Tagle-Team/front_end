import client from './client';

/* 리스트 데이터를 추가하기 위한 axios 요청 함수 (API 호출) */
export const addList = ({ listTitle, boardId }) => (dispatch) => {
  try {
    return client.post('/lists/list', {
      listTitle,
      boardId
    }).then(({ data }) => {
      dispatch({
        type: 'ADD_LIST',
        payload: {
          listTitle,
          boardId,
          listId: data.listId
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

/* 리스트 데이터를 수정하기 위한 axios 요청 함수 (API 호출) */
export const editListTitle = ({ listTitle, listId, boardId }) => (dispatch) => {
  try {
    return client.put('/lists/list', {
      listTitle,
      listId,
      boardId
    }).then(() => {
      dispatch({
        type: 'EDIT_LIST_TITLE',
        payload: {
          listTitle,
          listId
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

/* 리스트 데이터를 삭제하기 위한 axios 요청 함수 (API 호출) */
export const deleteList = ({ cards, listId, boardId }) => (dispatch) => {
  try {
    return client.delete('/lists/list', {
      data: {
        listId,
        boardId
      }
    }).then(() => {
      dispatch({
        type: 'DELETE_LIST',
        payload: {
          cards,
          listId,
          boardId
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

/* 카드 위치를 이동하기 위한 axios 요청 함수 (API 호출) */
export const reorderList = ({ cardId, sourceId, destinationId, sourceIndex, destinationIndex, boardId }) => (dispatch) => {
  try {
    return client.put('/lists/reorder-list', {
      cardId,
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
      boardId
    }).then(() => {
      dispatch({
        type: 'REORDER_LIST',
        payload: {
          sourceId,
          destinationId,
          sourceIndex,
          destinationIndex
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};
