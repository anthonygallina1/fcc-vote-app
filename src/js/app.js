"use strict";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

import PollReducer from "./reducers/PollReducer";
import PollList from "./components/PollList";
import Header from "./components/Header";

const app = document.getElementById('app');

const store = createStore(
    combineReducers({
        polls : PollReducer
    })
);



const App = ({ onClick }) => (
    <div>
        <Header title="Voting App"/>
        <PollList />
        <div>
            <button onClick= { onClick }>ADD POLL</button>
        </div>
    </div>
);
    
const AppContainer = connect(
    (state)=> { return {} },
    (dispatch)=> ({
        onClick: function () {
            dispatch(
                {
                    type: "ADD_POLL",
                    title: "A test poll"
                }
            );
        }
    })
)(App);    
    
render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>
, app);
