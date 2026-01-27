import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import './product-view.css';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  //Add to Cart
  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please login first');
        return navigate('/login');
      }

      await axios.post('http://localhost:8000/add-to-cart', {
        userId,
        productId: product._id,
        quantity: 1,
        size: 'M',
      });      

      alert('Product added to cart!');
      navigate('/add-to-cart');
    } catch (err) {
      console.error(err);
      alert('Error adding product to cart');
    }
  };

  // BUY NOW FUNCTION
  const handleBuyNow = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please login first');
        return navigate('/login');
      }

      await axios.post('http://localhost:8000/add-to-cart', {
        userId,
        productId: product._id,
        quantity: 1,
        size: 'M',
      });

      //updated cart details
      const { data: updatedCart } = await axios.get(
        `http://localhost:8000/add-to-cart/${userId}`
      );

      // extra charges
      const shipping = 50;
      const delivery = 40;

      // Go to Address Page with updated totals
      navigate('/address-page', {
        state: {
          itemCount: updatedCart.items.length,
          totalAmount: updatedCart.totalAmount,
          shipping,
          delivery,
        },
      });
    } catch (err) {
      console.error(err);
      alert('Error processing Buy Now');
    }
  };

  //Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/products/${id}`
        );
        setProduct(data);
        setSelectedImage(data.image?.[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="product-view">
        <Navbar />
        <p style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="product-view">
      <Navbar />
      <div className="product-view-container">
        <div className="product-view-container-left">
          <div className="container-left-box1">
            <div className="preview-box">
              {product.image?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name}-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={selectedImage === img ? 'active-preview' : ''}
                />
              ))}
            </div>

            {/* Main Image  */}
            <div className="product-image">
              <img src={selectedImage} alt={product.name} />
            </div>
          </div>

          {/* Buttons */}
          <div className="container-left-box2">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="product-view-container-right">
          <p>
            <strong>{product.brand}</strong>
          </p>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p className="price">₹{product.price}</p>
          
          <div className="size-box">
            <p>Size</p>
            <div className="size-box-small">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className={
                    product.attributes?.size?.includes(size)
                      ? 'size-btn active-size'
                      : 'size-btn blur-size'
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Coupons */}
          <div className="coupon-box">
            <p className="coupon1">Coupons for you</p>
            <div className="coupon-box-sub">
              <i className="fa-solid fa-ticket-simple"></i>
              <p>Combo offer Buy 2 or more items save 10%</p>
            </div>
          </div>

          {/* Bank Offers */}
          <div className="bank-offers-box">
            <p className="bank-offer-head">Available offers</p>
            <div className="bank-offer-box-sub">
              <i className="fa-solid fa-money-check-dollar"></i>
              <p>Bank Offer Extra 5% off on Prepaid payment T&C</p>
            </div>
            <div className="bank-offer-box-sub">
              <i className="fa-solid fa-money-check-dollar"></i>
              <p>Bank Offer 5% cashback on Axis Bank UStore Debit Card up to ₹750 T&C</p>
            </div>
            <div className="bank-offer-box-sub">
              <i className="fa-solid fa-money-check-dollar"></i>
              <p>Bank Offer 5% cashback on UStore SBI Credit Card upto ₹4,000 per calendar quarter T&C</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductView;
