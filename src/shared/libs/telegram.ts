export const showTelegramAlert = (message: string): void => {
  if (!Telegram || !Telegram.WebApp) {
    alert(message);
    return;
  }

  Telegram.WebApp.showAlert(message);
};
