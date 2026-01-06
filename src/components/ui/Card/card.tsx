import styles from './card.module.css';

const Root: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => (
  <div className={styles.card} {...props} />
);

const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ ...props }) => (
  <h4 className={styles.title} {...props} />
);

const Card = { Root, Title };

export default Card;
