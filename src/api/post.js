import client from './client';

export const addPost = async (params) => {
  try {
    return client.post('/post', params);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = async () => {
  try {
    return client.get('/post');
  } catch (error) {
    console.log(error);
  }
};

export const updatePrivate = async ({ id, isPrivate }) => {
  try {
    return client.put('/post/private', {
      id,
      isPrivate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async ({ seq, id, isPrivate, contents }) => {
  try {
    return client.put(`/post/${seq}`, {
      id,
      isPrivate,
      contents,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async ({ seq, id }) => {
  try {
    return client.delete(`/post/${seq}`, {
      data: { id },
    });
  } catch (error) {
    console.log(error);
  }
};
