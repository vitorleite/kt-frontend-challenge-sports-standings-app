import { useCompetitionContext } from '../context';
import styles from './Header.module.css';

export function Header() {
  const { config } = useCompetitionContext();
  const { title, iconName } = config;

  return (
    <div className={styles.header}>
      {iconName && <img src={iconName} alt={`${title} logo`} className={styles.icon} />}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
