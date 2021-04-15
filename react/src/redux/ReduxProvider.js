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

            ],
            userLogged: [
                {
                    rol: "",
                    name: "",
                    id: ""
                }   
            ],
            subjects: [],
            marks: []
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