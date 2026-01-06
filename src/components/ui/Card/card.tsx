import styles from './card.module.css';

const Root: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children }) => (
  <div className={styles.card}>{children}</div>
);

const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children }) => (
  <h4 className={styles.title}>{children}</h4>
);

const Card = { Root, Title };

export default Card;
