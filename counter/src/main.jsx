import { createRoot } from 'react-dom/client'
import App from './App'
import {  legacy_createStore as createStore, combineReducers } from "redux"
import noteReducer from "./reducers/noteReducer"
import { Provider } from 'react-redux'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})

const store = createStore(reducer)

console.log(store.getState())

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
