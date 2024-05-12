import { RichTextContent } from "@graphcms/rich-text-types"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/i18n/i18n"
import { cn } from "@/utils/cn"
import { ArticlePublishDetails } from "./ArticlePublishDetails"
import { Tag } from "./Buttons/Tag"
import { RichText } from "../RichText/RichText"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip/Tooltip"

type ArticleCardProps = {
  article: {
    imageAlt?: string
    imageUrl?: string
    title: string
    publicationDate: string | null
    tags: string[]
    slug: string
    content?: { raw: RichTextContent } | null
    author: {
      name: string
      imageUrl?: string
    }
  }
  tagsPosition?: "over" | "under"
  orientation?: "vertical" | "horizontal"
  lines?: "1" | "2" | "3"
  isMain?: boolean
  imageClassName?: string
}

export const hygraphArticleToCardProps = (article: {
  tags: { tag: string }[]
  title: string
  author?: { name: string; avatar?: { data: { url: string } } | undefined | null } | null
  image?: { data: { url: string }; description?: { text: string } | undefined | null } | null
  publishedAt?: string
  content?: { raw: RichTextContent } | null
  slug: string
}) => {
  return {
    tags: article?.tags?.map(({ tag }) => tag),
    imageUrl: article?.image?.data?.url,
    imageAlt: article.image?.description?.text,
    title: article?.title,
    content: article?.content,
    author: { name: article?.author?.name ?? "Anonymous", imageUrl: article?.author?.avatar?.data?.url },
    publicationDate: article?.publishedAt ? article.publishedAt : null,
    slug: article?.slug,
  }
}

const MAX_TAGS_TO_DISPLAY = 3

export function ArticleCard({
  article: { imageUrl, imageAlt, title, publicationDate, author, tags, slug, content },
  tagsPosition = "under",
  orientation = "vertical",
  lines = "2",
  isMain = false,
  imageClassName,
}: ArticleCardProps) {
  const locale = useLocale()
  const mainTag = tags?.[0]
  return (
    <Link href={`/${locale}/article/${slug}`} hrefLang={locale} className="w-full">
      <article
        className={cn(
          orientation === "vertical" && "flex-row md:flex-col",
          orientation === "horizontal" && "flex-row",
          "flex h-full w-full cursor-pointer gap-5 overflow-hidden rounded-xl md:max-h-[490px] md:gap-0",
          isMain && "max-h-[490px] flex-col gap-0"
        )}
      >
        <div
          className={cn(
            orientation === "horizontal" ? "min-h-[82px] md:min-w-[204px]" : "md:w-full",
            "bg-gradient-to-brh-[264px] relative h-[82px] min-h-[82px] w-[82px] from-gray-200 to-gray-300 md:min-h-[264px]",
            isMain && "min-h-[264px] w-auto",
            imageClassName
          )}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt ?? "lack of description"}
              width={780}
              height={264}
              quality={100}
              sizes="(max-width: 220px) 82px, 480px, (max-width: 640px) 480px, 780px, (max-width: 1024px) 780px, 1020px"
              className={cn(
                "h-[82px] min-h-[82px] w-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 object-cover text-center brightness-90 md:h-[264px] md:min-h-[264px] md:rounded-none",
                isMain && "h-[264px] min-h-[264px] rounded-none"
              )}
            />
          )}
          <div
            className={cn(
              "absolute inset-0 z-20 hidden w-full flex-col items-start justify-end  p-6 md:flex",
              isMain && "flex"
            )}
          >
            <div className="flex w-full flex-wrap justify-between">
              {tagsPosition === "over" && (
                <div className="flex gap-2">
                  {tags?.slice(0, MAX_TAGS_TO_DISPLAY).map((tag) => {
                    return <Tag key={tag}>{tag}</Tag>
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-1 flex-col  border-gray-200 bg-white md:border",
            orientation === "vertical" && "rounded-b-xl border-t-0",
            orientation === "horizontal" && "rounded-r-xl border-l-0",
            isMain && "border"
          )}
        >
          {tagsPosition === "under" && tags?.length > 0 && (
            <div className={cn("hidden gap-2 p-5 pb-2 md:flex", isMain && "flex")}>
              {mainTag && (
                <Tag key={mainTag} variant="light">
                  {mainTag}
                </Tag>
              )}
              {tags?.length > 1 && (
                <Tooltip>
                  <TooltipTrigger>
                    <Tag variant="light">{`+${tags.length - 1}`}</Tag>
                  </TooltipTrigger>
                  <TooltipContent className="flex gap-2 bg-white" side="bottom">
                    {tags.slice(1).join(", ")}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
          <div
            className={cn(
              "flex flex-1 items-start gap-5 pt-0 md:flex-col md:justify-between md:gap-2 md:p-3 md:pt-2 lg:p-4",
              isMain && "flex-col justify-between p-5 pt-2"
            )}
          >
            <h2
              className={cn(
                tagsPosition === "under" && "min-h-[80px] ",
                lines === "1" && "md:line-clamp-1",
                lines === "2" && "md:line-clamp-2",
                lines === "3" && "md:line-clamp-3",
                "line-clamp-3 text-lg font-bold tracking-[1px] md:text-[1.5rem] md:leading-9 xl:py-2"
              )}
            >
              {title}
            </h2>
            {content && (
              <div className="hidden max-h-[90px] overflow-hidden md:block">
                <RichText pClassName="line-clamp-3" raw={content.raw} />
              </div>
            )}
            <ArticlePublishDetails
              className={cn("hidden md:flex", isMain && "flex")}
              imageUrl={author.imageUrl}
              author={author.name}
              publicationDate={publicationDate}
              variant="light"
            />
          </div>
        </div>
      </article>
    </Link>
  )
}
