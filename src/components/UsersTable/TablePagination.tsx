import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import useUsersContext from '@/hooks/useUsersContext'
import { Pagination } from 'react-headless-pagination'

export default function TablePagination() {
  const { pagination, isLoading: disabled } = useUsersContext()
  const { totalPages, currentPage, changePage } = pagination

  const nextPage = () => changePage(currentPage + 1)

  const isLastPage = totalPages === currentPage + 1

  const getPageButtonProps = (page: number) => {
    return {
      style: {
        viewTransitionName: `view-transition-pagination-page-${page}`
      },
      'aria-selected': page === currentPage
    }
  }

  return (
    <>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={changePage}
        totalPages={totalPages}
        edgePageCount={1}
        middlePagesSiblingCount={1}
        className="flex items-center gap-2"
        truncableText="..."
        truncableClassName="pointer-events-none flex items-end pt-4"
      >
        <Pagination.PrevButton
          role="button"
          className="flex items-center rounded border border-black/10 p-2 transition-colors hover:bg-black/5 disabled:pointer-events-none disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
        >
          <ChevronLeftIcon className="text-gray-600" />
          <span>Atras</span>
        </Pagination.PrevButton>

        <nav className="flex flex-grow justify-center" role="navigation">
          <ul className="flex items-start gap-2">
            <Pagination.PageButton
              as={<button role="tab" />}
              disabled={disabled}
              activeClassName="text-white pointer-events-none relative bg-blue-500 border-inherit"
              inactiveClassName="hover:bg-black/5 disabled:pointer-events-none transition-colors dark:hover:bg-white/5 cursor-pointer"
              className="rounded px-3 py-2"
              renderExtraProps={getPageButtonProps}
            />
          </ul>
        </nav>

        <button
          disabled={disabled}
          role="button"
          className="flex items-center rounded border border-black/10 p-2 transition-colors hover:bg-black/5 disabled:pointer-events-none disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
          onClick={nextPage}
        >
          <span>{isLastPage ? 'Cargar más' : 'Siguiente'}</span>
          <ChevronRightIcon className="text-gray-600" />
        </button>
      </Pagination>
    </>
  )
}
