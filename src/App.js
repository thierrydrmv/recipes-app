import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/meals:id-da-receita" render={ (props) => <Meals { ...props } /> } />
      <Route path="/drinks:id-da-receita" render={ (props) => <Drinks { ...props } /> } />
      <Route
        path="/meals:id-da-receita/in-progress"
        render={ (props) => <Meals { ...props } /> }
      />
      <Route
        path="/drinks:id-da-receita/in-progress"
        render={ (props) => <Drinks { ...props } /> }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </BrowserRouter>
  );
}

export default App;
