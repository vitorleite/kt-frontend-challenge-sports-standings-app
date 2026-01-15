import type { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface RootProps {
  children: ReactNode;
  className?: string;
}

export function Root({ children, className }: RootProps) {
  return <div className={`app ${styles.root} ${className || ''}`}>{children}</div>;
}

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <div className={styles.header}>{children}</div>;
}

interface GridProps {
  children: ReactNode;
  columns: 2 | 3;
}

export function Grid({ children, columns }: GridProps) {
  return (
    <div className={styles.grid} data-columns={columns}>
      {children}
    </div>
  );
}

interface GridItemProps {
  children: ReactNode;
}

export function GridItem({ children }: GridItemProps) {
  return <div className={styles.gridItem}>{children}</div>;
}
