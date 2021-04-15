import { combineReducers } from 'redux';

// Importamos las acciones
import {
  SAVE_MARKS,
  SAVE_SUBJECTS,
  INIT_USERS,
  USER_LOGIN,
  USER_LOGOUT
} from "./actions";

function usersBBDD (state = [], action = {}) {
  switch (action.type) {
    case INIT_USERS:
      return action.payload.users;
    default:
      return state;
  }
}

function userLogged (state = [], action = {}) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        rol: action.payload.rol,
        name: action.payload.name,
        id: action.payload.id
      }
    case USER_LOGOUT:
      return {
        rol: action.payload.rolRestart,
        name: action.payload.nameRestart,
        id: action.payload.idRestart,
      }
    default:
      return state;
  }
}

function subjects (state = [], action = {}) {
  switch (action.type) {
    case SAVE_SUBJECTS:
        return action.payload.subs;
    case USER_LOGOUT:
      return action.payload.subjectsRestart;
    default:
      return state;
  }
}

function marks (state = [], action = {}) {
  switch (action.type) {
    case SAVE_MARKS:
        return action.payload.marks;
    case USER_LOGOUT:
      return action.payload.marksRestart;
    default:
      return state;
  }
}





const GlobalState = combineReducers({
    usersBBDD,
    userLogged,
    subjects,
    marks
  });
  
  export default GlobalState;