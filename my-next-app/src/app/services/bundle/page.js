import './style.css';
import Link from "next/link";
import{ FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";


export default function BundlePage() {
  return (
    <div className="main">
      <div className="nav">
        <p>PRADUMNA SARAF</p>
        <div className="pages">
          <span className="page-item">
            <Link aria-label="Visit my Home page" href="/">Home</Link>
          </span>
          <span className="page-item">
            <Link aria-label="Visit my Services page" href="../services">Services</Link>
          </span>
          <span className="page-item">
            <Link aria-label="Contact me on my email" href="mailto:pradumnasaraf@gmail.com">Contact</Link>
          </span>
        </div>
      </div>

      <div className="quote">
        <div className="quote-title">
          <h2>Social Posts: Packages and Pricing</h2>
        </div>
        <div className="added-value">
          <p> (Plus Tax/Transaction fees or charges if applicable.) </p>
        </div>
        <div className="quote-body">
          <div className="quote-box">
            <FaTwitter className='icon-quote'/>
            <h3 className="quote-box-title">Single Post</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$200</p>
            <p className="quote-box-info">Twitter / LinkedIn</p>
            <p className="quote-box-info">With graphics provided</p>
            <p className="quote-box-info">Link Included</p>
            <p className="quote-box-info">Draft before posting</p>
          </div>
          <div className="quote-box">
            <FaTwitter className='icon-quote'/>
            <h3 className="quote-box-title">Reshare</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$200</p>
            <p className="quote-box-info">Twitter / LinkedIn</p>
            <p className="quote-box-info">No links</p>
          </div>
          <div className="quote-box">
            <FaTwitter className='icon-quote'/>
            <h3 className="quote-box-title">Post With A Video</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$350</p>
            <p className="quote-box-info">Twitter/LinkedIn</p>
            <p className="quote-box-info">1 Min Video</p>
            <p className="quote-box-info">Demo / Features</p>
            <p className="quote-box-info">Draft before posting</p>
          </div>
          <div className="quote-box">
            <FaTwitter className='icon-quote'/>
            <h3 className="quote-box-title">Twitter Thread</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$350</p>
            <p className="quote-box-info">3-4 Post Thread</p>
            <p className="quote-box-info">With graphics provided</p>
            <p className="quote-box-info">Link Included</p>
            <p className="quote-box-info">Draft before posting</p>
          </div>
        </div>
        <div className="btn-box">
          <Link className="get-btn" aria-label="chat about services" href="/chat">
            <p>Let's Chat</p>
          </Link>
        </div>
        <div className="quote-body">
          <div className="quote-box">
            <FaTwitter className='icon-quote'/>
            <h3 className="quote-box-title">Pack of 4</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$720</p>
            <p className="quote-box-info">Twitter / LinkedIn</p>
            <p className="quote-box-info">With graphics provided</p>
            <p className="quote-box-info">Link Included</p>
            <p className="quote-box-info">Draft before posting</p>
          </div>
          <div className="quote-box">
            <FaTwitter className='icon-quote'/>
            <h3 className="quote-box-title">Pack of 8</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$1400</p>
            <p className="quote-box-info">Twitter / LinkedIn</p>
            <p className="quote-box-info">With graphics provided</p>
            <p className="quote-box-info">Link Included</p>
            <p className="quote-box-info">Draft before posting</p>
          </div>
          <div className="quote-box">
            <FaTwitter className='icon-quote'/>
            <h3 className="quote-box-title">Pack of 12</h3>
            <p className="quote-box-at">AT</p>
            <p className="quote-box-price">$2000</p>
            <p className="quote-box-info">Twitter / LinkedIn</p>
            <p className="quote-box-info">With graphics provided</p>
            <p className="quote-box-info">Link Included</p>
            <p className="quote-box-info">Draft before posting</p>
          </div>
        </div>
      </div>

      <div className="do-dont">
        <div className="do-title">
          <h2>Conditions + Do's and Don'ts</h2>
        </div>
        <div className="do-body">
          <div className="child-box">
            <h3 id="do-head">Will do:</h3>
            <p className="pointer">◾ 100% Upfront payment</p>
            <p className="pointer">◾ Provide Analytics</p>
            <p className="pointer">◾ Approval before posting - Draft</p>
          </div>
          <div className="child-box">
            <h3 className="do-head">Won't do:</h3>
            <p className="pointer">◾ No 'salesy' and Exclusive language</p>
            <p className="pointer">◾ No defaming competitors</p>
            <p className="pointer">◾ No controversial graphics</p>
            <p className="pointer">◾ No promotion for bad product/project</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="social-handle">
          <a aria-label="Visit my Twitter profile" href="https://twitter.com/pradumna_saraf">
            <FaTwitter className='icon-footer'/>
          </a>
          <a aria-label="Visit my GitHub profile" href="https://github.com/Pradumnasaraf">
            <FaGithub className='icon-footer'/>
          </a>
          <a aria-label="Visit my LinkedIn profile" href="https://www.linkedin.com/in/pradumnasaraf/">
            <FaLinkedin className='icon-footer'/>
          </a>
        </div>
      </div>
    </div>
  );
}