import { useState } from 'react';
import axios from 'axios';
import './add-product.css';
import Footer from '../../components/Footer/footer';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const userId = localStorage.getItem('userId');

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    subCategory: '',
    audience: 'All',
    userId: userId,
  });

  const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = e => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // ✅ Handle attributes
  const handleAttributeChange = (index, field, value) => {
    const newAttrs = [...attributes];
    newAttrs[index][field] = value;
    setAttributes(newAttrs);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const removeAttribute = index => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  //  Handle image selection + preview
  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Generate preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  //Remove image from preview
  const removeImage = index => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviewUrls(updatedPreviews);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
   
      const formData = new FormData();
      images.forEach(img => formData.append('images', img));

      const uploadRes = await axios.post(
        'http://localhost:8000/upload-image',
        formData
      );
      const imageUrls = uploadRes.data.urls;

      const attributesObj = {};
      attributes.forEach(attr => {
        if (attr.key && attr.value) attributesObj[attr.key] = attr.value;
      });

      const finalProduct = {
        ...productData,
        price: Number(productData.price),
        image: imageUrls,
        attributes: attributesObj,
      };

      await axios.post('http://localhost:8000/products', finalProduct);
      alert('Product added successfully!');

      setProductData({
        name: '',
        description: '',
        brand: '',
        price: '',
        category: '',
        subCategory: '',
        audience: 'All',
        userId: userId,
      });
      setAttributes([{ key: '', value: '' }]);
      setImages([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <Link to='/user-products' className='to-products'>Products</Link>
        <h1>Add Product</h1>
        <div className="add-product-sub-container">
          <form onSubmit={handleSubmit}>
            <input
              className="add-product-input-full"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleChange}
              required
            />
            <input
              className="add-product-input-full"
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleChange}
            />
            <div className="brand-price">
              <input
                className="add-product-input-half"
                name="brand"
                placeholder="Brand"
                value={productData.brand}
                onChange={handleChange}
              />
              <input
                className="add-product-input-half"
                name="price"
                type="number"
                placeholder="Price"
                value={productData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cat-subcat-product">
              <input
                className="add-product-input-half"
                name="category"
                placeholder="Category"
                value={productData.category}
                onChange={handleChange}
                required
              />
              <input
                className="add-product-input-half"
                name="subCategory"
                placeholder="Subcategory"
                value={productData.subCategory}
                onChange={handleChange}
              />
            </div>

            <select
              className="add-product-input-full "
              name="audience"
              value={productData.audience}
              onChange={handleChange}
            >
              <option>All</option>
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>

            {/* Attributes */}
            <div className="attributes-section">
              <p>Attributes</p>
              {attributes.map((attr, index) => (
                <div key={index} className="attribute-row">
                  <input
                    className="add-product-input-half"
                    type="text"
                    placeholder="Key (e.g. color)"
                    value={attr.key}
                    onChange={e =>
                      handleAttributeChange(index, 'key', e.target.value)
                    }
                  />
                  <input
                    className="add-product-input-half"
                    type="text"
                    placeholder="Value (e.g. Blue)"
                    value={attr.value}
                    onChange={e =>
                      handleAttributeChange(index, 'value', e.target.value)
                    }
                  />
                  {attributes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAttribute(index)}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-attr-btn"
                onClick={addAttribute}
              >
                Add Attribute
              </button>
            </div>

            {/*Image Upload */}
            <div className="image-upload">
              <label>Upload Images:</label>
              <input
                className="add-product-input-full"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Image Preview Section */}
            {previewUrls.length > 0 && (
              <div className="preview-gallery">
                {previewUrls.map((url, index) => (
                  <div key={index} className="preview-item">
                    <img src={url} alt="preview" />
                    <button type="button" onClick={() => removeImage(index)}>
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className="add-product-submit-btn">
              Create Product
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
