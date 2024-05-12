import { Facebook, Linkedin, Twitter } from "lucide-react"
import { useLocale } from "@/i18n/i18n"
import { getTranslations } from "@/i18n/setTranslations"

type ShareOnSocialProps = {
  articleTitle: string
  articleUrl: string
}

export function ShareOnSocial({ articleTitle, articleUrl }: ShareOnSocialProps) {
  const translations = getTranslations()

  const locale = useLocale()
  const encodedTitle = encodeURIComponent(articleTitle)
  const encodedUrl = encodeURIComponent(articleUrl)

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${articleUrl}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`

  return (
    <div className="flex items-center justify-between gap-2 py-5 lg:justify-normal">
      <p className="pr-3 text-sm opacity-60">{translations.shareOnSocial}:</p>
      <div className="flex items-center gap-2">
        <a href={twitterShareUrl} aria-label="Twitter" hrefLang={locale} className="rounded-xl bg-black p-2">
          <Twitter fill="white" stroke="none" />
        </a>
        <a href={facebookShareUrl} aria-label="Facebook" hrefLang={locale} className="rounded-xl bg-black p-2">
          <Facebook fill="white" stroke="none" />
        </a>
        <a href={linkedinShareUrl} aria-label="Linkedin" hrefLang={locale} className="rounded-xl bg-black p-2">
          <Linkedin fill="white" stroke="none" />
        </a>
      </div>
    </div>
  )
}
