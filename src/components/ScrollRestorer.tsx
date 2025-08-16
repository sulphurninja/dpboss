'use client';

import { useEffect } from 'react';

export default function ScrollRestorer() {
  useEffect(() => {
    const pos = typeof window !== 'undefined' ? localStorage.getItem('scrollPosition') : null;
    if (pos) {
      const n = parseInt(pos, 10);
      if (!Number.isNaN(n)) window.scrollTo(0, n);
      localStorage.removeItem('scrollPosition');
    }
  }, []);
  return null;
}
