import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';
import FilterButtons from './FilterButtons';

function Drinks() {
  const {
    setPageTitle,
    setRoute,
    redirect,
    meals,
    setMeat,
    meat,
    drinke,
    setRedirect,
    setDrinke,
    setBackupMeat,
  } = useContext(RecipiesContext);
  const history = useHistory();

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeat(data);
      setBackupMeat(data);
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
    }
  }, [history, redirect, setPageTitle, setRoute, setDrinke]);
  const size = 12;

  return (
    <div>
      <Header />
      <FilterButtons />
      {drinke ? meat.drinks?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        index < size && (
          <Link to={ `${history.location.pathname}/${idDrink}` }>
            <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
              <p data-testid={ `${index}-card-name` }>{strDrink}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ idDrink }
              />
            </div>
          </Link>
        )
      )) : (
        meals.drinks?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          index < size && (
            <Link to={ `${history.location.pathname}/${idDrink}` }>
              <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
                <p data-testid={ `${index}-card-name` }>{strDrink}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt={ idDrink }
                />
              </div>
            </Link>
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
