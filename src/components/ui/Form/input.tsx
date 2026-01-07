import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import styles from './input.module.css';

const input = cva(styles.input, {
  variants: {
    size: {
      full: styles.block
    },
    variant: {
      error: styles.error
    }
  }
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof input> {}

export const InputText = forwardRef<HTMLInputElement, InputProps>(({ size, variant, ...props }, ref) => (
  <input ref={ref} className={input({ size, variant })} {...props} />
));

InputText.displayName = 'InputText';
