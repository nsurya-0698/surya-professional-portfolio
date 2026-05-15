import { useEffect, useRef, useState } from 'react';
import { Music2, Music3 } from 'lucide-react';
import './index.css';

const CHORD_PROGRESSIONS = [
  [130.81, 196.0, 246.94, 329.63],
  [146.83, 220.0, 277.18, 369.99],
  [164.81, 246.94, 329.63, 415.3],
  [123.47, 196.0, 246.94, 293.66],
];

const createAmbientMusicEngine = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return null;
  }

  const context = new AudioContext();
  const masterGain = context.createGain();
  const padGain = context.createGain();
  const chimeGain = context.createGain();
  const padFilter = context.createBiquadFilter();
  const chimeDelay = context.createDelay();
  const chimeFeedback = context.createGain();

  let chordIndex = 0;
  let chordTimer = null;
  let shimmerTimer = null;

  masterGain.gain.value = 0;
  padGain.gain.value = 0.18;
  chimeGain.gain.value = 0.035;
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 1150;
  padFilter.Q.value = 0.65;
  chimeDelay.delayTime.value = 0.32;
  chimeFeedback.gain.value = 0.18;

  padGain.connect(padFilter);
  padFilter.connect(masterGain);
  chimeGain.connect(masterGain);
  chimeGain.connect(chimeDelay);
  chimeDelay.connect(chimeFeedback);
  chimeFeedback.connect(chimeDelay);
  chimeDelay.connect(masterGain);
  masterGain.connect(context.destination);

  const scheduleNote = ({ frequency, startTime, duration, volume, type = 'sine', destination = padGain }) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.8);
    gain.gain.setValueAtTime(volume, startTime + Math.max(duration - 1.2, 0.9));
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.08);
  };

  const scheduleChord = () => {
    const chord = CHORD_PROGRESSIONS[chordIndex % CHORD_PROGRESSIONS.length];
    const startTime = context.currentTime + 0.05;

    chord.forEach((frequency, noteIndex) => {
      scheduleNote({
        frequency,
        startTime,
        duration: 7.4,
        volume: noteIndex === 0 ? 0.045 : 0.026,
        type: noteIndex === 0 ? 'sine' : 'triangle',
      });
    });

    chordIndex += 1;
  };

  const scheduleShimmer = () => {
    const chord = CHORD_PROGRESSIONS[chordIndex % CHORD_PROGRESSIONS.length];
    const frequency = chord[2] * 2;
    const startTime = context.currentTime + 0.05;

    scheduleNote({
      frequency,
      startTime,
      duration: 1.8,
      volume: 0.035,
      destination: chimeGain,
    });
  };

  return {
    async start() {
      await context.resume();
      masterGain.gain.cancelScheduledValues(context.currentTime);
      masterGain.gain.setTargetAtTime(0.5, context.currentTime, 0.8);
      scheduleChord();
      scheduleShimmer();
      chordTimer = window.setInterval(scheduleChord, 6800);
      shimmerTimer = window.setInterval(scheduleShimmer, 10300);
    },
    stop() {
      masterGain.gain.cancelScheduledValues(context.currentTime);
      masterGain.gain.setTargetAtTime(0, context.currentTime, 0.45);
      window.clearInterval(chordTimer);
      window.clearInterval(shimmerTimer);
      chordTimer = null;
      shimmerTimer = null;
    },
    destroy() {
      window.clearInterval(chordTimer);
      window.clearInterval(shimmerTimer);
      context.close();
    },
  };
};

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const musicEngineRef = useRef(null);

  useEffect(() => {
    return () => {
      musicEngineRef.current?.destroy();
    };
  }, []);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        musicEngineRef.current?.stop();
        setIsPlaying(false);
        return;
      }

      if (!musicEngineRef.current) {
        musicEngineRef.current = createAmbientMusicEngine();
      }

      await musicEngineRef.current?.start();
      setIsPlaying(Boolean(musicEngineRef.current));
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`music-toggle-button ${isPlaying ? 'playing' : ''}`}
      type="button"
      aria-label={isPlaying ? 'Pause ambient background music' : 'Play ambient background music'}
      title={isPlaying ? 'Pause calm music' : 'Play calm music'}
    >
      {isPlaying ? <Music3 size={20} /> : <Music2 size={20} />}
    </button>
  );
};

export default BackgroundMusic;
