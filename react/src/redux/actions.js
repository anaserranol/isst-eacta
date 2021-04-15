export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = "USER_LOGOUT";
export const INIT_USERS = "INIT_USERS";
export const SAVE_SUBJECTS = "SAVE_SUBJECTS";
export const SAVE_MARKS = "SAVE_MARKS";

// Recoge los datos introducidos en el login

export function userLogin (rol, name, id) {
    
    return {type: USER_LOGIN, payload: {rol, name, id} };

}

// Cerrar sesion

export function userLogout (rolRestart, subjectsRestart, nameRestart, idRestart, marksRestart) {
    return {type: USER_LOGOUT, payload: {rolRestart, subjectsRestart, nameRestart, idRestart, marksRestart}}
}


export function initUsers (users) {
    return { type: INIT_USERS, payload: {users} };
}

export function saveSubjects ( subs) {
    return { type: SAVE_SUBJECTS, payload: {subs} };
}

export function saveMarks (marks) {
    return { type: SAVE_MARKS, payload: {marks}}
}