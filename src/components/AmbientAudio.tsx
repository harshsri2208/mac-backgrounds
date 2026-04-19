import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../lib/audioEngine';
import type { SoundTheme } from '../types';

export default function AmbientAudio({ 
  sound, 
  enabled 
}: { 
  sound: SoundTheme; 
  enabled: boolean; 
}) {
  const isPlaying = useRef(false);

  useEffect(() => {
    if (!enabled || sound === 'none') {
      audioEngine.stop();
      isPlaying.current = false;
      return;
    }

    audioEngine.play(sound);
    isPlaying.current = true;

    return () => {
      audioEngine.stop();
      isPlaying.current = false;
    };
  }, [sound, enabled]);

  // Handle browser suspend state issues when tab regains focus
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        audioEngine.ctx?.suspend();
      } else if (isPlaying.current) {
        audioEngine.ctx?.resume();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return null;
}
