'use client';
import './style.css';
import React, { useEffect } from 'react';
import Link from "next/link";

const UsesPage = () => {
  useEffect(() => {
    document.title = 'Pradumna Saraf | Uses'; // Set the document title
    
    // Add League Spartan font
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500&display=swap';
    document.head.appendChild(linkElement);

    // Google Tag Manager Script
    const scriptGTM = document.createElement('script');
    scriptGTM.innerHTML = `
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js',
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-WRGLMZCX');
    `;
    document.head.appendChild(scriptGTM);

    return () => {
      document.head.removeChild(scriptGTM);
      document.head.removeChild(linkElement);
    };
  }, []);

  return (
    <div className="uses-container">
      <Link href="/" className="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </Link>
      
      <h1 className="uses-title">What I Use</h1>
      
      <section className="uses-section">
        <h2>Hardware</h2>
        <div className="uses-grid">
          <div className="uses-item">
            <h3>Computer</h3>
            <p>MacBook Pro 14" (2021)</p>
            <p>M1 Pro, 16GB RAM, 512GB SSD</p>
          </div>
          
          <div className="uses-item">
            <h3>Monitor</h3>
            <p>Dell U2720Q</p>
            <p>27" 4K UHD Display</p>
          </div>
          
          <div className="uses-item">
            <h3>Keyboard</h3>
            <p>Keychron K2</p>
            <p>Mechanical Keyboard with Brown Switches</p>
          </div>
          
          <div className="uses-item">
            <h3>Mouse</h3>
            <p>Logitech MX Master 3</p>
            <p>Wireless Mouse</p>
          </div>
          
          <div className="uses-item">
            <h3>Headphones</h3>
            <p>AirPods Pro</p>
            <p>Wireless Earbuds</p>
          </div>
        </div>
      </section>

      <section className="uses-section">
        <h2>Software</h2>
        <div className="uses-grid">
          <div className="uses-item">
            <h3>Code Editor</h3>
            <p>Visual Studio Code</p>
            <p>With extensions: GitLens, Docker, Kubernetes</p>
          </div>
          
          <div className="uses-item">
            <h3>Terminal</h3>
            <p>iTerm2</p>
            <p>With Oh My Zsh and Powerlevel10k theme</p>
          </div>
          
          <div className="uses-item">
            <h3>Browser</h3>
            <p>Google Chrome</p>
            <p>With extensions: uBlock Origin, Dark Reader</p>
          </div>
          
          <div className="uses-item">
            <h3>Design</h3>
            <p>Figma</p>
            <p>For UI/UX design and prototyping</p>
          </div>
          
          <div className="uses-item">
            <h3>Communication</h3>
            <p>Slack, Discord</p>
            <p>For team communication and community</p>
          </div>
          
          <div className="uses-item">
            <h3>Development Tools</h3>
            <p>Docker, Kubernetes</p>
            <p>For containerization and orchestration</p>
          </div>
          
          <div className="uses-item">
            <h3>Version Control</h3>
            <p>Git, GitHub</p>
            <p>For code versioning and collaboration</p>
          </div>
          
          <div className="uses-item">
            <h3>API Testing</h3>
            <p>Postman</p>
            <p>For API development and testing</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsesPage; 