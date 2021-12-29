import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Login from "./loginn";


const reducer = combineReducers({ Login });

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();