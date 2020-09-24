// return the user data from the session storage
export const getUser = () => {
  const auth = sessionStorage.getItem('auth');
  if (auth) return auth;
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('auth');
}

// set the token and user from the session storage
export const setUserSession = (token, auth) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('auth', auth);
}