import client from './client';

/* 보드 정보 삭제에 대한 axios 요청 함수 (API 호출) */
export const deleteBoard = ({ boardId }) => (dispatch) => {
  try {
    return client.delete('/boards/board', {
      data: {
        boardId: boardId
      }
    }).then(() => {
      dispatch({
        type: 'DELETE_BOARD',
        payload: {
          boardId
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

/* 리스트 위치 이동에 대한 axios 요청 함수 (API 호출) */
export const reorderBoard = ({ listId, sourceId, sourceIndex, destinationIndex }) => (dispatch) => {
  try {
    return client.put('/boards/reorder-board', {
      listId,
      sourceId,
      sourceIndex,
      destinationIndex
    }).then(() => {
      dispatch({
        type: 'REORDER_LISTS',
        payload: {
          sourceId,
          sourceIndex,
          destinationIndex
        }
      })
    });
  } catch (error) {
    console.log(error);
  }
};

/* 보드 값 설정에 대한 axios 요청 함수 (API 호출) */
export const setBoard = (lists, boardTitle, boardId, cards) => (dispatch) => {
  return dispatch({
    type: 'SET_BOARD',
    payload: {boardTitle, boardId, lists, cards}
  });
}

/* 보드 값을 가져오기 위한 axios 요청 함수 (API 호출) */
export const getBoard = () => {
  try {
    return client.get('/boards/board');
  } catch (error) {
    console.log(error);
  }
}
