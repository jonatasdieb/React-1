import api from './Api';

export const TOKEN_KEY = "";
export const login = (user) => api.post('User/Login', user);
export const isAuthenticated = () => 
{
   if (localStorage.getItem(TOKEN_KEY) !== null)
      return true;
  
  return false;
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.replace("/")
};

