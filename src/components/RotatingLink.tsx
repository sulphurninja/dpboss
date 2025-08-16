'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  id?: string;
  href: string;
  phrases: string[];
  intervalMs?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function RotatingLink({
  id,
  href,
  phrases,
  intervalMs = 1000,
  className,
  style,
}: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [intervalMs, phrases.length]);

  return (
    <a id={id} className={className} style={style} target="_blank" href={href}>
      <i>{phrases[index]}</i>
    </a>
  );
}
