/**
 * Personalised demo previews used by /preview/[slug].
 *
 * Each entry powers a category-specific template ("kapper", "restaurant",
 * "tandarts"). Add a new entry here and a deploy will statically prerender
 * /preview/<slug> for it.
 */

export type PreviewCategory = "kapper" | "restaurant" | "tandarts";

export type Preview = {
  slug: string;
  businessName: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  category: PreviewCategory;
  /** Optional hero photo URL (Unsplash works directly). */
  heroImage?: string;
  /** Optional street address shown on the contact block. */
  address?: string;
  /** Optional opening hours line. Plain string, kept short. */
  hours?: string;
};

export const previews: Preview[] = [
  {
    slug: "kapsalon-yara",
    businessName: "Kapsalon Yara",
    tagline: "Knip. Kleur. Vertrouwen.",
    location: "Emmen",
    phone: "0591-123456",
    email: "info@kapsalonyara.nl",
    category: "kapper",
    address: "Hoofdstraat 14, 7811 EA Emmen",
    hours: "Di–Za · 09:00 – 18:00",
  },
  {
    slug: "bistro-de-haven",
    businessName: "Bistro De Haven",
    tagline: "Eerlijk koken aan het water.",
    location: "Den Haag",
    phone: "070-3214567",
    email: "reserveren@bistrodehaven.nl",
    category: "restaurant",
    address: "Scheveningseweg 88, 2517 KX Den Haag",
    hours: "Wo–Zo · 17:00 – 23:00",
  },
  {
    slug: "tandartspraktijk-zilverberg",
    businessName: "Tandartspraktijk Zilverberg",
    tagline: "Rustige zorg, scherp resultaat.",
    location: "Zwolle",
    phone: "038-4567890",
    email: "info@zilverberg.nl",
    category: "tandarts",
    address: "Zuiderlaan 21, 8011 PA Zwolle",
    hours: "Ma–Vr · 08:00 – 17:30",
  },
];

const previewBySlug = new Map(previews.map((p) => [p.slug, p]));

export function getPreview(slug: string): Preview | undefined {
  return previewBySlug.get(slug);
}

export function getAllPreviewSlugs(): string[] {
  return previews.map((p) => p.slug);
}
