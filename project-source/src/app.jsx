import Navbar from './components/navbar.jsx';
import Hero from './components/hero.jsx';
import About from './components/about.jsx';
import Expertise from './components/expertise.jsx';
import Experience from './components/experience.jsx';
import Projects from './components/projects.jsx';
import Education from './components/education.jsx';
import Certifications from './components/certifications.jsx';
import Gallery from './components/gallery.jsx';
import Contact from './components/contact.jsx';
import Footer from './components/footer.jsx';
import { useReveal, useActiveSection, BackToTop } from './components/ui.jsx';
import { PORTFOLIO_DATA as data } from './data/portfolio.js';

const SECTION_IDS = ['home', 'about', 'expertise', 'experience', 'projects', 'education', 'certifications', 'gallery', 'contact'];

export default function App() {
  useReveal();
  const active = useActiveSection(SECTION_IDS);
  const resumeUrl = data.assetPaths.resume;

  return (
    <>
      <Navbar active={active} resumeUrl={resumeUrl} />
      <main id="main">
        <Hero data={data} resumeUrl={resumeUrl} />
        <About data={data} />
        <Expertise data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Education data={data} />
        <Certifications data={data} />
        <Gallery data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
      <BackToTop />
    </>
  );
}
