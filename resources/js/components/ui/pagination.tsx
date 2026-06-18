import * as React from "react"
import { Link } from "@inertiajs/react" // Import Link dari Inertia untuk SPA navigation
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button" // Hapus import type Button jika tidak dipakai langsung

// 1. Definisikan tipe data links bawaan Laravel/Inertia
export interface InertiaPaginationLink {
  url: string | null
  label: string
  active: boolean
}

// 2. Perbarui Props untuk komponen Pagination utama
interface PaginationProps extends React.ComponentProps<"nav"> {
  links?: InertiaPaginationLink[]
}

function Pagination({ className, links, ...props }: PaginationProps) {
  // JIKA menerima prop links, kita langsung render struktur paginasinya secara otomatis
  if (links) {
    return (
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      >
        <PaginationContent>
          {links.map((link, idx) => {
            // Hilangkan tombol Previous/Next bawaan array jika tidak ada URL-nya
            if (!link.url && (link.label.includes("Previous") || link.label.includes("Next"))) {
              return null;
            }

            return (
              <PaginationItem key={idx}>
                {link.label.includes("...") ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={link.url ?? "#"}
                    isActive={link.active}
                    // Menggunakan dangerouslySetInnerHTML karena Laravel menyertakan entitas HTML seperti &laquo; dan &raquo;
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                )}
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </nav>
    )
  }

  // Fallback ke behavior asli shadcn jika dipakai manual tanpa prop links
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<typeof Link> // Ubah ke typeof Link Inertia agar SPA tidak reload halaman

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <Link // Gunakan Link dari Inertia
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size: "icon",
        }),
        isActive && "border-orange-300 text-orange-600 bg-orange-400/20", // Menyamakan dengan active state menu Anda sebelumnya
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}