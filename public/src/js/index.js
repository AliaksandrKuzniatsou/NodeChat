import React from 'react';
import { initSockets } from './socketMessagehandler';
import ReactDOM from 'react-dom';
import { configureStore } from './store';
import Root from './containers/Root';

initSockets();

//const store = configureStore();

ReactDOM.render(<Root/>, document.getElementById('root'));
