import React, { useState, useRef, useEffect } from 'react';
import { Music2, Music3 } from 'lucide-react';
import './index.css';

// Pleasant, royalty-free jazz music from Bensound.
// Source: https://www.bensound.com/royalty-free-music/track/sway-gentle-lofi-music
const MUSIC_URL = 'https://www.bensound.com/bensound-music/bensound-sway.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioRef = useRef(null);

  const attemptAutoplay = async () => {
    if (hasAttemptedAutoplay) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    try {
      // Set volume to a reasonable level
      audio.volume = 0.3;
      
      // Try to play immediately
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        await playPromise;
          setIsPlaying(true);
        setHasAttemptedAutoplay(true);
        setShowPrompt(false);
        console.log('Music autoplay successful');
        return true;
      }
    } catch (error) {
      console.warn("Music autoplay was prevented by the browser:", error);
      return false;
    }
  };

  const handleUserInteraction = async () => {
    if (!hasAttemptedAutoplay) {
      const success = await attemptAutoplay();
      if (success) {
        setHasAttemptedAutoplay(true);
        setShowPrompt(false);
        // Remove all listeners after successful autoplay
        removeAllListeners();
      }
    }
  };

  const removeAllListeners = () => {
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('keydown', handleUserInteraction);
    document.removeEventListener('touchstart', handleUserInteraction);
    document.removeEventListener('mousedown', handleUserInteraction);
    document.removeEventListener('scroll', handleUserInteraction);
    window.removeEventListener('focus', handleUserInteraction);
  };

  useEffect(() => {
    // Try to autoplay immediately on mount
    attemptAutoplay().then(success => {
      if (success) {
        setHasAttemptedAutoplay(true);
        return;
      }
    });

    // Add multiple event listeners for different types of user interactions
    const events = ['click', 'keydown', 'touchstart', 'mousedown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { passive: true });
    });

    // Also try when window gains focus (user switches back to tab)
    window.addEventListener('focus', handleUserInteraction);

    // Try autoplay when page becomes visible (user switches back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden && !hasAttemptedAutoplay) {
        setTimeout(() => attemptAutoplay(), 100);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try autoplay after a short delay (some browsers allow this)
    const delayedAutoplay = setTimeout(() => {
      if (!hasAttemptedAutoplay) {
        attemptAutoplay().then(success => {
          if (!success) {
            // Show prompt if autoplay failed
            setShowPrompt(true);
          }
        });
    }
    }, 2000);

    return () => {
      removeAllListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(delayedAutoplay);
    };
  }, [hasAttemptedAutoplay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
      
      {/* Music prompt overlay */}
      {showPrompt && (
        <div className="music-prompt-overlay" onClick={handleUserInteraction}>
          <div className="music-prompt">
            <Music2 size={24} />
            <p>Click anywhere to start background music</p>
          </div>
        </div>
      )}
      
      <button 
        onClick={togglePlay} 
        className={`music-toggle-button ${isPlaying ? 'playing' : ''}`} 
        aria-label="Toggle Music"
      >
        {isPlaying ? <Music3 size={20} /> : <Music2 size={20} />}
      </button>
    </>
  );
};

export default BackgroundMusic; 