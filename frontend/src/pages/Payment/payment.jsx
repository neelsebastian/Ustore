import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import './payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const priceDetails = location.state || {
    itemCount: 0,
    totalAmount: 0,
    shipping: 0,
    delivery: 0,
  };

  const handlePlaceOrder = async () => {
    try {
      // Send request to place order
      await axios.post('http://localhost:8000/order/place-order', {
        userId,
      });

      // Show modal
      setShowModal(true);

      // Hide modal and navigate to orders page after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate('/orders');
      }, 2000);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Something went wrong while placing your order.');
    }
  };

  return (
    <div className="payment">
      <Navbar />
      <div className="payment-container">
        {/* LEFT SIDE - PAYMENT METHODS */}
        <div className="payment-container-left">
          <div className="payment-head">
            <p>Complete Payment</p>
          </div>

          {/* CASH ON DELIVERY */}
          <div
            className={`payment-method ${
              selectedMethod === 'cod' ? 'active-payment' : ''
            }`}
            onClick={() => setSelectedMethod('cod')}
          >
            <div className="icon-head">
              <i className="fa-solid fa-money-check-dollar"></i>
              <p>Cash on Delivery</p>
            </div>
            {selectedMethod === 'cod' && (
              <button onClick={handlePlaceOrder}>Place Order</button>
            )}
          </div>

          {/* UPI OPTION */}
          <div
            className={`payment-method ${
              selectedMethod === 'upi' ? 'active-payment' : ''
            }`}
            onClick={() => setSelectedMethod('upi')}
          >
            <div className="icon-head">
              <i className="fa-solid fa-mobile-screen-button"></i>
              <p>UPI</p>
            </div>
            <p className="pay-p">Pay using any UPI app</p>
            {selectedMethod === 'upi' && (
              <>
                <div className="upi-mod">
                  <input type="text" placeholder="Enter your UPI ID" />
                  <button className="verify-btn">Verify</button>
                </div>
                <button onClick={handlePlaceOrder}>Place Order</button>
              </>
            )}
          </div>

          {/* CARD OPTION */}
          <div
            className={`payment-method ${
              selectedMethod === 'card' ? 'active-payment' : ''
            }`}
            onClick={() => setSelectedMethod('card')}
          >
            <div className="icon-head">
              <i className="fa-solid fa-credit-card"></i>
              <p>Credit / Debit / ATM Card</p>
            </div>
            <p className="pay-p">Add and secure cards as per RBI guidelines</p>
            <p className="pay-p discount">
              Get up to 5% cashback — 2 offers available
            </p>
            {selectedMethod === 'card' && (
              <>
                <div className="card-mod">
                  <div className="card1">
                    <label>Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                  </div>
                  <div className="card2">
                    <div className="card2-valid">
                      <label>Valid Thru</label>
                      <input type="text" placeholder="MM / YY" />
                    </div>
                    <div className="card2-cvv">
                      <label>CVV</label>
                      <input type="text" placeholder="CVV" />
                    </div>
                  </div>
                </div>
                <button className="card-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </>
            )}
          </div>

          {/* OTHER OPTIONS */}
          <div className={`payment-method ${
              selectedMethod === 'net' ? 'active-payment' : ''
            }`}
            onClick={() => setSelectedMethod('net')}>
            <div className="icon-head">
              <i className="fa-solid fa-building-columns"></i>
              <p>Net Banking</p>
            </div>
            {selectedMethod === 'net' && (
              <button onClick={handlePlaceOrder}>Place Order</button>
            )}
          </div>

          <div className={`payment-method ${
              selectedMethod === 'emi' ? 'active-payment' : ''
            }`}
            onClick={() => setSelectedMethod('emi')}>
            <div className="icon-head">
              <i className="fa-solid fa-calendar-days"></i>
              <p>EMI</p>
            </div>
            {selectedMethod === 'emi' && (
              <button onClick={handlePlaceOrder}>Place Order</button>
            )}
          </div>

          <div className={`payment-method ${
              selectedMethod === 'gift' ? 'active-payment' : ''
            }`}
            onClick={() => setSelectedMethod('gift')}>
            <div className="icon-head">
              <i className="fa-solid fa-gift"></i>
              <p>Have a UStore Gift Card?</p>
            </div>
             {selectedMethod === 'gift' && (
              <button onClick={handlePlaceOrder}>Place Order</button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - PRICE DETAILS */}
        <div className="payment-container-right">
          <p className="price1">PRICE DETAILS</p>
          <div className="price-list">
            <div className="price-details">
              <p>Price ({priceDetails.itemCount} items)</p>
              <p className="pri">₹ {priceDetails.totalAmount}</p>
            </div>
            <div className="price-details">
              <p>Shipping charge</p>
              <p className="pri">₹ {priceDetails.shipping}</p>
            </div>
            <div className="price-details">
              <p>Delivery Charge</p>
              <p className="pri">₹ {priceDetails.delivery}</p>
            </div>
          </div>
          <div className="total-price">
            <p>Total Amount</p>
            <p className="price-tot">
              ₹{' '}
              {priceDetails.totalAmount +
                priceDetails.shipping +
                priceDetails.delivery}
            </p>
          </div>
          <div className="payment-authenticity">
            <i className="fa-solid fa-shield-dog"></i>
            <p>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </p>
          </div>
        </div>
      </div>

      {/* ORDER SUCCESS MODAL */}
      {showModal && (
        <div className="order-modal-backdrop">
          <div className="order-modal">
            <h2>✅ Order Placed Successfully!</h2>
            <p>Redirecting to your orders...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
