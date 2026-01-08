import { useCompetitionContext } from '../context';
import styles from './Header.module.css';

export function Header({ children }: { children?: React.ReactNode }) {
  const { config } = useCompetitionContext();
  const { title } = config;

  return (
    <div className={styles.header}>
      {children}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
