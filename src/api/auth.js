import client from './client';

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

export const signUp = async ({ userId, password, userName, email }) => {
  try {
    return client.post('/users/signup', {
      userId,
      password,
      userName,
      email,
    });
  } catch (error) {
    console.log(error);
  }
};
