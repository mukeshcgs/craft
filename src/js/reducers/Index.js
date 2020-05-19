import { combineReducers } from "redux"
import { reducer as reduxFormReducer } from 'redux-form';

import pages from './pages/pagesReducer'
import india from './pages/indiaReducer'


export default combineReducers({pages,india});
