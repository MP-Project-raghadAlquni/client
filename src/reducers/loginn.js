const initialState = {
  // role: "",
  token: "",
  // id: "",
};

const signIn = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, id } = payload;
      localStorage.setItem("token", token);
      // localStorage.setItem("role", role);
      // localStorage.setItem("userId", id );
      return { role, token, id };

    case "LOGOUT":
      localStorage.removeItem("token");
      // localStorage.removeItem("role");
      // localStorage.removeItem("userId");
      return payload;

    default:
      const localToken = localStorage.getItem("token");
      if (localToken) {
        return {
          token: localToken,
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