import React from 'react';

const ProfileButtons = ({ isEditMode, onEditToggle }) => (
  <div className="profile-buttons">
    <button className="profile-button" onClick={onEditToggle}>
      {isEditMode ? 'Save Data' : 'Edit Data'}
    </button>
  </div>
);

export default ProfileButtons;
