/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JWT_SECRET: string;
  readonly VITE_DATABASE_URI: string;
  readonly VITE_SERVER_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
