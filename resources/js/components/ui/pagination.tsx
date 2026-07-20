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

  // Bersihkan data links bawaan Laravel untuk mempermudah deteksi tipe tombol
  const formattedLinks = links.map((link) => {
    const isPrevious = 
      link.label.toLowerCase().includes("previous") || 
      link.label.includes("&laquo;") || 
      link.label.includes("‹") ||
      link.label.toLowerCase().includes("sebelumnya");

    const isNext = 
      link.label.toLowerCase().includes("next") || 
      link.label.includes("&raquo;") || 
      link.label.includes("›") ||
      link.label.toLowerCase().includes("selanjutnya");

    return { ...link, isPrevious, isNext };
  });

  return (
    <nav
      role="navigation"
      aria-label="Navigasi Halaman"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center pt-6", className)}
      {...props}
    >
      <PaginationContent>
        {formattedLinks.map((link, idx) => {
          
          // 1. TAMPILAN JIKA TOMBOL NAVIGASI TIDAK AKTIF / DISABLED (TIDAK ADA URL)
          if (!link.url && (link.isPrevious || link.isNext)) {
            return (
              <PaginationItem 
                key={idx} 
                className={cn("opacity-40 pointer-events-none", !link.isPrevious && !link.isNext ? "hidden sm:inline-block" : "")}
              >
                <span className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }), 
                  "gap-1 text-xs sm:text-sm font-bold text-slate-400 px-3 h-10 select-none rounded-xl"
                )}>
                  {link.isPrevious && <ChevronLeft className="h-4 w-4 shrink-0" />}
                  <span className="hidden sm:inline">{link.isPrevious ? "Sebelumnya" : "Selanjutnya"}</span>
                  {link.isNext && <ChevronRight className="h-4 w-4 shrink-0" />}
                </span>
              </PaginationItem>
            );
          }

          // 2. LOGIKA RESPONSIVITAS MOBILE (Sembunyikan angka lain di layar HP jika bukan halaman aktif/ellipsis)
          // Menjamin di layar kecil hanya tampil: [Sebelumnya] [Angka Aktif] [Selanjutnya]
          const isNumber = !link.isPrevious && !link.isNext && !link.label.includes("...");
          const mobileClass = isNumber && !link.active ? "hidden sm:inline-block" : "";
          const ellipsisClass = link.label.includes("...") ? "hidden sm:inline-flex" : "";

          return (
            <PaginationItem key={idx} className={cn(mobileClass, ellipsisClass)}>
              {link.label.includes("...") ? (
                <PaginationEllipsis />
              ) : link.isPrevious ? (
                <PaginationLink
                  href={link.url ?? "#"}
                  isActive={link.active}
                  isNavButton={true} // Props kustom agar ukurannya memanjang otomatis
                  className="gap-1 px-3 text-xs sm:text-sm"
                >
                  <ChevronLeft className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </PaginationLink>
              ) : link.isNext ? (
                <PaginationLink
                  href={link.url ?? "#"}
                  isActive={link.active}
                  isNavButton={true} // Props kustom agar ukurannya memanjang otomatis
                  className="gap-1 px-3 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </PaginationLink>
              ) : (
                <PaginationLink
                  href={link.url ?? "#"}
                  isActive={link.active}
                  className="text-xs sm:text-sm"
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
      className={cn("flex flex-row items-center gap-1 bg-slate-100/80 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 max-w-full overflow-hidden", className)}
      {...props}
    />
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={cn("list-none shrink-0", className)} {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  isNavButton?: boolean
} & React.ComponentProps<typeof Link>

function PaginationLink({ className, isActive, isNavButton = false, ...props }: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          // Jika tombol arah, gunakan ukuran "default" agar melebar fleksibel, jika angka gunakan "icon" agar kotak presisi
          size: isNavButton ? "default" : "icon",
        }),
        "rounded-xl font-black transition-all duration-200 cursor-pointer h-10",
        // Hapus hardcode size-10 agar ukuran lebar (width) mengikuti setelan prop size di atas
        !isNavButton && "w-10", 
        isActive 
          ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20 border-transparent" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white",
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
      className={cn("flex h-10 w-10 items-center justify-center text-slate-400", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
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