"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useLocale } from "@/i18n/i18n"
import { getNavigation } from "@/lib/client"
import { DynamicLangSelect } from "../LangSelect/DynamicLangSelect"
import { DynamicSearchDialog } from "../Search/DynamicSearchDialog"
import { Button } from "../ui/Button/Button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet/Sheet"

export type GetNavigationReturn = Awaited<ReturnType<typeof getNavigation>>

type NavigationProps = {
  navigation: Pick<GetNavigationReturn, "navigation">["navigation"]
}

export function Navigation({ navigation }: NavigationProps) {
  const locale = useLocale()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { logo, elements } = navigation

  const navElements = elements?.map((navElement) => {
    const categoryUrl = navElement.element?.__typename === "Category" ? "/category" : ""
    const url = `/${locale}${categoryUrl}/${navElement?.element?.slug}`
    return (
      <li key={navElement?.element?.slug}>
        <Link
          prefetch={false}
          href={url}
          hrefLang={locale}
          onClick={() => setIsSheetOpen(false)}
          className="whitespace-nowrap rounded-xl p-2 font-semibold hover:bg-custom-dim"
        >
          {navElement?.element?.title}
        </Link>
      </li>
    )
  })

  return (
    <div className="pointer-events-auto mx-4 flex w-full items-center justify-between gap-5">
      <Link
        prefetch={false}
        href={`/${locale}/`}
        hrefLang={locale}
        className="h-[33px] w-[100px]"
        onClick={() => setIsSheetOpen(false)}
      >
        <Image src={logo?.url} width={100} height={33} alt="site-logo" quality={100} />
      </Link>
      <div className="hidden flex-nowrap items-center gap-4 lg:flex">
        <div className="-mr-3 flex items-center">
          <DynamicSearchDialog />
        </div>
        <ul
          className=" flex h-[40px] max-w-[700px] flex-nowrap items-center gap-4 overflow-hidden"
          style={{ scrollbarGutter: "stable" }}
        >
          {navElements}
        </ul>
        <div>
          <DynamicLangSelect />
        </div>
      </div>
      <ul className="flex items-center sm:flex-wrap lg:hidden">
        <li className="flex items-center">
          <DynamicSearchDialog />
        </li>
        <Sheet open={isSheetOpen}>
          <SheetTrigger asChild onClick={() => setIsSheetOpen((prev) => !prev)}>
            <li>
              <Button aria-label="opening and closing a menu" className="-mr-4" variant="ghost">
                {isSheetOpen ? <X /> : <Menu />}
              </Button>
            </li>
          </SheetTrigger>
          <SheetContent className="mt-20 flex min-w-[100vw] list-none flex-col items-center justify-start text-center text-2xl font-semibold">
            {navElements}
            <li className="mt-20 w-full text-xl font-normal">
              <DynamicLangSelect />
            </li>
          </SheetContent>
        </Sheet>
      </ul>
    </div>
  )
}
