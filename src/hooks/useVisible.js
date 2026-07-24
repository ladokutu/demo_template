'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

export function useVisible(threshold = 0.1) {
  const [node, setNode] = useState(null);
  const [visible, setVisible] = useState(false);

  // Callback ref — fires when the DOM element changes (e.g. skeleton → real content)
  const ref = useCallback((el) => {
    setNode((prev) => {
      if (prev === el) return prev;
      return el;
    });
  }, []);

  useEffect(() => {
    if (!node) return;

    // If the element is already in the viewport, show immediately
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return [ref, visible];
}
