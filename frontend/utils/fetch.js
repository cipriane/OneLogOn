function myFetch(url, options) {
  const jwt = localStorage.getItem('jwt');
  const defaults = {
    method: 'GET',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: jwt ? `JWT ${jwt}` : null,
    },
  };

  return fetch(url, {
    ...defaults,
    ...options,
    headers: {
      ...defaults.headers,
      ...(options && options.headers),
    },
  });
}

export default myFetch;
