import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';

import React from 'react';
import App from '../components/App';

export default class ReduxProvider extends React.Component {
    // El constructor que no falte para la inicializacion de todo
    constructor(props) {
        super(props);
        this.initialState = { 
            usersBBDD: [
                {
                    email: "profe1@test.com",
                    password: "1234",
                    rol: "profesor",
                    subjects: [ 
                        "DORE", "ISST", "RSRD"
                    ],
                    name:"profesor1"
                },
                {
                    email: "profe2@test.com",
                    password: "1234",
                    rol: "profesor",
                    subjects: [
                        "DORE", "ISST"
                    ],
                    name:"profesor2"
                },
                {
                    email: "alum1@test.com",
                    password: "1234",
                    rol: "alumno",
                    subjects: [
                        "DORE", "ISST", "RSRD"
                    ],
                    name:"alumno1"
                },
                {
                    email: "alum2@test.com",
                    password: "1234",
                    rol: "alumno",
                    subjects: [
                        "DORE", "ISST", "RSRD"
                    ],
                    name:"alumno2"
                },
                {
                    email: "pas1@test.com",
                    password: "1234",
                    rol: "pas",
                    subjects: [
                        "DORE", "ISST", "RSRD"
                    ],
                    name:"secretario1"
                },
                {
                    email: "admin1@test.com",
                    password: "1234",
                    rol: "admin",
                    subjects: [
                        ""
                    ],
                    name: "administrador"
                }
            ],
            userLogged: [
                {
                    rol: "",
                    subjects: [""],
                    name: ""
                }   
            ]
        };
        this.store = this.configureStore();
    }
    // Lo que enviamos como vista (interfaz de usuario)
    render () {
        return (
            <Provider store = { this.store } >
                <div style = {{height: '100%'}} >
                    <App/>
                </div>
            </Provider>
        );
    }

    configureStore() {
        return createStore(GlobalState, this.initialState);
    }
}