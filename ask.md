Я створюю фітнес застосунок. В ньому є підписки, відео з тренуваннями, щоденник тренувань та інше. Зараз, я роблю "Тренажер по підпору КБЖВ". Він знаходиться на сторінці `/bmi-calculator/quiz` (можливо трошки не вдалий роут, по на `/bmi-calculator` просто екран з кнопкою "Почати").

Я вже написав весь функціонал, але, мені здається, у мене є проблеми з розумінням архітектури, і можливо, я допустився де-яких помилок. Я використовую методологію Feature-Sliced Design (https://feature-sliced.design/). У мене є думки, що функції бізнес логіки, такі як `calculateBmi`, `calculateBmr`, `calculateProteins`, лежать не там де потрібно. А також я не впевнений чи в правильному місці лежать ProteinScreen, ActivityScreen, EnterParametersScreen та інші екрани, можливо, features в має бути компонент `BmiCalculator` який матиме шматок коду з компоненту `BmiCalculatorQuizPage`:

```tsx
  <StyledContent>
  <StyledStepProgressBar
    title="Базовый обмен"
    currentStep={step}
    totalSteps={screens.length}
  />

  {screens[step - 1]}
</StyledContent>
```

І всі ці екрани, теж мають бути в `features/bmiCalculator`. Я думаю про те, що є сенс зробити компонент `BmiCalculator`, який об'єднає всі ці екрани та логіку в одному місці, і буде мати свої "під фічі", частинки UIю, `chooseActivity`, `chooseGoal`, `toggleHasExtraWeight` з яких від складається.

Я хочу мати зрозумілий і надійний код, щоб всі основні ідеї Feature-Sliced Design підтримувалися, щоб мій код мав Low Coupling і High Cohesion. Поясни мені, як чи маю я помилки в архітектурі.