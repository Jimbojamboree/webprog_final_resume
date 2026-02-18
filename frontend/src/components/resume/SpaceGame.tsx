import { useEffect, useRef, useCallback, useState } from 'react';

interface SpaceGameProps {
    onClose: () => void;
}

interface Bullet { x: number; y: number; }
interface Enemy { x: number; y: number; w: number; h: number; color: string; hp: number; }
interface Star { x: number; y: number; speed: number; alpha: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; }

const GAME_W = 320;
const GAME_H = 520;
const PLAYER_W = 28;
const PLAYER_H = 22;
const BULLET_SPEED = 7;
const ENEMY_ROWS = 3;
const ENEMY_COLS = 6;
const ENEMY_W = 30;
const ENEMY_H = 20;

const SpaceGame = ({ onClose }: SpaceGameProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const keysRef = useRef<Set<string>>(new Set());
    const touchRef = useRef<{ left: boolean; right: boolean; fire: boolean }>({ left: false, right: false, fire: false });

    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('space-game-hi');
        return saved ? parseInt(saved) : 0;
    });

    const gameRef = useRef({
        playerX: GAME_W / 2 - PLAYER_W / 2,
        bullets: [] as Bullet[],
        enemies: [] as Enemy[],
        stars: [] as Star[],
        particles: [] as Particle[],
        enemyDir: 1,
        enemySpeed: 0.4,
        lastShot: 0,
        score: 0,
        gameOver: false,
        wave: 1,
    });

    const spawnEnemies = useCallback(() => {
        const g = gameRef.current;
        const enemies: Enemy[] = [];
        const colors = ['#4ade80', '#f59e0b', '#3b82f6', '#ef4444', '#a855f7'];
        for (let r = 0; r < ENEMY_ROWS; r++) {
            for (let c = 0; c < ENEMY_COLS; c++) {
                enemies.push({
                    x: 30 + c * (ENEMY_W + 12),
                    y: 30 + r * (ENEMY_H + 14),
                    w: ENEMY_W, h: ENEMY_H,
                    color: colors[(r + g.wave) % colors.length],
                    hp: 1,
                });
            }
        }
        g.enemies = enemies;
        g.enemyDir = 1;
        g.enemySpeed = 0.4 + g.wave * 0.1;
    }, []);

    const initStars = useCallback(() => {
        const stars: Star[] = [];
        for (let i = 0; i < 60; i++) {
            stars.push({
                x: Math.random() * GAME_W,
                y: Math.random() * GAME_H,
                speed: Math.random() * 1.5 + 0.3,
                alpha: Math.random() * 0.6 + 0.2,
            });
        }
        gameRef.current.stars = stars;
    }, []);

    const addParticles = useCallback((x: number, y: number, color: string) => {
        const g = gameRef.current;
        for (let i = 0; i < 8; i++) {
            g.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1,
                color,
                size: Math.random() * 3 + 1,
            });
        }
    }, []);

    const resetGame = useCallback(() => {
        const g = gameRef.current;
        g.playerX = GAME_W / 2 - PLAYER_W / 2;
        g.bullets = [];
        g.particles = [];
        g.score = 0;
        g.gameOver = false;
        g.wave = 1;
        g.lastShot = 0;
        setScore(0);
        setGameOver(false);
        spawnEnemies();
        initStars();
    }, [spawnEnemies, initStars]);

    useEffect(() => {
        resetGame();

        const handleKeyDown = (e: KeyboardEvent) => {
            keysRef.current.add(e.key);
            if (e.key === ' ' || e.key === 'ArrowUp') e.preventDefault();
            if (e.key === 'r' && gameRef.current.gameOver) resetGame();
        };
        const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const loop = () => {
            const canvas = canvasRef.current;
            if (!canvas) { animRef.current = requestAnimationFrame(loop); return; }
            const ctx = canvas.getContext('2d');
            if (!ctx) { animRef.current = requestAnimationFrame(loop); return; }
            const g = gameRef.current;
            const keys = keysRef.current;
            const touch = touchRef.current;

            if (!g.gameOver) {
                // Player movement
                if (keys.has('ArrowLeft') || keys.has('a') || touch.left) g.playerX -= 4;
                if (keys.has('ArrowRight') || keys.has('d') || touch.right) g.playerX += 4;
                g.playerX = Math.max(0, Math.min(GAME_W - PLAYER_W, g.playerX));

                // Shooting
                const now = Date.now();
                if ((keys.has(' ') || keys.has('ArrowUp') || touch.fire) && now - g.lastShot > 200) {
                    g.bullets.push({ x: g.playerX + PLAYER_W / 2, y: GAME_H - 40 });
                    g.lastShot = now;
                }

                // Bullets
                g.bullets = g.bullets.filter(b => { b.y -= BULLET_SPEED; return b.y > -10; });

                // Enemy movement
                let hitEdge = false;
                g.enemies.forEach(e => {
                    e.x += g.enemySpeed * g.enemyDir;
                    if (e.x <= 5 || e.x + e.w >= GAME_W - 5) hitEdge = true;
                });
                if (hitEdge) {
                    g.enemyDir *= -1;
                    g.enemies.forEach(e => { e.y += 10; });
                }

                // Collision: bullets vs enemies
                for (let bi = g.bullets.length - 1; bi >= 0; bi--) {
                    const b = g.bullets[bi];
                    for (let ei = g.enemies.length - 1; ei >= 0; ei--) {
                        const e = g.enemies[ei];
                        if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
                            addParticles(e.x + e.w / 2, e.y + e.h / 2, e.color);
                            g.enemies.splice(ei, 1);
                            g.bullets.splice(bi, 1);
                            g.score += 100;
                            setScore(g.score);
                            break;
                        }
                    }
                }

                // Enemies reaching player
                g.enemies.forEach(e => {
                    if (e.y + e.h >= GAME_H - 40) {
                        g.gameOver = true;
                        setGameOver(true);
                        if (g.score > highScore) {
                            setHighScore(g.score);
                            localStorage.setItem('space-game-hi', g.score.toString());
                        }
                    }
                });

                // Next wave
                if (g.enemies.length === 0) {
                    g.wave++;
                    spawnEnemies();
                }
            }

            // Stars
            g.stars.forEach(s => { s.y += s.speed; if (s.y > GAME_H) { s.y = 0; s.x = Math.random() * GAME_W; } });

            // Particles
            g.particles = g.particles.filter(p => {
                p.x += p.vx; p.y += p.vy; p.life -= 0.03;
                return p.life > 0;
            });

            // ── Draw ──
            ctx.fillStyle = '#070d1a';
            ctx.fillRect(0, 0, GAME_W, GAME_H);

            // Stars
            g.stars.forEach(s => {
                ctx.globalAlpha = s.alpha;
                ctx.fillStyle = '#fff';
                ctx.fillRect(s.x, s.y, 1.5, 1.5);
            });
            ctx.globalAlpha = 1;

            // Enemies
            g.enemies.forEach(e => {
                ctx.fillStyle = e.color;
                ctx.shadowColor = e.color;
                ctx.shadowBlur = 6;
                // Draw a blocky invader shape
                const s = e.w / 6;
                ctx.fillRect(e.x + s, e.y, s * 4, s);
                ctx.fillRect(e.x, e.y + s, s * 6, s * 2);
                ctx.fillRect(e.x + s, e.y + s * 3, s, s);
                ctx.fillRect(e.x + s * 4, e.y + s * 3, s, s);
                ctx.shadowBlur = 0;
            });

            // Bullets
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 8;
            g.bullets.forEach(b => {
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(b.x - 1.5, b.y, 3, 10);
            });
            ctx.shadowBlur = 0;

            // Player ship
            if (!g.gameOver) {
                const px = g.playerX + PLAYER_W / 2;
                const py = GAME_H - 30;
                ctx.fillStyle = '#f59e0b';
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.moveTo(px, py - PLAYER_H);
                ctx.lineTo(px - PLAYER_W / 2, py);
                ctx.lineTo(px + PLAYER_W / 2, py);
                ctx.closePath();
                ctx.fill();
                // Engine glow
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.moveTo(px - 5, py);
                ctx.lineTo(px + 5, py);
                ctx.lineTo(px, py + 6 + Math.random() * 4);
                ctx.closePath();
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Particles
            g.particles.forEach(p => {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });
            ctx.globalAlpha = 1;

            // HUD
            ctx.fillStyle = '#4ade80';
            ctx.font = '11px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`SCORE: ${g.score}`, 10, 18);
            ctx.fillStyle = '#f59e0b';
            ctx.textAlign = 'center';
            ctx.fillText(`WAVE ${g.wave}`, GAME_W / 2, 18);
            ctx.fillStyle = '#4ade80';
            ctx.textAlign = 'right';
            ctx.fillText(`HI: ${Math.max(g.score, highScore)}`, GAME_W - 10, 18);

            // Game Over overlay
            if (g.gameOver) {
                ctx.fillStyle = 'rgba(7, 13, 26, 0.75)';
                ctx.fillRect(0, 0, GAME_W, GAME_H);

                ctx.fillStyle = '#f59e0b';
                ctx.font = 'bold 28px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER', GAME_W / 2, GAME_H / 2 - 30);

                ctx.fillStyle = '#4ade80';
                ctx.font = '14px monospace';
                ctx.fillText(`Score: ${g.score}`, GAME_W / 2, GAME_H / 2 + 10);

                ctx.fillStyle = '#94a3b8';
                ctx.font = '12px monospace';
                ctx.fillText('Press R or tap to restart', GAME_W / 2, GAME_H / 2 + 45);
            }

            animRef.current = requestAnimationFrame(loop);
        };

        animRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [resetGame, addParticles, spawnEnemies, highScore]);

    const handleCanvasTap = () => {
        if (gameRef.current.gameOver) resetGame();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors z-10"
                >
                    ✕
                </button>

                {/* Phone frame */}
                <div className="w-[350px] bg-muted rounded-[2.5rem] border-2 border-border p-3 shadow-2xl shadow-primary/10">
                    {/* Notch */}
                    <div className="mx-auto w-20 h-5 bg-card rounded-b-xl mb-1" />

                    {/* Screen with game canvas */}
                    <div className="bg-[#070d1a] rounded-[1.8rem] overflow-hidden">
                        <canvas
                            ref={canvasRef}
                            width={GAME_W}
                            height={GAME_H}
                            className="w-full"
                            style={{ aspectRatio: `${GAME_W}/${GAME_H}`, imageRendering: 'pixelated' }}
                            onClick={handleCanvasTap}
                        />

                        {/* Touch controls */}
                        <div className="flex justify-center gap-6 py-3 px-4 bg-[#0a1020]">
                            <button
                                className="w-12 h-12 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-muted-foreground active:border-primary active:text-primary transition-colors text-lg select-none"
                                onTouchStart={() => { touchRef.current.left = true; }}
                                onTouchEnd={() => { touchRef.current.left = false; }}
                                onMouseDown={() => { touchRef.current.left = true; }}
                                onMouseUp={() => { touchRef.current.left = false; }}
                                onMouseLeave={() => { touchRef.current.left = false; }}
                            >
                                ◀
                            </button>
                            <button
                                className="w-12 h-12 rounded-full border-2 border-primary/50 flex items-center justify-center text-primary active:bg-primary/20 transition-colors text-lg select-none"
                                onTouchStart={() => { touchRef.current.fire = true; }}
                                onTouchEnd={() => { touchRef.current.fire = false; }}
                                onMouseDown={() => { touchRef.current.fire = true; }}
                                onMouseUp={() => { touchRef.current.fire = false; }}
                                onMouseLeave={() => { touchRef.current.fire = false; }}
                            >
                                ●
                            </button>
                            <button
                                className="w-12 h-12 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-muted-foreground active:border-primary active:text-primary transition-colors text-lg select-none"
                                onTouchStart={() => { touchRef.current.right = true; }}
                                onTouchEnd={() => { touchRef.current.right = false; }}
                                onMouseDown={() => { touchRef.current.right = true; }}
                                onMouseUp={() => { touchRef.current.right = false; }}
                                onMouseLeave={() => { touchRef.current.right = false; }}
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls hint */}
                <div className="font-mono text-[10px] text-muted-foreground/50 text-center space-y-0.5">
                    <p>← → or A/D to move · SPACE to shoot</p>
                    <p>Or use the on-screen buttons</p>
                </div>
            </div>
        </div>
    );
};

export default SpaceGame;
