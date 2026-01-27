import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import './coupons.css';

const Coupons = () => {
  return (
    <div className="coupons">
      <Navbar />
      <h1>Coupons</h1>
      <div className="coupons-container">
        <div className="coupon-image">
          <img src="coupon-15.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW15</span>
          </p>
          <p>
            <b>Expire on:</b> 17 Nov 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-20.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW20</span>
          </p>
          <p>
            <b>Expire on:</b> 28 Nov 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-25.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW25</span>
          </p>
          <p>
            <b>Expire on:</b> 12 Dec 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-30.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW30</span>
          </p>
          <p>
            <b>Expire on:</b> 18 Dec 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-35.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW35</span>
          </p>
          <p>
            <b>Expire on:</b> 19 Dec 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-40.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW40</span>
          </p>
          <p>
            <b>Expire on:</b> 23 Dec 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-45.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW45</span>
          </p>
          <p>
            <b>Expire on:</b> 23 Dec 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-50.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW50</span>
          </p>
          <p>
            <b>Expire on:</b> 25 Dec 2025
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-55.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW55</span>
          </p>
          <p>
            <b>Expire on:</b> 3 Jan 2026
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-60.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW60</span>
          </p>
          <p>
            <b>Expire on:</b> 26 Jan 2026
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-65.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW65</span>
          </p>
          <p>
            <b>Expire on:</b> 14 Feb 2026
          </p>
        </div>
        <div className="coupon-image expired">
          <img src="coupon-70.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW70</span>
          </p>
          <p>
            <b>Expire on:</b> 20 Mar 2026
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-75.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW75</span>
          </p>
          <p>
            <b>Expire on:</b> 28 Mar 2026
          </p>
        </div>
        <div className="coupon-image">
          <img src="coupon-80.png" alt="coupon" />
          <p>
            <b>Coupon code:</b> <span>SHOPNOW80</span>
          </p>
          <p>
            <b>Expire on:</b> 12 May 2026
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Coupons;
