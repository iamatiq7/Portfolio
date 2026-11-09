import { useState } from 'react';
import { Icons } from './ui.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ data }) {
  const { contact } = data;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const mailtoHref = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(
      form.subject || 'Portfolio contact'
    )}&body=${encodeURIComponent(body)}`;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!form.email.trim()) errs.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email)) errs.email = 'Please enter a valid email address.';
    if (!form.message.trim()) errs.message = 'Please write a message.';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Static site: open the user's email client pre-filled via mailto.
      window.location.href = mailtoHref();
      setSent(true);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
    'aria-invalid': errors[key] ? 'true' : undefined,
  });

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <div className="section-head contact-close reveal">
          <p className="kicker">End of pipeline</p>
          <h2>Let&apos;s talk <span className="dim">infrastructure</span></h2>
          <p className="lede">
            Open to enterprise infrastructure opportunities, technology collaborations and
            professional conversations.
          </p>
          <p className="contact-close__meta">[ <span>open to opportunities</span> ] · Dhaka, Bangladesh</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <a className="contact-info__row" href={`mailto:${contact.email}`}>
              <span className="contact-info__icon"><Icons.mail size={18} /></span>
              <div>
                <span className="contact-info__label">Email</span>
                <span className="contact-info__value">{contact.email}</span>
              </div>
            </a>
            <a className="contact-info__row" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="contact-info__icon"><Icons.linkedin size={18} /></span>
              <div>
                <span className="contact-info__label">LinkedIn</span>
                <span className="contact-info__value">linkedin.com/in/iamatiq7</span>
              </div>
            </a>
            <a className="contact-info__row" href={contact.github} target="_blank" rel="noopener noreferrer">
              <span className="contact-info__icon"><Icons.github size={18} /></span>
              <div>
                <span className="contact-info__label">GitHub</span>
                <span className="contact-info__value">github.com/iamatiq7</span>
              </div>
            </a>
            <div className="contact-info__row">
              <span className="contact-info__icon"><Icons.mapPin size={18} /></span>
              <div>
                <span className="contact-info__label">Location</span>
                <span className="contact-info__value">{contact.location}</span>
              </div>
            </div>
          </div>

          <form className="contact-form card reveal" onSubmit={submit} noValidate>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" type="text" placeholder="Your name" {...field('name')} />
                {errors.name && <p className="contact-form__error" role="alert">{errors.name}</p>}
              </div>
              <div className="contact-form__field">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" type="email" placeholder="you@company.com" {...field('email')} />
                {errors.email && <p className="contact-form__error" role="alert">{errors.email}</p>}
              </div>
            </div>
            <div className="contact-form__field">
              <label htmlFor="cf-subject">Subject</label>
              <input id="cf-subject" type="text" placeholder="What is this about?" {...field('subject')} />
            </div>
            <div className="contact-form__field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                rows="5"
                placeholder="Tell me about your project or opportunity…"
                {...field('message')}
              />
              {errors.message && <p className="contact-form__error" role="alert">{errors.message}</p>}
            </div>
            <button type="submit" className="btn btn--primary contact-form__submit">
              <Icons.mail size={16} />
              Send Message
            </button>
            {sent && (
              <p className="contact-form__sent" role="status">
                <Icons.check size={15} />
                Your email client should now open with the message pre-filled. If it did not, write
                to <a href={`mailto:${contact.email}`}>{contact.email}</a> directly.
              </p>
            )}
            <p className="contact-form__hint">
              This static site delivers messages through your email client — no data is stored or
              transmitted to a server.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
