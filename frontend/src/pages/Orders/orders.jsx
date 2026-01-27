import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import './orders.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/order/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, [userId]);

  const formatDeliveryDate = dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="orders">
      <Navbar />
      <div className="order-container">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map(order =>
            order.items.map((item, i) => (
              <div key={i} className="order-box">
                <div className="image-content-wrap">
                  <div className="order-image-box">
                    <img src={item.productId.image[0]} alt={item.productId.name} />
                  </div>
                  <div className="order-image-content">
                    <p>{item.productId.name}</p>
                    <p>₹ {item.priceAtOrderTime}</p>
                  </div>
                </div>
                <p>Delivery by {formatDeliveryDate(order.deliveryDate)}</p>
              </div>
            ))
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
