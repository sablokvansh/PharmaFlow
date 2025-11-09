import "./Home.css";
import { Link } from "react-router-dom";
import Particles from "../../components/Particles";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="homepage-container">
      {/* ✨ Bright, clear particle background */}
      <Particles />

      {/* Main Content */}
      <div className="main-content-wrapper">
        <h1 className="main-heading">INTELLIGENT GLASSWARE MANAGEMENT</h1>
        <p className="main-subtitle">
          Streamline inventory, reduce breakage, and optimize your operations.
        </p>

        {/* Feature Cards (with icons restored) */}
        <div className="feature-blocks-container">
          <div className="feature-block-col">
            <Link to="/Inventory" className="feature-block-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="feature-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16.2 7.8L7.8 16.2" />
                <path d="M12 2v20M2 12h20M7 7l10 10M7 17l10-10" />
              </svg>
              <h4 className="feature-title">Automated Inventory</h4>
              <p className="feature-description">Check all items</p>
            </Link>
          </div>

          <div className="feature-block-col">
            <Link to="/Reports" className="feature-block-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="feature-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="6" width="18" height="15" rx="2" ry="2" />
                <path d="M12 11V17M9 14h6" />
                <path d="M16 6l-2-4-2 4" />
                <path d="M8 6l2-4-2 4" />
              </svg>
              <h4 className="feature-title">Reports</h4>
              <p className="feature-description">Check reports </p>
            </Link>
          </div>

          <div className="feature-block-col">
            <Link to="/suppliers" className="feature-block-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="feature-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="14" y2="9" />
              </svg>
              <h4 className="feature-title">Suppliers</h4>
              <p className="feature-description">Check out our suppliers</p>
            </Link>
          </div>
        </div>
      </div>

   
    </div>
  );
}
