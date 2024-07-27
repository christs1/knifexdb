import React, { useState } from 'react'
import './Dropdown.css'
import { MenuItems } from '../Assets/MenuItems'
import { Link } from 'react-router-dom'

export const Dropdown = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
        <div>
            <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index} className='dropdown-item'>
                            <Link to={item.path} className='dropdown-link' style={{ textDecoration: 'none', color: 'white' }} onClick={() => setClick(false)}>
                                <img src={item.image} alt="" width='30' className='dropdown-icon'/>
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Dropdown;
