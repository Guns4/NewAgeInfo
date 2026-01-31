"use client";

import React, { createContext, useContext, useState } from "react";
import useSound from "use-sound";

// Short "Pop" / Woodblock
const CLICK_SFX = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
// Short "Success" / Chime
const SUCCESS_SFX = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";

type AudioContextType = {
    isMuted: boolean;
    toggleMute: () => void;
    playClick: () => void;
    playSuccess: () => void;
};

const AudioContext = createContext<AudioContextType>({
    isMuted: false,
    toggleMute: () => { },
    playClick: () => { },
    playSuccess: () => { },
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);

    // Load sounds
    const [playClickRaw] = useSound(CLICK_SFX, { volume: 0.5 });
    const [playSuccessRaw] = useSound(SUCCESS_SFX, { volume: 0.4 });

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const playClick = () => {
        if (!isMuted) {
            playClickRaw();
        }
    };

    const playSuccess = () => {
        if (!isMuted) {
            playSuccessRaw();
        }
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute, playClick, playSuccess }}>
            {children}
        </AudioContext.Provider>
    );
}
