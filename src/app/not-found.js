import './not-found.css';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Page Not Found :(</h1>
            <p className="not-found-description">
                Sorry, the page you are looking for does not exist. If you think this is an error, please email me  <a href="mailto:pradumnasaraf.dev">here</a>.
            </p>
            <a href="/" className="not-found-link">
                Go Back to Home
            </a>
        </div>
    );
}