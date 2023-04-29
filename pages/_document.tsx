import { Head, Html, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
      <Head />
      <body>
        <div className="wrapper">
          <header>
            <h3>
              <Link href="/">hangs.</Link>
            </h3>
            <nav>
              <ul>
                <li>
                  <div className="initials">EF</div>
                </li>
              </ul>
              {/* <ul>
                <li>
                  <Link href="#">Profile</Link>
                </li>
                <li>
                  <Link href="#">Notifications</Link>
                </li>
              </ul> */}
            </nav>
          </header>

          <main>
            <Main />
            <NextScript />
          </main>

          <footer className="footer">
            <p>&copy; 2023 Hangs</p>
          </footer>
        </div>
      </body>
    </Html>
  );
}
