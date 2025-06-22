import React, { useState, useRef, useEffect } from 'react';
import { Music2, Music3 } from 'lucide-react';
import './index.css';

// Pleasant, royalty-free jazz music from Bensound.
// Source: https://www.bensound.com/royalty-free-music/track/sway-gentle-lofi-music
const MUSIC_URL = 'https://www.bensound.com/bensound-music/bensound-sway.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Try to play audio on load.
    // Modern browsers may block this until a user interaction.
    const audio = audioRef.current;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay started successfully.
          setIsPlaying(true);
        })
        .catch(error => {
          // Autoplay was prevented. User can start it manually.
          console.warn("Music autoplay was prevented by the browser.");
          setIsPlaying(false);
        });
    }
  }, []);

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
      <audio ref={audioRef} src={MUSIC_URL} loop />
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