import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslations } from "next-intl";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationComponent({ currentPage, totalPages, onPageChange }: Props) {
  const t = useTranslations("datatable.pagination");
  // สร้าง array page numbers ที่จะ render ตาม logic
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // แสดงครบหมด
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // แสดงแบบมี ... ตามโจทย์

      if (currentPage <= 4) {
        if (currentPage === 1) {
          pages.push(1);
        } else {
          pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages);
        }
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            <span className="hidden md:block">{t("prevent")}</span>
          </PaginationPrevious>
        </PaginationItem>

        {pages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  if (page !== currentPage) onPageChange(page as number);
                }}
              >
                {page.toString()}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 disabled:!pointer-events-none"
          >
            <span className="hidden md:block">{t("next")}</span>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;
