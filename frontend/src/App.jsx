import Landing from './pages/Landing/landing';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import Products from './pages/Products/products';
import ProductView from './pages/ProductView/product-view';
import AddProduct from './pages/AddProduct/add-product';
import Cart from './pages/AddToCart/cart';
import Address from './pages/AddressPage/addressPage';
import Wishlist from './pages/Wishlist/wishlist';
import Payment from './pages/Payment/payment';
import Profile from './pages/Profile/profile';
import UserProducts from './pages/UserProducts/user-products';
import Coupons from './pages/Coupons/coupons';
import Order from './pages/Orders/orders';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-view/:id" element={<ProductView />} />

        <Route element={<PrivateRoute />}>  
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-to-cart" element={<Cart />} />
          <Route path="/address-page" element={<Address />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user-products" element={<UserProducts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/orders" element={<Order />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
