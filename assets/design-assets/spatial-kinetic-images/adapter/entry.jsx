import React, { Component, Suspense, useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from '@/components/layouts/Layout';
import Tower from '@/app/page';
import Paper from '@/app/paper/page';
import Spiral from '@/app/spiral/page';
import { usePathname } from './router.jsx';
import { kineticRuntime } from './runtime.js';
import '@/styles/global.scss';
import './local.css';
class ErrorBoundary extends Component {
    state = { error: null };
    static getDerivedStateFromError(error) { return { error }; }
    componentDidCatch(error) { kineticRuntime.fail(error); }
    componentDidUpdate(previous) { if (previous.route !== this.props.route && this.state.error) this.setState({ error: null }); }
    render() { return this.state.error ? <p role="alert" className="vault-error">Unable to render Kinetic Images: {this.state.error.message}</p> : this.props.children; }
}
function App() {
    const route = usePathname();
    useLayoutEffect(() => kineticRuntime.beginRoute(route), [route]);
    const Page = route === '/paper' ? Paper : route === '/spiral' ? Spiral : Tower;
    return <ErrorBoundary route={route}><Suspense fallback={<p className="loader">Loading local assets…</p>}><Layout><Page key={route} /></Layout></Suspense></ErrorBoundary>;
}
const root = createRoot(document.getElementById('root'));
kineticRuntime.mount(() => root.unmount());
window.SourceDemo = Object.freeze({
    get ready() { return kineticRuntime.ready; },
    stop: kineticRuntime.stop, resume: kineticRuntime.resume,
    paint: kineticRuntime.paint, dispose: kineticRuntime.dispose,
    inspect: kineticRuntime.inspect, status: kineticRuntime.inspect,
});
root.render(<App />);
