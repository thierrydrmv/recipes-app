import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';

function Profile() {
  return (
    <div>
      <h1 data-testid="page-title">
        Profile
      </h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      <Footer />
    </div>
  );
}

export default Profile;
