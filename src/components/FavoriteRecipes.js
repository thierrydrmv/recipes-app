import profileIcon from '../images/profileIcon.svg';

function FavoriteRecipes() {
  return (
    <div>
      <h1 data-testid="page-title">
        Favorite Recipes
      </h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
    </div>
  );
}

export default FavoriteRecipes;
