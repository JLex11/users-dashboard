import useUsersContext from '@/hooks/useUsersContext'
import { withTransition } from '@/utils'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import CloseIcon from './icons/CloseIcon'
import EmailIcon from './icons/EmailIcon'
import FoldDownIcon from './icons/FoldDownIcon'
import FoldUpIcon from './icons/FoldUpIcon'
import MapIcon from './icons/MapIcon'
import PhoneIcon from './icons/PhoneIcon'
import PointIcon from './icons/PointIcon'

const windowPositions = {
  BOTTOMLEFT: {
    label: 'bottom left',
    positionStyles: 'bottom-[0.7rem] left-[0.7rem] mb-0 ml-0',
    iconRotation: '-rotate-45'
  },
  BOTTOMRIGHT: {
    label: 'bottom right',
    positionStyles: 'bottom-[0.7rem] right-[0.7rem] mt-0 mr-0',
    iconRotation: 'rotate-[225deg]'
  },
  TOPLEFT: {
    label: 'top left',
    positionStyles: 'top-[0.7rem] left-[0.7rem] mt-0 ml-0',
    iconRotation: 'rotate-45'
  },
  TOPRIGHT: {
    label: 'top right',
    positionStyles: 'top-[0.7rem] right-[0.7rem] mt-0 mr-0',
    iconRotation: 'rotate-[135deg]'
  },
  CENTER: {
    label: 'center',
    positionStyles: 'inset-0 m-auto',
    iconRotation: undefined
  }
}

type WindowPositions = keyof typeof windowPositions

export default function UserDetails() {
  const [windowPos, setWindowPos] = useState<WindowPositions>('CENTER')
  const [isOpenSelector, setIsOpenSelector] = useState(false)

  const { activeUser: user, changeActiveUser } = useUsersContext()
  const lastWindowPos = useRef<WindowPositions>('BOTTOMLEFT')
  if (!user) return null

  const closeDialog = () => changeActiveUser(null)

  const toggleWindowPos = () => {
    if (lastWindowPos.current === windowPos) return
    setIsOpenSelector(false)

    const newPos = lastWindowPos.current
    lastWindowPos.current = windowPos
    withTransition(() => setWindowPos(newPos))
  }

  const changeWindowPos = (newPos: WindowPositions) => {
    lastWindowPos.current = windowPos
    setIsOpenSelector(false)

    withTransition(() => setWindowPos(newPos))
  }

  const toggleSelector = () => setIsOpenSelector(!isOpenSelector)

  return (
    <dialog
      open
      className={clsx(
        'fixed rounded-lg border border-black/10 bg-white/80 shadow-xl shadow-black/10 backdrop-blur dark:border-white/10 dark:bg-[#242424]/70 dark:shadow-black/25',
        windowPositions[windowPos].positionStyles
      )}
      style={{ viewTransitionName: `user-details-dialog` }}
    >
      <article className="flex h-56 w-[34rem] items-center gap-12 p-12 px-16 pt-14">
        <div className="absolute left-0 top-0 flex w-full justify-start gap-2 p-2">
          <button
            type="button"
            className="group flex aspect-square size-5 rounded-full border-[1px] border-[#e34649] bg-[#fd5754] text-black/40"
            onClick={closeDialog}
          >
            <CloseIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
          <button
            type="button"
            className="group flex aspect-square size-5 rounded-full border-[1px] border-[#febb40] bg-[#dea031] text-black/40"
            onClick={toggleWindowPos}
          >
            {windowPositions[lastWindowPos.current]?.iconRotation ? (
              <ArrowLeftIcon
                className={clsx('size-5 opacity-0 transition-opacity group-hover:opacity-100', windowPositions[lastWindowPos.current].iconRotation)}
                strokeWidth={1.5}
              />
            ) : (
              <PointIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>
          <button
            type="button"
            className="group flex aspect-square size-5 rounded-full border-[1px] border-[#32a730] bg-[#33c848] text-black/40"
            onClick={toggleSelector}
          >
            {isOpenSelector ? (
              <FoldUpIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
            ) : (
              <FoldDownIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>
        </div>
        {isOpenSelector && (
          <div className="absolute left-16 top-8 z-10 size-fit rounded-lg border border-black/5 bg-white/90 p-1 shadow shadow-black/20 backdrop-blur-md dark:border-white/5 dark:bg-[#303030] dark:shadow-black/50">
            <ul className="flex flex-col">
              {Object.entries(windowPositions).map(([key, { label, iconRotation }]) => (
                <li
                  key={key}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded p-1 px-2 hover:bg-blue-700 hover:text-white`}
                  onClick={() => changeWindowPos(key as WindowPositions)}
                >
                  {iconRotation ? <ArrowLeftIcon className={`size-5 ${iconRotation}`} /> : <PointIcon className="size-5" />} Move to {label}
                </li>
              ))}
            </ul>
          </div>
        )}
        <aside>
          <img
            src={user.picture.large}
            alt={user.name.title}
            className="rounded-full border border-black/25 dark:border-white/25"
            style={{ viewTransitionName: `user-image-${user.login.uuid}` }}
          />
        </aside>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">
            {user.name.first} {user.name.last}
          </h2>
          <div>
            <span className="-ml-[0.55rem] flex items-center gap-1 rounded-full bg-black/5 p-1 px-2 text-sm dark:bg-white/5">
              <EmailIcon className="inline-block size-4" />
              {user.email}
            </span>
          </div>
          <div>
            <span className="flex items-center gap-1 opacity-80">
              <MapIcon className="inline-block size-4" /> {user.location.city}, {user.location.country}
            </span>
          </div>
          <div>
            <span className="flex items-center gap-1 opacity-80">
              <PhoneIcon className="inline-block size-4" /> {user.cell}
            </span>
          </div>
        </section>
      </article>
    </dialog>
  )
}
