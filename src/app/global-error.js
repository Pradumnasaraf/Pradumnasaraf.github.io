'use client';

// Top-level boundary: replaces the whole document if the root layout itself
// throws (error.js only covers errors below the layout). Ships its own
// <html>/<body> and self-contained inline styles since globals.css won't load.
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '1.5rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#ffffff',
          color: '#1a1a1a',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 500 }}>
          Something went wrong
        </h1>
        <p style={{ margin: 0, maxWidth: '28rem', color: '#666666' }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: '10px 24px',
            border: '1px solid #1a1a1a',
            borderRadius: '8px',
            background: '#ffffff',
            color: '#1a1a1a',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
