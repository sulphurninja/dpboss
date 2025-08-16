// components/RefreshButton.tsx
'use client';

export default function RefreshButton() {
  return (
    <button onClick={() => window.location.reload()}>
      Refresh
    </button>
  );
}
