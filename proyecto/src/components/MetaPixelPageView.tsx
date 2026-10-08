import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// El código base del Meta Pixel (index.html) registra la primera página que se abre.
// Como el sitio cambia de página sin recargar, avisamos a Meta en cada navegación posterior.
const MetaPixelPageView = () => {
  const { pathname } = useLocation();
  const lastTracked = useRef(window.location.pathname);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  return null;
};

export default MetaPixelPageView;
