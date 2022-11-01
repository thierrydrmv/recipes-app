import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';

function Meals() {
  const {
    setPageTitle,
    setRoute, redirect,
    meals, setRedirect } = useContext(RecipiesContext);
  const history = useHistory();

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
      setRedirect('');
    }
  });

  useEffect(() => {
    setPageTitle('Meals');
    setRoute('meals');
  }, [setPageTitle, setRoute]);

  const size = 12;
  return (
    <div>
      <Header />
      { meals.meals?.length > 1
      && meals.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
        index < size && (
          <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ idMeal }
            />
          </div>
        )
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
