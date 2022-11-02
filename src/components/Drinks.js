import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';

function Drinks() {
  const {
    setPageTitle,
    setRoute,
    redirect,
    meals,
    setMeat,
    setDrincat,
    // drincat,
    meat,
    drinke,
    setDrinke } = useContext(RecipiesContext);
  const history = useHistory();

  const fetchData = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetchData();
      setMeat(response);
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
    } // toda vez que o meu redirect for atualizado vai acontecer a mudança de pagina
  }, [history, redirect, setPageTitle, setRoute, setDrinke]);
  const size = 12;

  useEffect(() => {
    const fetchDrink = async () => {
      const five = 6;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const newData = data.drinks.splice(0, five);
      newData
        .map((item) => ({ categoryName: item.strCategory }));
      setDrincat(newData);
    };
    fetchDrink();
  }, []);

  return (
    <div>
      <Header />
      <button
        type="button"

      >
        All
      </button>
      <button
        type="button"

      >
        Ordinary Drink
      </button>
      <button
        type="button"

      >
        Cocktail
      </button>
      <button
        type="button"

      >
        Shake
      </button>
      <button
        type="button"

      >
        Other/Unknow
      </button>
      <button
        type="button"

      >
        Cocoa
      </button>
      {drinke ? meat.drinks?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        index < size && (
          <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ idDrink }
            />
          </div>
        )
      )) : (
        meals.drinks?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          index < size && (
            <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ idDrink }
              />
            </div>
          )
        )))}
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
