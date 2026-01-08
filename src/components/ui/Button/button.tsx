import { cva, type VariantProps } from 'class-variance-authority';
import styles from './button.module.css';

const button = cva(styles.button, {
  variants: {
    intent: {
      primary: styles.primary,
      secondary: styles.secondary
    },
    size: {
      auto: '',
      sm: styles.sizeSm,
      block: styles.block
    }
  },
  defaultVariants: {
    intent: 'primary',
    size: 'auto'
  }
});

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({ className, intent, size, ...props }) => (
  <button className={button({ intent, size, className })} {...props} />
);
