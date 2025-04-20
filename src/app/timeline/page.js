'use client';
import './style.css';
import React, { useEffect } from 'react';
import Link from "next/link";

const TimelinePage = () => {
  useEffect(() => {
    document.title = 'Pradumna Saraf | Timeline'; // Set the document title
    
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
    <div>
      <h1 className="timeline-title">Timeline</h1>
      <div className="timeline">
        {/* Right Container */}
        <div className="container right-container">
          <img src="/timeline-logo/shareit.png" alt="ShareIt" />
          <div className="text-box">
            <Link
              href="https://drive.google.com/file/d/1zc31p85KIFo39Yr-ILD3KnBA95ITAL0Y/view?usp=drive_link"
              className="source-button"
              aria-label="ShareIt"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l10-10M17 17V7h-7"></path>
              </svg>
            </Link>
            <h2>Featured on an Article with ShareIT COO</h2>
            <small>Sep, 2018</small>
            <p>{`
              One of China's leading publishers of tech news, Tiger sniffing group wrote an article on ShareIT and I was featured in that with the COO (Json Wang) of ShareIt. The article was about how ShareIT is helping people to share files without internet. The main article was published in China in Mandarin language.`}
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div class="container left-container">
            <img src="/timeline-logo/github.png" alt="GitHub"/>
            <div class="text-box">
                <Link href="https://github.com/Pradumnasaraf" class="source-button" aria-label="open-source-contribution">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Started Open Source</h2>
                <small>July, 2021</small>
                <p>{`It all started with a website asking for a GitHub profile and I didn't know what it's all about. Then I did into it and started contributing to open source. I started with fixing typos, broken links and documentation.`}</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/eddiehub.png" alt="EddieHub"/>
            <div class="text-box">
                <Link href="https://github.com/EddieHubCommunity" class="source-button" aria-label="EddieHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Open Source Maintainer</h2>
                <small>Aug, 2021</small>
                <p> This was my first experience as a maintainer. I became a maintainer at EddieHub because I was contributing to the community projects and helping others on the GitHub Org as well as Discord.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>        
        
        <div class="container left-container">
            <img src="/timeline-logo/eddiehub.png" alt="EddieHub"/>
            <div class="text-box">
                <Link href="https://x.com/pradumna_saraf/status/1469933850566422531" class="source-button" aria-label="EddieHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Got mentioned in a Newsletter</h2>
                <small>Dec, 2021</small>
                <p>First time I got a mention in a Newsletter. It was from EddieHub. I was mentioned for congratulating me becoming a Postman Student Expert.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/opensource.png" alt="Postman"/>
            <div class="text-box">
                <Link href="https://x.com/pradumna_saraf/status/1483392694361952259" class="source-button" aria-label="open-source">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Delivered my first talk</h2>
                <small>Jan, 2022</small>
                <p> {`First time I got invite to deliver a talk. It was on open source and how to get started with it. It was virtually and the fact that I delivered the talk via my $100 phone because laptop mic and camera was broken and battery don't work. Check the link for the phone screenshot I posted on Twitter.`}</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>        
        
        <div class="container left-container">
            <img src="/timeline-logo/postman.png" alt="Postman"/>
            <div class="text-box">
                <Link href="https://blog.postman.com/highlights-of-api-fest-2022/" class="source-button" aria-label="Postman">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Won Postman Hackathon</h2>
                <small>Jan, 2022</small>
                <p> Postman Hosted a hackathon called API Fest 2022. I with a team of two, we build a fully functional API from scratch using Node.js and MongoDB. We won the hackathon and got a chance to present our project to the Postman team.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>          
        
        <div class="container right-container">
            <img src="/timeline-logo/dailydev.png" alt="Daily.dev"/>
            <div class="text-box">
                <Link href="https://github.com/dailydotdev/hackathon-participants-March-2022" class="source-button" aria-label="dailydev">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Won my first Hackathon (Solo)</h2>
                <small>March, 2022</small>
                <p> I won my first hackathon with daily.dev, which was global. I build a Discord bot that uses RSS feeds to get the bookmarked articles from daily.dev and post them to the Discord server. Also I got mentioned in the Newsletter.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>
        
        <div class="container left-container">
            <img src="/timeline-logo/twitter.png" alt="Twitter"/>
            <div class="text-box">
                <Link href="https://x.com/pradumna_saraf/status/1508363401214717953" class="source-button" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>{"\"Open Source with Pradumna\""}</h2>
                <small>April, 2022</small>
                <p>Open Source With Pradumna started as a 15-day bootcamp of Twitter post (Threads) where I was sharing my journey of open source and how to get started with it. This was a turning point for me. Fun fact: It all started from no where. I was in the bed rest as I screwed my food with a bike accident and have nothing to do. After this my social media presence grow and a lot of people started knowing me.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>        
        
        <div class="container right-container">
            <img src="/timeline-logo/twitter.png" alt="Twitter"/>
            <div class="text-box">
                <Link href="https://x.com/pradumna_saraf/status/1520025075139121152" class="source-button" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Crossed 1k Followers on Twitter (X)</h2>
                <small>April, 2022</small>
                <p> I crossed 1k followers on Twitter. I never imagined in million years that people would be interested in listening to my thoughts and journey. Crazy! because I never like social media in general.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>
        
        <div class="container left-container">
            <img src="/timeline-logo/eddiehub.png" alt="EddieHub"/>
            <div class="text-box">
                <Link href="https://x.com/eddiejaoude/status/1515295717811957761" class="source-button" aria-label="EddieHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>EddieHub Ambassador</h2>
                <small>April, 2022</small>
                <p> As I was contributing to the EddieHub community for a while and passionate about open source, I was selected as an EddieHub Ambassador. There were only 7 ambassadors at that time. I retained my position as an ambassador for next batch as well.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        <div class="container right-container">
            <img src="/timeline-logo/github.png" alt="GitHub"/>
            <div class="text-box">
                <Link href="https://github.com/Pradumnasaraf/open-source-with-pradumna" class="source-button" aria-label="open-source-with-pradumna">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>100 GitHub Stars</h2>
                <small>May, 2022</small>
                <p>open-source-with-pradumna repository reached 100 stars on GitHub. This was huge because I never expected that my repository would help people get started with open source and hit 100 stars.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>
        
        <div class="container left-container">
            <img src="/timeline-logo/postman.png" alt="Postman"/>
            <div class="text-box">
                <Link href="https://badgr.com/public/assertions/pwl4EICMTQm-YJwDCpKAGQ" class="source-button" aria-label="Postman Student Leader">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Postman Student Leader</h2>
                <small>May, 2022</small>
                <p> For spreading the voice and educating students about APIs and Postman, I was recognized as a Postman Student Leader.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/github.png" alt="GitHub"/>
            <div class="text-box">
                <Link href="https://github.com/sponsors/Pradumnasaraf" class="source-button" aria-label="GitHub Sponsors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>First GitHub Sponsor</h2>
                <small>July, 2022</small>
                <p> I got my first GitHub sponsor. This feeling was bit overwhelming because I never expected that someone would sponsor me for my work. They were super generous and sponsored me.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>       
        
        <div class="container left-container">
            <img src="/timeline-logo/dollar.png" alt="Illacloud"/>
            <div class="text-box">
                <h2>First Freelancing Gig</h2>
                <small>Oct, 2022</small>
                <p> I got my first freelancing gig from a open source cloud company. It was a Sponsored post on my Twitter account. The gig was about sharing about their open source project. This is time I realized that I can make money from my social media presence.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/twitter.png" alt="Twitter"/>
            <div class="text-box">
                <Link href="https://twitter.com/pradumna_saraf" class="source-button" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>10K Followers on Twitter</h2>
                <small>Oct, 2022</small>
                <p> I reached 10K followers on Twitter. I was regularly posting about open source and learning I was doing. It was a great milestone for me.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>
        
        <div class="container left-container">
            <img src="/timeline-logo/kubernetes.png" alt="Kubernetes"/>
            <div class="text-box">
                <Link href="https://github.com/Pradumnasaraf" class="source-button" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Kubernetes and SIGs Org Member</h2>
                <small>Dec, 2022</small>
                <p> I became a member of Kubernetes and Kubernetes SIGs GitHub Org. I was contributing to the Kubernetes Website project and helping in the area of documentation, triaging issues and PRs.</p> 
                <span class="left-container-arrow"></span>
            </div>
        </div>   
        <div class="container right-container">
            <img src="/timeline-logo/pradumnasaraf.jpg" alt="Pradumna Saraf"/>
            <div class="text-box">
                <Link href="https://github.com/Pradumnasaraf" class="source-button" aria-label="Kubernetes">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Delivered my first in-person talk</h2>
                <small>April, 2023</small>
                <p> I delivered my first in-person talk at API Days Patna at NIT Patna. It was a meet-up. I talk about how using Docker and Docker Compose we can develop and test our APIs locally. Also, this was my first time hosting an event. I co-hosted the event with another Postman Student Leader.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>
        
        <div class="container left-container">
            <img src="/timeline-logo/linkedin.png" alt="LinkedIn"/>
            <div class="text-box">
                <Link href="https://x.com/pradumna_saraf/status/1688376664445612032" class="source-button" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>10K Followers on LinkedIn</h2>
                <small>Aug, 2023</small>
                <p> I reached 10K followers on LinkedIn. Started as diversifying my social media presence and people supported here as well. The quality of engagement was much better than Twitter.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/livecycle.png" alt="Livecycle"/>
            <div class="text-box">
                <Link href="https://livecycle.io/" class="source-button" aria-label="Livecycle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Dev Advocate at Livecycle</h2>
                <small>Aug, 2023</small>
                <p> {`I joined Livecycle as a Dev Advocate. I was deeply involved in our open source offering "Preevy" and helped developers to get started with it by creating content and delivering talks.`}</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>
        
        <div class="container left-container">
            <img src="/timeline-logo/web3conf.png" alt="Web3Conf"/>
            <div class="text-box">
                <Link href="https://youtu.be/VKPV12TpTtI?si=B2fb43rpXumPo4ZL6J9J8w" class="source-button" aria-label="Web3Conf">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Delivered my first conference talk</h2>
                <small>Aug, 2023</small>
                <p> I delivered my first conference talk at Web3Conf. I talked about how how to get started with open source and how to maintain a open source software being a maintainer. Room was almost houseful and it was a unforgettable experience.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/github.png" alt="GitHub"/>
            <div class="text-box">
                <Link href="https://github.com/Pradumnasaraf" class="source-button" aria-label="GitHub Profile">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>1000 GitHub Followers</h2>
                <small>Sep, 2023</small>
                <p> I reached 1000 followers on GitHub. I was actively contributing to open source and helping others to get started with open source.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>
        
        <div class="container left-container">
            <img src="/timeline-logo/devto.png" alt="Dev.to"/>
            <div class="text-box">
                <Link href="https://dev.to/pradumnasaraf" class="source-button" aria-label="Dev.to">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Top Author and Mod 2023 at Dev.to</h2>
                <small>Dec, 2023</small>
                <p> I was recognized as the top author and moderator at Dev.to for the year 2023. I was actively writing articles and helping platform to moderate the content.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/devto.png" alt="Dev.to"/>
            <div class="text-box">
                <Link href="https://dev.to/pradumnasaraf" class="source-button" aria-label="Dev.to">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>100K Views on dev.to My Articles</h2>
                <small>Jan, 2024</small>
                <p> I never though people would be interested in reading my articles. I reached 100K views on my articles on Dev.to. Total views including other platforms are 135K. I mostly write about open source devops and everything in between. And got this many views just after writing 10-12 articles. </p>
                <span class="right-container-arrow"></span>
            </div>
        </div>        
        
        <div class="container left-container">
            <img src="/timeline-logo/devops.png" alt="DevOps"/>
            <div class="text-box">
                <Link href="https:/github.com/Pradumnasaraf/DevOps" class="source-button" aria-label="DevOps">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>DevOps repo crossed 2.5K Stars</h2>
                <small>Feb, 2024</small>
                <p> DevOps repository crossed 2.5K stars on GitHub. Every week thousands of devs are visiting site and GitHub repo to learn about DevOps and how to get started with it. The repo is used by people from companies like Google, Microsoft, Amazon and more. Even some are using it as a reference in their interviews.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>
        
        <div class="container right-container">
            <img src="/timeline-logo/devto.png" alt="Dev.to"/>
            <div class="text-box">
                <Link href="https://dev.to/pradumnasaraf" class="source-button" aria-label="Dev.to">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>10K Followers on Dev.to</h2>
                <small>March, 2024</small>
                <p> I reached 10K followers on Dev.to. I was actively writing articles and helping others to get started with open source and devops. At this time my total views were around 150K.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>         
        
        <div class="container left-container">
            <img src="/timeline-logo/pradumnasaraf.jpg" alt="Pradumna Saraf"/>
            <div class="text-box">
                <Link href="https://x.com/pradumna_saraf/status/1777279785594741098" class="source-button" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Invited as a Guest Speaker At NIT Patna</h2>
                <small>April, 2024</small>
                <p> I was invited as a guest speaker at NIT Patna to deliver a talk on open source and how to effectively maintain a open source project. This was the place where I delivered my first in-person talk last year.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div> 

        <div class="container right-container">
            <img src="/timeline-logo/docker.png" alt="Docker"/>
            <div class="text-box">
                <Link href="https://www.docker.com/captains/pradumna-v-saraf/" class="source-button" aria-label="Docker Captain">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Docker Captain</h2>
                <small>July, 2024</small>
                <p>It was a long time coming. I was recognized as a Docker Captain for my contributions to the Docker community. This is a huge achievement as a Docker finatic. I work closely with different teams at Docker to improve the product and help the community.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>  
        <div class="container left-container">
            <img src="/timeline-logo/docker.png" alt="Docker"/>
            <div class="text-box">
                <Link href="https://www.docker.com/captains/pradumna-v-saraf/" class="source-button" aria-label="Docker docs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Part of Docker Official Docs team</h2>
                <small>August, 2024</small>
                <p> I was invited to official Docker docs team as a Docker Captain. I am one of few people who are working on the official Docker docs. I am helping the team to improve the docs, adding language-specific guides, how-to guides and more.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>       
        
        <div class="container right-container">
            <img src="/timeline-logo/freecodecamp.jpg" alt="FreeCodeCamp"/>
            <div class="text-box">
                <Link href="https://www.freecodecamp.org/news/author/Pradumnasaraf" class="source-button" aria-label="FreeCodeCamp">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Published first blog on FreeCodeCamp</h2>
                <small>November, 2024</small>
                <p> Last year I get approved as a writer at FreeCodeCamp. Finally get some time to write a detailed blog apart from my regular writing on Dev.to. The blog was how Feature Flags can in be helpful in backend development like building APIs. This is longest blog I have ever written with 4k words and a whopping ~ 18 min read time.</p>
                <span class="right-container-arrow"></span>
            </div>
        </div>   
        <div class="container left-container">
            <img src="/timeline-logo/cncf.png" alt="CNCF"/>
            <div class="text-box">
                <Link href="https://x.com/pradumna_saraf/status/1871171396589772967" class="source-button" aria-label="CNCF">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17l10-10M17 17V7h-7"></path>
                    </svg>
                </Link>
                <h2>Delivered a talk at Linux Foundation event</h2>
                <small>Dec, 2024</small>
                <p> I delivered a talk at the SOSS Community Day, India (KubeCon India), hosted by the Linux Foundation/CNCF. This was the first event of its kind in India. I delivered a talk on Software Supply Chain Security and how to improve it by using Docker Scout in the CI/CD pipeline. Withough any doubt, this was the best talk I have ever delivered.</p>
                <span class="left-container-arrow"></span>
            </div>
        </div>  
      </div>
    </div>
  );
};

export default TimelinePage;