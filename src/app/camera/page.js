'use client';
import MasonryGrid from './components/MasonryGrid';
import { useEffect } from 'react';

const images = [
  { src: 'https://drive.google.com/thumbnail?id=1uu0wWGmbHC0VY7BT-n5DUpWz86_ozANg&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1G8IYlbeJUKvghC8FIlEmtyVo6fg_YxqZ&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1Ei5tA5Yyr_a3MowFocGEjI18MXW9HNB9&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1oJ7Mwt8_3l4x0lHlGjhBBzGIJGtMw-mb&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1MHCmoSxTZzn12CF0049i6aGCGHBymgNi&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1TkFT7Ltq-2WBiad2rSWf6HCzR4TlJHct&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ZANWi4xPKnBl33ZzKNQ33Wut3Q_PvhzZ&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1_MfsKjvfoXEfnHShs9xfGCZBblqx6-Ys&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1W3O99xQPuWHqsoXgJIEhqlezGM9fKBS7&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1uDQWBVkYMfIM1zkqLEgfVp0LybMHbrON&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=10y1eKKToLn6r5YoTuAmygY2trfGSpnCG&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1Je8FZim_4Yv4HpbHXo4QfeVJwAdXtRCT&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1aSjqoUAatD6z2Y2aqDjGzIY-cgw0M4yS&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1PpJmIfi7jOYkS3c1zIFcH4PhoGM3byY0&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1FvJkbkKc9pGBQUsbL6xVe2zNpvhW17wP&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=13eCs2HwT_tE6OeEpyQIWejqj33DTiJji&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1BkYTYmkOloOoRVSb-bJ_8QhpVLjXmoFC&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1JWOvh9KtvBnHAw82hyRZo6Phf9ea1FQP&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1MeFiCdT438uGjRJuApQ-jXhcuXUY9OM9&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1m03fXOLcWTsFrWzKoXqB9vV2fl0ByijA&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1UzdC2ZNdDrkUo3aOG5tYW7j-28uHpZNV&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1nZOT0l-clGWfkdThQtJW3A_cz18pSNpB&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=18Koqchl7s-weaiq5LYN5B9J48Tcva47d&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1kqL8Ns3FQAHwb2YOz_iYtUS6N__T6smr&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1G_wdf3-Qon9B-aAQfzu2rTYBylLhl6AL&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=15FLX2bCpBOL13gdoVvId7m0fCi83qcrE&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1wG3VNkz8Skx_pNULWeCHllpLujLaSnd5&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1S77toNTIBy9pkJnHq9rgdxP2_a119MHk&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1XVTlPdldc5eN7e40qCh4PbaapLZ6mfk3&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1-5Zv3b-9yZkq9lU5E4Ls3eZqJqO7bPAv&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1-_sVLUuvlL6omwexd1yBpwUKHe32RwI-&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ZypyRj1j-GjwddXWAaAKt5oCM4zSU9Pc&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ISysXMTEBkqwt3-wCN0jFRNATZTWKi26&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1bifEZJm_rIx_Xs4pORmfXCCIVFuMH_DY&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=11VG8uzX2vUMSRtEnHsDxDMT3fcletqsY&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1JANNc-kNawn7jUGRs4MUZc9ib0wQ8JBP&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1YbOEXGJfIOXvRW6akB1HVmaIOOF2Jk1h&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1b3CqP5Hn0xI2m6d2jH9_uWrfn3z8rkI0&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ko_WLnJ2SNNEO13WkKmRhpvobDQ6Q_Ko&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1ruE0RqOwTPK0AR17ap4hwfGDgWboP52p&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1O83nNCKCUZ4McHO1nlZXvo1OKqzLldyw&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1MxtU3yWE8BkSi-1gessGGaTKGKzO8SO6&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1FEQMnHybHi1TDvCHweOsB7ODeC06VjIs&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1nTQlYnaHPsy-kCrlV1bJocKgwlvqmyQc&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1K_Iteo-Rqrxi0ayMMAjOgsBSocg81Wmx&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=16ujZfroa5zjL09-UJWPyeRK0NUu1VkBi&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1P60hz5FIkEhoyxEJOtHCVprzm8sP4tt-&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1-umcEA-0sefXkCVXtpEFxvVAWqtnw2y1&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1sVamXny-K2Tfb_m_PGxQEdTiV99_r8q8&sz=w2000', alt: 'photo' },
  { src: 'https://drive.google.com/thumbnail?id=1dD4-Qrc2Hk4dCFQKcBB4GRbsvrcJOt0Q&sz=w2000', alt: 'photo' },
]

export default function Home() {
  useEffect(() => {
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
    <div className="px-24 py-8 mx-auto max-w-6xl">
      <div className="p-4">
        <MasonryGrid images={images} />
      </div>
    </div>
  );
}