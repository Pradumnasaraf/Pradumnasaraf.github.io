'use client';  // Ensure 'use client' is at the top

import { useState } from 'react';  // Import useState for managing state
import './globals.css';  // Import global styles
import Head from 'next/head';

export default function Home() {
  // Define the handleClick function
  const handleClick = () => {
    // Here you can define what happens when the button is clicked
    window.location.href = 'https://github.com/Pradumnasaraf';  // Example: redirect to GitHub
  };

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
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="description" content="Pradumna Saraf Portfolio"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="style.css"/>
        <link rel="icon"
            href="https://user-images.githubusercontent.com/51878265/194138074-7a341083-e80e-49d9-8e58-02882b26d3d9.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
            integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet"/>
        <a aria-label="Visit my Mastodon profile" rel="me" href="https://mastodon.social/@pradumnasaraf"></a>
        <title>Pradumna Saraf | Home</title> 
      </Head>

      <div className="nav">
        <p>PRADUMNA SARAF</p>
        <div className="pages">
          <span className="page-item">
            <a aria-label="Visit my Services page" href="/services">Services</a>
          </span>
          <span className="page-item">
            <a aria-label="Contact me on my email" href="mailto:pradumnasaraf@gmail.com">Contact</a>
          </span>
        </div>
      </div>

      <div className="heading">
        <div className="left">
          <div className="socialmedia">
            <a aria-label="Visit my GitHub profile" href="https://github.com/Pradumnasaraf">
              <i className="fa-brands fa-github" aria-hidden="true"></i>
            </a>
            <a aria-label="Visit my Twitter profile" href="https://twitter.com/pradumna_saraf">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a aria-label="Visit my LinkedIn profile" href="https://www.linkedin.com/in/pradumnasaraf/">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <h2>Hello, I'm <span className="pradumna">Pradumna Saraf</span></h2>
          <p>Developer Advocate. Docker Captain. Open Source evangelism</p>
          <div className="ibutton">
            <button className="connect" onClick={handleClick}>Let's Collaborate</button>
          </div>
        </div>
        <div className="right">
          <img src="/media/pradumna-saraf.png" alt="Pradumna Saraf - DevOps and Go Developer" />
        </div>
      </div>

      <div className="footer">
        <div className="social-handle">
          <a aria-label="Visit my GitHub profile" href="https://github.com/Pradumnasaraf">
            <i className="fa-brands fa-github"></i>
          </a>
          <a aria-label="Visit my Twitter profile" href="https://twitter.com/pradumnasaraf">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a aria-label="Visit my LinkedIn profile" href="https://www.linkedin.com/in/pradumnasaraf/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </>
  );
}