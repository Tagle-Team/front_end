import client from './client';

/**
 * id 중복 체크
 * @param {json} param0
 */
export const confirmId = async ({ id }) => {
  try {
    return client.get('/users/confirmId', {
      params: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * 회원가입
 * @param {json} params
 */
export const signUp = async (params) => {
  // 파일 전송 해야하므로 formData 로 변경하여 전송
  const formData = new FormData();
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      formData.append(key, params[key]);
    }
  }

  try {
    return client.post('/users/signup', formData);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 로그인
 * @param {json} param0
 */
export const signIn = async ({ userId, password }) => {
  try {
    return client.post('/users/login', {
      userId,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * 로그아웃 요청
 */
export const signOut = async () => {
  try {
    return client.post('/users/signout');
  } catch (error) {
    console.log(error);
  }
};

/**
 * 현재 로그인한 사용자가 입력한 비밀번호 맞는지 확인하는 api 요청
 * @param {json} param0
 */
export const confirmUser = async ({ password }) => {
  try {
    return client.post('/users/confirm', {
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
