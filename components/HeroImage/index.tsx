import IsomorphicImage from "../IsomorphicImage";
import styles from "./HeroImage.module.scss";

interface Props {}

function HeroImage({ image }: { image: string }) {
  return (
    <div className={styles.heroImage}>
      <IsomorphicImage
        src={image}
        alt={"Hero Image"}
        width={1920}
        height={1080}
      />
    </div>
  );
}

export default HeroImage;
