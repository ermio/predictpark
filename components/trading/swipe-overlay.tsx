'use client';

export default function SwipeOverlay() {
  return (
    <>
      {/* Left overlay hint */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-full bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
      
      {/* Right overlay hint */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none" />
    </>
  );
}

