import { useEffect, useRef, useState } from 'react';
import { Music2, Music3 } from 'lucide-react';
import './index.css';

const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.volume = 0.25;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        return;
      }

      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="none" />

      <button
        onClick={togglePlay}
        className={`music-toggle-button ${isPlaying ? 'playing' : ''}`}
        type="button"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Music3 size={20} /> : <Music2 size={20} />}
      </button>
    </>
  );
};

export default BackgroundMusic;
