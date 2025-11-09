import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h2>About Glassware Manager</h2>
        <p>
          Efficient Management of Glasswares is a project created to track, manage, and
          optimize glassware usage in labs, hotels, and restaurants. Our system reduces losses,
          provides transparency, and ensures efficiency.
        </p>
        <ul>
          <li>✔ Real-time Inventory Tracking</li>
          <li>✔ Damage & Loss Reporting</li>
          <li>✔ Usage Forecast & Reports</li>
          <li>✔ Easy-to-Use Dashboard</li>
        </ul>
      </div>
    </div>
  );
}
