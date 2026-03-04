import React, { useEffect, useRef, useState } from 'react';

const InteractiveDotGrid = ({
    dotSize = 0.8,
    dotSpacing = 14,
    dotColor = 'rgba(255, 255, 255, 0.04)',
    cyanColor = 'rgba(34, 211, 238, 0.8)',
    purpleColor = 'rgba(192, 132, 252, 0.8)',
    glowRadius = 180
}) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const lastMouseRef = useRef({ x: -1000, y: -1000 });
    const colorMixRef = useRef(0);
    const clickCountRef = useRef(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleInput = (clientX, clientY) => {
            const dx = clientX - mouseRef.current.x;
            const dy = clientY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Cycle color based on movement distance
            if (dist > 1) {
                colorMixRef.current = (colorMixRef.current + dist * 0.005) % (Math.PI * 2);
            }

            mouseRef.current = { x: clientX, y: clientY };
        };

        const handleMouseMove = (e) => handleInput(e.clientX, e.clientY);
        const handleTouchMove = (e) => {
            if (e.touches[0]) {
                handleInput(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const handleClick = () => {
            clickCountRef.current = (clickCountRef.current + 1) % 2;
            colorMixRef.current = (colorMixRef.current + Math.PI / 2) % (Math.PI * 2);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        window.addEventListener('touchstart', (e) => {
            if (e.touches[0]) {
                handleInput(e.touches[0].clientX, e.touches[0].clientY);
                handleClick();
            }
        }, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        resize();

        // Reduced density for better performance, especially on mobile
        const spacing = isMobile ? dotSpacing * 2.5 : dotSpacing;
        const currentGlowRadius = isMobile ? 120 : glowRadius;
        const glowRadiusSq = currentGlowRadius * currentGlowRadius;

        const render = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lastMouseRef.current.x += (mouseRef.current.x - lastMouseRef.current.x) * (isMobile ? 0.15 : 0.15);
            lastMouseRef.current.y += (mouseRef.current.y - lastMouseRef.current.y) * (isMobile ? 0.15 : 0.15);

            const cols = Math.ceil(canvas.width / spacing) + 1;
            const rows = Math.ceil(canvas.height / spacing) + 1;

            // Pre-calculate color strings to avoid expensive 'replace' in the hot loop
            const cyanBase = cyanColor.split(',').slice(0, 3).join(',');
            const purpleBase = purpleColor.split(',').slice(0, 3).join(',');
            const dotColorBase = dotColor.split(',').slice(0, 3).join(',');

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    const dx = x - mouseRef.current.x;
                    const dy = y - mouseRef.current.y;
                    const d1Sq = dx * dx + dy * dy;

                    const tdx = x - lastMouseRef.current.x;
                    const tdy = y - lastMouseRef.current.y;
                    const d2Sq = tdx * tdx + tdy * tdy;

                    const distSq = Math.min(d1Sq, d2Sq);

                    if (distSq < glowRadiusSq) {
                        const dist = Math.sqrt(distSq);
                        const influence = (currentGlowRadius - dist) / currentGlowRadius;

                        const size = dotSize + (influence * (isMobile ? 4 : 4.5));
                        const opacity = 0.04 + (influence * 0.9);

                        const colorBase = clickCountRef.current === 1 ? purpleBase : cyanBase;
                        ctx.fillStyle = `${colorBase}, ${opacity})`;
                        ctx.fillRect(x - size / 2, y - size / 2, size, size);
                    } else if (!isMobile) {
                        // Skip ambient static on mobile for massive performance gain
                        const flicker = Math.sin(colorMixRef.current + (i * 0.3) + (j * 0.3)) * 0.02;
                        ctx.fillStyle = `${dotColorBase}, ${0.04 + flicker})`;
                        ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
                    } else if (i % 2 === 0 && j % 2 === 0) {
                        // Sparse ambient on mobile
                        ctx.fillStyle = `${dotColorBase}, 0.03)`;
                        ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
                    }
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render(0);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotSize, dotSpacing, dotColor, cyanColor, purpleColor, glowRadius, isMobile]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-50] will-change-transform"
            style={{
                mixBlendMode: 'screen',
                opacity: isMobile ? 0.7 : 0.9,
                pointerEvents: 'none' // STRICTLY ENSURE NO CLICK BLOCKING
            }}
        />
    );
};

export default InteractiveDotGrid;
