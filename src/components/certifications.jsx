import { useState } from 'react';
import { Icons, SmartImage, useDialog } from './ui.jsx';

const CERT_BASE = 'assets/certifications/';

const VENDOR_MARK = {
  Huawei: 'HW',
  xFusion: 'xF',
  HPE: 'HPE',
};

function CertMeta({ cert }) {
  return (
    <dl className="cert-meta">
      <div><dt>Issuer</dt><dd>{cert.issuer}</dd></div>
      {cert.dateLabel && <div><dt>Issued</dt><dd>{cert.dateLabel}</dd></div>}
      {cert.validThrough && <div><dt>Valid through</dt><dd>{cert.validThrough}</dd></div>}
      {cert.credentialId && <div><dt>Credential ID</dt><dd className="cert-meta__id">{cert.credentialId}</dd></div>}
    </dl>
  );
}

function VendorCard({ cert, onOpen }) {
  return (
    <article className="cert-vendor card reveal">
      <button type="button" className="cert-vendor__visual" onClick={() => onOpen(cert)} aria-label={`View ${cert.name} certificate`}>
        <SmartImage
          src={CERT_BASE + cert.image}
          alt={`${cert.name} certificate awarded to Kazi Atiqur Rahman`}
          ratio="4 / 3"
          label={cert.short}
        />
        <span className="cert-vendor__zoom"><Icons.external size={15} /> View certificate</span>
      </button>
      <div className="cert-vendor__body">
        <div className="cert-vendor__head">
          <span className="cert-vendor__mark">{VENDOR_MARK[cert.vendor] || cert.vendor}</span>
          <span className="chip chip--enterprise"><span className="dot" />Verified</span>
        </div>
        <h3>{cert.short}</h3>
        <p className="cert-vendor__name">{cert.name}</p>
        <CertMeta cert={cert} />
        {cert.note && <p className="cert-vendor__note">{cert.note}</p>}
      </div>
    </article>
  );
}

function QualCard({ cert, onOpen }) {
  return (
    <article className="cert-qual card reveal">
      <button type="button" className="cert-qual__thumb" onClick={() => onOpen(cert)} aria-label={`View ${cert.name} certificate`}>
        <SmartImage src={CERT_BASE + cert.image} alt={`${cert.name} certificate`} ratio="4 / 3" label={cert.short} />
      </button>
      <div className="cert-qual__body">
        <h4>{cert.short}</h4>
        <p>{cert.name}</p>
        <div className="cert-qual__foot">
          <span className="cert-qual__date">{cert.dateLabel}</span>
          {cert.credentialId && <span className="cert-qual__id">{cert.credentialId}</span>}
        </div>
      </div>
    </article>
  );
}

export default function Certifications({ data }) {
  const { certifications, inProgress } = data;
  const [active, setActive] = useState(null);
  useDialog(!!active, () => setActive(null));

  const featured = certifications.filter((c) => c.featured);
  const qualifications = certifications.filter((c) => c.vendor === 'HPE');

  return (
    <section id="certifications" className="section section--alt">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Certifications &amp; Qualifications</p>
          <h2>Verified <span className="dim">credentials</span></h2>
          <p className="lede">
            Vendor-issued certificates, each with the original document attached. Click any certificate
            to view it full size and open the source file.
          </p>
        </div>

        <div className="cert-summary reveal">
          <div className="cert-summary__item">
            <span className="cert-summary__value">{certifications.length}</span>
            <span>certificates on file</span>
          </div>
          <div className="cert-summary__item">
            <span className="cert-summary__value">3</span>
            <span>vendor programmes</span>
          </div>
          <div className="cert-summary__item">
            <span className="cert-summary__value">{qualifications.length}</span>
            <span>HPE service qualifications</span>
          </div>
          <div className="cert-summary__item">
            <span className="cert-summary__value">{inProgress.length}</span>
            <span>in progress</span>
          </div>
        </div>

        <h3 className="cert-group-title reveal">Vendor certifications</h3>
        <div className="cert-vendor-grid">
          {featured.map((c) => (
            <VendorCard key={c.id} cert={c} onOpen={setActive} />
          ))}
        </div>

        <h3 className="cert-group-title reveal">
          HPE Service &amp; Solution Qualifications
          <span className="cert-group-title__count">{qualifications.length}</span>
        </h3>
        <div className="cert-qual-grid">
          {qualifications.map((c) => (
            <QualCard key={c.id} cert={c} onOpen={setActive} />
          ))}
        </div>

        {inProgress.length > 0 && (
          <div className="cert-ongoing reveal">
            <p className="cert-ongoing__label">Currently pursuing</p>
            <ul>
              {inProgress.map((c) => (
                <li key={c.name}>
                  <span className="badge"><span className="dot" />{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {active && (
        <div className="modal is-open" role="dialog" aria-modal="true" aria-label={`${active.name} certificate`}>
          <div className="modal__scrim" onClick={() => setActive(null)} aria-hidden="true" />
          <div className="modal__panel modal__panel--cert">
            <button type="button" className="modal__close" onClick={() => setActive(null)} aria-label="Close certificate viewer">
              <Icons.close size={20} />
            </button>
            <div className="modal__scroll">
              <SmartImage
                src={CERT_BASE + active.image}
                alt={`${active.name} certificate awarded to Kazi Atiqur Rahman`}
                ratio="4 / 3"
                label={active.short}
                priority
              />
              <div className="cert-viewer">
                <div>
                  <p className="cert-viewer__eyebrow">{active.issuer} · Certificate</p>
                  <h3 className="cert-viewer__title">{active.name}</h3>
                </div>
                <CertMeta cert={active} />
                {active.note && <p className="cert-viewer__note">{active.note}</p>}
                <div className="cert-viewer__actions">
                  <a className="btn btn--primary" href={CERT_BASE + active.file} target="_blank" rel="noopener noreferrer">
                    <Icons.external size={16} />
                    Open original
                  </a>
                  <a className="btn btn--ghost" href={CERT_BASE + active.file} download>
                    <Icons.download size={16} />
                    Download
                  </a>
                  {active.verifyUrl && (
                    <a className="btn btn--ghost" href={active.verifyUrl} target="_blank" rel="noopener noreferrer">
                      <Icons.check size={16} />
                      Verify
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
