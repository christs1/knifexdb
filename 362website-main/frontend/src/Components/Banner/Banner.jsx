import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../Assets/cs2banner.png';
import logo from '../Assets/logo.png'; // Ensure the logo is correctly imported
import './Banner.css';

export const Banner = () => {
  return (
    <div className='banner'>
      <div className='banner-img-container'>
        <img src={banner} alt="CS2 Banner" className='banner-img' />
      </div>
      <img src={logo} alt="Main Logo" className='banner-logo' />
      <div className='banner-content'>
        <h2 className='banner-title'>BUY, SELL, & TRADE</h2>
        <p className='banner-subtitle'>CS2 Skins</p>
        <Link to='./knives' className='banner-button-link'>
          <button className='banner-button'>Shop Now</button>
        </Link>
      </div>
      <div className="account-actions">
        <div className="account-text">
          <p>Don't have an account?</p>
          <Link to="/signup" className='account-button-link'>
            <button className='account-button'>Sign up</button>
          </Link>
        </div>
        <div className="account-text">
          <p>Already have an account?</p>
          <Link to="/login" className='account-button-link'>
            <button className='account-button'>Log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
