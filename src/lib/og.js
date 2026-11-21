import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = join(
  process.cwd(),
  'node_modules/@fontsource/league-spartan/files'
);

const assets = Promise.all([
  readFile(join(fontDir, 'league-spartan-latin-400-normal.woff')),
  readFile(join(fontDir, 'league-spartan-latin-500-normal.woff')),
  readFile(join(process.cwd(), 'public/media/pradumna-saraf.png')),
]);

export function monthYear(date) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return String(date || '');
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function truncate(text, max = 58) {
  const value = String(text || '').trim();
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

// Shared card for every page's Open Graph image: page title and a one-line
// summary on the left, up to three page-specific highlights on the right.
export async function renderOg({ title, subtitle, items = [] }) {
  const [regular, medium, avatar] = await assets;
  const avatarSrc = `data:image/png;base64,${avatar.toString('base64')}`;
  const list = items.slice(0, 3);
  const titleSize = title.length > 14 ? 84 : 104;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#ffffff',
        padding: '60px 72px',
        fontFamily: 'League Spartan',
        color: '#1a1a1a',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img
            src={avatarSrc}
            width={60}
            height={60}
            alt=""
            style={{ borderRadius: 30, objectFit: 'cover' }}
          />
          <span style={{ fontSize: 30, fontWeight: 500 }}>Pradumna Saraf</span>
        </div>
        <span style={{ fontSize: 26, color: '#666666' }}>
          pradumnasaraf.dev
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            maxWidth: list.length ? 560 : 1000,
          }}
        >
          <span
            style={{
              fontSize: titleSize,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span style={{ fontSize: 34, lineHeight: 1.3, color: '#666666' }}>
              {subtitle}
            </span>
          )}
        </div>

        {list.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 470,
              border: '1px solid #e6e6e6',
              borderRadius: 22,
              padding: '10px 28px',
            }}
          >
            {list.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  padding: '18px 0',
                  borderTop: index === 0 ? 'none' : '1px solid #eeeeee',
                }}
              >
                <span
                  style={{ fontSize: 27, fontWeight: 500, lineHeight: 1.2 }}
                >
                  {item.label}
                </span>
                {item.meta && (
                  <span style={{ fontSize: 21, color: '#666666' }}>
                    {item.meta}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          height: 6,
          width: 96,
          background: '#1a1a1a',
          borderRadius: 3,
        }}
      />
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: 'League Spartan', data: regular, style: 'normal', weight: 400 },
        { name: 'League Spartan', data: medium, style: 'normal', weight: 500 },
      ],
    }
  );
}
