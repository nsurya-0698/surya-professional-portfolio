import { useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '../../../data/profileKnowledge.js';
import { getAssistantReply } from '../../../lib/profileAssistantApi.js';
import byteSpritesheet from './assets/byte-spritesheet.webp';
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

const BYTE_ANIMATIONS = {
  idle: { row: 0, frames: 7, interval: 360 },
  hover: { row: 3, frames: 4, interval: 190 },
  open: { row: 6, frames: 6, interval: 330 },
  thinking: { row: 7, frames: 6, interval: 145 },
  responding: { row: 4, frames: 5, interval: 135 },
};

const AIAgentAvatar = ({ state = 'idle', compact = false }) => {
  const [frame, setFrame] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const animation = BYTE_ANIMATIONS[state] ?? BYTE_ANIMATIONS.idle;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    setFrame(0);
    if (reduceMotion || animation.frames <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setFrame((currentFrame) => (currentFrame + 1) % animation.frames);
    }, animation.interval);

    return () => window.clearInterval(timer);
  }, [animation.frames, animation.interval, animation.row, reduceMotion]);

  return (
    <span
      className={`ai-agent-avatar ai-agent-avatar--${state} ${compact ? 'ai-agent-avatar--compact' : ''}`}
      aria-hidden="true"
    >
      <span
        className="byte-mascot"
        style={{
          backgroundImage: `url(${byteSpritesheet})`,
          backgroundPosition: `${frame * (100 / 7)}% ${animation.row * 10}%`,
        }}
      />
    </span>
  );
};

const linkifyText = (text) => {
  const linkPattern =
    /(https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+|#[a-z][\w-]*|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+?\d[\d\s().-]{7,}\d)/gi;
  const parts = text.split(linkPattern);

  return parts.map((part) => {
    const isLink =
      /^(https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+|#[a-z][\w-]*|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\+?\d[\d\s().-]{7,}\d)$/i.test(
        part
      );

    if (!isLink) {
      return part;
    }

    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part);
    const isPhone = /^\+?\d[\d\s().-]{7,}\d$/.test(part);
    const href = (() => {
      if (part.startsWith('/')) {
        return `${import.meta.env.BASE_URL}${part.slice(1)}`;
      }

      if (part.startsWith('#')) {
        return `${import.meta.env.BASE_URL}${part}`;
      }

      if (isEmail) {
        return `mailto:${part}`;
      }

      if (isPhone) {
        return `tel:${part.replace(/(?!^\+)[^\d]/g, '')}`;
      }

      return part;
    })();
    const label = part.replace(/^mailto:/, '').replace(/^tel:/, '');
    const opensNewTab = href.startsWith('http');

    return (
      <a
        key={`${part}-${href}`}
        href={href}
        target={opensNewTab ? '_blank' : undefined}
        rel={opensNewTab ? 'noreferrer' : undefined}
      >
        {label}
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
