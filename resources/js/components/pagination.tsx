import { Link } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({
    links,
    className = "",
}: PaginationProps) {
    const translateLabel = (label: string) => {
        switch (label) {
            case "pagination.previous":
                return "← Sebelumnya";

            case "pagination.next":
                return "Berikutnya →";

            default:
                return label
                    .replace("&laquo;", "")
                    .replace("&raquo;", "")
                    .trim();
        }
    };

    return (
        <div
            className={`mt-8 flex justify-center flex-wrap gap-2 ${className}`}
        >
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || "#"}
                    className={`
                        inline-flex items-center justify-center
                        min-w-[40px] px-3 py-2
                        text-sm font-medium
                        rounded-lg transition-all duration-200

                        ${
                            link.active
                                ? `
                                    bg-orange-600 text-white
                                    shadow-sm
                                `
                                : `
                                    bg-muted text-muted-foreground
                                    hover:bg-muted/80
                                `
                        }

                        ${
                            !link.url
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                    `}
                >
                    {translateLabel(link.label)}
                </Link>
            ))}
        </div>
    );
}