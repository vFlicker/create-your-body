# DialogStack Component

Компонент DialogStack для створення стеку модальних вікон. Залишено тільки функціональні компоненти без стилізації - ви робите власну верстку.

## Компоненти

### Функціональні компоненти

- `DialogStack` - основний контейнер
- `DialogStackOverlay` - оверлей (з базовими стилями)
- `DialogStackBody` - тіло з діалогами (з базовими стилями)
- `DialogStackContent` - окремий діалог (з базовими стилями)
- `DialogStackPrevious` - кнопка "Назад" (без стилів)

### Hook

- `useSimpleDialogStack` - управління стеком діалогів

## Приклад використання

```tsx
function MyComponent() {
  const dialog = useSimpleDialogStack(2);

  return (
    <>
      <button onClick={() => dialog.open(0)}>Відкрити історію</button>
      <button onClick={() => dialog.open(1)}>Відкрити форму</button>

      <DialogStack
        open={dialog.isOpen}
        activeIndex={dialog.activeIndex}
        onOpenChange={(open) => !open && dialog.close()}
        onActiveIndexChange={dialog.setActiveIndex}
      >
        <DialogStackOverlay />
        <DialogStackBody>
          {/* Діалог 0 */}
          <DialogStackContent>
            <div>
              <h2>Моя історія</h2>
              <p>Контент історії</p>
              <button onClick={dialog.goToNext}>Далі до форми</button>
            </div>
          </DialogStackContent>

          {/* Діалог 1 */}
          <DialogStackContent>
            <div>
              <h2>Форма</h2>
              <p>Контент форми</p>
              {dialog.canGoBack && (
                <DialogStackPrevious>← Назад</DialogStackPrevious>
              )}
              <button onClick={dialog.close}>Зберегти</button>
            </div>
          </DialogStackContent>
        </DialogStackBody>
      </DialogStack>
    </>
  );
}
```

## API useSimpleDialogStack

```tsx
const dialog = useSimpleDialogStack(totalDialogs);

// Методи
dialog.open(startIndex); // Відкрити з певного індексу
dialog.close(); // Закрити
dialog.goToNext(); // Наступний діалог
dialog.goToPrevious(); // Попередній діалог

// Стан
dialog.isOpen; // boolean
dialog.activeIndex; // number
dialog.canGoBack; // boolean
dialog.canGoNext; // boolean
```