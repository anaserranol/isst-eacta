import { combineReducers } from 'redux';

// Importamos las acciones
import {
  USER_LOGIN,
  USER_LOGOUT
} from "./actions";

function usersBBDD (state = [], action = {}) {
  switch (action.type) {
    case USER_LOGIN:
      return state;
    default:
      return state;
  }
}

function userLogged (state = [], action = {}) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        rol: action.payload.rol,
        subjects: action.payload.subjects,
        name: action.payload.name
      }
    case USER_LOGOUT:
      return {
        rol: action.payload.rolRestart,
        subjects: action.payload.subjectsRestart,
        name: action.payload.name
      }
    default:
      return state;
  }
}





const GlobalState = combineReducers({
    usersBBDD,
    userLogged,
  });
  
  export default GlobalState;