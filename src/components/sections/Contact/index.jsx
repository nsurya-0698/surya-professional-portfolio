import './index.css';
import EmailForm from './EmailForm';

const Contact = () => {
  return (
    <section className="contact-container" id="contact">
      <h2 className="section-heading contact-header animate-fade-up">
        <span className="section-heading__line" />
        Get In Touch
        <span className="section-heading__line" />
      </h2>
      <p className="contact-content animate-slide-left">
        Interested in AI platform, backend, cloud, or reliability engineering opportunities? I&apos;d be glad to connect.
      </p>
      <div className="animate-fade-up">
        <EmailForm />
      </div>
    </section>
  );
};

export default Contact;
