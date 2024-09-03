// src/types/env.d.ts
interface ImportMetaEnv {
        /**
         * 应用标题
         */
        VITE_APP_TITLE: string;
        /**
         * 默认API
         */
        VITE_APP_BASE_API: string;
    }
    interface ImportMeta  {
        readonly env: ImportMetaEnv;
    }