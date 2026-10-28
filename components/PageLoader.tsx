'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return <div className="page-loader" role="status" aria-label="Loading Accrue Technologies"><span>ACCRUE TECHNOLOGIES</span><i /></div>;
}
