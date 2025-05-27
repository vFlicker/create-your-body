import styled from '@emotion/styled';

import { Color } from '~/shared/theme/colors';

const StyledPdfViewerText = styled.p`
  margin-top: 24px;
  font-size: 14px;
  color: ${Color.Black_950};
  font-weight: 500;
`;

const StyledPdfViewerLink = styled.a`
  font-weight: 700;
  color: ${Color.Violet_100};
  text-decoration: underline;
`;

export const pdfViewerAddition = {
  '67e68b630e3f348f8806f42f': (
    <StyledPdfViewerText>
      Рассчитать свою дневную калорийность можно на этих сайтах
      <br />
      <br />
      <StyledPdfViewerLink href="https://www.calc.ru/kalkulyator-kalorii.html">
        https://www.calc.ru/kalkulyator-kalорii.html
      </StyledPdfViewerLink>
      <br />
      <br />
      <StyledPdfViewerLink href="https://www.yournutrition.ru/calories/">
        https://www.yournutrition.ru/calories/
      </StyledPdfViewerLink>
      <br />
      <br />
      Как рассчитать свое КБЖУ(подробное видео)
      <br />
      <br />
      <StyledPdfViewerLink href="https://cloud.mail.ru/public/xghf/QTxissgf7">
        https://cloud.mail.ru/public/xghf/QTxissgf7
      </StyledPdfViewerLink>
    </StyledPdfViewerText>
  ),
  '67e68bdb0e3f348f8806f433': (
    <StyledPdfViewerText>
      Как подогнать свое кбжу:
      <br />
      <br />
      <StyledPdfViewerLink href="https://cloud.mail.ru/public/WHsZ/WKY7Egu4P">
        https://cloud.mail.ru/public/WHsZ/WKY7Egu4P
      </StyledPdfViewerLink>
    </StyledPdfViewerText>
  ),
  '67e68b020e3f348f8806f422': (
    <StyledPdfViewerText>
      Рассчитать свою дневную калорийность можно на этих сайтах
      <br />
      <br />
      <StyledPdfViewerLink href="https://www.calc.ru/kalkulyator-kalorii.html">
        https://www.calc.ru/kalkulyator-kалорii.html
      </StyledPdfViewerLink>
      <br />
      <br />
      <StyledPdfViewerLink href="https://www.yournutrition.ru/calories/">
        https://www.yournutrition.ru/calories/
      </StyledPdfViewerLink>
    </StyledPdfViewerText>
  ),
};
