import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import './cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return setCart({ items: [] });

      const { data } = await axios.get(
        `http://localhost:8000/add-to-cart/${userId}`
      );
      setCart(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setCart({ items: [] });
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Move item from Cart to Wishlist
  const handleSaveForLater = async productId => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return alert('Please login first');

      await axios.post(
        `http://localhost:8000/wishlist/move-from-cart/${userId}/${productId}`
      );

      // Refresh cart after moving
      await fetchCart();

      alert('Moved to wishlist');
    } catch (err) {
      console.error(err);
      alert('Error moving to wishlist');
    }
  };

  // Remove product
  const handleRemove = async productId => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return alert('Please login first');

      await axios.delete(
        `http://localhost:8000/add-to-cart/${userId}/${productId}`
      );
      await fetchCart();
    } catch (err) {
      console.error(err);
      alert('Error removing product');
    }
  };

  //Place order
  const handlePlaceOrder = () => {
    navigate('/address-page', {
      state: {
        itemCount: cart.items.length,
        totalAmount: cart.totalAmount,
        shipping: 50,
        delivery: 40,
      },
    });
  };

  if (cart === null)
    return (
      <p style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</p>
    );

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart">
        <Navbar />
        <div className="cart-empty">
          <h2>Your cart is empty 🛒</h2>
          <p>Looks like you haven't added anything yet.</p>
          <a href="/" className="continue-shopping">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <Navbar />
      <div className="cart-container">
        {/* LEFT SIDE */}
        <div className="cart-container-left">
          {cart.items.map((item, index) => (
            <div key={index} className="cart-left-top">
              <div className="cart-image">
                <img src={item.productId.image[0]} alt={item.productId.name} />
              </div>
              <div className="cart-content">
                <div className="cart-content-delivery">
                  <p>{item.productId.name}</p>
                  <p className="delivery-date">Delivery in 4 days, Sat</p>
                </div>
                <p className="cart-size">Size: {item.size}</p>
                <p className="cart-quant">Quantity: {item.quantity}</p>
                <p className="cart-price-left">₹ {item.priceAtAddTime}</p>
                <div className="cart-redirect">
                  <p className='save-for-later' onClick={() => handleSaveForLater(item.productId._id)}>
                    SAVE FOR LATER
                  </p>
                  <p
                    className="remove-btn"
                    onClick={() => handleRemove(item.productId._id)}
                  >
                    REMOVE
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="order-place">
            <button onClick={handlePlaceOrder}>PLACE ORDER</button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="cart-container-right">
          <p className="price1">PRICE DETAILS</p>
          <div className="price-list">
            <div className="price-details">
              <p>Price ({cart.items.length} items)</p>
              <p className="pri">₹ {cart.totalAmount}</p>
            </div>
            <div className="price-details">
              <p>Shipping charge</p>
              <p className="pri">₹ 50</p>
            </div>
            <div className="price-details">
              <p>Delivery Charge</p>
              <p className="pri">₹ 40</p>
            </div>
          </div>

          <div className="total-price">
            <p>Total Amount</p>
            <p className="price-tot">₹ {cart.totalAmount + 90}</p>
          </div>

          <div className="cart-authenticity">
            <i className="fa-solid fa-shield-dog"></i>
            <p>
              Safe and Secure Payments. Easy returns. 100% Authentic products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
