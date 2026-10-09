window.sourceErrors=[];addEventListener('error',e=>sourceErrors.push(e.message));addEventListener('unhandledrejection',e=>sourceErrors.push(String(e.reason)));
