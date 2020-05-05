import React from 'react'; //importar react para todo arquivo que for usar HTML dentro dele

import ReactDOM from 'react-dom';   //o react-dom da a habilidade de comunicar o react com a arvore de elementos da nossa aplicação

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));   // essa tag <App /> é a indicação da utilização do html, é chamada de JSX(JavaScript + XML)


