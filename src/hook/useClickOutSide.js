import { useState, useEffect, useRef } from 'react';

export default function useClickOutSide(visible) {
    const [isVisible, setIsVisible] = useState(visible);
    const ref = useRef(null);

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isVisible, setIsVisible };
}