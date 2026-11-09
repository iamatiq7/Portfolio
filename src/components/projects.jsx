import { useState } from 'react';
import { Icons, useDialog } from './ui.jsx';
import ProjectVisual from './projectvisual.jsx';

const STATUS_CHIP = {
  Ongoing: 'chip--ongoing',
  'Enterprise Project': 'chip--enterprise',
  'Lab Project': 'chip--lab',
};

function ProjectCard({ project, onOpen, index }) {
  return (
    <article className="card project-card reveal">
      <ProjectVisual category={project.category} index={index} />
      <span className="project-card__ghost" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className="project-card__head">
        <span className="project-card__index">[{String(index + 1).padStart(2, '0')}]</span>
        <span className={`chip ${STATUS_CHIP[project.status] || 'chip--enterprise'}`}>
          <span className="dot" />
          {project.status}
        </span>
        <span className="project-card__category">{project.category}</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__org">{project.org}</p>
      <p className="project-card__overview">{project.overview}</p>
      <ul className="project-card__tech">
        {project.tech.map((t) => (
          <li key={t}><span className="badge">{t}</span></li>
        ))}
      </ul>
      <button type="button" className="project-card__more" onClick={() => onOpen(project)}>
        Case study
        <Icons.arrowRight size={15} />
      </button>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  useDialog(!!project, onClose);
  if (!project) return null;
  return (
    <div className="modal is-open" role="dialog" aria-modal="true" aria-label={`${project.title} case study`}>
      <div className="modal__scrim" onClick={onClose} aria-hidden="true" />
      <div className="modal__panel">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close case study">
          <Icons.close size={20} />
        </button>
        <div className="modal__scroll">
          <span className={`chip ${STATUS_CHIP[project.status] || 'chip--enterprise'}`}>
            <span className="dot" />
            {project.status}
          </span>
          <h3 className="modal__title">{project.title}</h3>
          <p className="modal__org">{project.org} · {project.category}</p>

          <div className="modal__section">
            <h4>Overview</h4>
            <p>{project.overview}</p>
          </div>

          <div className="modal__section">
            <h4>My role</h4>
            <p>{project.role}</p>
          </div>

          {project.outcomes && project.outcomes.length > 0 && (
            <div className="modal__section">
              <h4>Key outcomes &amp; learning</h4>
              <ul className="modal__list">
                {project.outcomes.map((o) => (
                  <li key={o}><Icons.check size={14} /> <span>{o}</span></li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal__section">
            <h4>Technologies</h4>
            <ul className="project-card__tech">
              {project.tech.map((t) => (
                <li key={t}><span className="badge">{t}</span></li>
              ))}
            </ul>
          </div>

          {project.editableNote && (
            <p className="modal__editable">
              <Icons.camera size={15} />
              {project.editableNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ data }) {
  const [openProject, setOpenProject] = useState(null);

  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Featured Projects</p>
          <h2>Enterprise infrastructure <span className="dim">work</span></h2>
          <p className="lede">
            Real datacenter, virtualization and backup projects I have contributed to — presented as
            technical case studies, with my actual role stated honestly in each.
          </p>
        </div>

        <div className="projects-grid">
          {data.projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={setOpenProject} index={i} />
          ))}

          <aside className="project-note reveal" aria-label="How I run enterprise deployments">
            <p className="project-note__label">How I work</p>
            <h3>A deployment, run the enterprise way</h3>
            <ol className="project-note__steps">
              <li><span>01</span>Verify the environment and document the baseline</li>
              <li><span>02</span>Prepare the Method of Procedure before touching hardware</li>
              <li><span>03</span>Execute with checkpoints, logs and rollback points</li>
              <li><span>04</span>Report results and hand over clean documentation</li>
            </ol>
          </aside>
        </div>

        {data.softwareProjects && data.softwareProjects.length > 0 && (
          <>
            <div className="section-head reveal" style={{ marginTop: '4.5rem' }}>
              <p className="kicker">Software &amp; Academic Projects</p>
              <h2>Engineering beyond infrastructure</h2>
              <p className="lede">
                University software projects and research work that shaped my engineering foundations.
              </p>
            </div>
            <div className="projects-grid projects-grid--soft">
              {data.softwareProjects.map((p) => (
                <article className="card project-card project-card--soft reveal" key={p.title}>
                  <span className="chip chip--academic"><span className="dot" />Academic</span>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__overview">{p.description}</p>
                  <ul className="project-card__tech">
                    {p.tech.map((t) => (
                      <li key={t}><span className="badge">{t}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </>
        )}

        {data.thesis && data.thesis.length > 0 && (
          <div className="thesis-row reveal">
            <div className="thesis-row__head">
              <h3>Undergraduate Thesis</h3>
              <p>Deep-learning research completed during my BSc in CSE at AUST.</p>
            </div>
            <div className="thesis-row__items">
              {data.thesis.map((t) => (
                <article className="card thesis-card" key={t.title}>
                  <Icons.graduation size={18} />
                  <h4>{t.title}</h4>
                  <p>{t.description}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
