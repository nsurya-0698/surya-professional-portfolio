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
        Thanks for checking out my profile! Feel free to drop me a message if you have any questions or if you&apos;d like to connect.
      </p>
      <div className="animate-fade-up">
        <EmailForm />
      </div>
    </section>
  );
};

export default Contact;
