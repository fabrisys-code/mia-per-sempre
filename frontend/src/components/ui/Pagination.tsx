"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | "ellipsis")[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible range
    let start = Math.max(2, currentPage - halfVisible);
    let end = Math.min(totalPages - 1, currentPage + halfVisible);

    // Adjust if we're near the start
    if (currentPage <= halfVisible + 1) {
      end = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - halfVisible) {
      start = Math.max(2, totalPages - maxVisiblePages + 2);
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("ellipsis");
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const buttonBaseClasses =
    "flex h-10 min-w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors";

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Paginazione"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          buttonBaseClasses,
          "px-3",
          currentPage === 1
            ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300"
            : "border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
        )}
        aria-label="Pagina precedente"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="ml-1 hidden sm:inline">Precedente</span>
      </button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="flex h-10 w-10 items-center justify-center text-gray-400"
              >
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  buttonBaseClasses,
                  page === currentPage
                    ? "border-primary-600 bg-primary-600 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
                )}
                aria-label={`Pagina ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          buttonBaseClasses,
          "px-3",
          currentPage === totalPages
            ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300"
            : "border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
        )}
        aria-label="Pagina successiva"
      >
        <span className="mr-1 hidden sm:inline">Successiva</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

// Compact pagination for mobile/small spaces
export function PaginationCompact({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          currentPage === 1
            ? "cursor-not-allowed border-gray-200 text-gray-300"
            : "border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
        )}
        aria-label="Pagina precedente"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <span className="text-sm text-gray-600">
        Pagina{" "}
        <span className="font-semibold text-gray-900">{currentPage}</span> di{" "}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          currentPage === totalPages
            ? "cursor-not-allowed border-gray-200 text-gray-300"
            : "border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
        )}
        aria-label="Pagina successiva"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
