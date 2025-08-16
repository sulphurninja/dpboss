'use client';

import React from 'react';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function BottomRefreshButton({ className, children }: Props) {
  const onClick = () => {
    try {
      localStorage.setItem('scrollPosition', String(window.scrollY));
    } catch {}
    window.location.reload();
  };

  return (
    <button onClick={onClick} className={className} style={{ position: 'fixed', bottom: 10, right: 10 }}>
      {children ?? 'REFRESH'}
    </button>
  );
}
