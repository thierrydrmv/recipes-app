import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/drinks.css';

function Drinks() {
  const {
    setPageTitle,
    setRoute,
    redirect,
    meals,
    setMeat,
    drincat,
    setDrincat,
    meat,
    drinke,
    setRedirect,
    setDrinke } = useContext(RecipiesContext);
  const history = useHistory();
  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeat(data);
      setDrinke(true);
    };
    requestAPI();
  }, []);
  useEffect(() => {
    setPageTitle('Drinks');
    setRoute('drinks');
    setDrinke(false);
    if (redirect) {
      history.push(redirect);
      setRedirect('');
    } // toda vez que o meu redirect for atualizado vai acontecer a mudança de pagina
  }, [history, redirect, setPageTitle, setRoute, setDrinke]);
  const size = 12;
  useEffect(() => {
    const fetchDrink = async () => {
      const five = 6;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const newData = data.drinks.splice(0, five);
      const category = newData
        .map((item) => (item.strCategory));
      setDrincat(category);
    };
    fetchDrink();
  }, []);

  const handleCategory = async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    setMeat(data);
  };
  return (
    <div>
      <Header />
      <div className="button-container text-center">
      { drincat?.map((categoryName, index) => (
        <button
          className="btn btn-success text-center m-1"
          key={ `${categoryName}-${index}` }
          data-testid={ `{${categoryName}-category-filter}` }
          type="button"
          onClick={ () => handleCategory(categoryName) }
        >
          { categoryName }
        </button>
      ))}
      </div>
      <div className="card-container">
      {drinke ? meat.drinks?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        index < size && (
          <div 
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }>
            <img
              className="imagem"
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ idDrink }
            />
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          </div>
        )
      )) : (
        meals.drinks?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          index < size && (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ idDrink }>
              <img
                className="imagem"
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ idDrink }
              />
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            </div>
          )
        )))}
      </div>
      
      <Footer />
    </div>
  );
}
Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
export default Drinks;
