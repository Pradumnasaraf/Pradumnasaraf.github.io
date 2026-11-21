import './style.css';
import PageTopbar from '@/components/PageTopbar';
import sections from './toolkit.json';

function CardSection({ section }) {
  return (
    <div className="toolkit-grid">
      {section.groups.map((group) => (
        <div key={group.name} className="toolkit-item">
          <h3>{group.name}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ListSection({ section }) {
  return (
    <dl className="toolkit-list">
      {section.groups.map((group) => (
        <div key={group.name} className="toolkit-list-row">
          <dt>{group.name}</dt>
          <dd>
            <ul className="toolkit-chips">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

const ToolKitPage = () => {
  return (
    <>
      <PageTopbar />

      <div className="toolkit-page">
        <header className="page-header">
          <h1 className="page-title">Tools & Gear I Use</h1>
          <p className="page-subtitle">
            The hardware and software I use every day to build, write and
            record.
          </p>
        </header>

        <div className="toolkit-container">
          {sections.map((section) => (
            <section
              key={section.id}
              className="toolkit-section"
              aria-labelledby={`toolkit-${section.id}`}
            >
              <h2 id={`toolkit-${section.id}`}>{section.title}</h2>
              {section.layout === 'list' ? (
                <ListSection section={section} />
              ) : (
                <CardSection section={section} />
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToolKitPage;
