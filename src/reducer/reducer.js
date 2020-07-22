import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as app} from './app/app.js';
import NameSpace from './nameSpace.js';


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP]: app,
});