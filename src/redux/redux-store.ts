import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import calculateReducer from './calculate-reducer'


let reducers = combineReducers({
    calculate: calculateReducer
})

type ReducersType = typeof reducers // создаем тип ReducersType на основе reducers
export type AppStateType = ReturnType<ReducersType> // определяем то что возваращается ReducersType и фиксируем его как AppStateType

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.store = store

export default store