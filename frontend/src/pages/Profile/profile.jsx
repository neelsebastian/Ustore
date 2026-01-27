import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import './profile.css';

const Profile = () => {
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editAddress, setEditAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/user/${userId}`);
      setUserData({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        email: data.email || '',
      });
      setAddresses(data.address || []);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

  const handleUserUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/user/${userId}`, userData);
      alert('Profile updated successfully!');
      fetchUserData();
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  const confirmDelete = addrId => {
    setAddressToDelete(addrId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/user/${userId}/address/${addressToDelete}`
      );
      setAddresses(prev => prev.filter(a => a._id !== addressToDelete));
      setShowModal(false);
      setAddressToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Error deleting address');
    }
  };

  const startEdit = addr => {
    setEditingAddressId(addr._id);
    // clone to avoid direct mutation
    setEditAddress({
      _id: addr._id,
      houseName: addr.houseName || '',
      number: addr.number || '',
      locality: addr.locality || '',
      city: addr.city || '',
      landmark: addr.landmark || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      alternateNumber: addr.alternateNumber || '',
    });
  };

  const cancelEdit = () => {
    setEditingAddressId(null);
    setEditAddress(null);
  };

  const handleEditFieldChange = (field, value) => {
    setEditAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const { _id, ...payload } = editAddress;
      await axios.put(
        `http://localhost:8000/user/${userId}/address/${_id}`,
        payload
      );
      alert('Address updated successfully');
      setEditingAddressId(null);
      setEditAddress(null);
      fetchUserData();
    } catch (err) {
      console.error(err);
      alert('Error updating address');
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/user/${userId}/password`, {
        oldPassword: passwords.old,
        newPassword: passwords.new,
        confirmPassword: passwords.confirm,
      });
      alert('Password updated successfully!');
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error updating password');
    }
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-main-container">
        <h1>My Profile</h1>

        {/* Edit User Details */}
        <div className="edit-details-box">
          <p>Edit Details</p>
          <div className="profile-name-block">
            <input
              type="text"
              value={userData.firstname}
              onChange={e =>
                setUserData({ ...userData, firstname: e.target.value })
              }
              placeholder="Firstname"
            />
            <input
              type="text"
              value={userData.lastname}
              onChange={e =>
                setUserData({ ...userData, lastname: e.target.value })
              }
              placeholder="Lastname"
            />
          </div>
          <input
            type="text"
            className="profile-btn2"
            value={userData.email}
            onChange={e => setUserData({ ...userData, email: e.target.value })}
            placeholder="Email"
          />
          <button className="profile-btn1" onClick={handleUserUpdate}>
            Save Details
          </button>
        </div>

        {/* Addresses */}
        <div className="profile-address-block">
          <p>Saved Addresses</p>

          {addresses.length === 0 && <p className='no-addr'>No addresses added yet.</p>}

          {addresses.map(addr => (
            <div className="profile-addresses" key={addr._id}>
              {/* Display mode */}
              {editingAddressId !== addr._id && (
                <>
                  <div className="profile-sub-head">
                    <div className="name-addr-box">
                      <p className="name">
                        {userData.firstname} {userData.lastname}
                      </p>
                      <p className="phone">{addr.number}</p>
                    </div>
                  </div>

                  <p className="full-address">
                    {addr.houseName}
                    {addr.locality ? `, ${addr.locality}` : ''}
                    {addr.landmark ? `, ${addr.landmark}` : ''}
                    {addr.city ? `, ${addr.city}` : ''}
                    {addr.state ? `, ${addr.state}` : ''}
                    {addr.pincode ? `, ${addr.pincode}` : ''}
                  </p>

                  <div className="profile-edit-btns">
                    <button
                      onClick={() => startEdit(addr)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(addr._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              {/* Edit mode */}
              {editingAddressId === addr._id && editAddress && (
                <div className="address-edit-form">
                  <div className="grid-two">
                    <input
                      type="text"
                      placeholder="House name"
                      value={editAddress.houseName}
                      onChange={e =>
                        handleEditFieldChange('houseName', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Mobile number"
                      value={editAddress.number}
                      onChange={e =>
                        handleEditFieldChange('number', e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Locality"
                      value={editAddress.locality}
                      onChange={e =>
                        handleEditFieldChange('locality', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={editAddress.city}
                      onChange={e =>
                        handleEditFieldChange('city', e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Landmark"
                      value={editAddress.landmark}
                      onChange={e =>
                        handleEditFieldChange('landmark', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={editAddress.state}
                      onChange={e =>
                        handleEditFieldChange('state', e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Pincode"
                      value={editAddress.pincode}
                      onChange={e =>
                        handleEditFieldChange('pincode', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Alternate number"
                      value={editAddress.alternateNumber}
                      onChange={e =>
                        handleEditFieldChange('alternateNumber', e.target.value)
                      }
                    />
                  </div>

                  <div className="edit-actions">
                    <button onClick={handleSaveEdit} className="save-btn">
                      Save Changes
                    </button>
                    <button onClick={cancelEdit} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <p>Are you sure you want to delete?</p>
              <div className="modal-btns">
                <button onClick={handleDelete} className="confirm-yes">
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="confirm-no"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Update */}
        <div className="profile-privacy">
          <p>Update Password</p>
          <input
            type="password"
            placeholder="Enter old password"
            className="profile-btn2"
            value={passwords.old}
            onChange={e => setPasswords({ ...passwords, old: e.target.value })}
          />
          <input
            type="password"
            placeholder="New password"
            className="profile-btn2"
            value={passwords.new}
            onChange={e => setPasswords({ ...passwords, new: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="profile-btn2"
            value={passwords.confirm}
            onChange={e =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
          <button onClick={handlePasswordUpdate} className="profile-btn1">
            Reset Password
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
