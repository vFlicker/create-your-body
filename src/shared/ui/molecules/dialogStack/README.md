# DialogStack Component

Компонент DialogStack дозволяє створювати стек модальних вікон, де одне модальне вікно може відкриватися поверх іншого з можливістю навігації між ними.

## Особливості

- ✅ Стек модальних вікон з навігацією
- ✅ Кнопки "Назад" та "Далі" для переходу між вікнами
- ✅ Автоматичне управління станом
- ✅ Підтримка `asChild` для кастомних тригерів
- ✅ Оверлей з можливістю закриття при кліку
- ✅ Анімації переходів
- ✅ TypeScript підтримка

## Основні компоненти

### DialogStack
Основний контейнер для стеку модальних вікон.

**Props:**
- `open?: boolean` - Контрольований стан відкриття
- `defaultOpen?: boolean` - Початковий стан (за замовчуванням false)
- `onOpenChange?: (open: boolean) => void` - Колбек зміни стану
- `clickable?: boolean` - Чи можна клікати на попередні вікна для повернення

### DialogStackTrigger
Тригер для відкриття модального вікна.

**Props:**
- `asChild?: boolean` - Використовувати дочірній елемент як тригер

### DialogStackOverlay
Темний оверлей за модальними вікнами.

### DialogStackBody
Контейнер для всіх модальних вікон у стеку.

### DialogStackContent
Окремий контент модального вікна.

**Props:**
- `index?: number` - Індекс у стеку (автоматично встановлюється)
- `offset?: number` - Зміщення для ефекту стеку (за замовчуванням 10px)

### DialogStackHeader / DialogStackTitle / DialogStackDescription
Компоненти для заголовка модального вікна.

### DialogStackFooter
Футер з кнопками навігації.

### DialogStackNext / DialogStackPrevious
Кнопки навігації між модальними вікнами.

**Props:**
- `asChild?: boolean` - Використовувати дочірній елемент як кнопку

## Приклад використання

```tsx
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
  DialogStackTrigger,
} from '~/shared/ui/molecules/dialogStack';

function MyComponent() {
  return (
    <DialogStack>
      <DialogStackTrigger asChild>
        <button>Відкрити діалог</button>
      </DialogStackTrigger>

      <DialogStackOverlay />

      <DialogStackBody>
        {/* Перше вікно */}
        <DialogStackContent>
          <DialogStackHeader>
            <DialogStackTitle>Перше вікно</DialogStackTitle>
            <DialogStackDescription>
              Опис першого вікна
            </DialogStackDescription>
          </DialogStackHeader>
          <div>Контент першого вікна</div>
          <DialogStackFooter>
            <DialogStackNext>Далі</DialogStackNext>
          </DialogStackFooter>
        </DialogStackContent>

        {/* Друге вікно */}
        <DialogStackContent>
          <DialogStackHeader>
            <DialogStackTitle>Друге вікно</DialogStackTitle>
            <DialogStackDescription>
              Опис другого вікна
            </DialogStackDescription>
          </DialogStackHeader>
          <div>Контент другого вікна</div>
          <DialogStackFooter style={{ justifyContent: 'space-between' }}>
            <DialogStackPrevious>Назад</DialogStackPrevious>
            <DialogStackNext>Далі</DialogStackNext>
          </DialogStackFooter>
        </DialogStackContent>

        {/* Третє вікно */}
        <DialogStackContent>
          <DialogStackHeader>
            <DialogStackTitle>Третє вікно</DialogStackTitle>
            <DialogStackDescription>
              Опис третього вікна
            </DialogStackDescription>
          </DialogStackHeader>
          <div>Контент третього вікна</div>
          <DialogStackFooter>
            <DialogStackPrevious>Назад</DialogStackPrevious>
          </DialogStackFooter>
        </DialogStackContent>
      </DialogStackBody>
    </DialogStack>
  );
}
```

## Контрольований стан

Ви можете контролювати стан модального вікна ззовні:

```tsx
function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogStack open={isOpen} onOpenChange={setIsOpen}>
      {/* ... */}
    </DialogStack>
  );
}
```

## Використання з asChild

Компоненти `DialogStackTrigger`, `DialogStackNext` та `DialogStackPrevious` підтримують prop `asChild`, що дозволяє використовувати власні компоненти:

```tsx
<DialogStackTrigger asChild>
  <CustomButton variant="primary">
    Відкрити діалог
  </CustomButton>
</DialogStackTrigger>

<DialogStackNext asChild>
  <CustomButton variant="secondary">
    Продовжити
  </CustomButton>
</DialogStackNext>
```

## Стилізація

Компонент використовує styled-components з emotion для стилізації. Всі стилі можна переопределити через prop `className`.

## Заміна старого Modal компонента

Цей компонент призначений для заміни старого `Modal` компонента у випадках, коли потрібна функціональність стеку модальних вікон. Для простих модальних вікон старий компонент може залишатися.
