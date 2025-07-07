import { JSX } from 'react';

import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackOverlay,
  DialogStackPrevious,
  DialogStackTitle,
  useDialogStack,
} from './index';

export function ExampleWithHook(): JSX.Element {
  const adfasfeaf = useDialogStack();

  const handleSubmit = () => {
    // Логіка відправки форми
    console.log('Форма відправлена');
    adfasfeaf.close();
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Приклад з Hook</h2>

      <button onClick={adfasfeaf.open}>Відкрити діалог з hook</button>

      <DialogStack open={adfasfeaf.isOpen} onOpenChange={adfasfeaf.setIsOpen}>
        <DialogStackOverlay />

        <DialogStackBody>
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>
                Крок 1: Персональна інформація
              </DialogStackTitle>
              <DialogStackDescription>
                Заповніть ваші персональні дані
              </DialogStackDescription>
            </DialogStackHeader>
            <div style={{ margin: '16px 0' }}>
              <input
                placeholder="Ім'я"
                style={{ width: '100%', marginBottom: '8px', padding: '8px' }}
              />
              <input
                placeholder="Email"
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <DialogStackFooter>
              <DialogStackNext>Далі</DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Крок 2: Налаштування</DialogStackTitle>
              <DialogStackDescription>
                Оберіть ваші налаштування
              </DialogStackDescription>
            </DialogStackHeader>
            <div style={{ margin: '16px 0' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Отримувати сповіщення
              </label>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Зберігати дані
              </label>
            </div>
            <DialogStackFooter style={{ justifyContent: 'space-between' }}>
              <DialogStackPrevious>Назад</DialogStackPrevious>
              <DialogStackNext>Далі</DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Крок 3: Підтвердження</DialogStackTitle>
              <DialogStackDescription>
                Перевірте ваші дані перед відправкою
              </DialogStackDescription>
            </DialogStackHeader>
            <div
              style={{
                margin: '16px 0',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
              }}
            >
              <p>
                <strong>Ім'я:</strong> [Введене ім'я]
              </p>
              <p>
                <strong>Email:</strong> [Введений email]
              </p>
              <p>
                <strong>Сповіщення:</strong> [Так/Ні]
              </p>
            </div>
            <DialogStackFooter style={{ justifyContent: 'space-between' }}>
              <DialogStackPrevious>Назад</DialogStackPrevious>
              <button
                onClick={handleSubmit}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#7a66ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Відправити
              </button>
            </DialogStackFooter>
          </DialogStackContent>
        </DialogStackBody>
      </DialogStack>
    </div>
  );
}
