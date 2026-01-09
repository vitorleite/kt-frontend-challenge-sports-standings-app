import type { SVGProps } from 'react';
import styles from './Wimbledon.module.css';

export function WonCell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wonCell}>
      {children} <CheckIcon className={styles.checkIcon} />
    </div>
  );
}

export function LostCell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.lostCell}>
      {children} <CrossIcon className={styles.crossIcon} />
    </div>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path fill="currentColor" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z" />
    </svg>
  );
}

export function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill="currentColor"
        d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
      />
    </svg>
  );
}
