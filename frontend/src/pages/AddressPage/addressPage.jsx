import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import './addressPage.css';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [newAddressActive, setNewAddressActive] = useState(false);
  const [newAddress, setNewAddress] = useState({
    houseName: '',
    city: '',
    landmark: '',
    locality: '',
    pincode: '',
    state: '',
    number: '',
    alternateNumber: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const priceDetails = location.state || {
    itemCount: 0,
    totalAmount: 0,
    shipping: 0,
    delivery: 0,
  };

  const userId = localStorage.getItem('userId');
  const firstname = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');

  // Fetch addresses from backend
  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/user/${userId}`);
      setAddresses(data.address || []);
    } catch (err) {
      console.error(err);
      setAddresses([]);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Add a new address
  const handleAddAddress = async () => {
    try {
      await axios.post(
        `http://localhost:8000/user/${userId}/address`,
        newAddress
      );

      setNewAddress({
        houseName: '',
        city: '',
        landmark: '',
        locality: '',
        pincode: '',
        state: '',
        number: '',
        alternateNumber: '',
      });

      setNewAddressActive(false);
      fetchAddresses();
      alert('Address saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving address');
    }
  };

  // Navigate to payment page
  const handleDeliverHere = () => {
    navigate('/payment', { state: priceDetails });
  };

  return (
    <div className="address">
      <Navbar />

      <div className="address-container">
        {/* Left Side - Address List */}
        <div className="address-container-left">
          <div className="address-head">
            <p>DELIVERY ADDRESS</p>
          </div>

          {addresses.length === 0 ? (
            <p style={{ margin: '20px 0', color: '#666' }}>No address found</p>
          ) : (
            addresses.map((addr, index) => (
              <div key={index} className="addresses-wrap">
                <input
                  type="radio"
                  name="address"
                  onChange={() => {
                    setSelectedAddressIndex(index);
                    setNewAddressActive(false);
                  }}
                  checked={selectedAddressIndex === index && !newAddressActive}
                />

                <div
                  className="address-sub"
                  onClick={() => {
                    setSelectedAddressIndex(index);
                    setNewAddressActive(false);
                  }}
                >
                  <div className="sub-head">
                    <div className="name-addr-box">
                      <p>{firstname}</p>
                      <p>{lastname}</p>
                    </div>
                    <p>{addr.number}</p>
                  </div>

                  <p>
                    {addr.houseName}, {addr.locality},{' '}
                    {addr.landmark && `${addr.landmark}, `}
                    {addr.city}, {addr.state}, {addr.pincode}
                  </p>

                  {/* Deliver button */}
                  {selectedAddressIndex === index && !newAddressActive && (
                    <button onClick={handleDeliverHere}>DELIVER HERE</button>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Add New Address Section */}
          <div className="new-address">
            <div className="address-head-section">
              <p>ADD A NEW ADDRESS</p>
            </div>

            <div className="radio-address-wrap">
              <input
                type="radio"
                name="address"
                checked={newAddressActive}
                onChange={() => {
                  setSelectedAddressIndex(null);
                  setNewAddressActive(true);
                }}
              />

              <div
                className="radio-wrap-sub"
                onClick={() => {
                  setSelectedAddressIndex(null);
                  setNewAddressActive(true);
                }}
              >
                <div className="add1">
                  <input
                    type="text"
                    placeholder="House name"
                    value={newAddress.houseName}
                    onChange={e => {
                      setNewAddress({
                        ...newAddress,
                        houseName: e.target.value,
                      });
                      setSelectedAddressIndex(null);
                      setNewAddressActive(true);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Mobile number"
                    value={newAddress.number}
                    onChange={e => {
                      setNewAddress({ ...newAddress, number: e.target.value });
                      setSelectedAddressIndex(null);
                      setNewAddressActive(true);
                    }}
                  />
                </div>

                <div className="add1">
                  <input
                    type="text"
                    placeholder="Locality"
                    value={newAddress.locality}
                    onChange={e =>
                      setNewAddress({ ...newAddress, locality: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={e =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </div>

                <div className="add1">
                  <input
                    type="text"
                    placeholder="Landmark"
                    value={newAddress.landmark}
                    onChange={e =>
                      setNewAddress({ ...newAddress, landmark: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={e =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </div>

                <div className="add1">
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={e =>
                      setNewAddress({ ...newAddress, pincode: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Alternate number"
                    value={newAddress.alternateNumber}
                    onChange={e =>
                      setNewAddress({
                        ...newAddress,
                        alternateNumber: e.target.value,
                      })
                    }
                  />
                </div>

                {newAddressActive && (
                  <button onClick={handleAddAddress}>
                    SAVE AND DELIVER HERE
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Price Summary */}
        <div className="address-container-right">
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

          <div className="address-authenticity">
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

export default Address;
