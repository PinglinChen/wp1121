/// <reference types="vite/client" />

  interface ImportMeta {
    env: {
      [key: string]: string | boolean | undefined;
      VITE_API_URL?: string;
    };
  }  