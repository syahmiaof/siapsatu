import Image from "next/image";
import styles from "./MalaysiaBackdrop.module.css";
/** Independent intrinsic layers: ribbons may flow; the emblem never stretches or crops. */
export function MalaysiaBackdrop({
  className = "",
  city = false,
}: {
  className?: string;
  city?: boolean;
}) {
  return (
    <div className={className} aria-hidden="true" data-malaysia-layers>
      <Image
        className={styles.ribbon}
        src="/assets/illustrations/ui-v3/home-ribbon.svg"
        alt=""
        width={900}
        height={580}
        unoptimized
      />
      <Image
        className={styles.emblem}
        src="/assets/illustrations/ui-v3/emblem.svg"
        alt=""
        width={162}
        height={100}
        unoptimized
      />
      <Image
        className={styles.arrow}
        src="/assets/illustrations/ui-v3/growth-arrow.svg"
        alt=""
        width={320}
        height={340}
        unoptimized
      />
      {city && (
        <Image
          className={styles.city}
          src="/assets/illustrations/ui-v3/kl-skyline.svg"
          alt=""
          width={328}
          height={294}
          unoptimized
        />
      )}
    </div>
  );
}
