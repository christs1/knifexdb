import React from 'react'
import './CSS/GuestProfile.css'
import {useUser} from '../Context/UserContext'
import knives from '../Components/Assets/Inventory'


export const GuestProfile = () => {
  const {user} = useUser()
  return (
    <div>
    <div className='profile'>
        <h1>Guest Profile</h1>
    <p> Name: {user.profile.name}</p>
    <p>Email: {user.profile.email}</p>
    <p>Username: {user.profile.username}</p>
    </div>
    <div className="inventory">
      <h1>Inventory</h1>
      <div className="inventory-grid">
        {knives.map((knife) => (
        <div key={knife.id} class="inventory-item">
          <img src={knife.image} alt={knife.name}/>
          <p>{knife.name}</p>
        </div>
        ))}
        </div>
     </div>
     </div>
  )
};
export default GuestProfile
