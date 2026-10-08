import type { ComponentPropsWithRef, ElementType } from 'react';

/**
 * Props for a component that renders `as` any element/component.
 * Own props win over the element's native props.
 */
export type PolymorphicProps<E extends ElementType, Own = object> = Own & {
  as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof Own | 'as'>;
