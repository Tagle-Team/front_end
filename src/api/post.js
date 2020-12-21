import client from './client';

/**
 * my tag 게시글 등록
 * @param {json} params
 */
export const addPost = async (params) => {
  try {
    return client.post('/post', params);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 로그인한 사용자 게시글 리스트 요청
 */
export const fetchPosts = async () => {
  try {
    return client.get('/post');
  } catch (error) {
    console.log(error);
  }
};

/**
 * 공개 여부 update
 * @param {json} param0
 */
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

/**
 * 게시글 수정
 * @param {json} param0
 */
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

/**
 * 게시글 삭제
 * @param {json} param0
 */
export const deletePost = async ({ id }) => {
  try {
    return client.delete(`/post/${id}`, {
      data: { id },
    });
  } catch (error) {
    console.log(error);
  }
};
