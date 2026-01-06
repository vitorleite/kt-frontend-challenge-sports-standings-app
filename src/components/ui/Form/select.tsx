import { cva, type VariantProps } from 'class-variance-authority';
import styles from './select.module.css';

const select = cva(styles.select, {
  variants: {
    size: {
      full: styles.block
    },
    variant: {
      default: styles.default
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>, VariantProps<typeof select> {}

export const Select: React.FC<SelectProps> = ({ size, variant, ...props }) => (
  <select className={select({ size, variant })} {...props} />
);
