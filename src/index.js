import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextProvider from './context/ContextProvider';

// -----------------------------------------------------------------------------------
// setando manual valor do localstore para desenolvimento da tela de receitas feitas
// depois que for implementado requisito 43 de ser retidado
/* const EnviadoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
localStorage.setItem('doneRecipes', JSON.stringify(EnviadoneRecipes)); */
// -----------------------------------------------------------------------------------

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ContextProvider>
      <App />
    </ContextProvider>,
  );
