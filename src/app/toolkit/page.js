import './style.css';
import Link from 'next/link';

const ToolKitPage = () => {
  return (
    <>
      <div className="page-topbar" role="banner">
        <div className="page-topbar-inner">
          <Link href="/" className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="min-h-screen p-4 md:p-8">
        <h1 className="toolkit-title">Tools & Gear I Use</h1>

        <div className="toolkit-container">
          <section className="toolkit-section">
            <h2>Hardware</h2>
            <div className="toolkit-grid">
              <div className="toolkit-item">
                <h3>Computer</h3>
                <p>MacBook Pro 14 M1 Pro, 8C CPU 14C GPU</p>
                <p>MacBook Pro 14 M2 Pro, 10C CPU 16C GPU</p>
                <p>MacBook Pro 14 M4 Pro, 14C CPU 20C GPU</p>
                <p>MacBook Air 13 i5 (Mid 2013), 2C CPU</p>
              </div>

              <div className="toolkit-item">
                <h3>Monitor</h3>
                <p>LG UltraWide 29 inch (IPS)</p>
                <p>LG UltraWide 34 inch (IPS)</p>
              </div>

              <div className="toolkit-item">
                <h3>Keyboard</h3>
                <p>Logitech MX Keys S</p>
                <p>Logitech K345</p>
              </div>
              <div className="toolkit-item">
                <h3>Mouse</h3>
                <p>Logitech MX Master 4</p>
                <p>Logitech M331</p>
              </div>
              <div className="toolkit-item">
                <h3>Headphones</h3>
                <p>AirPods Pro 2, AirPods 2nd Gen</p>
              </div>
              <div className="toolkit-item">
                <h3>Mobile</h3>
                <p>iPhone 16 Pro, iPhone 6, Moto G(9)</p>
              </div>
            </div>
          </section>

          <section className="toolkit-section">
            <h2>Workspace, Ergonomics & Accessories</h2>
            <div className="toolkit-grid">
              <div className="toolkit-item">
                <h3>Desk</h3>
                <p>
                  ErgoYou E3 Dual Motor (3 Stage) with Table-Top Standing Desk
                </p>
              </div>
              <div className="toolkit-item">
                <h3>Chair</h3>
                <p>Featherlite Helix High Back</p>
              </div>
              <div className="toolkit-item">
                <h3>Backpack</h3>
                <p>Samsonite Open Road</p>
              </div>
            </div>
          </section>

          <section className="toolkit-section">
            <h2>Software</h2>
            <div className="toolkit-grid">
              <div className="toolkit-item">
                <h3>Development Tools</h3>
                <p>
                  Docker, Lens Kubernetes IDE, Postman, TablePlus, MongoDB
                  Compass
                </p>
              </div>

              <div className="toolkit-item">
                <h3>CLI Tools</h3>
                <p>
                  Homebrew, Oh My Zsh, nvm, yarn, git, act, gh, helm, jq, kind,
                  kubectl, localtunnel, ngrok, zsh-autosuggestions, k9s,
                  goreleaser, UV, go, terraform, tree, speedtest
                </p>
              </div>

              <div className="toolkit-item">
                <h3>Mac Apps (Workflow)</h3>
                <p>
                  Raycast, Lunar, LocalSend, Grammarly Desktop, GPG Suite,
                  PDFgear, VLC, Zoom, VNC Viewer, AnySwitch, OneMenu, Launchy,
                  Logi Options+
                </p>
              </div>

              <div className="toolkit-item">
                <h3>Code Editor</h3>
                <p>Cursor</p>
              </div>

              <div className="toolkit-item">
                <h3>Terminal</h3>
                <p>Warp</p>
              </div>

              <div className="toolkit-item">
                <h3>AI Tools</h3>
                <p>
                  Claude, ChatGPT, Perplexity, LM Studio, Claude Code, Codex,
                  OpenCode, Agent Browser
                </p>
              </div>

              <div className="toolkit-item">
                <h3>Browser</h3>
                <p>Arc, Safari</p>
              </div>

              <div className="toolkit-item">
                <h3>Content Creation</h3>
                <p>Canva, Figma, Screen Studio, Buffer</p>
              </div>

              <div className="toolkit-item">
                <h3>Productivity</h3>
                <p>Notion, Google Calendar</p>
              </div>

              <div className="toolkit-item">
                <h3>Communication and Collaboration</h3>
                <p>GitHub, Slack, Discord, Microsoft Teams</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ToolKitPage;
