import styled from '@emotion/styled';
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
  DialogStackTrigger,
} from '~/shared/ui/molecules/dialogStack';

export function ExampleDialogStack(): JSX.Element {
  return (
    <ExampleContainer>
      <h2>Приклад DialogStack</h2>

      <DialogStack>
        <DialogStackTrigger asChild>
          <StyledButton>Відкрити діалог</StyledButton>
        </DialogStackTrigger>

        <DialogStackOverlay />

        <DialogStackBody>
          {/* Перше модальне вікно */}
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Перше модальне вікно</DialogStackTitle>
              <DialogStackDescription>
                Це перше вікно у стеку. Натисніть "Далі", щоб перейти до
                наступного.
              </DialogStackDescription>
            </DialogStackHeader>
            <Content>
              <p>
                Тут може бути будь-який контент для першого модального вікна.
              </p>
            </Content>
            <DialogStackFooter>
              <DialogStackNext asChild>
                <StyledButton>Далі</StyledButton>
              </DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          {/* Друге модальне вікно */}
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Друге модальне вікно</DialogStackTitle>
              <DialogStackDescription>
                Це друге вікно. Ви можете повернутися назад або перейти далі.
              </DialogStackDescription>
            </DialogStackHeader>
            <Content>
              <p>Контент другого модального вікна.</p>
              <ul>
                <li>Елемент списку 1</li>
                <li>Елемент списку 2</li>
                <li>Елемент списку 3</li>
              </ul>
            </Content>
            <DialogStackFooter style={{ justifyContent: 'space-between' }}>
              <DialogStackPrevious asChild>
                <StyledSecondaryButton>Назад</StyledSecondaryButton>
              </DialogStackPrevious>
              <DialogStackNext asChild>
                <StyledButton>Далі</StyledButton>
              </DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          {/* Третє модальне вікно */}
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Третє модальне вікно</DialogStackTitle>
              <DialogStackDescription>
                Це останнє вікно у стеку. Ви можете тільки повернутися назад.
              </DialogStackDescription>
            </DialogStackHeader>
            <Content>
              <p>Фінальний контент.</p>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                }}
              >
                <strong>Завершення процесу</strong>
                <p>Ви успішно пройшли через всі кроки!</p>
              </div>
            </Content>
            <DialogStackFooter>
              <DialogStackPrevious asChild>
                <StyledSecondaryButton>Назад</StyledSecondaryButton>
              </DialogStackPrevious>
            </DialogStackFooter>
          </DialogStackContent>
        </DialogStackBody>
      </DialogStack>
    </ExampleContainer>
  );
}

const ExampleContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  background-color: #7a66ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #6854e6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledSecondaryButton = styled.button`
  padding: 12px 24px;
  background-color: white;
  color: #0d0d0d;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  margin: 16px 0;

  p {
    margin: 0 0 12px 0;
    line-height: 1.5;
  }

  ul {
    margin: 12px 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
  }
`;
