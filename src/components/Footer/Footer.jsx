import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="ft-container">
        <div className="ft-brand">
          <span className="ft-mark ft-blue" />
          <span className="ft-mark ft-red" />
          <strong>CrossFit Games — Dashboard</strong>
        </div>

        <nav className="ft-nav">
          <a href="#about">À propos</a>
          <a href="#legends">Légendes</a>
          <a href="#records">Dashboard</a>
        </nav>

        <div className="ft-copy">© 2019–2025 •</div>
      </div>
    </footer>
  );
}
