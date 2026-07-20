import * as React from "react"
import { Link } from "@inertiajs/react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export interface InertiaPaginationLink {
  url: string | null
  label: string
  active: boolean
}

interface PaginationProps extends React.ComponentProps<"nav"> {
  links?: InertiaPaginationLink[]
}

function Pagination({ className, links, ...props }: PaginationProps) {
  if (!links || links.length <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Navigasi Halaman"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center pt-4", className)}
      {...props}
    >
      <PaginationContent>
        {links.map((link, idx) => {
          // Deteksi fleksibel untuk tombol "Sebelumnya" dari Laravel
          const isPrevious = 
            link.label.toLowerCase().includes("previous") || 
            link.label.includes("&laquo;") || 
            link.label.includes("‹") ||
            link.label.toLowerCase().includes("sebelumnya");

          // Deteksi fleksibel untuk tombol "Selanjutnya" dari Laravel
          const isNext = 
            link.label.toLowerCase().includes("next") || 
            link.label.includes("&raquo;") || 
            link.label.includes("›") ||
            link.label.toLowerCase().includes("selanjutnya");

          // Jika tidak ada URL dan merupakan tombol navigasi arah, kita sembunyikan atau beri style disabled
          if (!link.url && (isPrevious || isNext)) {
            return (
              <PaginationItem key={idx} className="opacity-40 pointer-events-none">
                <span className={cn(buttonVariants({ variant: "ghost", size: "default" }), "gap-1 text-sm font-bold text-slate-400")}>
                  {isPrevious && <ChevronLeft className="h-4 w-4" />}
                  <span className="hidden sm:inline">{isPrevious ? "Sebelumnya" : "Selanjutnya"}</span>
                  {isNext && <ChevronRight className="h-4 w-4" />}
                </span>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={idx}>
              {link.label.includes("...") ? (
                <PaginationEllipsis />
              ) : isPrevious ? (
                <PaginationLink
                  href={link.url ?? "#"}
                  isActive={link.active}
                  className="gap-1 px-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </PaginationLink>
              ) : isNext ? (
                <PaginationLink
                  href={link.url ?? "#"}
                  isActive={link.active}
                  className="gap-1 px-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="h-4 w-4" />
                </PaginationLink>
              ) : (
                <PaginationLink
                  href={link.url ?? "#"}
                  isActive={link.active}
                  className="text-sm font-bold"
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )}
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </nav>
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1.5 bg-slate-50 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={cn("list-none", className)} {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<typeof Link>

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size: "icon",
        }),
        "rounded-xl font-bold transition-all duration-200 cursor-pointer size-10",
        isActive 
          ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20 border-transparent" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white",
        className
      )}
      {...props}
    />
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-10 items-center justify-center text-slate-400", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">Halaman Tambahan</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationEllipsis,
}