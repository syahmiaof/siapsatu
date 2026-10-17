import Image from "next/image";
import styles from "./ReferenceArtwork.module.css";

const artwork = {
  home: { file: "home", width: 905, height: 575 },
  tools: { file: "tools", width: 765, height: 234 },
  path: { file: "path-learner", width: 765, height: 391 },
  community: { file: "community", width: 870, height: 198 },
} as const;

/** User-authorized source crops; functional UI is excluded by reproducible masks. */
export function ReferenceArtwork({ variant }: { variant: keyof typeof artwork }) {
  const asset = artwork[variant];
  return (
    <div className={`${styles.scene} ${styles[variant]}`} data-hero-art data-reference-art={variant} aria-hidden="true">
      <picture>
        {variant === "home" && <source media="(max-width:700px)" srcSet="/assets/illustrations/reference/home-mobile.webp" width={905} height={535} />}
        {variant === "tools" && <source media="(max-width:600px)" srcSet="/assets/illustrations/reference/tools-mobile.webp" width={473} height={416} />}
        <Image src={`/assets/illustrations/reference/${asset.file}.webp`} width={asset.width} height={asset.height} alt="" priority unoptimized />
      </picture>
    </div>
  );
}
