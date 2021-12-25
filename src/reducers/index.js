import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Login from "./login";


const reducer = combineReducers({ Login });

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();