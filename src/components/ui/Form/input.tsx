import { cva, type VariantProps } from 'class-variance-authority';
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

export const InputText: React.FC<InputProps> = ({ size, variant, ...props }) => (
  <input className={input({ size, variant })} {...props} />
);
