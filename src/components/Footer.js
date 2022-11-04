import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  const { setMeals, setDrinke } = useContext(RecipiesContext);

  const handleClick = (pathName) => {
    setMeals([]);
    history.push(`/${pathName}`);
    setDrinke(false);
  };

  return (
    <section data-testid="footer" className="footer">
      <button
        className="icons"
        type="button"
        onClick={ () => handleClick('drinks') }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks" />
      </button>
      <button
        className="icons"
        type="button"
        onClick={ () => handleClick('meals') }
      >
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meals" />
      </button>
    </section>
  );
}
