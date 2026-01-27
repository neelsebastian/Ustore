import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import Filter from '../../components/Filters/filters';
import Footer from '../../components/Footer/footer';
import './products.css';

const Products = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    window.scrollTo(0, 0); // 👈 scroll to top whenever page or filter changes
  }, [location.search]);

  // Initialize filters whenever URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters = {};
    for (const [key, value] of params.entries()) {
      initialFilters[key] = value;
    }
    setFilters(initialFilters);
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/products', {
        params: { ...filters, userId }, // 👈 pass logged-in user ID
      });
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/wishlist/${userId}`
      );
      const productIds = data.items?.map(item => item.productId._id);
      setWishlist(productIds || []);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  const handleWishlistToggle = async productId => {
    const isInWishlist = wishlist.includes(productId);

    try {
      if (isInWishlist) {
        await axios.delete(
          `http://localhost:8000/wishlist/${userId}/${productId}`
        );
        setWishlist(prev => prev.filter(id => id !== productId));
      } else {
        await axios.post(
          `http://localhost:8000/wishlist/${userId}/${productId}`
        );
        setWishlist(prev => [...prev, productId]);
      }
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (userId) fetchWishlist();
  }, [filters, location.search]);

  return (
    <div className="products">
      <Navbar />
      <div className="product-block">
        <div className="filter-section">
          {/* <Filter onFilterChange={setFilters} /> */}
          <Filter
            onFilterChange={newFilters =>
              setFilters(prev => ({ ...prev, ...newFilters }))
            }
          />
        </div>
        <div
          className="product-list"
          style={
            products.length === 0
              ? {
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '60vh',
                }
              : {}
          }
        >
          {products.length > 0 ? (
            products.map(p => (
              <div key={p._id} className="product-card">
                <div
                  className="prod-wishlist"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleWishlistToggle(p._id);
                  }}
                >
                  <i
                    className={
                      wishlist.includes(p._id)
                        ? 'fa-solid fa-heart wishlist-active'
                        : 'fa-regular fa-heart'
                    }
                  ></i>
                </div>

                <Link
                  to={`/product-view/${p._id}`}
                  className="product-link"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <img src={p.image[0]} alt={p.name} />
                  <h4>{p.brand}</h4>
                  <p>{p.name}</p>
                  <p>₹{p.price}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-prod">No products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
