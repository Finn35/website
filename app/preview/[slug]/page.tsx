import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FloatingCta } from "@/components/preview/FloatingCta";
import { KapperTemplate } from "@/components/preview/KapperTemplate";
import { PreviewBanner } from "@/components/preview/PreviewBanner";
import { PreviewFooter } from "@/components/preview/PreviewFooter";
import { RestaurantTemplate } from "@/components/preview/RestaurantTemplate";
import { TandartsTemplate } from "@/components/preview/TandartsTemplate";
import {
  getAllPreviewSlugs,
  getPreview,
  type Preview,
} from "@/data/previews";

type Params = { slug: string };

/**
 * Pre-build a static HTML file for every known preview slug so they load
 * instantly when the prospect opens the link from their email/SMS.
 */
export function generateStaticParams(): Params[] {
  return getAllPreviewSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const preview = getPreview(params.slug);
  if (!preview) {
    return { title: "Voorbeeld niet gevonden" };
  }
  return {
    title: `${preview.businessName} — voorbeeldwebsite door Lumeq`,
    description: `Een gratis voorbeeldwebsite voor ${preview.businessName} in ${preview.location}. Gemaakt door Lumeq.`,
    // Don't let Google index these personalised demos.
    robots: { index: false, follow: false },
    openGraph: {
      title: `${preview.businessName} — voorbeeld door Lumeq`,
      description: `Een gratis voorbeeldwebsite voor ${preview.businessName}.`,
      type: "website",
      locale: "nl_NL",
    },
  };
}

export default function PreviewPage({ params }: { params: Params }) {
  const preview = getPreview(params.slug);
  if (!preview) notFound();

  return (
    <div className="min-h-screen bg-canvas">
      <PreviewBanner businessName={preview.businessName} />
      <Template preview={preview} />
      <PreviewFooter preview={preview} />
      <FloatingCta businessName={preview.businessName} />
    </div>
  );
}

function Template({ preview }: { preview: Preview }) {
  switch (preview.category) {
    case "kapper":
      return <KapperTemplate preview={preview} />;
    case "restaurant":
      return <RestaurantTemplate preview={preview} />;
    case "tandarts":
      return <TandartsTemplate preview={preview} />;
  }
}
