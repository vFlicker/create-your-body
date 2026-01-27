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
  showLog: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, copied: false, showLog: false };
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

  getLogText = () => {
    const { error, errorInfo } = this.state;
    const initData = Telegram?.WebApp?.initData || 'не получен';

    return [
      '=== Лог ошибки ===',
      `Ошибка: ${error?.toString() || 'неизвестно'}`,
      `Stack: ${error?.stack || 'нет'}`,
      `Component Stack: ${errorInfo?.componentStack || 'нет'}`,
      `InitData: ${initData}`,
      `UserAgent: ${navigator.userAgent}`,
      `Время: ${new Date().toISOString()}`,
    ].join('\n\n');
  };

  toggleLog = () => {
    this.setState((prev) => ({ showLog: !prev.showLog }));
  };

  selectAll = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: this.state.showLog ? 'flex-start' : 'center',
            minHeight: '100vh',
            padding: '20px 10px',
            textAlign: 'center',
            boxSizing: 'border-box',
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
            onClick={this.toggleLog}
            style={{
              marginTop: '16px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              backgroundColor: '#6C5DD3',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            {this.state.showLog ? 'Скрыть лог' : 'Показать лог'}
          </button>
          {this.state.showLog && (
            <>
              <p style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
                Нажмите на текст и скопируйте:
              </p>
              <textarea
                readOnly
                value={this.getLogText()}
                onFocus={this.selectAll}
                style={{
                  width: '100%',
                  height: '200px',
                  marginTop: '8px',
                  padding: '12px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  resize: 'none',
                }}
              />
            </>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
