/// <reference types="vite/client" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

// Add declarations for image file types
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
