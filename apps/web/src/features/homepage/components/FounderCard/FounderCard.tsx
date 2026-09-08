import Image from "next/image";
import styles from "./FounderCard.module.css";

interface FounderCardProps {
  name: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export function FounderCard({ name, title, imageSrc, imageAlt }: FounderCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.background}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={200}
          height={200}
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}
