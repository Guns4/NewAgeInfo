import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useEasterEggs(birthDate: Date) {
    const [greeting, setGreeting] = useState('');
    const [isSlotMachineActive, setIsSlotMachineActive] = useState(false);
    // const [playPing] = useSound(PING_SOUND, { volume: 0.5 }); // Commented out until we have a real sound or AudioProvider handles it

    // 1. Time-Based Greeting
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 5) setGreeting("Still awake? The stars are watching.");
        else if (hour < 12) setGreeting("Semangat Menjelajah Hari.");
        else if (hour < 18) setGreeting("Enjoy the journey of the day.");
        else setGreeting("Merenungi Jejak Waktu.");
    }, []);

    // 2. Birthday Milestone Celebration
    useEffect(() => {
        const today = new Date();
        const isBirthday = today.getDate() === birthDate.getDate() && maxMonth(today) === maxMonth(birthDate);

        if (isBirthday) {
            triggerFireworks();
            setGreeting("Happy Solar Return! 🎉");
        }
    }, [birthDate]);

    // Helper for month comparison (0-indexed)
    const maxMonth = (d: Date) => d.getMonth();

    // 3. 'AGE' Keyboard Trigger
    useEffect(() => {
        let keys: string[] = [];
        const target = 'age';

        const handleKeyDown = (e: KeyboardEvent) => {
            keys.push(e.key.toLowerCase());
            if (keys.length > target.length) keys.shift();

            if (keys.join('') === target) {
                triggerEasterEgg();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const triggerEasterEgg = useCallback(() => {
        // playPing();
        setIsSlotMachineActive(true);
        triggerFireworks();

        // Reset slot machine effect after a few seconds
        setTimeout(() => setIsSlotMachineActive(false), 3000);
    }, []);

    const triggerFireworks = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    return {
        greeting,
        isSlotMachineActive,
        triggerFireworks
    };
}
