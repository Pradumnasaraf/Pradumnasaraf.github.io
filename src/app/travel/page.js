import travelData from './travel.json';
import TravelGlobe from './TravelGlobe';
import PageTopbar from '@/components/PageTopbar';
import './style.css';

const TravelPage = () => {
  return (
    <>
      <PageTopbar ariaLabel="Back to home page" />

      <div className="travel-container">
        <div className="travel-header">
          <h1>Travel</h1>
        </div>

        <div className="travel-globe-section">
          <TravelGlobe />
          <p className="travel-caption">
            <span className="travel-caption-dot" aria-hidden="true" />
            Places I&apos;ve travelled. Drag to spin the globe.
          </p>
        </div>

        {/* Server-rendered, visually hidden: gives crawlers and screen readers
            the place list since the globe itself is client-only. */}
        <ul className="travel-sr-list">
          {travelData.map((p) => (
            <li key={p.id}>
              {p.place}
              {p.country ? `, ${p.country}` : ''}
              {p.date ? ` — ${p.date}` : ''}
              {p.note ? `. ${p.note}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TravelPage;
