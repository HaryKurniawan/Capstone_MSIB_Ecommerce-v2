import React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

const ProfileForm = ({ profile, onChange, isEditMode }) => (
  <div className="profile-form">
    {['name', 'email', 'address'].map((field) => (
      <div className="profile-input-group" key={field}>
        
        <Text className="nama-form">
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </Text>

        <input
          name={field}
          value={
            field === 'name'
              ? `${profile.name?.firstname} ${profile.name?.lastname}`
              : field === 'address'
              ? `${profile.address?.street}, ${profile.address?.city}, ${profile.address?.zipcode}`
              : profile[field]
          }
          onChange={onChange}
          placeholder={`Masukkan ${field.charAt(0).toUpperCase() + field.slice(1)}`}
          className="profile-input"
          disabled={!isEditMode}
        />
      </div>
    ))}
  </div>
);

export default ProfileForm;
