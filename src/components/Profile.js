import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const pushToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const pushToFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container">
      <h1 data-testid="page-title">
        Profile
      </h1>
      <img
        className="img"
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt=""
      />
      <div className="profile-items">
        <h4 data-testid="profile-email">{user?.email}</h4>
        <Button
          variant="success"
          className="profile-buttons"
          type="button"
          data-testid="profile-done-btn"
          onClick={ pushToDoneRecipes }
        >
          Done Recipes
        </Button>
        <Button
          variant="success"
          className="profile-buttons"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ pushToFavoriteRecipes }
        >
          Favorite Recipes
        </Button>
        <Button
          variant="success"
          className="profile-buttons"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
