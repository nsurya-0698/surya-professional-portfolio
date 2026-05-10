import { useState } from 'react';
import { SITE_META } from '../../../constants/siteMeta';

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const EmailForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormValues({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const validateForm = () => {
    if (!formValues.name.trim()) {
      return 'Name is required.';
    }

    if (!formValues.email.trim()) {
      return 'Email is required.';
    }

    if (!isValidEmail(formValues.email)) {
      return 'Please enter a valid email address.';
    }

    if (!formValues.message.trim()) {
      return 'Message is required.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setStatusMessage('');
      setError(validationError);
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${formValues.name}`);
    const body = encodeURIComponent([
      formValues.message,
      '',
      `Name: ${formValues.name}`,
      `Email: ${formValues.email}`,
      formValues.phone ? `Phone: ${formValues.phone}` : '',
    ].filter(Boolean).join('\n'));

    setError('');
    setStatusMessage('Opening your email client...');
    setIsSubmitting(true);
    window.location.href = `mailto:${SITE_META.email}?subject=${subject}&body=${body}`;
    window.setTimeout(() => {
      setIsSubmitting(false);
      resetForm();
      setStatusMessage('Thanks, your email draft is ready to send.');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="emailForm" noValidate>
      <div className="formGroup">
        <input
          type="text"
          placeholder="Your Name *"
          value={formValues.name}
          onChange={(event) => updateField('name', event.target.value)}
          className="formInput"
          autoComplete="name"
          required
        />
        <input
          type="email"
          placeholder="Your Email *"
          value={formValues.email}
          onChange={(event) => updateField('email', event.target.value)}
          className="formInput"
          autoComplete="email"
          aria-invalid={Boolean(error && error.toLowerCase().includes('email'))}
          required
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={formValues.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          className="formInput"
          autoComplete="tel"
        />
      </div>
      <textarea
        placeholder="Message *"
        rows="7"
        value={formValues.message}
        onChange={(event) => updateField('message', event.target.value)}
        className="formTextarea"
        required
      />
      <button type="submit" className="formSubmit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : "Let's Talk"}
      </button>

      {error && <div className="formMessage formMessage--error">{error}</div>}
      {statusMessage && <div className="formMessage formMessage--success">{statusMessage}</div>}
    </form>
  );
};

export default EmailForm;
