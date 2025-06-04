export const showTelegramAlert = (message: string): void => {
  if (!window.Telegram || !window.Telegram.WebApp) {
    alert(message);
    return;
  }

  window.Telegram?.WebApp?.showAlert(message);
};
