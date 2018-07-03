import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import App from './containers/App'
import reducers from './reducers'
import initialState from './reducers/initialState'

export const store = createStore(reducers, initialState, applyMiddleware(thunk))

// Attaching myApp  to window object
window.myApp = (opts) => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
    , document.querySelector('#'+ opts.elId))
}