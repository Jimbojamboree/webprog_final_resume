import { useEffect, useState, memo } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { url: string }, HTMLElement>;
        }
    }
}

const Robot = memo(function Robot() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js';
        script.onload = () => setLoading(false);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full h-full relative flex items-center justify-center bg-transparent overflow-hidden">
            {/* Top Blue Ambient Light */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/30 blur-[100px] pointer-events-none z-0" />

            {/* Bottom Red Ambient Light */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-1/2 bg-red-500/30 blur-[100px] pointer-events-none z-0" />

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-10">
                    Loading Spline...
                </div>
            )}

            {/*
              Spline wrapper — extends beyond the container's bottom-right edge.
              The parent has overflow:hidden, so the "Built with Spline" logo
              (which sits at the bottom-right of the viewer) gets clipped away.
              The robot stays centered because Spline centers the 3D scene.
            */}
            <div
                style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '-60px',
                    right: '-120px',
                    bottom: '-80px',
                    zIndex: 10,
                }}
            >
                <spline-viewer
                    url="https://prod.spline.design/wceYjgfQbByDP1M6/scene.splinecode"
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                    }}
                />
            </div>

            {/* Hello badge at bottom-right corner */}
            <div
                className="absolute bottom-3 right-3 z-20 pointer-events-none"
                style={{
                    padding: '6px 16px',
                    borderRadius: '8px',
                    background: 'rgba(11, 17, 32, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                <span className="text-sm font-mono text-blue-400 tracking-wider">👋 Hello!</span>
            </div>
        </div>
    );
});

export default Robot;
