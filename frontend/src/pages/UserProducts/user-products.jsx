import Navbar from '../../components/Navbar/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './user-products.css';

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const userId = localStorage.getItem('userId');

  // Fetch user’s products on load
  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/products/user/${userId}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching user products:', err);
      }
    };
    fetchUserProducts();
  }, [userId]);

  // Open delete confirmation modal
  const confirmDelete = id => {
    setDeleteConfirm(id);
    document.body.style.overflow = 'hidden';
  };

  // Close delete modal
  const cancelDelete = () => {
    setDeleteConfirm(null);
    document.body.style.overflow = 'auto';
  };

  // Remove product
  const removeFromUserProducts = async id => {
    try {
      await axios.delete(`http://localhost:8000/products/${id}`);
      setProducts(products.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // Open modal for editing
  const openEditModal = product => {
    setEditingProduct(product);
    setEditedData(product);
    setNewImages([]);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setEditingProduct(null);
    document.body.style.overflow = 'auto';
  };

  // Handle input change
  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Handle attributes change
  const handleAttributeChange = (key, value) => {
    setEditedData({
      ...editedData,
      attributes: { ...editedData.attributes, [key]: value },
    });
  };

  // Handle new image upload
  const handleImageChange = e => {
    setNewImages(Array.from(e.target.files));
  };

  // Submit edited product (with images)
  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();

      Object.keys(editedData).forEach(key => {
        if (key === 'attributes') {
          for (const attrKey in editedData.attributes) {
            formData.append(
              `attributes[${attrKey}]`,
              editedData.attributes[attrKey]
            );
          }
        } else {
          formData.append(key, editedData[key]);
        }
      });

      if (newImages.length > 0) {
        newImages.forEach(img => formData.append('images', img));
      }

      const res = await axios.put(
        `http://localhost:8000/products/${editingProduct._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setProducts(
        products.map(p => (p._id === editingProduct._id ? res.data : p))
      );

      closeModal();
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <div className="userproducts">
      <Navbar />
      <div className="userproducts-container">
        {products.length === 0 ? (
          <p className="no-userproducts">Oops! Your product list is empty.</p>
        ) : (
          products.map(item => (
            <div className="userproducts-product-card" key={item._id}>
              <div className="userproducts-image">
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => confirmDelete(item._id)}
                ></i>
                <img src={item.image[0]} alt={item.name} />
              </div>
              <div className="userproducts-content">
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <button onClick={() => openEditModal(item)}>
                  EDIT PRODUCT
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/*  Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="delete-modal-backdrop">
          <div className="delete-modal">
            <h3>Are you sure you want to delete?</h3>
            <div className="delete-modal-buttons">
              <button
                className="yes-btn"
                onClick={() => removeFromUserProducts(deleteConfirm)}
              >
                Yes
              </button>
              <button className="no-btn" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal full-edit">
            <h2>Edit Product</h2>

            <input
              type="text"
              name="name"
              value={editedData.name || ''}
              onChange={handleEditChange}
              placeholder="Product Name"
            />

            <input
              type="number"
              name="price"
              value={editedData.price || ''}
              onChange={handleEditChange}
              placeholder="Price"
            />

            <input
              type="text"
              name="brand"
              value={editedData.brand || ''}
              onChange={handleEditChange}
              placeholder="Brand"
            />

            <textarea
              name="description"
              value={editedData.description || ''}
              onChange={handleEditChange}
              placeholder="Description"
            ></textarea>

            <input
              type="text"
              name="category"
              value={editedData.category || ''}
              onChange={handleEditChange}
              placeholder="Category"
            />

            <input
              type="text"
              name="subCategory"
              value={editedData.subCategory || ''}
              onChange={handleEditChange}
              placeholder="Sub Category"
            />

            <select
              name="audience"
              value={editedData.audience || ''}
              onChange={handleEditChange}
            >
              <option value="">Select Audience</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="All">All</option>
            </select>

            {/* Attributes (example: color, size) */}
            <div className="attributes-section">
              <h4>Attributes</h4>
              <input
                type="text"
                placeholder="Color"
                value={editedData.attributes?.color || ''}
                onChange={e => handleAttributeChange('color', e.target.value)}
              />
              <input
                type="text"
                placeholder="Size"
                value={editedData.attributes?.size || ''}
                onChange={e => handleAttributeChange('size', e.target.value)}
              />
            </div>

            {/* Existing images */}
            <div className="image-preview-section">
              <h4>Current Images</h4>
              <div className="preview-images">
                {editedData.image?.map((img, idx) => (
                  <img key={idx} src={img} alt="preview" />
                ))}
              </div>
            </div>

            {/* Upload new images */}
            <label className="upload-new">
              Replace Images (max 5)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>

            <div className="modal-buttons">
              <button className="save-btn" onClick={handleEditSubmit}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProducts;
