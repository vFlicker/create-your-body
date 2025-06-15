import styled from '@emotion/styled';
import { JSX } from 'react';

type TextBlockProps = {
  text: string;
};

export function TextBlock({ text }: TextBlockProps): JSX.Element {
  return <StyledTextBlockWrapper dangerouslySetInnerHTML={{ __html: text }} />;
}

const StyledTextBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: #0d0d0d;
  font-size: 14px;

  ol {
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      position: relative;

      display: flex;
      gap: 8px;
      padding-left: 16px;

      &::before {
        content: '';

        position: absolute;
        left: 0;
        top: 3px;

        width: 8px;
        height: 8px;
        border-radius: 50%;

        background-color: #a799ff;
      }

      &::marker {
        display: none;
      }
    }
  }
`;
