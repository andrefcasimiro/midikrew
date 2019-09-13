// @flow
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import trackReducer from 'data/track/reducer'
import instrumentReducer from 'data/instrument/reducer'

export default function configureStore(initialState: any) {
  const reducers = combineReducers({
    track: trackReducer,
    instrument: instrumentReducer,
  })

  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initialState,
    applyMiddleware,
  )

  return store
}
