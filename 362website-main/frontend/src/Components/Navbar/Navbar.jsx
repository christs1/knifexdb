import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import shopping_cart from '../Assets/shopping-cart.png';
import Dropdown from '../Dropdown/Dropdown';
import { ShopContext } from '../../Context/ShopContext';
import {useUser} from '../../Context/UserContext';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const {user, logout} = useUser()

    const onMouseEnter = () => {
        setDropdown(true);
    };
    const onMouseLeave = () => {
        setDropdown(false);
    };

    const { getTotalCartItems } = useContext(ShopContext);


    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <Link to='/'>
                    <img width='120' src={logo} alt='Logo' />
                </Link>
            </div>
            <ul className="nav-menu">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className='nav-item'>
                    <Link to='/knives'>Knives</Link>
                    {dropdown && <Dropdown />}
                </li>
                <li>
                    <Link to='/sell'>Sell</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
            <div className="header-right">
                {user ? (
                    <>
                    <Link to={`/${user.role}`} style={{textDecoration:'none'}}className='user-link'>
                        <span className='user-greeting' >Hello, {user.profile.name}</span>
                        </Link>
                        <button onClick={logout} className='logout-btn'>Logout</button>
                    </>
                ) : (
                    <Link className='login-btn' to='/login'>
                        <button>Login</button>
                    </Link>
                )}
            </div>
            <div className="nav-login-cart">
                <Link to='/cart'>
                    <img src={shopping_cart} alt="Cart" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
