// src/app/layout.js
import './globals.css'; // Tailwind and global styles

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">My Next.js App</h1>
        </header>
        <main>{children}</main>
        <footer className="bg-blue-600 text-white p-4 text-center mt-4">
          <p>&copy; 2025 My Next.js App</p>
        </footer>
      </body>
    </html>
  );
}