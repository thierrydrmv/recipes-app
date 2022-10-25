import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <section data-testid="footer" className="footer">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks" />
      <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meals" />
    </section>
  );
}
