import styled from '@emotion/styled';
import { JSX } from 'react';

import type { TipTapNode } from '~/entities/cms2';
import { PdfViewer } from '~/shared/ui/molecules/pdfViewer';

import { Cms2CookingStepsBlock } from './Cms2CookingStepsBlock';
import { Cms2DiaryExercisesBlock } from './Cms2DiaryExercisesBlock';
import { Cms2DividerBlock } from './Cms2DividerBlock';
import { Cms2ImageBlock } from './Cms2ImageBlock';
import { Cms2IngredientsBlock } from './Cms2IngredientsBlock';
import { Cms2NutritionBlock } from './Cms2NutritionBlock';
import { Cms2VideoBlock } from './Cms2VideoBlock';

type Cms2ContentRendererProps = {
  nodes: TipTapNode[];
};

export function Cms2ContentRenderer({
  nodes,
}: Cms2ContentRendererProps): JSX.Element {
  return (
    <StyledContentWrapper>
      {nodes.map((node, index) => (
        <Cms2NodeRenderer key={index} node={node} />
      ))}
    </StyledContentWrapper>
  );
}

type Cms2NodeRendererProps = {
  node: TipTapNode;
};

function Cms2NodeRenderer({ node }: Cms2NodeRendererProps): JSX.Element | null {
  switch (node.type) {
    case 'paragraph':
      return <Cms2ParagraphRenderer node={node} />;

    case 'videoBlock':
      return (
        <Cms2VideoBlock
          src={node.attrs.src}
          platform={node.attrs.platform}
          isVertical={node.attrs.isVertical}
        />
      );

    case 'dividerBlock':
      return (
        <Cms2DividerBlock
          spacing={node.attrs.spacing}
          showLine={node.attrs.showLine}
        />
      );

    case 'pdfBlock':
      return <PdfViewer pdfSrc={node.attrs.url} />;

    case 'imageBlock':
      return (
        <Cms2ImageBlock
          src={node.attrs.src}
          alt={node.attrs.alt}
          width={node.attrs.width}
        />
      );

    case 'nutritionBlock':
      return <Cms2NutritionBlock per100g={node.attrs.per100g} />;

    case 'ingredientsBlock':
      return <Cms2IngredientsBlock ingredients={node.attrs.ingredients} />;

    case 'cookingStepsBlock':
      return <Cms2CookingStepsBlock steps={node.attrs.steps} />;

    case 'diaryExercisesBlock':
      return <Cms2DiaryExercisesBlock exercises={node.attrs.exercises} />;

    case 'orderedList':
    case 'bulletList':
      return (
        <StyledOrderedList>
          {node.content.map((item, index) => (
            <Cms2NodeRenderer key={index} node={item} />
          ))}
        </StyledOrderedList>
      );

    case 'listItem':
      return (
        <StyledListItem>
          {node.content.map((item, index) => (
            <Cms2NodeRenderer key={index} node={item} />
          ))}
        </StyledListItem>
      );

    case 'hardBreak':
      return <br />;

    default:
      return null;
  }
}

type ParagraphNode = {
  type: 'paragraph';
  attrs: { textAlign: string | null };
  content?: Array<{
    type: 'text';
    text: string;
    marks?: Array<{ type: string; attrs?: { href?: string } }>;
  }>;
};

function Cms2ParagraphRenderer({
  node,
}: {
  node: ParagraphNode;
}): JSX.Element | null {
  if (!node.content || node.content.length === 0) {
    return <StyledParagraph>&nbsp;</StyledParagraph>;
  }

  return (
    <StyledParagraph>
      {node.content.map((textNode, index) => {
        if (textNode.type !== 'text') return null;

        let text: JSX.Element | string = textNode.text;

        if (textNode.marks) {
          textNode.marks.forEach((mark) => {
            if (mark.type === 'bold') {
              text = <strong key={index}>{text}</strong>;
            }
            if (mark.type === 'italic') {
              text = <em key={index}>{text}</em>;
            }
            if (mark.type === 'link' && mark.attrs?.href) {
              text = (
                <a
                  key={index}
                  href={mark.attrs.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {text}
                </a>
              );
            }
          });
        }

        return <span key={index}>{text}</span>;
      })}
    </StyledParagraph>
  );
}

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledParagraph = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #0d0d0d;

  a {
    color: #a799ff;
    text-decoration: underline;
  }
`;

const StyledOrderedList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledListItem = styled.li`
  position: relative;
  padding-left: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #a799ff;
  }
`;
