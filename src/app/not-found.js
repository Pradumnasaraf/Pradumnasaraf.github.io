'use client';
import './not-found.css';
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Page Not Found :(</h1>
            <p className="not-found-description">
                Sorry, the page you are looking for does not exist. If you think this is an error, please email me  <Link href="mailto:pradumnasaraf.dev">here</Link>.
            </p>
            <Link href="/" className="not-found-link">
                Go Back to Home
            </Link>
        </div>
    );
}
