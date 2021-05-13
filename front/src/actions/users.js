export const FETCH_USERS = 'FETCH_USERS';

export const fetchUsers = (page) => ({
  type: FETCH_USERS,
  page,
});

export const SET_ALL_USERS = 'SET_ALL_USERS';

export const setAllUsers = (users) => ({
  type: SET_ALL_USERS,
  users,
});

export const SET_USERS = 'SET_USERS';

export const setUsers = (idUser, role) => ({
  type: SET_USERS,
  idUser,
  role,
});

export const SET_USERS_LIST_LOADER = 'SET_USERS_LIST_LOADER';

export const setLoadingUsersList = (loading) => ({
  type: SET_USERS_LIST_LOADER,
  loading,
});

export const DELETE_USER = 'DELETE_USER';

export const deleteUser = (idUser) => ({
  type: DELETE_USER,
  idUser,
});

export const EDIT_USER_ROLE = 'EDIT_USER_ROLE';

export const editUserRole = (idUser) => ({
  type: EDIT_USER_ROLE,
  idUser,
});

export const SET_ALL_USERS_ROLE = 'SET_ALL_USERS_ROLE';

export const setAllUsersRole = (usersRole) => ({
  type: SET_ALL_USERS_ROLE,
  usersRole,
});

export const SET_USER_ROLE = 'SET_USER_ROLE';

export const setUserRole = (id, role) => ({
  type: SET_USER_ROLE,
  id,
  role,
});
