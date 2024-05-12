import { Metadata } from "next/types"
import { unstable_setRequestLocale } from "next-intl/server"
import { CategoryArticles } from "@/components/CategoryArticles/CategoryArticles"
import { Locale } from "@/i18n/i18n"
import { setTranslations } from "@/i18n/setTranslations"
import { getMatadataObj } from "@/utils/getMetadataObj"

type ArticlePageProps = { params: { slug: string; lang: Locale } }

export async function generateMetadata({ params: { slug } }: ArticlePageProps): Promise<Metadata | null> {
  return getMatadataObj({ title: `Category - ${slug}` })
}

export default async function Web({ params: { slug, lang } }: ArticlePageProps) {
  unstable_setRequestLocale(lang)
  await setTranslations(lang)

  return <CategoryArticles category={slug} />
}
