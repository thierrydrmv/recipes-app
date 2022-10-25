import profileIcon from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <h1 data-testid="page-title">
        Profile
      </h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
    </div>
  );
}

export default Profile;
