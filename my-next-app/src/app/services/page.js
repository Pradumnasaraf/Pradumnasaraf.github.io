// app/page.js
import './style.css'
import Head from 'next/head';
import { FaTwitter, FaLinkedin, FaDev, FaGithub, FaEnvelope } from 'react-icons/fa';  // Corrected icon imports
import { FaSuitcase, FaFeather, FaMicrophone, FaTerminal } from 'react-icons/fa';
import Image from 'next/image';

const ServicesPage = () => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Pradumna Saraf Services Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://user-images.githubusercontent.com/51878265/194138074-7a341083-e80e-49d9-8e58-02882b26d3d9.png"
        />
        <link rel="stylesheet" href="style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
          integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WRGLMZCX');`,
        }}
      ></script>
      {/* End Google Tag Manager */}

      <body>
        <div className="main">
          {/* NAV BAR */}
          <div className="nav">
            <p>PRADUMNA SARAF</p>
            <div className="pages">
              <span className="page-item">
                <a aria-label="Visit my Home page" href="/">
                  Home
                </a>
              </span>
              <span className="page-item">
                <a aria-label="Contact me on my email" href="mailto:pradumnasaraf@gmail.com">
                  Contact
                </a>
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
                <FaSuitcase className='icon-service' />
                <h3 className="service-box-service">DevRel As A Service</h3>
                <p className="service-box-desc">
                  Working as a "Freelance Developer Relations" for companies to help them grow their
                  community and product.
                </p>
              </div>
              <div className="service-box">
                <FaFeather className='icon-service' />
                <h3 className="service-box-service">Blog/Article</h3>
                <p className="service-box-desc">
                  Writing how-to-guides, tutorials, product reviews, and more on various platforms.
                  Can be a Sponsored, Guest, Ghost, or Regular post.
                </p>
              </div>
              <div className="service-box">
                <FaTwitter className='icon-service' />
                <h3 className="service-box-service">Social Media</h3>
                <p className="service-box-desc">
                  Talking about products and companies on social media and help them grow and engage
                  them with a broader audience.
                </p>
              </div>
            </div>
            <div className="service-body">
              <div className="service-box">
                <FaMicrophone className='icon-service' />
                <h3 className="service-box-service">Speaking</h3>
                <p className="service-box-desc">
                  Delivering talks and workshops on various topics from technical talks to product
                  specific to community building.
                </p>
              </div>
              <div className="service-box">
                <FaTerminal className='icon-service' />
                <h3 className="service-box-service">Build Products</h3>
                <p className="service-box-desc">
                  Building products, tools, apps, etc for companies according to their needs.
                </p>
              </div>
              <div className="service-box">
                <FaFeather className='icon-service' />
                <h3 className="service-box-service">Community</h3>
                <p className="service-box-desc">
                  Building community around products and companies to scale up the product feedback
                  and development.
                </p>
              </div>
            </div>
          </div>

          {/* QUOTE */}
          <div className="quote">
            <div className="quote-title">
              <h2>Quotes</h2>
            </div>
            <div className="added-value">
              <p>(Plus Tax/Transaction fees or charges if applicable.)</p>
            </div>
            <div className="quote-body">
              <div className="quote-box">
                <FaTwitter className='icon-quote' />
                <h3 className="quote-box-title">Social Post</h3>
                <p className="quote-box-at">AT</p>
                <p className="quote-box-price">$200</p>
                <p className="quote-box-info">Per Post</p>
                <p className="quote-box-info">Twitter / LinkedIn</p>
                <p className="quote-box-info">Graphics Included</p>
                <a className="pkg-btn" aria-label="Get a package" href="./services/bundle">
                  <p>Package Available</p>
                </a>
              </div>
              <div className="quote-box">
                <FaTwitter className='icon-quote' />
                <h3 className="quote-box-title">Twitter Thread</h3>
                <p className="quote-box-at">AT</p>
                <p className="quote-box-price">$350</p>
                <p className="quote-box-info">3-4 Post Thread</p>
                <p className="quote-box-info">With graphics provided</p>
                <p className="quote-box-info">Link Included</p>
                <p className="quote-box-info">Draft before posting</p>
              </div>
              <div className="quote-box">
                <FaTwitter className='icon-quote' />
                <h3 className="quote-box-title">Post With A Video</h3>
                <p className="quote-box-at">AT</p>
                <p className="quote-box-price">$350</p>
                <p className="quote-box-info">Twitter/LinkedIn</p>
                <p className="quote-box-info">1 - 2 Min Video</p>
                <p className="quote-box-info">Demo / Features</p>
                <p className="quote-box-info">Draft before posting</p>
              </div>
              <div className="quote-box">
                <FaTwitter className='icon-quote' />
                <h3 className="quote-box-title">Blog</h3>
                <p className="quote-box-at">FROM</p>
                <p className="quote-box-price">$500</p>
                <p className="quote-box-info">Hashnode / Dev.to</p>
                <p className="quote-box-info">Tutorial / Review</p>
                <p className="quote-box-info">Social Promotion Included</p>
              </div>
            </div>
            <div className="btn-box">
              <a className="get-btn" href="./services/bundle" aria-label="Get a package">
                <p>PACKAGES</p>
              </a>
              <a className="enq-btn" href="../chat" aria-label="chat about services">
                <p>Let's Chat</p>
              </a>
            </div>
          </div>

          {/* CLIENTS */}
          <div className="client">
            <div className="client-title">
              <h2>Clients</h2>
            </div>
            <div className="client-container">
              <div className="client-box">
                <Image
                  src="client-logo/flagsmith.svg"
                  alt="Flagsmith"
                  width={100}
                  height={100}
                />
              </div>
              <div className="client-box">
                <Image
                  src="client-logo/dailydev.svg"
                  alt="daily.dev"
                  width={100}
                  height={100}
                />
              </div>
              <div className="client-box">
                <Image
                  src="client-logo/hashnode.svg"
                  alt="Hashnode"
                  width={100}
                  height={100}
                />
              </div>
              <div className="client-box">
                <Image
                  src="client-logo/pieces.svg"
                  alt="Pieces"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="client-container">
              <div className="client-box">
                <Image
                  src="client-logo/daytona.svg"
                  alt="Daytona"
                  width={100}
                  height={100}
                />
              </div>
              <div className="client-box">
                <Image
                  src="client-logo/codiumai.svg"
                  alt="Codium"
                  width={100}
                  height={50}
                />
              </div>
              <div className="client-box">
                <Image
                  src="client-logo/brightdata.svg"
                  alt="Bright Data"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="stats">
            <div className="stats-title">
              <h2>Stats</h2>
            </div>
            <div className="social">
              <div className="social-box">
                <a href="https://twitter.com/pradumna_saraf" aria-label="Visit my Twitter profile">
                  <FaTwitter className='icon-stats' />
                </a>
                <h3 className="social-box-social">X (Twitter)</h3>
                <p className="social-box-followers">36K+ Followers</p>
                <p className="social-box-growth">1k+ new monthly followers</p>
              </div>
              <div className="social-box">
                <a href="http://linkedin.com/in/pradumnasaraf" aria-label="Visit my LinkedIn profile">
                  <FaLinkedin className='icon-stats' />
                </a>
                <h3 className="social-box-social">LinkedIn</h3>
                <p className="social-box-followers">13K+ Followers</p>
                <p className="social-box-growth">2k+ new monthly followers</p>
              </div>
              <div className="social-box">
                <a href="https://dev.to/pradumnasaraf" aria-label="Visit my Dev.to profile">
                  <FaDev className='icon-stats' />
                </a>
                <h3 className="social-box-social">Dev.to</h3>
                <p className="social-box-followers">13K+ Followers</p>
                <p className="social-box-growth">155k+ Views</p>
              </div>
              <div className="social-box">
                <a href="https://blog.pradumnasaraf.dev" aria-label="Visit my Blog">
                  <FaTwitter className='icon-stats' />
                </a>
                <h3 className="social-box-social">Hashnode</h3>
                <p className="social-box-followers">500+ Followers</p>
                <p className="social-box-growth">40k+ Views</p>
              </div>
              <div className="social-box">
                <a href="https://newsletter.pradumnasaraf.dev" aria-label="Visit my Newsletter">
                  <FaEnvelope className='icon-stats' />
                </a>
                <h3 className="social-box-social">Newsletter</h3>
                <p className="social-box-followers">150+ Subscribers</p>
                <p className="social-box-growth">25% new monthly subscribers</p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="footer">
            <div className="social-handle">
              <a aria-label="Visit my Twitter profile" href="https://twitter.com/pradumna_saraf">
                <FaTwitter className='icon-footer' />
              </a>
              <a aria-label="Visit my GitHub profile" href="https://github.com/Pradumnasaraf">
                <FaGithub className='icon-footer' />
              </a>
              <a aria-label="Visit my LinkedIn profile" href="https://www.linkedin.com/in/pradumnasaraf/">
                <FaLinkedin className='icon-footer' />
              </a>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default ServicesPage;