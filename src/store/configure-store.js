import rootReducer from '../reducers';
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

// enable redux devtools...
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const loggerMiddleware = createLogger()

// TODO - loggerMiddleware should be removed on production build!!!!
export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    enhancers
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
