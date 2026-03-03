import React, { useRef, useEffect, useState } from 'react';

const FooterDotPattern = ({ isHovered }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = () => {
            if (canvasRef.current && canvasRef.current.parentElement) {
                const { offsetWidth, offsetHeight } = canvasRef.current.parentElement;
                setDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        const handleMouseMove = (e) => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('resize', updateSize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        const ctx = canvas.getContext('2d');
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const gap = 4; // Tiny pixel gap
        const rows = Math.ceil(canvas.height / gap);
        const cols = Math.ceil(canvas.width / gap);

        const pixels = [];
        const colors = ['#22d3ee', '#c084fc', '#ffffff', '#FEDE00', '#FF3B30'];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const isColorful = Math.random() > 0.85; // 15% colorful
                pixels.push({
                    baseX: x * gap,
                    baseY: y * gap,
                    x: x * gap,
                    y: y * gap,
                    color: isColorful ? colors[Math.floor(Math.random() * colors.length)] : '#0a0a0a',
                    isColorful,
                    opacity: 0,
                    targetOpacity: isColorful ? 0.6 : 0.1,
                    size: isColorful ? 1.5 : 0.8, // Tiny pixel size
                    vx: 0,
                    vy: 0,
                    friction: 0.95
                });
            }
        }

        let animationFrameId;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            pixels.forEach(p => {
                const dxBase = p.baseX - p.x;
                const dyBase = p.baseY - p.y;
                p.vx += dxBase * 0.05;
                p.vy += dyBase * 0.05;

                if (isHovered) {
                    const dx = mx - p.x;
                    const dy = my - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const force = Math.max(0, (100 - distance) / 100);

                    if (distance < 100) {
                        p.vx += (dx / distance) * force * 1.5;
                        p.vy += (dy / distance) * force * 1.5;
                    }

                    p.opacity += (p.targetOpacity - p.opacity) * 0.1;
                } else {
                    p.opacity += (0 - p.opacity) * 0.1;
                }

                p.vx *= p.friction;
                p.vy *= p.friction;
                p.x += p.vx;
                p.y += p.vy;

                if (p.opacity > 0.01) {
                    ctx.globalAlpha = p.opacity;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, isHovered]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default FooterDotPattern;
