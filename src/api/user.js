import client from './client';

/**
 * 사용자 정보 수정
 * @param {json} params
 */
export const editUser = async (params) => {
  // 프로필 사진 파일 업로드 해야하므로 formData 로 변경하여 전송
  const formData = new FormData();
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      formData.append(key, params[key]);
    }
  }

  try {
    return client.post('/users/edit', formData);
  } catch (error) {
    console.log(error);
  }
};
