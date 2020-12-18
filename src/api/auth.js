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

export const signUp = async (params) => {
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
