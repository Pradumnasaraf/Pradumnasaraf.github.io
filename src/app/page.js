'use client';

import { useEffect } from 'react';  
import './globals.css';  
import Head from 'next/head';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'; 

export default function Home() {
  // Define the handleClick function
  const handleClickGitHub = () => {
    // Here you can define what happens when the button is clicked
    window.location.href = 'https://github.com/Pradumnasaraf';  // Example: redirect to GitHub
  };  
  const handleClickService = () => {
    // Here you can define what happens when the button is clicked
    window.location.href = './services';  // Example: redirect to GitHub
  };
  useEffect(() => {
      document.title = 'Pradumna Saraf'; // Set the document
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
      };
    }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({
                        'gtm.start': new Date().getTime(), event: 'gtm.js'
                    }); var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-WRGLMZCX');`
        }}
      />
      {/* End Google Tag Manager */}

      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Pradumna Saraf Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="style.css" />
        <link
          rel="icon"
          href="https://user-images.githubusercontent.com/51878265/194138074-7a341083-e80e-49d9-8e58-02882b26d3d9.png"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap"
        />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap" rel="stylesheet"></link>
      </Head>

      <div className="nav">
        <p>PRADUMNA SARAF</p>
        <div className="pages">
          <span className="page-item">
            <a href="/services">Services</a>
          </span>          
          <span className="page-item">
            <a href="https://pradumnasaraf.substack.com">Newsletter</a>
          </span>
          <span className="page-item">
            <a href="mailto:pradumnasaraf@gmail.com">Contact</a>
          </span>
        </div>
      </div>

      <div className="heading">
        <div className="left">
          <div className="socialmedia">
            {/* Using React Icons */}
            <a href="https://github.com/Pradumnasaraf">
              <FaGithub />
            </a>
            <a href="https://twitter.com/pradumna_saraf">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/pradumnasaraf/">
              <FaLinkedin />
            </a>
          </div>
          <h2>Hello, I'm <span className="pradumna">Pradumna Saraf</span></h2>
          <p>Developer Advocate. Docker Captain. Open Source evangelism. Owner <a href="https://github.com/rebasemedia">@ rebase media</a></p>
          <div className="ibutton">
            <button className="connect" onClick={handleClickGitHub}>Let's Collaborate</button>            
            <button className="connect" onClick={handleClickService}>My Services</button>

          </div>
        </div>
        <div className="right">
          <img src="/media/pradumna-saraf.png" alt="Pradumna Saraf - DevOps and Go Developer" />
        </div>
      </div>

      <div className="footer">
        <div className="social-handle">
          {/* Using React Icons */}
          <a href="https://github.com/Pradumnasaraf">
            <FaGithub />
          </a>
          <a href="https://twitter.com/pradumna_saraf">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/pradumnasaraf/">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </>
  );
}