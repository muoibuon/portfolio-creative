import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };

    const lerp = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(lerp);
    };
    lerp();

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovered(true);
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovered(false);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed',
        width: 6, height: 6,
        borderRadius: '50%',
        background: hovered ? '#06b6d4' : '#a78bfa',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'background 0.2s, transform 0.1s',
        boxShadow: hovered ? '0 0 10px #06b6d4' : '0 0 6px #a78bfa',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed',
        width: hovered ? 48 : 32,
        height: hovered ? 48 : 32,
        borderRadius: '50%',
        border: `1.5px solid ${hovered ? 'rgba(6,182,212,0.6)' : 'rgba(167,139,250,0.5)'}`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 99998,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        backdropFilter: hovered ? 'blur(2px)' : 'none',
      }} />
    </>
  );
}
