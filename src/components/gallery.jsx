import { useEffect, useMemo, useState } from 'react';
import { Icons, useDialog } from './ui.jsx';

/* ---------------------------------------------------------------------------
   Auto-discovering photo gallery.

   Add photos by dropping files into:
       src/assets/gallery/<album-folder>/

   Any new folder becomes a new album automatically. Supported:
   .jpg .jpeg .png .webp .avif

   Optional overrides live in src/data/portfolio.js → gallery.albums (titles,
   descriptions, dates) and gallery.captions ({ 'thesis/01.jpg': 'Caption' }).
   --------------------------------------------------------------------------- */

const IMAGE_MODULES = import.meta.glob('../assets/gallery/*/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function titleFromName(name) {
  return name
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_.\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildAlbums(defs = [], captions = {}) {
  const groups = new Map();

  for (const [path, url] of Object.entries(IMAGE_MODULES)) {
    const parts = path.split('/');
    const file = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    if (!groups.has(folder)) groups.set(folder, []);
    groups.get(folder).push({
      file,
      url,
      caption: captions[`${folder}/${file}`] || titleFromName(file),
    });
  }

  const albums = [];

  // Declared albums first, in the order they appear in the data file.
  for (const def of defs) {
    const photos = groups.get(def.id);
    if (photos && photos.length) {
      albums.push({
        ...def,
        photos: photos.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true })),
      });
      groups.delete(def.id);
    }
  }

  // Any undeclared folder still becomes an album, so nothing is ever invisible.
  for (const [folder, photos] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    albums.push({
      id: folder,
      title: titleFromName(folder),
      description: '',
      photos: photos.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true })),
    });
  }

  return albums;
}

function PhotoTile({ photo, index, onOpen }) {
  return (
    <button
      type="button"
      className={`gallery-tile ${index === 0 ? 'gallery-tile--feature' : ''}`}
      onClick={() => onOpen(photo)}
      aria-label={`Open photo: ${photo.caption}`}
    >
      <img src={photo.url} alt={photo.caption} loading="lazy" decoding="async" />
      <span className="gallery-tile__overlay">
        <Icons.image size={16} />
        <span>{photo.caption}</span>
      </span>
    </button>
  );
}

export default function Gallery({ data }) {
  const { gallery } = data;
  const albums = useMemo(
    () => buildAlbums(gallery.albums, gallery.captions || {}),
    [gallery]
  );
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null); // { albumId, index }

  useDialog(!!active, () => setActive(null));

  const visible = filter === 'all' ? albums : albums.filter((a) => a.id === filter);
  const totalPhotos = albums.reduce((n, a) => n + a.photos.length, 0);

  const flat = useMemo(
    () => visible.flatMap((album) => album.photos.map((p) => ({ ...p, albumId: album.id, albumTitle: album.title }))),
    [visible]
  );

  const current = active ? flat[active.index] : null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setActive((s) => (s ? { ...s, index: (s.index + 1) % flat.length } : s));
      if (e.key === 'ArrowLeft') setActive((s) => (s ? { ...s, index: (s.index - 1 + flat.length) % flat.length } : s));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, flat.length]);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Beyond Engineering</p>
          <h2>Academic &amp; professional journey</h2>
          <p className="lede">{gallery.intro}</p>
        </div>

        {albums.length === 0 ? (
          <div className="gallery-empty reveal">
            <div className="gallery-empty__icon"><Icons.camera size={22} /></div>
            <div>
              <h3>Photo albums are ready and waiting.</h3>
              <p>
                Thesis group photographs, project team moments, workshops and university life will
                appear here as a visual record of the journey.
              </p>
              <div className="gallery-empty__albums">
                {(gallery.albums || []).map((a) => (
                  <span className="gallery-empty__album" key={a.id}>
                    <Icons.image size={13} />
                    {a.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="gallery-bar reveal">
              <div className="gallery-tabs" role="tablist" aria-label="Photo albums">
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === 'all'}
                  className={`gallery-tab ${filter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All photos <span className="gallery-tab__count">{totalPhotos}</span>
                </button>
                {albums.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    role="tab"
                    aria-selected={filter === a.id}
                    className={`gallery-tab ${filter === a.id ? 'is-active' : ''}`}
                    onClick={() => setFilter(a.id)}
                  >
                    {a.title} <span className="gallery-tab__count">{a.photos.length}</span>
                  </button>
                ))}
              </div>
              <p className="gallery-hint">
                <Icons.image size={14} /> {totalPhotos} photo{totalPhotos === 1 ? '' : 's'}
              </p>
            </div>

            <div className="gallery-albums">
              {visible.map((album) => (
                <div className="gallery-album-block reveal" key={album.id}>
                  {filter === 'all' && (
                    <div className="gallery-album-head">
                      <h3>{album.title}</h3>
                      {album.date && <span className="gallery-album-date">{album.date}</span>}
                      {album.description && <p>{album.description}</p>}
                    </div>
                  )}
                  <div className="gallery-grid">
                    {album.photos.map((photo, i) => (
                      <PhotoTile
                        key={photo.file}
                        photo={photo}
                        index={i}
                        onOpen={() =>
                          setActive({
                            index: flat.findIndex((p) => p.url === photo.url && p.albumId === album.id),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {current && (
        <div className="gallery-lightbox is-open" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <div className="gallery-lightbox__scrim" onClick={() => setActive(null)} aria-hidden="true" />
          <button type="button" className="gallery-lightbox__close" onClick={() => setActive(null)} aria-label="Close photo viewer">
            <Icons.close size={22} />
          </button>
          {flat.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                aria-label="Previous photo"
                onClick={() => setActive((s) => ({ ...s, index: (s.index - 1 + flat.length) % flat.length }))}
              >
                <Icons.arrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--next"
                aria-label="Next photo"
                onClick={() => setActive((s) => ({ ...s, index: (s.index + 1) % flat.length }))}
              >
                <Icons.arrowRight size={20} />
              </button>
            </>
          )}
          <figure className="gallery-lightbox__figure">
            <img src={current.url} alt={current.caption} />
            <figcaption>
              <span className="gallery-lightbox__caption">{current.caption}</span>
              <span className="gallery-lightbox__meta">
                {current.albumTitle} · {active.index + 1} / {flat.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
