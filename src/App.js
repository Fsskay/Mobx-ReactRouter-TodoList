import './App.css';
import React from 'react'
import TodoList from './pages/todo'
import {Provider} from "mobx-react";
import store from './store/store'


//mobx-react的Provider是store的供应商

function App() {
    return (
        <React.Fragment>
            <div>
                <Provider store={store}>
                    <TodoList/>
                </Provider>
            </div>
        </React.Fragment>
    );
}

export default App;
