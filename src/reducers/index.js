import { combineReducers } from 'redux';
import authedUser from './authedUser';
import loading from './loading';
import error from './error';
import users from './users';
import questions from './questions';
import requestedUrl from './requestedUrl';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading', 'error']
}

export default persistReducer(persistConfig, combineReducers({
  authedUser,
  loading,
  error,
  users,
  questions,
  requestedUrl
}))