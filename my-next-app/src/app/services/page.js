// src/app/services/page.tsx
import './style.css'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaDev} from "react-icons/fa"; // Add icons as needed

const ServicesPage = () => {
  return (
    <div className="main">
      {/* NAV BAR */}
      <div className="nav">
        <p>PRADUMNA SARAF</p>
        <div className="pages">
          <span className="page-item">
            <Link href="/">Home</Link>
          </span>
          <span className="page-item">
            <Link href="mailto:pradumnasaraf@gmail.com">Contact</Link>
          </span>
        </div>
      </div>

      {/* SERVICES */}
      <div className="service">
        <div className="service-title">
          <h2>Services</h2>
        </div>
        <div className="service-body">
          <div className="service-box">
            <i className="fa-solid fa-suitcase"></i>
            <h3 className="service-box-service">DevRel As A Service</h3>
            <p className="service-box-desc">
              Working as a "Freelance Developer Relations" for companies to
              help them grow their community and product.
            </p>
          </div>
          <div className="service-box">
            <i className="fa-solid fa-feather"></i>
            <h3 className="service-box-service">Blog/Article</h3>
            <p className="service-box-desc">
              Writing how-to-guides, tutorials, product reviews, and more on
              various platforms. Can be a Sponsored, Guest, Ghost, or Regular
              post.
            </p>
          </div>
          <div className="service-box">
            <i className="fa-brands fa-twitter"></i>
            <h3 className="service-box-service">Social Media</h3>
            <p className="service-box-desc">
              Talking about products and companies on social media and help
              them grow and engage them with a broader audience.
            </p>
          </div>
        </div>
        <div className="service-body">
          <div className="service-box">
            <i className="fa-solid fa-microphone"></i>
            <h3 className="service-box-service">Speaking</h3>
            <p className="service-box-desc">
              Delivering talks and workshops on various topics from technical
              talks to product specific to community building.
            </p>
          </div>
          <div className="service-box">
            <i className="fa-solid fa-terminal"></i>
            <h3 className="service-box-service">Build Products</h3>
            <p className="service-box-desc">
              Building products, tools, apps, etc for companies according to
              their needs.
            </p>
          </div>
          <div className="service-box">
            <i className="fa-solid fa-people-group"></i>
            <h3 className="service-box-service">Community</h3>
            <p className="service-box-desc">
              Building community around products and companies to scale up the
              product feedback and development.
            </p>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div className="quote">
        <div className="quote-title">
          <h2>Quotes</h2>
        </div>
        <div className="quote-body">
          <div className="quote-box">
            <i className="fa-solid fa-message"></i>
            <h3 className="quote-box-title">Social Post</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$200</p>
            <p className="quote-box-info">Per Post</p>
            <p className="quote-box-info">Twitter / LinkedIn</p>
            <p className="quote-box-info">Graphics Included</p>
            <a className="pkg-btn" href="./bundle">
              <p>Package Available</p>
            </a>
          </div>
          <div className="quote-box">
            <i className="fa-solid fa-feather"></i>
            <h3 className="quote-box-title">Blog Post</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$300</p>
            <p className="quote-box-info">Per Blog</p>
            <p className="quote-box-info">Dev.to / Hashnode</p>
            <p className="quote-box-info">Graphics Included</p>
            <a className="pkg-btn" href="./bundle">
              <p>Package Available</p>
            </a>
          </div>
          <div className="quote-box">
            <i className="fa-solid fa-headset"></i>
            <h3 className="quote-box-title">Talk / Workshop</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$1500</p>
            <p className="quote-box-info">Per Event</p>
            <p className="quote-box-info">30 Minutes</p>
            <p className="quote-box-info">Virtual / In-Person</p>
            <a className="pkg-btn" href="./bundle">
              <p>Package Available</p>
            </a>
          </div>
        </div>
      </div>

      {/* CLIENTS */}
      <div className="client">
        <div className="client-title">
          <h2>Clients</h2>
        </div>
        <div className="client-container">
          <div className="client-box">
            <img src="client-logo/flagsmith.svg" alt="Flagsmith" />
          </div>
          <div className="client-box">
            <img src="client-logo/gitpod.svg" alt="Gitpod" />
          </div>
          <div className="client-box">
            <img src="client-logo/terraform.svg" alt="Terraform" />
          </div>
          <div className="client-box">
            <img src="client-logo/cloudflare.svg" alt="Cloudflare" />
          </div>
          <div className="client-box">
            <img src="client-logo/jfrog.svg" alt="JFrog" />
          </div>
          <div className="client-box">
            <img src="client-logo/hatchways.svg" alt="Hatchways" />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="social-handle">
          <a href="https://twitter.com/pradumna_saraf">
            <FaTwitter />
          </a>
          <a href="https://github.com/Pradumnasaraf">
            <FaDev />
          </a>
          <a href="https://www.linkedin.com/in/pradumnasaraf/">
            <FaLinkedin />
          </a>
          <a href="https://pradumnasaraf.hashnode.dev">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;