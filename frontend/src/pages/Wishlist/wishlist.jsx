import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import './wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/wishlist/${userId}`
      );
      setWishlist(data.items || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  //Fetch wishlist when page loads
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove from wishlist
  const removeFromWishlist = async productId => {
    try {
      await axios.delete(
        `http://localhost:8000/wishlist/${userId}/${productId}`
      );
      setWishlist(prev =>
        prev.filter(item => item.productId._id !== productId)
      );
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  // Move product to cart
  const moveToCart = async productId => {
    try {
      await axios.post(
        `http://localhost:8000/wishlist/move-to-cart/${userId}/${productId}`
      );
      setWishlist(prev =>
        prev.filter(item => item.productId._id !== productId)
      );
      navigate('/add-to-cart');
    } catch (err) {
      console.error('Error moving to cart:', err);
      alert('Error moving product to cart.');
    }
  };

  return (
    <div className="wishlist">
      <Navbar />
      <div className="wishlist-container">
        {wishlist.length === 0 ? (
          <p className="no-wishlist">Oops! Your wishlist is empty.</p>
        ) : (
          wishlist.map(item => (
            <div className="wishlist-product-card" key={item.productId._id}>
              <div className="wishlist-image">
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => removeFromWishlist(item.productId._id)}
                ></i>
                <img src={item.productId.image[0]} alt={item.productId.name} />
              </div>
              <div className="wishlist-content">
                <p>{item.productId.name}</p>
                <p>₹{item.productId.price}</p>
                <button onClick={() => moveToCart(item.productId._id)}>
                  MOVE TO BAG
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
