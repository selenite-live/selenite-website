import { Download } from "lucide-react";
import { Fragment } from "react";

import { Metadata } from "next";
import { useTranslations } from "next-intl";

import { Button } from "@/components/_ui/button";
import Hero from "@/components/wiki/hero/hero";

const title = "Documents de présentation de Selenite: Lost Contact - Histoire, visuels et immersion";

const description =
  "Découvrez l'ensemble des documents de présentation de Selenite: Lost Contact, un jeu de pilotage sur la Lune. Plongez dans son histoire, ses visuels et son atmosphère immersive.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/images/banner.png"],
  },
  robots: "index, follow",
};

const filesSources: string[] = ["project-report.pdf", "product-sheet.pdf", "communications-plan.pdf"];

export default function DocumentsPage() {
  const t = useTranslations("Design.Documents");

  return (
    <Fragment>
      <Hero title={t("title")} subtitle={t("subtitle")} description={t("description")} />
      <section
        className={`flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-8 font-poppins text-foreground`}
      >
        <div className="w-full max-w-6xl space-y-8">
          <h2 className="text-2xl font-bold">{t("pdfSectionTitle")}</h2>

          {filesSources.map((file) => (
            <div key={file} className="overflow-hidden rounded-lg border bg-background shadow-md">
              <div className="flex items-center justify-between bg-secondary/10 p-4">
                <h3 className="text-xl font-semibold">{t(file.replace(".pdf", "-title"))}</h3>
                <a href={`/pdf/${file}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    {t("downloadPdf")}
                  </Button>
                </a>
              </div>
              <div className="p-4">
                <iframe
                  suppressHydrationWarning
                  src={`/pdf/${file}`}
                  width="100%"
                  height="600"
                  className="rounded-lg border"
                >
                  <p>{t("pdfNotSupported")}</p>
                </iframe>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
