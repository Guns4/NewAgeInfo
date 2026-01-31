import { useState, useEffect, useRef } from 'react';

export function useAIWritingEffect(text: string, speed: number = 30) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayedText("");
        setIsTyping(true);
        indexRef.current = 0;

        const interval = setInterval(() => {
            if (indexRef.current < text.length) {
                // Add a bit of randomness to speed to simulate "thinking"
                const randomVariance = Math.random() > 0.8 ? 50 : 0;

                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return { displayedText, isTyping };
}
