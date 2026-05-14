import { useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '../../../data/profileKnowledge.js';
import { getAssistantReply } from '../../../lib/profileAssistantApi.js';
import './index.css';

const STORAGE_KEY = 'surya-portfolio-assistant-open';
const TYPING_DELAY_MS = 420;

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi, I'm Surya's portfolio assistant. Ask me about his experience, projects, skills, or fit for a role.",
};

const createMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
});

const delay = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

const AIAgentAvatar = ({ state = 'idle', compact = false }) => (
  <span
    className={`ai-agent-avatar ai-agent-avatar--${state} ${compact ? 'ai-agent-avatar--compact' : ''}`}
    aria-hidden="true"
  >
    <span className="ai-agent-shadow" />
    <span className="ai-agent-halo" />
    <span className="ai-agent-shell">
      <span className="ai-agent-scan" />
      <span className="ai-agent-core-glow" />
      <span className="ai-agent-network">
        <span />
        <span />
        <span />
      </span>
      <span className="ai-agent-eyes">
        <span className="ai-agent-eye" />
        <span className="ai-agent-eye" />
      </span>
      <span className="ai-agent-smile" />
      <span className="ai-agent-thinking-dots">
        <span />
        <span />
        <span />
      </span>
    </span>
    <span className="ai-agent-status-dot" />
    <span className="ai-agent-spark" />
  </span>
);

const linkifyText = (text) => {
  const linkPattern = /(https?:\/\/[^\s]+|mailto:[^\s]+|\/[^\s]+)/g;
  const parts = text.split(linkPattern);

  return parts.map((part) => {
    const isLink = /^(https?:\/\/[^\s]+|mailto:[^\s]+|\/[^\s]+)$/.test(part);

    if (!isLink) {
      return part;
    }

    const href = part.startsWith('/') ? `${import.meta.env.BASE_URL}${part.slice(1)}` : part;

    return (
      <a key={`${part}-${href}`} href={href} target="_blank" rel="noreferrer">
        {part}
      </a>
    );
  });
};

const MessageContent = ({ content }) => {
  const lines = content.split('\n').filter((line) => line.trim().length > 0);

  return (
    <>
      {lines.map((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('- ')) {
          return (
            <div className="assistant-chat-bullet" key={line}>
              <span aria-hidden="true" />
              <p>{linkifyText(trimmedLine.slice(2))}</p>
            </div>
          );
        }

        return <p key={line}>{linkifyText(trimmedLine)}</p>;
      })}
    </>
  );
};

const ChatMessage = ({ message }) => (
  <article className={`assistant-message assistant-message--${message.role}`}>
    {message.role === 'assistant' && (
      <span className="assistant-message-avatar" aria-hidden="true">
        <Bot size={16} />
      </span>
    )}
    <div className="assistant-message-bubble">
      <MessageContent content={message.content} />
    </div>
  </article>
);

const TypingIndicator = () => (
  <div className="assistant-message assistant-message--assistant assistant-message--typing">
    <span className="assistant-message-avatar" aria-hidden="true">
      <Bot size={16} />
    </span>
    <div className="assistant-message-bubble assistant-typing" aria-label="Assistant is thinking">
      <span />
      <span />
      <span />
    </div>
  </div>
);

const SuggestedQuestions = ({ onSelect, disabled }) => (
  <div className="assistant-suggestions" aria-label="Suggested questions">
    {SUGGESTED_QUESTIONS.map((question) => (
      <button
        className="assistant-chip"
        disabled={disabled}
        key={question}
        onClick={() => onSelect(question)}
        type="button"
      >
        {question}
      </button>
    ))}
  </div>
);

const PersonalAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [messages, setMessages] = useState([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const responseTimerRef = useRef();

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isOpen));
    } catch {
      // localStorage may be unavailable in private browsing.
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isOpen, isLoading, messages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (responseTimerRef.current) {
        window.clearTimeout(responseTimerRef.current);
      }
    };
  }, []);

  const sendMessage = async (content) => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isLoading) {
      return;
    }

    const userMessage = createMessage('user', trimmedContent);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const [reply] = await Promise.all([
        getAssistantReply({
          message: trimmedContent,
          messages: nextMessages,
        }),
        delay(TYPING_DELAY_MS),
      ]);

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', reply.content),
      ]);
      setIsResponding(true);

      if (responseTimerRef.current) {
        window.clearTimeout(responseTimerRef.current);
      }

      responseTimerRef.current = window.setTimeout(() => {
        setIsResponding(false);
      }, 900);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          'assistant',
          "Sorry, I had trouble answering that. Please try again, or ask about Surya's skills, projects, or experience."
        ),
      ]);
    } finally {
      setIsLoading(false);
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(inputValue);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(inputValue);
    }
  };

  const showSuggestions = messages.length === 1;
  const avatarState = isLoading
    ? 'thinking'
    : isResponding
      ? 'responding'
      : isOpen
        ? 'open'
        : isHoveringAvatar
          ? 'hover'
          : 'idle';

  return (
    <div className={`assistant-shell assistant-shell--${avatarState} ${isOpen ? 'assistant-shell--open' : ''}`}>
      {isOpen && (
        <section className="assistant-panel" aria-label="Personal Portfolio AI Assistant">
          <header className="assistant-header">
            <div className="assistant-title-group">
              <AIAgentAvatar state={avatarState} compact />
              <div>
                <h2>Surya&apos;s AI Assistant</h2>
                <p>Ask about experience, projects, skills, or fit</p>
              </div>
            </div>
            <button
              className="assistant-close"
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close portfolio assistant"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="assistant-messages" role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {showSuggestions && <SuggestedQuestions onSelect={sendMessage} disabled={isLoading} />}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <form className="assistant-input-area" onSubmit={handleSubmit}>
            <textarea
              aria-label="Ask about Surya's experience, projects, or skills"
              disabled={isLoading}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about experience, projects, or skills..."
              ref={inputRef}
              rows={1}
              value={inputValue}
            />
            <button
              className="assistant-send"
              disabled={isLoading || inputValue.trim().length === 0}
              type="submit"
              aria-label="Send message"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        className="assistant-launcher"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        onMouseEnter={() => setIsHoveringAvatar(true)}
        onMouseLeave={() => setIsHoveringAvatar(false)}
        onFocus={() => setIsHoveringAvatar(true)}
        onBlur={() => setIsHoveringAvatar(false)}
        type="button"
        aria-label={isOpen ? "Close Surya's AI portfolio assistant" : "Open Surya's AI portfolio assistant"}
        aria-expanded={isOpen}
      >
        <AIAgentAvatar state={avatarState} />
        <span className="assistant-tooltip" role="presentation">
          {isOpen ? 'I am ready' : 'Ask me about Surya'}
        </span>
      </button>
    </div>
  );
};

export default PersonalAssistantChat;
