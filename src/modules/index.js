import { combineReducers } from 'redux';
import coverage from './coverage';
import vehicle from './vehicle';

export default combineReducers({
  vehicle,
  coverage
});
