import { useState } from 'react';
import { Icons, SmartImage, useDialog } from './ui.jsx';

export default function Certifications({ data }) {
  const [lightbox, setLightbox] = useState(null);
  useDialog(!!lightbox, () => setLightbox(null));
  const { certifications, assetPaths, placeholders } = data;

  const earned = certifications.filter((c) => c.status !== 'In Progress');
  const ongoing = certifications.filter((c) => c.status === 'In Progress');

  return (
    <section id="certifications" className="section section--alt">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Certifications &amp; Qualifications</p>
          <h2>Verified credentials</h2>
          <p className="lede">
            Industry certifications and OEM service qualifications earned through training and
            assessment. Only real, verifiable credentials are listed.
          </p>
        </div>

        {/* Featured: Huawei HCIA-DCS */}
        {earned
          .filter((c) => c.featured)
          .map((c) => (
            <article className="cert-featured card reveal" key={c.name}>
              <div className="cert-featured__badge">
                <Icons.award size={26} />
              </div>
              <div className="cert-featured__info">
                <span className="chip chip--enterprise"><span className="dot" />{c.issuer}</span>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                {c.year && <p className="cert-featured__year">Earned {c.year}</p>}
              </div>
              <button
                type="button"
                className="cert-featured__visual"
                onClick={() => setLightbox({ src: assetPaths.certsBase + c.image, caption: c.name })}
                aria-label={`View ${c.name} certificate`}
              >
                <SmartImage
                  src={assetPaths.certsBase + c.image}
                  alt={`${c.name} certificate`}
                  ratio="4 / 3"
                  label="Certificate image"
                  note={placeholders.certNote}
                />
              </button>
            </article>
          ))}

        {/* HPE qualifications */}
        <div className="cert-grid">
          {earned
            .filter((c) => !c.featured)
            .map((c) => (
              <article className="card cert-card reveal" key={c.name}>
                <Icons.check size={16} />
                <div>
                  <h4>{c.name}</h4>
                  <p>{c.note}</p>
                </div>
              </article>
            ))}
        </div>

        {/* In progress */}
        {ongoing.length > 0 && (
          <div className="cert-ongoing reveal">
            <p className="cert-ongoing__label">Currently pursuing</p>
            <ul>
              {ongoing.map((c) => (
                <li key={c.name}>
                  <span className="badge"><span className="dot" />{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {lightbox && (
        <div className="modal is-open" role="dialog" aria-modal="true" aria-label="Certificate viewer">
          <div className="modal__scrim" onClick={() => setLightbox(null)} aria-hidden="true" />
          <div className="modal__panel modal__panel--light">
            <button
              type="button"
              className="modal__close"
              onClick={() => setLightbox(null)}
              aria-label="Close certificate viewer"
            >
              <Icons.close size={20} />
            </button>
            <div className="modal__scroll">
              <SmartImage
                src={lightbox.src}
                alt={lightbox.caption}
                ratio="4 / 3"
                label="Certificate image"
                note={placeholders.certNote}
              />
              <p className="modal__caption">{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
