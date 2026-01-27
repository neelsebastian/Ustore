import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section1">
        <div className="footer-content-box">
          <h5>ABOUT</h5>
          <div className="content-section">
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>Corporate Information</p>
          </div>
        </div>
        <div className="footer-content-box">
          <h5>GROUP COMPANIES</h5>
          <div className="content-section">
            <p>Myntra</p>
            <p>Amazon</p>
            <p>Ajio</p>
            <p>Meesho</p>
          </div>
        </div>
        <div className="footer-content-box">
          <h5>HELP</h5>
          <div className="content-section">
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
            <p>FAQ</p>
          </div>
        </div>
        <div className="footer-content-box">
          <h5>CONSUMER POLICY</h5>
          <div className="content-section">
            <p>Terms Of Use</p>
            <p>Security</p>
            <p>Privacy</p>
            <p>Sitemap</p>
            <p>Grievance Redressal</p>
            <p>EPR Compliance</p>
          </div>
        </div>
        <div className="footer-content-box mail-box">
          <div className="footer-content-box2">
            <h5>Mail Us:</h5>
            <div className="content-section">
              <p>UStore Internet Private Limited,</p>
              <p>Regent Building, Merlins,</p>
              <p>IT Park Road,</p>
              <p>NGO Quarters, Houston,</p>
              <p>Texas, 682038,</p>
              <p>USA</p>
            </div>
          </div>
          <div className="footer-content-box3">
            <h5>Social:</h5>
            <div className="social-icons">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-x-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>
        <div className="footer-content-box">
          <h5>Registered Office Address:</h5>
          <div className="content-section">
            <p>UStore Internet Private Limited,</p>
            <p>Regent Building, Merlins,</p>
            <p>IT Park Road,</p>
            <p>NGO Quarters, Houston,</p>
            <p>Texas, 682038,</p>
            <p>USA</p>
            <p>Telephone: 0484-23517800</p>
          </div>
        </div>
      </div>
      <div className="footer-section2">
        <div className="low-icons">
          <i class="fa-solid fa-store"></i>
          <p>Become a Seller</p>
        </div>
        <div className="low-icons">
          <i class="fa-solid fa-gift"></i>
          <p>Gift Cards</p>
        </div>
        <div className="low-icons">
          <i class="fa-solid fa-gift"></i>
          <p>Help Center</p>
        </div>
        <p>© 2001-2025 UStore.com</p>
        <div className="cards">
          <div className="payment-cards">
            <img src="visa.png" />
          </div>
          <div className="payment-cards">
            <img src="rupay.png" />
          </div>
          <div className="payment-cards">
            <img src="upi.png" />
          </div>
          <div className="payment-cards">
            <img src="maestro.png" />
          </div>
          <div className="payment-cards">
            <img src="gpay.png" />
          </div>
          <div className="payment-cards">
            <img src="paytm.png" />
          </div>
          <div className="payment-cards">
            <img src="master.png" />
          </div>
          <div className="payment-cards">
            <img src="american.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
