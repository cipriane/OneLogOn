import isValidJWT from 'utils/isValidJWT';

async function myFetch(url, options) {
  const jwt = localStorage.getItem('jwt');
  const defaults = {
    method: 'GET',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: isValidJWT(jwt) ? `Bearer ${jwt}` : null,
    },
  };

  const resp = await fetch(url, {
    ...defaults,
    ...options,
    body: options && options.body && JSON.stringify(options.body),
    headers: {
      ...defaults.headers,
      ...(options && options.headers),
    },
  });

  const data = await resp.json();

  if (data.error) {
    throw new Error(data.error);
  } else if (data.non_field_errors) {
    throw new Error(data.non_field_errors[0]);
  } else if (!resp.ok) {
    let errString = '';
    Object.keys(data).forEach(error => {
      errString += error + ': ' + data[error] + '\n';
    });
    throw new Error(errString);
  } else {
    return data;
  }
}

export default myFetch;
