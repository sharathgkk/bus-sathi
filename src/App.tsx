import { useEffect } from 'react';
import { BODY_HTML } from './bodyHtml';
import { initMysuruBusApp } from './mysuruBusLogic';

export default function App() {
  useEffect(() => {
    initMysuruBusApp();
  }, []);

  return (
    <div
      id="app-wrapper"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
    />
  );
}
