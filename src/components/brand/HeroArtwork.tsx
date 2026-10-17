import { ReferenceArtwork } from "./ReferenceArtwork";

export function HeroArtwork({ catalog = false }: { catalog?: boolean }) {
  return <ReferenceArtwork variant={catalog ? "catalog" : "home"} />;
}
