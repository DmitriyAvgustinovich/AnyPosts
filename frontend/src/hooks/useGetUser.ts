export const useGetUser = () => {
  const userObj = localStorage.getItem('user');
  return userObj ? JSON.parse(userObj) : null;
};