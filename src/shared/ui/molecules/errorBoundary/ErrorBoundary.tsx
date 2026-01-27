import './ErrorBoundary.css';

import { Component, ErrorInfo, JSX } from 'react';

type Props = {
  children: JSX.Element;
};

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, copied: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo, copied: false });

    try {
      fetch('https://cybapp.ru/v2/api/client/log', {
        method: 'POST',
        body: JSON.stringify({
          error: error.toString(),
          stack: errorInfo.componentStack,
          userAgent: navigator.userAgent,
          telegramData: Telegram?.WebApp,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (evt) {
      console.warn('Failed to log error', evt);
    }
  }

  copyLog = async () => {
    const { error, errorInfo } = this.state;
    const initData = Telegram?.WebApp?.initData || 'не получен';

    const log = [
      '=== Лог ошибки ===',
      `Ошибка: ${error?.toString() || 'неизвестно'}`,
      `Stack: ${error?.stack || 'нет'}`,
      `Component Stack: ${errorInfo?.componentStack || 'нет'}`,
      `InitData: ${initData}`,
      `UserAgent: ${navigator.userAgent}`,
      `Время: ${new Date().toISOString()}`,
    ].join('\n\n');

    try {
      await navigator.clipboard.writeText(log);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = log;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '10px',

            textAlign: 'center',
          }}
        >
          <h2> Что-то пошло не так</h2>
          <p>Приложение сломалось и мы уже знаем о проблеме.</p>
          <p>
            {' '}
            Если вы видите этот экран больше суток - напишите в службу заботы:{' '}
            <a
              href="https://t.me/zabotaCYB"
              target="_blank"
              rel="noopener noreferrer"
            >
              @zabotaCYB
            </a>
          </p>
          <button
            onClick={this.copyLog}
            style={{
              marginTop: '16px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              backgroundColor: this.state.copied ? '#4CAF50' : '#6C5DD3',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            {this.state.copied ? 'Скопировано!' : 'Скопировать лог'}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
