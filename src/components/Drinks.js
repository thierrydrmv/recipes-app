import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';

function Drinks() {
  const { setPageTitle,
    setRoute,
    redirect, meals } = useContext(RecipiesContext);
  const history = useHistory();
  useEffect(() => {
    setPageTitle('Drinks');
    setRoute('drinks');
    if (redirect) {
      history.push(redirect);
    }
  }, [history, redirect, setPageTitle, setRoute]);
  return (
    <div>
      <Header />
      {meals.drinks?.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ idDrink }>
          <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ idDrink }
          />
        </div>
      ))}
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
