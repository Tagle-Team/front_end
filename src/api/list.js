import client from './client';

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

export const deleteList = ({ cards, listId, boardId }) => (dispatch) => {
  try {
    return client.delete('/lists/list', {
      listId, boardId
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

export const reorderList = ({ cardId, sourceId, destinationId, sourceIndex, destinationIndex, boardId }) => (dispatch) => {
  console.log(cardId, sourceId, destinationId, sourceIndex, destinationIndex, boardId);
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
