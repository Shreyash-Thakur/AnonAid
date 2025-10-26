// Ensure modules like 'next/link' and 'next/navigation' are recognized
declare module 'next/link';
declare module 'next/navigation';

// Add types for JSX
declare namespace JSX {
  interface IntrinsicElements {
    // Allow any HTML element
    [elemName: string]: any;
  }
}