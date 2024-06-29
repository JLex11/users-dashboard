import { Pagination } from 'react-headless-pagination'
import ChevronLeftIcon from './icons/ChevronLeftIcon'
import ChevronRightIcon from './icons/ChevronRightIcon'

interface Props {
  currentPage: number
  totalPages: number
  disabled: boolean
  handlePageChange: (page: number) => void
}

export default function TablePagination({ currentPage, totalPages, disabled, handlePageChange }: Props) {
  return (
    <>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
        edgePageCount={1}
        middlePagesSiblingCount={1}
        className="flex items-center gap-2"
        truncableText="..."
        truncableClassName="pointer-events-none"
      >
        <Pagination.PrevButton className="flex items-center gap-1 rounded px-3 py-2 transition-colors hover:bg-black/5 disabled:pointer-events-none dark:hover:bg-white/5">
          <ChevronLeftIcon className="text-gray-600" />
          <span>Atras</span>
        </Pagination.PrevButton>

        <nav className="flex flex-grow justify-center">
          <ul className="flex items-start gap-2">
            <Pagination.PageButton
              disabled={disabled}
              activeClassName="text-white pointer-events-none relative bg-blue-500"
              inactiveClassName="hover:bg-black/5 disabled:pointer-events-none transition-colors dark:hover:bg-white/5 cursor-pointer"
              className="rounded px-3 py-2"
              renderExtraProps={(page: number) => ({ style: { viewTransitionName: `pagination-page-${page}` } })}
            />
          </ul>
        </nav>

        <Pagination.NextButton className="flex items-center gap-1 rounded px-3 py-2 transition-colors hover:bg-black/5 disabled:pointer-events-none dark:hover:bg-white/5">
          <span>Siguiente</span>
          <ChevronRightIcon className="text-gray-600" />
        </Pagination.NextButton>
      </Pagination>
    </>
  )
}
