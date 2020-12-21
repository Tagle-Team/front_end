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

export const updatePost = async ({ id, isPrivate, contents }) => {
  try {
    return client.put(`/post/${id}`, {
      id,
      isPrivate,
      contents,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async ({ id }) => {
  try {
    return client.delete(`/post/${id}`, {
      data: { id },
    });
  } catch (error) {
    console.log(error);
  }
};
