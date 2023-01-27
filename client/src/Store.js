import { createStore } from 'redux';
import rootReducer from './reducer/index.js';

const store = createStore(rootReducer);

export default store;