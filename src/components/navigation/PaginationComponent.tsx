'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationComponentProps {
  totalPages: number
}

export default function PaginationComponent({ totalPages }: PaginationComponentProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null // Hide pagination if only one page

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at edges
      if (currentPage <= 2) {
        endPage = 3
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(-1) // Use -1 to represent ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push(-2) // Use -2 to represent ellipsis
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex justify-center py-8" aria-label="Pagination">
      <div className="flex items-center space-x-1 md:space-x-2 rounded-lg bg-white p-1 shadow-md border border-blue-900/10">
        {/* Previous button */}
        <Link
          href={createPageURL(currentPage - 1)}
          className={`
            flex items-center justify-center min-w-10 h-10 px-2 rounded-lg transition-all duration-200
            ${
              currentPage === 1
                ? 'text-blue-900/30 cursor-not-allowed'
                : 'text-blue-900 hover:bg-blue-900/5 hover:text-blue-900'
            }
          `}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : 0}
          onClick={(e) => currentPage === 1 && e.preventDefault()}
        >
          <ChevronLeft size={18} />
          <span className="sr-only">Previous</span>
        </Link>

        {/* Page numbers */}
        <div className="flex items-center">
          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber < 0) {
              // Render ellipsis
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-10 h-10 flex items-center justify-center text-blue-900"
                >
                  &#8230;
                </span>
              )
            }

            return (
              <Link
                key={pageNumber}
                href={createPageURL(pageNumber)}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200
                  ${
                    currentPage === pageNumber
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-blue-900 hover:bg-yellow-500 hover:text-blue-900'
                  }
                `}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </Link>
            )
          })}
        </div>

        {/* Next button */}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`
            flex items-center justify-center min-w-10 h-10 px-2 rounded-lg transition-all duration-200
            ${
              currentPage >= totalPages
                ? 'text-blue-900/30 cursor-not-allowed'
                : 'text-blue-900 hover:bg-blue-900/5 hover:text-blue-900'
            }
          `}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : 0}
          onClick={(e) => currentPage >= totalPages && e.preventDefault()}
        >
          <ChevronRight size={18} />
          <span className="sr-only">Next</span>
        </Link>
      </div>
    </nav>
  )
}
