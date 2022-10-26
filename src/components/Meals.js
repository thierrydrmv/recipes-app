import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';

function Meals() {
  const {
    setPageTitle,
    setRoute, redirect, meals } = useContext(RecipiesContext);
  const history = useHistory();
  useEffect(() => {
    setPageTitle('Meals');
    setRoute('meals');
    if (redirect) {
      history.push(redirect);
    }
  }, [history, redirect, setPageTitle, setRoute]);
  return (
    <div>
      <Header />
      {meals.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          <img data-testid={ `${index}-card-img` } src={ strMealThumb } alt={ idMeal } />
        </div>
      ))}
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Meals;
