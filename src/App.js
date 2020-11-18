import './App.css';
import React from 'react'
import TodoList from './pages/todo'
import {Provider} from "mobx-react";
import store from './store/store'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import SearchResult from './pages/SearchResult'

//mobx-react的Provider是store的供应商

function App() {
    return (
        <React.Fragment>
            <Router>
                <div>
                    <Provider store={store}>
                        <Route path="/" exact component={TodoList}/>
                        <Route path="/SearchResult" component={SearchResult}/>
                    </Provider>
                </div>
            </Router>
        </React.Fragment>
    );
}

export default App;
