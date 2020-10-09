import auth from '@react-native-firebase/auth';

// const baseUrl = '';

// const match = (url) => !url.startsWith('/api') && url.startsWith('/');

const fetchWithToken = async (url, {body, ...params} = {}) => {
  const token = await auth().currentUser.getIdToken();
  const headers = {'content-type': 'application/json'};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...params,
    headers: {
      ...headers,
      ...params.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  //   if (match(url)) {
  //     return window.fetch(baseUrl + url, config).then(async (response) => {
  //       const data = await response.json();
  //       if (response.ok) {
  //         return data;
  //       }
  //       return Promise.reject(data);
  //     });
  //   }
  // else etch with a designated url
  return window.fetch(url, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return Promise.reject(data);
  });
};

const getVideoToken = async ({identity, room}) => {
  try {
    const result = await fetchWithToken(
      'https://europe-west1-medtech-f46d7.cloudfunctions.net/api/user/get-token',
      {
        body: {
          identity,
          room,
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {getVideoToken};
