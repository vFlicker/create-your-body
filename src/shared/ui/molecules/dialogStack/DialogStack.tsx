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
  useState,
} from 'react';

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
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}>;

export function DialogStack({
  children,
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  clickable = false,
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
}: DialogStackProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // Use controlled values if provided, otherwise use internal
  const activeIndex =
    controlledActiveIndex !== undefined
      ? controlledActiveIndex
      : internalActiveIndex;

  const isOpen = open !== undefined ? open : internalIsOpen;

  const setActiveIndex = useCallback(
    (index: number | ((prev: number) => number)) => {
      const newIndex = typeof index === 'function' ? index(activeIndex) : index;
      if (onActiveIndexChange) {
        onActiveIndexChange(newIndex);
      } else {
        setInternalActiveIndex(newIndex);
      }
    },
    [activeIndex, onActiveIndexChange],
  );

  const handleSetIsOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const newValue = typeof value === 'function' ? value(isOpen) : value;
      if (open !== undefined) {
        // Controlled mode - notify parent
        onOpenChange?.(newValue);
      } else {
        // Uncontrolled mode - update internal state
        setInternalIsOpen(newValue);
        onOpenChange?.(newValue);
      }
    },
    [isOpen, onOpenChange, open],
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
    <button
      className={className}
      disabled={context.activeIndex <= 0}
      onClick={handlePrevious}
      type="button"
      {...props}
    >
      {children || 'Назад'}
    </button>
  );
}

// Styled components
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
  background-color: white;
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
