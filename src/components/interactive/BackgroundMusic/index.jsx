import React, { useState, useRef, useEffect } from 'react';
import { Music2, Music3 } from 'lucide-react';
import './index.css';

// Pleasant, royalty-free background music
// Note: If this URL doesn't work, you can host the music file locally in the public folder
// and use: '/music/your-music-file.mp3'
const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initialize audio volume
    audio.volume = 0.3;

    // Sync state with actual audio playback state
    const handlePlay = () => {
      console.log('Audio started playing');
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log('Audio paused');
      setIsPlaying(false);
    };
    const handleEnded = () => {
      console.log('Audio ended');
      setIsPlaying(false);
    };
    const handleError = (e) => {
      console.error("Audio error:", e);
      console.error("Audio error details:", audio.error);
      if (audio.error) {
        switch (audio.error.code) {
          case audio.error.MEDIA_ERR_ABORTED:
            console.error("The user aborted the audio");
            break;
          case audio.error.MEDIA_ERR_NETWORK:
            console.error("A network error occurred");
            break;
          case audio.error.MEDIA_ERR_DECODE:
            console.error("An error occurred while decoding the audio");
            break;
          case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            console.error("The audio source is not supported or CORS blocked");
            break;
          default:
            console.error("An unknown error occurred");
        }
      }
      setIsPlaying(false);
    };
    const handleCanPlay = () => {
      console.log('Audio can play');
    };
    const handleLoadedData = () => {
      console.log('Audio data loaded');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);

    // Check initial state
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error("Audio element not found");
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        // Check if audio is ready
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log("Music started successfully");
          }
        } else {
          // Wait for audio to be ready
          audio.load(); // Reload the audio
          await new Promise((resolve) => {
            const handleCanPlay = () => {
              audio.removeEventListener('canplay', handleCanPlay);
              resolve();
            };
            audio.addEventListener('canplay', handleCanPlay);
          });
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log("Music started successfully after loading");
          }
        }
      }
    } catch (error) {
      console.error("Error toggling music:", error);
      console.error("Audio readyState:", audio.readyState);
      console.error("Audio networkState:", audio.networkState);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        preload="auto"
        crossOrigin="anonymous"
      />
      
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