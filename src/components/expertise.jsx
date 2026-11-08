import { Icons } from './ui.jsx';

const CATEGORY_ICONS = {
  servers: Icons.server,
  storage: Icons.database,
  backup: Icons.shield,
  virtualization: Icons.layers,
  networking: Icons.network,
  operations: Icons.wrench,
};

export default function Expertise({ data }) {
  return (
    <section id="expertise" className="section section--alt">
      <div className="container">
        <div className="section-head reveal">
          <p className="kicker">Technical Expertise</p>
          <h2>Domains I work in</h2>
          <p className="lede">
            Hands-on enterprise infrastructure skills built through daily operations, OEM-certified
            training and real datacenter project exposure — grouped by domain, not percentages.
          </p>
        </div>

        <div className="expertise-grid">
          {data.expertise.map((cat) => {
            const CatIcon = CATEGORY_ICONS[cat.id] || Icons.server;
            return (
              <article className="card expertise-card reveal" key={cat.id}>
                <div className="expertise-card__head">
                  <span className="expertise-card__icon"><CatIcon size={20} /></span>
                  <h3>{cat.title}</h3>
                </div>
                <p className="expertise-card__short">{cat.short}</p>
                <ul className="expertise-card__badges">
                  {cat.items.map((item) => (
                    <li key={item}><span className="badge">{item}</span></li>
                  ))}
                </ul>
                <p className="expertise-card__note">{cat.note}</p>
              </article>
            );
          })}
        </div>

        <div className="expertise-legend reveal">
          <span className="badge"><Icons.check size={12} /> Daily hands-on</span>
          <span className="badge"><Icons.briefcase size={12} /> Project exposure</span>
          <span className="badge"><Icons.graduation size={12} /> Certified / qualified</span>
          <span className="badge"><Icons.terminal size={12} /> Lab practice</span>
        </div>
      </div>
    </section>
  );
}
