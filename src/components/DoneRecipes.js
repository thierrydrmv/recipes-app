import profileIcon from '../images/profileIcon.svg';

function DoneRecipes() {
  return (
    <div>
      <h1 data-testid="page-title">
        Done Recipes
      </h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
    </div>
  );
}

export default DoneRecipes;
