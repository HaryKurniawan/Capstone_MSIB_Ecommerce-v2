import React from 'react';
import '../styles/Profile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare  } from "@fortawesome/free-solid-svg-icons";

const AvatarChanger = ({ photo, onChangePhoto }) => (
  <div className="profile-photo-container">
    <img src={photo} alt="Profile" className="profile-photo" />
    <button className="profile-button-change" onClick={onChangePhoto}>
    <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  </div>
);

export default AvatarChanger;
