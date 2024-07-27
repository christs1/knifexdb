import React, { useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import removeicon from '../Assets/removeicon.png'
import {useUser} from '../../Context/UserContext'

export const CartItems = () => {
  const { getTotalCartAmount, all_knifes, cartItems, removeFromCart, addToCart } = useContext(ShopContext)
  const {user} = useUser()
  const navigate = useNavigate()
  const totalAmount = getTotalCartAmount()
  const fee = totalAmount * 0.05

  const handleCheckout = () => {
    if (user){
      navigate('/checkout')
    }
    else {
      alert("Please log in to proceed")
      navigate('/login')
    }
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {all_knifes.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id} className="cart-item">
                  <img src={e.image} alt="" className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2 className="cart-item-title">{e.name}</h2>
                    <p className="cart-item-price">${e.knife_price}</p>
                    <div className="cart-item-quantity">
                      <button className="quantity-btn" onClick={() => removeFromCart(e.id)}>-</button>
                      <input type="text" value={cartItems[e.id]} readOnly className="quantity-input" />
                      <button className="quantity-btn" onClick={() => addToCart(e.id)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <p>${e.knife_price * cartItems[e.id]}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(e.id)}>
                      <img src={removeicon} alt="Remove" style={{height:20, width:20}} />
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="cart-summary">
          <h2>Summary</h2>
          <div className="summary-item">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="summary-item">
            <p>KnifeX Fee(5%)</p>
            <p>${fee}</p>
          </div>
          <div className="summary-item total">
            <p>Total</p>
            <p>${totalAmount+fee}</p>
          </div>
          {totalAmount > 0 ? (
           <button onClick={handleCheckout}className="checkout-btn">Proceed to Checkout</button>)
          :
          (<button className="checkout-btn" disabled>Proceed to Checkout</button>)}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
