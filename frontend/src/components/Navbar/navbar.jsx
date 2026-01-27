import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../assets/Logo.png';
import './navbar.css';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/');
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstname');
    setUserName('');
    navigate('/login');
  };

  const navigateToProducts = filters => {
    const query = new URLSearchParams(filters).toString();
    navigate(`/products?${query}`);
  };

  useEffect(() => {
    const name = localStorage.getItem('firstname');
    if (name) setUserName(name);
  }, []);

  const handleSearch = e => {
    if (
      (e.key === 'Enter' && searchQuery.trim() !== '') ||
      e.type === 'click'
    ) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="navbar">
      <div className="left-nav">
        <img onClick={onLogoClick} src={logo} />
        <div className="left-nav-center">
          <div className="dropdown-wrapper">
            <p>MEN</p>
            <div className="mega-dropdown1">
              <ul className="mega-submenu">
                <h5>Topwear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'T-Shirts',
                    })
                  }
                >
                  T-Shirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Casual Shirts',
                    })
                  }
                >
                  Casual Shirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Formal Shirts',
                    })
                  }
                >
                  Formal Shirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Sweatshirts',
                    })
                  }
                >
                  Sweatshirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Jackets',
                    })
                  }
                >
                  Jackets
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Indian & Festive wear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Kurtas & Kurta Sets',
                    })
                  }
                >
                  Kurtas & Kurta Sets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Dhotis',
                    })
                  }
                >
                  Dhotis
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'Personal care & Grooming',
                      subCategory: 'Personal care & Grooming',
                    })
                  }
                >
                  Personal care & Grooming
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'sunglasses',
                    })
                  }
                >
                  Sunglasses
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5>Bottomwear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Jeans',
                    })
                  }
                >
                  Jeans
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Casual Trousers',
                    })
                  }
                >
                  Casual Trousers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Formal Trousers',
                    })
                  }
                >
                  Formal Trousers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Shorts',
                    })
                  }
                >
                  Shorts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'clothing',
                      subCategory: 'Track Pants',
                    })
                  }
                >
                  Track Pants
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Footwear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'footwear',
                      subCategory: 'Casual Shoes',
                    })
                  }
                >
                  Casual Shoes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'footwear',
                      subCategory: 'Sports Shoes',
                    })
                  }
                >
                  Sports Shoes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'footwear',
                      subCategory: 'Formal Shoes',
                    })
                  }
                >
                  Formal Shoes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'footwear',
                      subCategory: 'Flip Flops',
                    })
                  }
                >
                  Flip Flops
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'footwear',
                      subCategory: 'Sandals',
                    })
                  }
                >
                  Sandals
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'watches',
                    })
                  }
                >
                  Watches
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5>Fashion Accessories</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      subCategory: 'Wallets',
                    })
                  }
                >
                  Wallets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      subCategory: 'Belts',
                    })
                  }
                >
                  Belts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      category: 'perfumes',
                    })
                  }
                >
                  Perfumes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      subCategory: 'Ties',
                    })
                  }
                >
                  Ties
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      subCategory: 'Caps',
                    })
                  }
                >
                  Caps
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      subCategory: 'Bags & Backpacks',
                    })
                  }
                >
                  Bags & Backpacks
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Men',
                      subCategory: 'Luggages & Trolleys',
                    })
                  }
                >
                  Luggages & Trolleys
                </h5>
              </ul>
            </div>
          </div>
          <div className="dropdown-wrapper dropdown-wrapper2">
            <p>WOMEN</p>
            <div className="mega-dropdown1">
              <ul className="mega-submenu">
                <h5>Indian & Fusion Wear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Kurtas & Kurtis',
                    })
                  }
                >
                  Kurtas & Kurtis
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Sarees',
                    })
                  }
                >
                  Sarees
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Salwars & Churidars',
                    })
                  }
                >
                  Salwars & Churidars
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Skirts & Palazzos',
                    })
                  }
                >
                  Skirts & Palazzos
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Dupattas & Shawls',
                    })
                  }
                >
                  Dupattas & Shawls
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Lehenga',
                    })
                  }
                >
                  Lehenga
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Footwear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Flats',
                    })
                  }
                >
                  Flats
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Casual Shoes',
                    })
                  }
                >
                  Casual Shoes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Heels',
                    })
                  }
                >
                  Heels
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Boots',
                    })
                  }
                >
                  Boots
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Western Wear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Dresses',
                    })
                  }
                >
                  Dresses
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Tops',
                    })
                  }
                >
                  Tops
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'T-Shirts',
                    })
                  }
                >
                  T-Shirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Jeans',
                    })
                  }
                >
                  Jeans
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Trousers',
                    })
                  }
                >
                  Trousers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Shorts & Skirts',
                    })
                  }
                >
                  Shorts & Skirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Jumpsuits',
                    })
                  }
                >
                  Jumpsuits
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Shrugs',
                    })
                  }
                >
                  Shrugs
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Jackets',
                    })
                  }
                >
                  Jackets
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Belts, Scarves & More',
                    })
                  }
                >
                  Belts, Scarves & More
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Watches',
                    })
                  }
                >
                  Watches
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5>Beauty & Personal Care</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Makeup',
                    })
                  }
                >
                  Makeup
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Skincare',
                    })
                  }
                >
                  Skincare
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Lipsticks',
                    })
                  }
                >
                  Lipsticks
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      category: 'perfumes',
                    })
                  }
                >
                  Fragrances
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Jewellery</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Fashion Jewellery',
                    })
                  }
                >
                  Fashion Jewellery
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Earrings',
                    })
                  }
                >
                  Earrings
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      category: 'sunglasses',
                    })
                  }
                >
                  Sunglasses
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Backpacks',
                    })
                  }
                >
                  Backpacks
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Handbags & Wallets',
                    })
                  }
                >
                  Handbags & Wallets
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Women',
                      subCategory: 'Luggages & Trolleys',
                    })
                  }
                >
                  Luggages & Trolleys
                </h5>
              </ul>
            </div>
          </div>
          <div className="dropdown-wrapper dropdown-wrapper3">
            <p>KIDS</p>
            <div className="mega-dropdown1">
              <ul className="mega-submenu">
                <h5>Boys Clothings</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'T-shirts',
                    })
                  }
                >
                  T-Shirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Shirts',
                    })
                  }
                >
                  Shirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Shorts',
                    })
                  }
                >
                  Shorts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Jeans',
                    })
                  }
                >
                  Jeans
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Trousers',
                    })
                  }
                >
                  Trousers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Clothing Sets',
                    })
                  }
                >
                  Clothing Sets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Track Pants',
                    })
                  }
                >
                  Track Pants
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Jackets',
                    })
                  }
                >
                  Jackets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Sweatshirts',
                    })
                  }
                >
                  Sweatshirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Party Wear',
                    })
                  }
                >
                  Party Wear
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Home & Bath',
                    })
                  }
                >
                  Home & Bath
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Personal Care',
                    })
                  }
                >
                  Personal Care
                </h5>
              </ul>
              <ul className="mega-submenu">
                <h5>Girls Clothing</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Dresses',
                    })
                  }
                >
                  Dresses
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Tops',
                    })
                  }
                >
                  Tops
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'T-shirts',
                    })
                  }
                >
                  T-Shirts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Clothing Sets',
                    })
                  }
                >
                  Clothing Sets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Lehenga',
                    })
                  }
                >
                  Lehenga
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Kurta Sets',
                    })
                  }
                >
                  Kurta Sets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Party Wear',
                    })
                  }
                >
                  Party Wear
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Skirts & Shorts',
                    })
                  }
                >
                  Skirts & Shorts
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Tights & Leggings',
                    })
                  }
                >
                  Tights & Leggings
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Jeans & Trousers',
                    })
                  }
                >
                  Jeans & Trousers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Jackets',
                    })
                  }
                >
                  Jackets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Sweatshirts',
                    })
                  }
                >
                  Sweatshirts
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Footwear</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Casual Shoes',
                    })
                  }
                >
                  Casual Shoes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Flip Flops',
                    })
                  }
                >
                  Flip Flops
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Sports Shoes',
                    })
                  }
                >
                  Sports Shoes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Flats',
                    })
                  }
                >
                  Flats
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Sandals',
                    })
                  }
                >
                  Sandals
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Heels',
                    })
                  }
                >
                  Heels
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'School Shoes',
                    })
                  }
                >
                  School Shoes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Socks',
                    })
                  }
                >
                  Socks
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Toys & Games</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Learning',
                    })
                  }
                >
                  Learning
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Development',
                    })
                  }
                >
                  Development
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Activity Toys',
                    })
                  }
                >
                  Activity Toys
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Soft Toys',
                    })
                  }
                >
                  Soft Toys
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Action Figures',
                    })
                  }
                >
                  Action Figures
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'RC Toys',
                    })
                  }
                >
                  RC Toys
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Infants</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Bodysuits',
                    })
                  }
                >
                  Bodysuits
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Rompus & Sleepsuits',
                    })
                  }
                >
                  Rompus & Sleepsuits
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Clothing Sets',
                    })
                  }
                >
                  Clothing Sets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'T-shirts & Tops',
                    })
                  }
                >
                  T-Shirts & Tops
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Bottom Wear',
                    })
                  }
                >
                  Bottom Wear
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Kids Accessories</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Bags & Backpacks',
                    })
                  }
                >
                  Bags & Backpacks
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Watches',
                    })
                  }
                >
                  Watches
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Jewellery',
                    })
                  }
                >
                  Jewellery
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Hair accessory',
                    })
                  }
                >
                  Hair accessory
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      category: 'sunglasses',
                    })
                  }
                >
                  Sunglasses
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'Kids',
                      subCategory: 'Caps',
                    })
                  }
                >
                  Caps
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown-wrapper dropdown-wrapper5">
            <p>ELECTRONICS</p>
            <div className="mega-dropdown1 mega-dropdown2">
              <ul className="mega-submenu">
                <h5>Mobiles</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'mobiles',
                      subCategory: 'Samsung',
                    })
                  }
                >
                  Samsung
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'mobiles',
                      subCategory: 'Apple',
                    })
                  }
                >
                  Apple
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'mobiles',
                      subCategory: 'Realme',
                    })
                  }
                >
                  Realme
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'mobiles',
                      subCategory: 'Oppo',
                    })
                  }
                >
                  Oppo
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'mobiles',
                      subCategory: 'Vivo',
                    })
                  }
                >
                  Vivo
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'mobiles',
                      subCategory: 'Oneplus',
                    })
                  }
                >
                  Oneplus
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'mobiles',
                      subCategory: 'Motorola',
                    })
                  }
                >
                  Motorola
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Mobile Accessories</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Mobile Cases',
                    })
                  }
                >
                  Mobile Cases
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'headphones',
                      subCategory: 'wireless headphones',
                    })
                  }
                >
                  Headphones
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Power Banks',
                    })
                  }
                >
                  Power Banks
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Screengurads',
                    })
                  }
                >
                  Screenguards
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Mobile Chargers',
                    })
                  }
                >
                  Mobile Chargers
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Smart Wearables</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Smart Watches',
                    })
                  }
                >
                  Smart Watches
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Smart Glasses',
                    })
                  }
                >
                  Smart Glasses
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Smart Bands',
                    })
                  }
                >
                  Smart Bands
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Healthcare Appliances</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'BP Monitors',
                    })
                  }
                >
                  BP Monitors
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Weighing Scale',
                    })
                  }
                >
                  Weighing Scale
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Laptops</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Gaming Laptops',
                    })
                  }
                >
                  Gaming Laptops
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Office Laptops',
                    })
                  }
                >
                  Office Laptops
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Computer Accessories</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'External Hard Disks',
                    })
                  }
                >
                  External Hard Disks
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Pendrives',
                    })
                  }
                >
                  Pendrives
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Laptop Bags',
                    })
                  }
                >
                  Laptop Bags
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Mouse',
                    })
                  }
                >
                  Mouse
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Keyboard',
                    })
                  }
                >
                  Keyboard
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Monitors',
                    })
                  }
                >
                  Monitors
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Televisions</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'televisions',
                      subCategory: 'Samsung',
                    })
                  }
                >
                  Samsung
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'televisions',
                      subCategory: 'Sony',
                    })
                  }
                >
                  Sony
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'televisions',
                      subCategory: 'Mi',
                    })
                  }
                >
                  Mi
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'televisions',
                      subCategory: 'LG',
                    })
                  }
                >
                  LG
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Speakers</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Home Theatres',
                    })
                  }
                >
                  Home Theatres
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Soundbars',
                    })
                  }
                >
                  Soundbars
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bluetooth Speakers',
                    })
                  }
                >
                  Bluetooth Speakers
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Camera</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'DSLR & Mirrorless',
                    })
                  }
                >
                  DSLR & Mirrorless
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Compact & Bridge',
                    })
                  }
                >
                  Compact & Bridge
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Lens',
                    })
                  }
                >
                  Lens
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Tripods',
                    })
                  }
                >
                  Tripods
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Washing Machines</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Fully Automatic',
                    })
                  }
                >
                  Fully Automatic
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Semi Automatic',
                    })
                  }
                >
                  Semi Automatic
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Air Conditioners</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Inverter AC',
                    })
                  }
                >
                  Inverter AC
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Split AC',
                    })
                  }
                >
                  Split AC
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Window AC',
                    })
                  }
                >
                  Window AC
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Refrigerators</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Single Door',
                    })
                  }
                >
                  Single Door
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Double Door',
                    })
                  }
                >
                  Double Door
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Triple Door',
                    })
                  }
                >
                  Triple Door
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Kitchen Appliances</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Microwave Ovens',
                    })
                  }
                >
                  Microwave Ovens
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Toasters',
                    })
                  }
                >
                  Toasters
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Juicer, Mixer & Grinder',
                    })
                  }
                >
                  Juicer, Mixer & Grinder
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Electric Kettle',
                    })
                  }
                >
                  Electric Kettle
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Induction Cooktops',
                    })
                  }
                >
                  Induction Cooktops
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Sandwich Makers',
                    })
                  }
                >
                  Sandwich Makers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Coffee Makers',
                    })
                  }
                >
                  Coffee Makers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Water Purifiers',
                    })
                  }
                >
                  Water Purifiers
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown-wrapper dropdown-wrapper4">
            <p className="home-new">
              HOME<span>New</span>
            </p>
            <div className="mega-dropdown1">
              <ul className="mega-submenu">
                <h5>Bed Linen & Furnishing</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bed Runners',
                    })
                  }
                >
                  Bed Runners
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Mattress Protectors',
                    })
                  }
                >
                  Mattress Protectors
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bedsheets',
                    })
                  }
                >
                  Bedsheets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Blankets',
                    })
                  }
                >
                  Blankets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Pillows & Pillow Covers',
                    })
                  }
                >
                  Pillows & Pillow Covers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bed Covers',
                    })
                  }
                >
                  Bed Covers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Diwan Sets',
                    })
                  }
                >
                  Diwan Sets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Chair Pads & Covers',
                    })
                  }
                >
                  Chair Pads & Covers
                </li>
                <li>
                  {' '}
                  onClick=
                  {() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Sofa Covers',
                    })
                  }
                  Sofa Covers
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Flooring</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Floor Runners ',
                    })
                  }
                >
                  Floor Runners
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Carpets',
                    })
                  }
                >
                  Carpets
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Floor Mats',
                    })
                  }
                >
                  Floor Mats
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Door Mats',
                    })
                  }
                >
                  Door Mats
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Bath</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bath Towels',
                    })
                  }
                >
                  Bath Towels
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Hand & Face Towels',
                    })
                  }
                >
                  Hand & Face Towels
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bath Rugs',
                    })
                  }
                >
                  Bath Rugs
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bath Robes',
                    })
                  }
                >
                  Bath Robes
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bathroom Accessories',
                    })
                  }
                >
                  Bathroom Accessories
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Shower Curtains',
                    })
                  }
                >
                  Shower Curtains
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Lamps & Lighting</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'lights',
                      subCategory: 'Floor Lamps',
                    })
                  }
                >
                  Floor Lamps
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      category: 'lights',
                      subCategory: 'Ceiling Lamps',
                    })
                  }
                >
                  Ceiling Lamps
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Table Lamps',
                    })
                  }
                >
                  Table Lamps
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Wall Lamps',
                    })
                  }
                >
                  Wall Lamps
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Door Lamps',
                    })
                  }
                >
                  Outdoor Lamps
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Home Decor</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Plants',
                    })
                  }
                >
                  Plants
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Aromas & Candles',
                    })
                  }
                >
                  Aromas & Candles
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Clocks',
                    })
                  }
                >
                  Clocks
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Mirrors',
                    })
                  }
                >
                  Mirrors
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Wall Decors',
                    })
                  }
                >
                  Wall Decors
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Fountains',
                    })
                  }
                >
                  Fountains
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Showpieces & Vases',
                    })
                  }
                >
                  Showpieces & Vases
                </li>
              </ul>
              <ul className="mega-submenu">
                <h5>Storage</h5>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Bins',
                    })
                  }
                >
                  Bins
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Hangers',
                    })
                  }
                >
                  Hangers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Organisers',
                    })
                  }
                >
                  Organisers
                </li>
                <li
                  onClick={() =>
                    navigateToProducts({
                      audience: 'All',
                      subCategory: 'Laundry Bags',
                    })
                  }
                >
                  Laundry Bags
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="left-nav-right">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <i class="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
        </div>
      </div>
      <div className="right-nav">
        <div className="dropdown-wrapper-right-nav">
          <div className="right-nav-profile">
            <i class="fa-solid fa-circle-user"></i>
            <p
              style={{
                color: userName ? '#ff3f63' : '#303031',
                fontWeight: userName ? 500 : 400,
              }}
            >
              {userName || 'Login'}
            </p>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div className={`right-nav-dropdown ${userName ? 'no-signup' : ''}`}>
            {!userName && (
              <div className="right-dropdown-first">
                <h5 className="new-cus">New Customer?</h5>
                <h5 className="new-cus-signup">
                  <Link to="/signup">Sign Up</Link>
                </h5>
              </div>
            )}
            <ul>
              <li className="profile-nav">
                <Link to="/profile">My Profile</Link>
              </li>
              <li className="wishlist-nav">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="wishlist-nav">
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className="wishlist-nav">
                <Link to="/coupons">Coupons</Link>
              </li>
              {userName && (
                <li className="logout" onClick={onLogout}>
                  Logout
                </li>
              )}

              {!userName && (
                <li className="login-link">
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="right-nav-cart">
          <i class="fa-solid fa-cart-shopping"></i>
          <p>
            <Link to="/add-to-cart">Cart</Link>
          </p>
        </div>
        <div className="right-nav-seller">
          <i class="fa-solid fa-store"></i>
          <p>
            <Link to="/add-product">Become a Seller</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
