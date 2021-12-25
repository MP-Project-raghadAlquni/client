const initialState = {
    role: "",
    token: "",
    id: "",
  };


const login = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "LOGIN":
          const { role, token, id } = payload;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("userId", id );
          return { role, token, id };

        case "LOGOUT":
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("userId");
          return payload;
          
        default:
          let tokenStorage = localStorage.getItem("token");
          let roleStorage = localStorage.getItem("role");
          let idStorage = localStorage.getItem("userId");
          if (tokenStorage && roleStorage && idStorage) return { role: roleStorage, token: tokenStorage, id: idStorage };
          else return state;
      }
    };
    
    export default login;


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