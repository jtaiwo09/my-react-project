import React, { useState } from 'react'

export default function useDebounce() {
    const [isTyping, setisTyping] = useState(null);

    function debounce(func, wait=1000) {
        clearTimeout(isTyping)
        let timeout = setTimeout(()=> func(), wait);
        setisTyping(timeout);
    }
    return debounce;
}
