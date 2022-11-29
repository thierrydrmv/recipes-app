import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ContextProvider from './context/ContextProvider';

// -----------------------------------------------------------------------------------
// setando manual valor do localstore para desenolvimento da tela de receitas feitas
// depois que for implementado requisito 43 de ser retidado
// const EnviadoneRecipes = [
//   {
//     id: '53065',
//     type: 'meal',
//     nationality: 'Japanese',
//     category: 'Seafood',
//     alcoholicOrNot: '',
//     name: 'Sushi',
//     image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
//   {
//     id: '53013',
//     type: 'meal',
//     nationality: 'American',
//     category: 'Beef',
//     alcoholicOrNot: '',
//     name: 'Big Mac',
//     image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
//     doneDate: '30/07/2020',
//     tags: [],
//   },
// ];
// localStorage.setItem('EnviadoneRecipes', JSON.stringify(EnviadoneRecipes));
// -----------------------------------------------------------------------------------

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>,
  );
