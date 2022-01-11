const initialState = {
  role: "",
  token: "",
  user: "",
};

const signIn = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, user } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
      return { role, token, user };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      return payload;

    default:
      const localToken = localStorage.getItem("token");
      const localUser = localStorage.getItem("user");
      const localRole = localStorage.getItem("role");
      if (localToken) {
        return {
          token: localToken,
          user: localUser,
          role: localRole,
        };
      }else {
        return initialState
      }
  }
};

export default signIn;

export const userLogin = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const userLogout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
