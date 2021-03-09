export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = "USER_LOGOUT";

// Recoge los datos introducidos en el login

export function userLogin (rol, subjects) {
    
    return {type: USER_LOGIN, payload: {rol, subjects} };

}

// Cerrar sesion

export function userLogout (rolRestart, subjectsRestart) {
    return {type: USER_LOGOUT, payload: {rolRestart, subjectsRestart}}
}

