'use client';
import styled from '@emotion/styled';
import {
  ButtonHTMLAttributes,
  Children,
  cloneElement,
  createContext,
  Dispatch,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Color } from '~/shared/theme/colors';

import { ReactPortal } from '../modal/ReactPortal';

type DialogStackContextType = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  totalDialogs: number;
  setTotalDialogs: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  clickable: boolean;
};

const DialogStackContext = createContext<DialogStackContextType>({
  activeIndex: 0,
  setActiveIndex: () => {},
  totalDialogs: 0,
  setTotalDialogs: () => {},
  isOpen: false,
  setIsOpen: () => {},
  clickable: false,
});

type DialogStackChildProps = {
  index?: number;
};

export type DialogStackProps = PropsWithChildren<{
  open?: boolean;
  clickable?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
}>;

export function DialogStack({
  children,
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  clickable = false,
}: DialogStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  useEffect(() => {
    if (onOpenChange && isOpen !== undefined) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  const handleSetIsOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const newValue = typeof value === 'function' ? value(isOpen) : value;
      setIsOpen(newValue);
      onOpenChange?.(newValue);
    },
    [isOpen, onOpenChange],
  );

  return (
    <DialogStackContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        totalDialogs: 0,
        setTotalDialogs: () => {},
        isOpen: isOpen ?? false,
        setIsOpen: handleSetIsOpen,
        clickable,
      }}
    >
      <div className={className}>{children}</div>
    </DialogStackContext.Provider>
  );
}

export type DialogStackTriggerProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

export function DialogStackTrigger({
  children,
  className,
  onClick,
  asChild,
  ...props
}: DialogStackTriggerProps) {
  const context = useContext(DialogStackContext);
  if (!context) {
    throw new Error('DialogStackTrigger must be used within a DialogStack');
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    context.setIsOpen(true);
    onClick?.(e);
  };

  if (asChild && children) {
    const child = children as ReactElement<{
      onClick: MouseEventHandler<HTMLButtonElement>;
      className?: string;
    }>;
    return cloneElement(child, {
      onClick: (e: MouseEvent<HTMLButtonElement>) => {
        handleClick(e);
        child.props.onClick?.(e);
      },
      className: `${className || ''} ${child.props.className || ''}`.trim(),
      ...props,
    });
  }

  return (
    <StyledTriggerButton className={className} onClick={handleClick} {...props}>
      {children}
    </StyledTriggerButton>
  );
}

export type DialogStackOverlayProps = HTMLAttributes<HTMLDivElement>;

export function DialogStackOverlay({
  className,
  ...props
}: DialogStackOverlayProps) {
  const context = useContext(DialogStackContext);
  if (!context) {
    throw new Error('DialogStackOverlay must be used within a DialogStack');
  }

  const handleClick = useCallback(() => {
    context.setIsOpen(false);
  }, [context]);

  if (!context.isOpen) {
    return null;
  }

  return (
    <ReactPortal wrapperId="dialog-stack-overlay">
      <StyledOverlay className={className} onClick={handleClick} {...props} />
    </ReactPortal>
  );
}

export type DialogStackBodyProps = HTMLAttributes<HTMLDivElement> & {
  children:
    | ReactElement<DialogStackChildProps>[]
    | ReactElement<DialogStackChildProps>;
};

export function DialogStackBody({
  children,
  className,
  ...props
}: DialogStackBodyProps) {
  const context = useContext(DialogStackContext);
  const [totalDialogs, setTotalDialogs] = useState(Children.count(children));

  if (!context) {
    throw new Error('DialogStackBody must be used within a DialogStack');
  }

  if (!context.isOpen) {
    return null;
  }

  return (
    <DialogStackContext.Provider
      value={{
        ...context,
        totalDialogs,
        setTotalDialogs,
      }}
    >
      <ReactPortal wrapperId="dialog-stack-body">
        <StyledBodyContainer className={className} {...props}>
          <StyledBodyInner>
            {Children.map(children, (child, index) => {
              const childElement = child as ReactElement<{
                index: number;
                onClick: MouseEventHandler<HTMLButtonElement>;
                className?: string;
              }>;
              return cloneElement(childElement, {
                ...childElement.props,
                index,
              });
            })}
          </StyledBodyInner>
        </StyledBodyContainer>
      </ReactPortal>
    </DialogStackContext.Provider>
  );
}

export type DialogStackContentProps = HTMLAttributes<HTMLDivElement> & {
  index?: number;
  offset?: number;
};

export function DialogStackContent({
  children,
  className,
  index = 0,
  offset = 10,
  ...props
}: DialogStackContentProps) {
  const context = useContext(DialogStackContext);
  if (!context) {
    throw new Error('DialogStackContent must be used within a DialogStack');
  }

  if (!context.isOpen) {
    return null;
  }

  const handleClick = () => {
    if (context.clickable && context.activeIndex > index) {
      context.setActiveIndex(index ?? 0);
    }
  };

  const distanceFromActive = index - context.activeIndex;
  const translateY =
    distanceFromActive < 0
      ? `-${Math.abs(distanceFromActive) * offset}px`
      : `${Math.abs(distanceFromActive) * offset}px`;

  return (
    <StyledContent
      className={className}
      onClick={handleClick}
      style={{
        top: 0,
        transform: `translateY(${translateY})`,
        width: `calc(100% - ${Math.abs(distanceFromActive) * 10}px)`,
        zIndex: 50 - Math.abs(context.activeIndex - (index ?? 0)),
        position: distanceFromActive ? 'absolute' : 'relative',
        opacity: distanceFromActive > 0 ? 0 : 1,
        cursor:
          context.clickable && context.activeIndex > index
            ? 'pointer'
            : 'default',
      }}
      {...props}
    >
      <StyledContentInner isActive={context.activeIndex === index}>
        {children}
      </StyledContentInner>
    </StyledContent>
  );
}

export type DialogStackTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function DialogStackTitle({
  children,
  className,
  ...props
}: DialogStackTitleProps) {
  return (
    <StyledTitle className={className} {...props}>
      {children}
    </StyledTitle>
  );
}

export type DialogStackDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function DialogStackDescription({
  children,
  className,
  ...props
}: DialogStackDescriptionProps) {
  return (
    <StyledDescription className={className} {...props}>
      {children}
    </StyledDescription>
  );
}

export type DialogStackHeaderProps = HTMLAttributes<HTMLDivElement>;

export function DialogStackHeader({
  className,
  children,
  ...props
}: DialogStackHeaderProps) {
  return (
    <StyledHeader className={className} {...props}>
      {children}
    </StyledHeader>
  );
}

export type DialogStackFooterProps = HTMLAttributes<HTMLDivElement>;

export function DialogStackFooter({
  children,
  className,
  ...props
}: DialogStackFooterProps) {
  return (
    <StyledFooter className={className} {...props}>
      {children}
    </StyledFooter>
  );
}

export type DialogStackNextProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export function DialogStackNext({
  children,
  className,
  asChild,
  ...props
}: DialogStackNextProps) {
  const context = useContext(DialogStackContext);
  if (!context) {
    throw new Error('DialogStackNext must be used within a DialogStack');
  }

  const handleNext = () => {
    if (context.activeIndex < context.totalDialogs - 1) {
      context.setActiveIndex(context.activeIndex + 1);
    }
  };

  if (asChild && children) {
    const child = children as ReactElement<{
      onClick: MouseEventHandler<HTMLButtonElement>;
      className?: string;
    }>;
    return cloneElement(child, {
      onClick: (e: MouseEvent<HTMLButtonElement>) => {
        handleNext();
        child.props.onClick?.(e);
      },
      className: `${className || ''} ${child.props.className || ''}`.trim(),
      ...props,
    });
  }

  return (
    <StyledButton
      className={className}
      disabled={context.activeIndex >= context.totalDialogs - 1}
      onClick={handleNext}
      type="button"
      {...props}
    >
      {children || 'Далі'}
    </StyledButton>
  );
}

export type DialogStackPreviousProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

export function DialogStackPrevious({
  children,
  className,
  asChild,
  ...props
}: DialogStackPreviousProps) {
  const context = useContext(DialogStackContext);
  if (!context) {
    throw new Error('DialogStackPrevious must be used within a DialogStack');
  }

  const handlePrevious = () => {
    if (context.activeIndex > 0) {
      context.setActiveIndex(context.activeIndex - 1);
    }
  };

  if (asChild && children) {
    const child = children as ReactElement<{
      onClick: MouseEventHandler<HTMLButtonElement>;
      className?: string;
    }>;
    return cloneElement(child, {
      onClick: (e: MouseEvent<HTMLButtonElement>) => {
        handlePrevious();
        child.props.onClick?.(e);
      },
      className: `${className || ''} ${child.props.className || ''}`.trim(),
      ...props,
    });
  }

  return (
    <StyledButton
      className={className}
      disabled={context.activeIndex <= 0}
      onClick={handlePrevious}
      type="button"
      {...props}
    >
      {children || 'Назад'}
    </StyledButton>
  );
}

// Styled components
const StyledTriggerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  outline: none;
  border: none;
  cursor: pointer;

  padding: 12px 16px;
  background-color: #7a66ff;
  color: ${Color.White};

  &:hover {
    background-color: #6854e6;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledBodyContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  margin: auto;
  display: flex;
  width: 100%;
  max-width: 32rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledBodyInner = styled.div`
  pointer-events: auto;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  height: auto;
  width: 100%;
  border-radius: 20px 20px 0 0;
  border: none;
  background-color: ${Color.White};
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const StyledContentInner = styled.div<{ isActive: boolean }>`
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  user-select: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: #0d0d0d;
  margin: 0;
`;

const StyledDescription = styled.p`
  color: #666666;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  margin-bottom: 24px;
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  outline: none;
  border: 1px solid #e5e5e5;
  cursor: pointer;

  padding: 8px 16px;
  background-color: ${Color.White};
  color: #0d0d0d;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
