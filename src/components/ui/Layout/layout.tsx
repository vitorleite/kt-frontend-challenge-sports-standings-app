import { cva, type VariantProps } from 'class-variance-authority';
import styles from './layout.module.css';

const stack = cva(styles.stack, {
  variants: {
    direction: {
      row: styles.row,
      column: styles.column
    },
    gap: {
      none: styles.gapNone,
      sm: styles.gapSm,
      md: styles.gapMd,
      lg: styles.gapLg
    },
    padding: {
      none: styles.paddingNone,
      sm: styles.paddingSm,
      md: styles.paddingMd,
      lg: styles.paddingLg
    }
  },
  defaultVariants: {
    gap: 'md',
    padding: 'none'
  }
});

export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stack> {}

export const Row: React.FC<StackProps> = ({ className, gap, padding, ...props }) => (
  <div className={stack({ direction: 'row', gap, padding, className })} {...props} />
);

export const Column: React.FC<StackProps> = ({ className, gap, padding, ...props }) => (
  <div className={stack({ direction: 'column', gap, padding, className })} {...props} />
);
