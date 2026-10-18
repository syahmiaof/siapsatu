import Image from "next/image";
import Link from "next/link";
import styles from "./ImageFirstHome.module.css";

/** The source dock is cropped out of the page and rendered exactly once, fixed. */
export function HomeReferenceDock() {
  return (
    <nav className={styles.dock} aria-label="Navigasi Bawah" data-fixed-dock>
      <div className={styles.dockVisual}>
        <Image src="/assets/home/build-with-ai-v3/dock-mobile.webp" alt="" width={809} height={76} unoptimized />
        {[
          { name: "Home", href: "/" },
          { name: "Modul", href: "/modules" },
          { name: "Tools", href: "/tools" },
          { name: "Profil", href: "/library" },
        ].map(({ name, href }) => (
          <Link key={href} href={href} aria-label={name} aria-current={href === "/" ? "page" : undefined} className={styles.dockLink}>
            <span className="sr-only">{name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
