import { ComponentType } from 'react';

type DefaultProps<T> = Partial<T> | ((props: Partial<T>) => Partial<T>);

function withAttrs<T extends object>(
  defaultProps: DefaultProps<T>,
  Component: ComponentType<T>,
): ComponentType<Partial<T>> {
  const WrappedComponent: React.FC<Partial<T>> = (props) => {
    const resolvedDefaultProps =
      typeof defaultProps === 'function' ? defaultProps(props) : defaultProps;

    const combinedProps = { ...resolvedDefaultProps, ...props } as T;

    return <Component {...combinedProps} />;
  };

  return WrappedComponent;
}

export { withAttrs };
