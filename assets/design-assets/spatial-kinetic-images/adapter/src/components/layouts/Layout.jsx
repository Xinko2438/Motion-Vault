'use client';

import { useRef } from 'react';
import Scene from '@/webgl/Scene';
import { usePathname } from '@adapter/router.jsx';
import { Header, Footer } from '@/components/ui/modules';
import { Link } from '@adapter/router.jsx';

// Source Scene is statically bundled; no Next runtime, routing server or origin access.

export function Layout({ children }) {
    const ref = useRef(null);
    const pathname = usePathname();

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                touchAction: 'auto',
            }}
        >
            <Header>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        gap: '0.5rem',
                        flexDirection: 'column',
                    }}
                >
                    <h1>Kinetic Images</h1>
                    <nav
                        style={{
                            display: 'flex',
                            width: '100%',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            opacity: 0.6,
                        }}
                    >
                        <span data-source-href="https://tympanus.net/codrops/?p=96765">Article</span>
                        <span data-source-href="https://github.com/DGFX/codrops-kinetic-images">Code</span>
                        <span data-source-href="https://tympanus.net/codrops/demos/">All demos</span>
                    </nav>
                    <nav
                        style={{
                            display: 'flex',
                            width: '100%',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            opacity: 0.6,
                        }}
                    >
                        <span data-source-href="https://tympanus.net/codrops/demos/?tag=3d">#3d</span>
                        <span data-source-href="https://tympanus.net/codrops/demos/?tag=three-js">#three.js</span>
                        <span data-source-href="https://tympanus.net/codrops/demos/?tag=react-three-fiber">
                            #react-three-fiber
                        </span>
                    </nav>
                </div>
            </Header>
            {children}
            <Scene
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1,
                }}
                eventSource={ref}
                eventPrefix="client"
            />
            <Footer>
                <Link href="./" className={pathname === '/' ? 'active' : ''}>
                    Tower
                </Link>
                <Link href="./paper" className={pathname === '/paper' ? 'active' : ''}>
                    Paper
                </Link>
                <Link href="./spiral" className={pathname === '/spiral' ? 'active' : ''}>
                    Spiral
                </Link>
            </Footer>
        </div>
    );
}
