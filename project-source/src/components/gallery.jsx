import { useState } from 'react';
import { Icons, SmartImage, useDialog } from './ui.jsx';

export default function Gallery({ data }) {
  const { gallery, assetPaths } = data;
  const hasAlbums = gallery.albums && gallery.albums.length > 0;
  const [lightbox, setLightbox] = useState(null);
  useDialog(!!lightbox, () => setLightbox(null));

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Beyond Engineering</p>
          <h2>Academic &amp; professional journey</h2>
          <p className="lede">{gallery.intro}</p>
        </div>

        {hasAlbums ? (
          <div className="gallery-grid">
            {gallery.albums.map((album) => (
              <article className="gallery-album card reveal" key={album.id}>
                <div className="gallery-album__photos">
                  {album.photos.map((photo, idx) => {
                    const src = assetPaths.galleryBase + album.folder + '/' + photo.file;
                    return (
                      <button
                        type="button"
                        className={`gallery-photo ${idx === 0 ? 'gallery-photo--cover' : ''}`}
                        key={photo.file}
                        onClick={() => setLightbox({ src, caption: photo.caption || album.title, meta: `${album.title}${album.date ? ' · ' + album.date : ''}` })}
                        aria-label={`Open photo: ${photo.caption || album.title}`}
                      >
                        <SmartImage
                          src={src}
                          alt={photo.caption || `${album.title} photograph`}
                          ratio={idx === 0 ? '16 / 9' : '4 / 3'}
                          label="Photo"
                        />
                        {photo.caption && <span className="gallery-photo__caption">{photo.caption}</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="gallery-album__meta">
                  <h3>{album.title}</h3>
                  <p className="gallery-album__date">{album.date}</p>
                  <p>{album.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-note reveal">
            <Icons.camera size={20} />
            <div>
              <strong>Photographs from the journey are on their way.</strong> Thesis project teams,
              university life, workshops, technical events and team collaborations will be collected
              here as a visual record of the engineering path.
              <div className="gallery-plan">
                <span className="badge">Thesis team</span>
                <span className="badge">University life</span>
                <span className="badge">Workshops</span>
                <span className="badge">Tech events</span>
                <span className="badge">Team collaboration</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {lightbox && (
        <div className="modal is-open" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <div className="modal__scrim" onClick={() => setLightbox(null)} aria-hidden="true" />
          <div className="modal__panel modal__panel--light">
            <button
              type="button"
              className="modal__close"
              onClick={() => setLightbox(null)}
              aria-label="Close photo viewer"
            >
              <Icons.close size={20} />
            </button>
            <div className="modal__scroll">
              <SmartImage src={lightbox.src} alt={lightbox.caption} ratio="16 / 10" label="Photo" />
              <p className="modal__caption">{lightbox.caption}</p>
              <p className="modal__caption modal__caption--meta">{lightbox.meta}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
