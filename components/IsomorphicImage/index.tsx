import Image from "next/image";

const isServer = typeof window === "undefined";

interface Props {
  src: string;
  alt: string;
  key?: string;
  width: number;
  height: number;
  fill?: boolean;
}

const IsomorphicImage = ({ src, alt, key, width, height, fill }: Props) => {
  return isServer ? (
    fill ? (
      <img src={src} alt={alt} key={key} />
    ) : (
      <img src={src} alt={alt} key={key} width={width} height={height} />
    )
  ) : fill ? (
    <Image src={src} alt={alt} key={key} fill />
  ) : (
    <Image src={src} alt={alt} key={key} width={width} height={height} />
  );
};

export default IsomorphicImage;
