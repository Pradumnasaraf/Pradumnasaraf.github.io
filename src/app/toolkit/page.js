'use client';
import './style.css';
import React, { useEffect } from 'react';
import Link from "next/link";

const ToolKitPage = () => {
  useEffect(() => {
    document.title = 'Pradumna Saraf | Toolkit';
    
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500&display=swap';
    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
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
      
      <h1 className="toolkit-title">Tools & Gear I Use</h1>
      
      <div className="toolkit-container">
        <section className="toolkit-section">
          <h2>Hardware</h2>
          <div className="toolkit-grid">
            <div className="toolkit-item">
              <h3>Computer</h3>
              <p>MacBook Pro 14 - M1 Pro, 16GB RAM</p>
              <p>MacBook Pro 14 - M2 Pro, 32GB RAM</p>
            </div>
            
            <div className="toolkit-item">
              <h3>Monitor</h3>
              <p>LG UltraWide 29 inch (IPS)</p>
            </div>
            
            <div className="toolkit-item">
              <h3>Keyboard</h3>
              <p>Logitech K345</p>
            </div>
            <div className="toolkit-item">
              <h3>Mouse</h3>
              <p>Logitech M275</p>
            </div>
            <div className="toolkit-item">
              <h3>Headphones</h3>
              <p>AirPods Pro 2, AirPods 2nd Gen</p>
            </div> 
            <div className="toolkit-item">
              <h3>Mobile</h3>
              <p>iPhone 16 Pro, iPhone 6</p>
            </div>
          </div>
        </section>

        <section className="toolkit-section">
          <h2>Software</h2>
          <div className="toolkit-grid">

            <div className="toolkit-item">
              <h3>Development Tools</h3>
              <p>Docker, Lens Kubernetes IDE, Postman, TablePlus, MongoDB Compass </p>
            </div>          
            
            <div className="toolkit-item">
              <h3>CLI Tools</h3>
              <p>Homebrew, Oh My Zsh, nvm, yarn, git, act, gh, helm, jq, kind, kubectx, localtunnel, ngrok, zsh-autosuggestions, k9s, goreleaser, terraform </p> 
            </div>

            <div className="toolkit-item">
              <h3>Mac Apps (Workflow)</h3>
              <p>Raycast, Lunar, LocalSend, Grammarly Desktop, GPG Suite, PDFgear, VLC, Zoom, VNC Viewer </p>
            </div>

            <div className="toolkit-item">
              <h3>Code Editor</h3>
              <p>Visual Studio Code, Cursor</p>
            </div>
            
            <div className="toolkit-item">
              <h3>Terminal</h3>
              <p>Warp</p>
            </div>

            <div className="toolkit-item">
              <h3>AI Tools</h3>
              <p>LM Studio, ChatGPT, Ollama</p>
            </div>

            <div className="toolkit-item">
              <h3>Browser</h3>
              <p>Arc</p>
            </div>

            <div className="toolkit-item">
              <h3>Content Creation</h3>
              <p>Canva, Figma, Screen Studio, Buffer</p>
            </div>           
            
            <div className="toolkit-item">
              <h3>Productivity</h3>
              <p>Notion</p>
            </div>
            
            <div className="toolkit-item">
              <h3>Communication</h3>
              <p>Slack, Discord</p>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default ToolKitPage; 