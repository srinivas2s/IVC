import React, { useEffect, useRef } from 'react';

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
    const pointsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Dots are now static except for cursor interaction
        };

        const handleMouseMove = (e) => {
            lastMouseRef.current = { ...mouseRef.current };
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e) => {
            if (e.touches[0]) {
                lastMouseRef.current = { ...mouseRef.current };
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        resize();

        const render = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / dotSpacing) + 1;
            const rows = Math.ceil(canvas.height / dotSpacing) + 1;

            // Smoothly update lastMouse to create a "lagging" trail effect
            lastMouseRef.current.x += (mouseRef.current.x - lastMouseRef.current.x) * 0.12;
            lastMouseRef.current.y += (mouseRef.current.y - lastMouseRef.current.y) * 0.12;



            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * dotSpacing;
                    const y = j * dotSpacing;

                    const dx = x - mouseRef.current.x;
                    const dy = y - mouseRef.current.y;
                    const d1 = Math.sqrt(dx * dx + dy * dy);

                    const tdx = x - lastMouseRef.current.x;
                    const tdy = y - lastMouseRef.current.y;
                    const d2 = Math.sqrt(tdx * tdx + tdy * tdy);

                    const distance = Math.min(d1, d2);

                    let opacity = 0.04;
                    let size = dotSize;
                    let color = dotColor;

                    // Check if this is a magic spot
                    const magicPulse = magicMap.get(`${i}-${j}`);

                    if (distance < glowRadius) {
                        const force = (glowRadius - distance) / glowRadius;
                        const influence = Math.pow(force, 1.2);

                        opacity = 0.04 + (influence * 0.9);
                        size = dotSize + (influence * 3.5);

                        // Gradient Color interpolation (Cyan to Purple)
                        const mix = (Math.sin(time * 0.001 + (i + j) * 0.1) + 1) / 2;
                        color = mix > 0.5 ? purpleColor : cyanColor;
                        ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${opacity})`);
                    } else {
                        // Ambient flicker
                        const flicker = Math.sin(time * 0.001 + (i * 0.3) + (j * 0.3)) * 0.02;
                        ctx.fillStyle = dotColor.replace(/[\d.]+\)$/g, `${Math.max(0.01, opacity + flicker)})`);
                    }

                    ctx.fillRect(x - size / 2, y - size / 2, size, size);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render(0);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotSize, dotSpacing, dotColor, cyanColor, purpleColor, glowRadius]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: 'screen', opacity: 0.9 }}
        />
    );
};

export default InteractiveDotGrid;
