import './ErrorBoundary.css';

import { Component, ErrorInfo, JSX } from 'react';

type Props = {
  children: JSX.Element;
};

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });

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
        </div>
      );
    }

    return this.props.children;
  }
}
