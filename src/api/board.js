import client from './client';

export const addBoard = ({ boardTitle }) => (dispatch) => {
  try {
    return client.post('/boards/board', {
      boardTitle
    }).then(({ data }) => {
      dispatch({
        type: 'ADD_BOARD',
        payload: {boardTitle, boardId: data.boardId}
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBoard = ({ boardId }) => (dispatch) => {
  try {
    return client.delete('/boards/board', {
      boardId
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

export const generateExampleBoard = () => (dispatch) => {
  try {
    return client.post('/boards/example').then(({data}) => {
      const {boardTitle, boardId, lists, cards} = data;
      dispatch({
        type: 'GENERATE_EXAMPLE_BOARD',
        payload: {boardTitle, boardId, lists, cards}
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const setBoard = (lists, boardTitle, boardId, cards) => (dispatch) => {
  console.log('card-------->', cards);
  return dispatch({
    type: 'SET_BOARD',
    payload: {boardTitle, boardId, lists, cards}
  });
}

export const getBoard = () => {
  try {
    return client.get('/boards/board');
  } catch (error) {
    console.log(error);
  }
}
