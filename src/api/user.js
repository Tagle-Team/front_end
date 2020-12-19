import client from './client';

export const editUser = async (params) => {
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
