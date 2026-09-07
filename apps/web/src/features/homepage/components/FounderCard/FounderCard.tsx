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
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className={styles.background}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}
