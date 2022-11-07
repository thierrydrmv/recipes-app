import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';

function FilterButtons() {
  const { setMeat, backupMeat, meat } = useContext(RecipiesContext);
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const url = history.location.pathname.split('/');
  const five = 5;

  useEffect(() => {
    console.log('entrei');
    const fetchDrink = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const newData = data.drinks.filter((_item, index) => (index < five));
      const allCategories = newData
        .map((item) => (item.strCategory));
      setCategories(['All', ...allCategories]);
    };
    const fetchMeal = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const newData = data.meals.filter((_item, index) => (index < five));
      console.log(newData);
      const allCategories = newData
        .map((item) => (item.strCategory));
      setCategories(['All', ...allCategories]);
    };
    if (url[1] === 'drinks') {
      fetchDrink();
    } else {
      fetchMeal();
    }
  }, []);

  const handleCategory = async (category) => {
    if (category === 'All' || meat !== backupMeat) {
      return setMeat(backupMeat);
    }
    if (url[1] === 'drinks') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setMeat(data);
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setMeat(data);
    }
  };

  return (
    <div>
      {categories.map((categoryName, index) => (
        <button
          key={ `${categoryName}-${index}` }
          data-testid={ `${categoryName}-category-filter` }
          type="button"
          onClick={ () => handleCategory(categoryName) }
        >
          { categoryName }
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
