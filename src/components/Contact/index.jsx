import './index.css'
import EmailForm from './EmailForm'

const Contact = () => {
    return(
        <div className="contact-container" id="contact">
            <h1 className="contact-header animate-fade-up">Get In Touch</h1>
            <p className="contact-content animate-slide-left">Thanks for checking out my profile! Feel free to drop me a message if you have any questions or if you'd like to connect.</p>
            <div className="animate-fade-up">
                <EmailForm />
            </div>
        </div>
    )
}

export default Contact