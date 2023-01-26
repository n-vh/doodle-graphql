/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JWT_SECRET: string;
  readonly VITE_DATABASE_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
