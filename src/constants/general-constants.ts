export const PAGINATION_PAGE_SIZE_THEORETICAL_TEST_RESULTS = 1;
export const PAGINATION_PAGE_SIZE_CV_REVIEW_RESULTS = 1;

export const ADMINS_TG_IDS = [
  import.meta.env.VITE_ADMIN_ID_DIMAS,
  import.meta.env.VITE_ADMIN_ID_ARKADIY,
];

export const DEFAULT_VALIDATE_MESSAGE = "Пожалуйста, заполните поле";

export const LOCAL_STORAGE_KEYS = {
  botAuthUserHash: "botAuthUserHash",
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const tg = window.Telegram.WebApp;

// todo: вписать продакшн версию
// export const PRODUCTION_FRONTEND_URL =
//   'https://beamish-pithivier-f47ac5.netlify.app';
export const PRODUCTION_FRONTEND_URL = "127.0.0.1:5173";

// todo: вписать продакшн версию
export const PRODUCTION_TELEGRAM_BOT_URL = "https://t.me/BlissCodeBase_bot";
