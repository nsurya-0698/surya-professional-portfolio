import { useEffect, useRef, useState } from 'react';
import { Bot, RotateCcw, Send, X } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '../../../data/profileKnowledge.js';
import { getAssistantReply } from '../../../lib/profileAssistantApi.js';
import byteSpritesheet from './assets/byte-spritesheet.webp';
import './index.css';

const STORAGE_KEY = 'surya-portfolio-assistant-open';
const POSITION_STORAGE_KEY = 'surya-portfolio-byte-position';
const TYPING_DELAY_MS = 420;
const SCROLL_STOP_DELAY_MS = 950;
const MIN_SCROLL_DISTANCE = 140;
const ROAM_COOLDOWN_MS = 28000;
const BYTE_TRAVEL_SPEED_PX_PER_SECOND = 165;
const MIN_TRAVEL_DURATION_MS = 1700;
const MAX_TRAVEL_DURATION_MS = 5200;
const DRAG_THRESHOLD = 5;
const VIEWPORT_MARGIN = 8;

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi, I'm Byte—Surya's personal AI assistant. Ask me anything, or ask about Surya's experience, skills, projects, and résumé. I can also check live weather.",
};

const createMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
});

const delay = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

const readSavedBytePosition = () => {
  try {
    const savedPosition = JSON.parse(window.localStorage.getItem(POSITION_STORAGE_KEY));
    if (Number.isFinite(savedPosition?.x) && Number.isFinite(savedPosition?.y)) {
      return savedPosition;
    }
  } catch {
    // Ignore unavailable storage or malformed visitor data.
  }

  return null;
};

const saveBytePosition = (position) => {
  try {
    window.localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));
  } catch {
    // localStorage may be unavailable in private browsing.
  }
};

const clearSavedBytePosition = () => {
  try {
    window.localStorage.removeItem(POSITION_STORAGE_KEY);
  } catch {
    // localStorage may be unavailable in private browsing.
  }
};

const clampBytePosition = (position, width = 50, height = 54) => ({
  x: Math.min(
    Math.max(position.x, VIEWPORT_MARGIN),
    Math.max(VIEWPORT_MARGIN, window.innerWidth - width - VIEWPORT_MARGIN)
  ),
  y: Math.min(
    Math.max(position.y, VIEWPORT_MARGIN),
    Math.max(VIEWPORT_MARGIN, window.innerHeight - height - VIEWPORT_MARGIN)
  ),
});

const BYTE_ANIMATIONS = {
  idle: { row: 0, frames: 7, interval: 360 },
  'running-right': { row: 1, frames: 8, interval: 125 },
  'running-left': { row: 2, frames: 8, interval: 125 },
  settling: { row: 6, frames: 6, interval: 300 },
  hover: { row: 6, frames: 6, interval: 320 },
  open: { row: 6, frames: 6, interval: 330 },
  thinking: { row: 7, frames: 6, interval: 145 },
  responding: { row: 0, frames: 7, interval: 190 },
};

const getByteTravelDuration = () => {
  const isCompactViewport = window.innerWidth <= 1023;
  const edgeInset = isCompactViewport ? 16 : 88;
  const byteWidth = isCompactViewport ? 42 : 50;
  const travelDistance = Math.max(0, window.innerWidth - edgeInset * 2 - byteWidth);
  return Math.min(
    Math.max(
      (travelDistance / BYTE_TRAVEL_SPEED_PX_PER_SECOND) * 1000,
      MIN_TRAVEL_DURATION_MS
    ),
    MAX_TRAVEL_DURATION_MS
  );
};

const usePrefersReducedMotion = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  return reduceMotion;
};

const AIAgentAvatar = ({ state = 'idle', compact = false }) => {
  const [frame, setFrame] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const animation = BYTE_ANIMATIONS[state] ?? BYTE_ANIMATIONS.idle;

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
  const [initialBytePosition] = useState(readSavedBytePosition);
  const [manualPosition, setManualPosition] = useState(initialBytePosition);
  const [isManuallyPlaced, setIsManuallyPlaced] = useState(Boolean(initialBytePosition));
  const [roamSide, setRoamSide] = useState(() =>
    initialBytePosition?.x < window.innerWidth / 2 ? 'left' : 'right'
  );
  const [roamPhase, setRoamPhase] = useState('resting');
  const [travelDurationMs, setTravelDurationMs] = useState(getByteTravelDuration);
  const reduceMotion = usePrefersReducedMotion();
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const messagesEndRef = useRef(null);
  const responseTimerRef = useRef();
  const scrollStopTimerRef = useRef();
  const settleTimerRef = useRef();
  const lastScrollYRef = useRef(window.scrollY);
  const scrollDistanceRef = useRef(0);
  const lastRoamAtRef = useRef(0);
  const roamSideRef = useRef(roamSide);
  const roamPhaseRef = useRef(roamPhase);
  const isOpenRef = useRef(isOpen);
  const isManuallyPlacedRef = useRef(isManuallyPlaced);
  const manualPositionRef = useRef(manualPosition);
  const dragStateRef = useRef(null);
  const suppressLauncherClickRef = useRef(false);

  useEffect(() => {
    roamSideRef.current = roamSide;
  }, [roamSide]);

  useEffect(() => {
    roamPhaseRef.current = roamPhase;
  }, [roamPhase]);

  useEffect(() => {
    isOpenRef.current = isOpen;

    if (isOpen) {
      window.clearTimeout(scrollStopTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
      roamPhaseRef.current = 'resting';
      setRoamPhase('resting');
    }
  }, [isOpen]);

  useEffect(() => {
    isManuallyPlacedRef.current = isManuallyPlaced;
  }, [isManuallyPlaced]);

  useEffect(() => {
    manualPositionRef.current = manualPosition;
  }, [manualPosition]);

  useEffect(() => {
    if (!isManuallyPlaced) {
      return undefined;
    }

    const keepByteInView = () => {
      const launcherBounds = launcherRef.current?.getBoundingClientRect();
      const nextPosition = clampBytePosition(
        manualPositionRef.current,
        launcherBounds?.width,
        launcherBounds?.height
      );
      manualPositionRef.current = nextPosition;
      setManualPosition(nextPosition);
      setRoamSide(nextPosition.x < window.innerWidth / 2 ? 'left' : 'right');
      saveBytePosition(nextPosition);
    };

    keepByteInView();
    window.addEventListener('resize', keepByteInView);
    return () => window.removeEventListener('resize', keepByteInView);
  }, [isManuallyPlaced]);

  useEffect(() => {
    if (reduceMotion) {
      window.clearTimeout(scrollStopTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
      roamPhaseRef.current = 'resting';
      setRoamPhase('resting');
      return undefined;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDistanceRef.current += Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      window.clearTimeout(scrollStopTimerRef.current);
      scrollStopTimerRef.current = window.setTimeout(() => {
        if (
          isOpenRef.current ||
          isManuallyPlacedRef.current ||
          roamPhaseRef.current !== 'resting' ||
          scrollDistanceRef.current < MIN_SCROLL_DISTANCE
        ) {
          scrollDistanceRef.current = 0;
          return;
        }

        scrollDistanceRef.current = 0;
        const cooldownComplete = Date.now() - lastRoamAtRef.current >= ROAM_COOLDOWN_MS;
        if (!cooldownComplete) {
          return;
        }

        lastRoamAtRef.current = Date.now();
        roamPhaseRef.current = 'running';
        setTravelDurationMs(getByteTravelDuration());
        setRoamPhase('running');
        setRoamSide(roamSideRef.current === 'right' ? 'left' : 'right');
      }, SCROLL_STOP_DELAY_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(scrollStopTimerRef.current);
    };
  }, [reduceMotion]);

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

      window.clearTimeout(scrollStopTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
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
          'Sorry, I had trouble answering that. Please try again in a moment.'
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

  const handleRoamTransitionEnd = (event) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== 'right' ||
      roamPhaseRef.current !== 'running'
    ) {
      return;
    }

    roamPhaseRef.current = 'settling';
    setRoamPhase('settling');
    window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = window.setTimeout(() => {
      roamPhaseRef.current = 'resting';
      setRoamPhase('resting');
    }, 1800);
  };

  const placeByte = (position, width, height) => {
    const nextPosition = clampBytePosition(position, width, height);
    window.clearTimeout(scrollStopTimerRef.current);
    window.clearTimeout(settleTimerRef.current);
    roamPhaseRef.current = 'resting';
    isManuallyPlacedRef.current = true;
    manualPositionRef.current = nextPosition;
    setRoamPhase('resting');
    setIsManuallyPlaced(true);
    setManualPosition(nextPosition);
    setRoamSide(nextPosition.x < window.innerWidth / 2 ? 'left' : 'right');
    return nextPosition;
  };

  const handleLauncherPointerDown = (event) => {
    if (event.button !== 0) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: bounds.left,
      originY: bounds.top,
      width: bounds.width,
      height: bounds.height,
      dragging: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleLauncherPointerMove = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    if (!dragState.dragging && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) {
      return;
    }

    dragState.dragging = true;
    placeByte(
      { x: dragState.originX + deltaX, y: dragState.originY + deltaY },
      dragState.width,
      dragState.height
    );
  };

  const finishLauncherPointerGesture = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (dragState.dragging) {
      saveBytePosition(manualPositionRef.current);
      roamPhaseRef.current = 'settling';
      setRoamPhase('settling');
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        roamPhaseRef.current = 'resting';
        setRoamPhase('resting');
      }, 1200);
      suppressLauncherClickRef.current = true;
      window.setTimeout(() => {
        suppressLauncherClickRef.current = false;
      }, 0);
    }

    dragStateRef.current = null;
  };

  const handleLauncherClick = () => {
    if (suppressLauncherClickRef.current) {
      return;
    }

    setIsOpen((currentValue) => !currentValue);
  };

  const handleLauncherKeyDown = (event) => {
    const directionByKey = {
      ArrowUp: [0, -16],
      ArrowRight: [16, 0],
      ArrowDown: [0, 16],
      ArrowLeft: [-16, 0],
    };
    const direction = directionByKey[event.key];
    if (!event.shiftKey || !direction) {
      return;
    }

    event.preventDefault();
    const bounds = launcherRef.current?.getBoundingClientRect();
    const origin = manualPositionRef.current ?? { x: bounds.left, y: bounds.top };
    const nextPosition = placeByte(
      { x: origin.x + direction[0], y: origin.y + direction[1] },
      bounds.width,
      bounds.height
    );
    saveBytePosition(nextPosition);
  };

  const resetBytePosition = () => {
    clearSavedBytePosition();
    window.clearTimeout(settleTimerRef.current);
    isManuallyPlacedRef.current = false;
    manualPositionRef.current = null;
    roamPhaseRef.current = 'resting';
    setIsManuallyPlaced(false);
    setManualPosition(null);
    setRoamPhase('resting');
    setRoamSide('right');
  };

  const showSuggestions = messages.length === 1;
  const avatarState = isLoading
    ? 'thinking'
    : isResponding
      ? 'responding'
      : isOpen
        ? 'open'
        : roamPhase === 'running'
          ? roamSide === 'left'
            ? 'running-left'
            : 'running-right'
          : roamPhase === 'settling'
            ? 'settling'
            : isHoveringAvatar
              ? 'hover'
              : 'idle';

  const shellStyle = {
    '--byte-travel-duration': `${travelDurationMs}ms`,
    ...(isManuallyPlaced && manualPosition
      ? { left: `${manualPosition.x}px`, top: `${manualPosition.y}px`, right: 'auto', bottom: 'auto' }
      : {}),
  };

  return (
    <div
      className={`assistant-shell assistant-shell--${avatarState} assistant-shell--side-${roamSide} assistant-shell--roam-${roamPhase} ${isOpen ? 'assistant-shell--open' : ''} ${isManuallyPlaced ? 'assistant-shell--manually-placed' : ''}`}
      onTransitionEnd={handleRoamTransitionEnd}
      style={shellStyle}
    >
      {isOpen && (
        <section className="assistant-panel" aria-label="Personal Portfolio AI Assistant">
          <header className="assistant-header">
            <div className="assistant-title-group">
              <AIAgentAvatar state={avatarState} compact />
              <div>
                <h2>Surya&apos;s AI Assistant</h2>
                <p>General AI • Surya knowledge • Live weather</p>
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
              aria-label="Ask about Surya or a general topic"
              disabled={isLoading}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about Surya or anything..."
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
        onClick={handleLauncherClick}
        onMouseEnter={() => setIsHoveringAvatar(true)}
        onMouseLeave={() => setIsHoveringAvatar(false)}
        onFocus={() => setIsHoveringAvatar(true)}
        onBlur={() => setIsHoveringAvatar(false)}
        onKeyDown={handleLauncherKeyDown}
        onPointerCancel={finishLauncherPointerGesture}
        onPointerDown={handleLauncherPointerDown}
        onPointerMove={handleLauncherPointerMove}
        onPointerUp={finishLauncherPointerGesture}
        ref={launcherRef}
        type="button"
        aria-label={isOpen ? "Close Surya's AI portfolio assistant" : "Open Surya's AI portfolio assistant"}
        aria-expanded={isOpen}
        aria-keyshortcuts="Shift+ArrowUp Shift+ArrowRight Shift+ArrowDown Shift+ArrowLeft"
      >
        <AIAgentAvatar state={avatarState} />
        <span className="assistant-tooltip" role="presentation">
          {isOpen ? 'I am ready' : 'Hi! Ask me about Surya.'}
        </span>
      </button>
      {isManuallyPlaced && (
        <button
          className="assistant-position-reset"
          onClick={resetBytePosition}
          type="button"
          aria-label="Return Byte to the bottom-right corner"
          title="Return Byte to corner"
        >
          <RotateCcw size={12} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default PersonalAssistantChat;
