import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import AvatarChanger from '../components/AvatarChanger';
import ProfileForm from '../components/ProfileForm';
import ProfileModals from '../components/ProfileModals';
import Avatar0 from '../assets/Vector.png';
import Avatar1 from '../images/avatar1.png';
import Avatar2 from '../images/avatar2.png';
import Avatar3 from '../images/avatar3.png';
import Avatar4 from '../images/avatar4.png';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const avatars = [Avatar0, Avatar1, Avatar2, Avatar3, Avatar4];

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    photo: Avatar0,  
  });
  
  const [isHalfModalVisible, setIsHalfModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    if (storedProfile) {
      setProfile(storedProfile); 
    }
  }, []);

  const handlePhotoChange = () => {
    const currentIndex = avatars.indexOf(profile.photo);
    const nextIndex = (currentIndex + 1) % avatars.length;
    setProfile((prev) => ({ ...prev, photo: avatars[nextIndex] }));
    
    localStorage.setItem('profile', JSON.stringify({ ...profile, photo: avatars[nextIndex] }));
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    notification.success({
      message: 'Berhasil Logout',
      description: 'Anda telah berhasil logout.',
    });
    navigate('/');
  };

  return (
    <div className="profile-container">
      <AvatarChanger photo={profile.photo} onChangePhoto={handlePhotoChange} />
      <ProfileForm profile={profile} isEditMode={false} />
      <ProfileModals
        isHalfModalVisible={isHalfModalVisible}
        isLogoutModalVisible={isLogoutModalVisible}
        onCloseHalfModal={() => setIsHalfModalVisible(false)}
        onConfirmLogout={handleLogout}
        onCancelLogout={() => setIsLogoutModalVisible(false)}
      />
      <button className="about-web" onClick={() => setIsHalfModalVisible(true)}>
        <p>About this web</p>
      </button>

      <div className="logout-container">
        <button className="logout-button" onClick={() => setIsLogoutModalVisible(true)}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
