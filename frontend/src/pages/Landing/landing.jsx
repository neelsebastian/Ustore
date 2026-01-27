import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import './landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/products?audience=men&category=watches');
  };

  const handleCasualShoes = () => {
    navigate(
      '/products?audience=men&category=footwear&subCategory=Casual Shoes'
    );
  };

  const handleCasualShirts = () => {
    navigate(
      '/products?audience=men&category=clothing&subCategory=Casual Shirts'
    );
  };

  const handleHeadphones = () => {
    navigate(
      '/products?audience=All&category=headphones&subCategory=wireless headphones'
    );
  };

    const handleSunglasses = () => {
    navigate(
      '/products?category=sunglasses'
    );
  };

      const handlePerfumes = () => {
    navigate(
      '/products?category=perfumes'
    );
  };
  return (
    <div className="landing">
      <Navbar />
      <div className="landing-bg">
        <video
          src="landing-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="landing-video"
        ></video>
        <div className="landing-bg-text">
          <h1>UStore</h1>
        </div>
      </div>
      <div className="shop-by-cat">
        <h1>Shop by category</h1>
        <div className="category-container">
          <div className="category-box" onClick={handleCasualShoes}>
            <div className="cat-img">
              <img src="nike-shoes.png" />
            </div>
            <p>Casual Shoes</p>
          </div>
          <div className="category-box" onClick={handleHeadphones}>
            <div className="cat-img cat-img2">
              <img src="headphones-cat.png" />
            </div>
            <p>Headphones</p>
          </div>
          <div className="category-box" onClick={handleCasualShirts}>
            <div className="cat-img cat-img3">
              <img src="casual-cat.png" />
            </div>
            <p>Casual Shirts</p>
          </div>
          <div className="category-box" onClick={handleSunglasses}>
            <div className="cat-img cat-img4">
              <img src="sunglass-cat.png" />
            </div>
            <p>Sunglasses</p>
          </div>
          <div className="category-box" onClick={handlePerfumes}>
            <div className="cat-img cat-img5">
              <img src="perfume-cat.png" />
            </div>
            <p>Perfumes</p>
          </div>
        </div>
      </div>
      <div className="landing-section4">
        <img src="banner4.webp" />
        <button onClick={handleExplore}>Explore Now</button>
      </div>
      <div className="landing-section3">
        <div className="best-quality">
          <h3>Best quality</h3>
          <div className="best-quality-products">
            <div className="products-box">
              <div className="products-box-img">
                <img src="buds.png" />
              </div>
              <p>Wireless Buds</p>
              <p className="p-bold">Top Picks</p>
            </div>
            <div className="products-box">
              <div className="products-box-img">
                <img src="gym-bag.png" />
              </div>
              <p>Gym Bag</p>
              <p className="p-bold">New Collection</p>
            </div>
            <div className="products-box">
              <div className="products-box-img">
                <img src="mobile-cover.png" />
              </div>
              <p>Mobile Cover</p>
              <p className="p-bold">Widest Range</p>
            </div>
            <div className="products-box">
              <div className="products-box-img">
                <img src="pendrive.png" />
              </div>
              <p>Pendrives</p>
              <p className="p-bold">Top Picks</p>
            </div>
          </div>
        </div>
        <div className="best-discounts">
          <h3>Discounts for you</h3>
          <div className="best-quality-products">
            <div className="products-box">
              <div className="products-box-img">
                <img src="armsleeves.png" />
              </div>
              <p>Arm Sleeves</p>
              <p className="p-bold">Min. 50% Off</p>
            </div>
            <div className="products-box">
              <div className="products-box-img">
                <img src="trimmer.png" />
              </div>
              <p>Trimmers</p>
              <p className="p-bold">Min. 50% Off</p>
            </div>
            <div className="products-box">
              <div className="products-box-img">
                <img src="blender.png" />
              </div>
              <p>Hand Blenders</p>
              <p className="p-bold">Min. 50% Off</p>
            </div>
            <div className="products-box">
              <div className="products-box-img">
                <img src="bedsheet.png" />
              </div>
              <p>Bedsheets</p>
              <p className="p-bold">Min. 70% Off</p>
            </div>
          </div>
        </div>
        <div className="landing3-banner">
          <img src="landing-banner.png" />
          <div className="banner-content">
            <div className="banner-content1">
              <p>Shop your</p>
              <p>Fashion Needs</p>
            </div>
            <div className="banner-content2">
              <p>with latest &</p>
              <p>Trendy Choices</p>
            </div>
            <div className="banner-btn">
              <button>Shop Now</button>
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
