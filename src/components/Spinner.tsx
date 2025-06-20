// src/components/Spinner.tsx
import React from 'react';
const Spinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 50 50"
    className={`${props.className || ''} animate-spin`}
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="31.415, 31.415"
    />
  </svg>
);
export default Spinner;
