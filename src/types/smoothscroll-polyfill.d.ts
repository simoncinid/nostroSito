declare module 'smoothscroll-polyfill' {
  interface SmoothscrollPolyfill {
    polyfill(): void;
  }
  
  const smoothscroll: SmoothscrollPolyfill;
  export = smoothscroll;
} 