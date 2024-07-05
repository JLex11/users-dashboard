import useUsersContext from '@/hooks/useUsersContext'
import { withTransition } from '@/utils'
import clsx from 'clsx'
import { useState } from 'react'
import ArrowLeftIcon from './icons/ArrowLeftIcon'
import CloseIcon from './icons/CloseIcon'
import EmailIcon from './icons/EmailIcon'
import MapIcon from './icons/MapIcon'
import PhoneIcon from './icons/PhoneIcon'

enum WindowPositions {
  TOP = 'top-[0.7rem]',
  BOTTOM = 'bottom-[0.7rem]',
  LEFT = 'left-[0.7rem]',
  RIGHT = 'right-[0.7rem]',
  TOPLEFT = 'top-[0.7rem] left-[0.7rem]',
  TOPRIGHT = 'top-[0.7rem] right-[0.7rem]',
  BOTTOMLEFT = 'bottom-[0.7rem] left-[0.7rem]',
  BOTTOMRIGHT = 'bottom-[0.7rem] right-[0.7rem]',
  CENTER = 'inset-0 m-auto'
}

export default function UserDetails() {
  const [windowPos, setWindowPos] = useState<WindowPositions>(WindowPositions.CENTER)
  const { activeUser: user, changeActiveUser } = useUsersContext()
  if (!user) return null

  const closeDialog = () => changeActiveUser(null)
  const toggleWindowPos = () => {
    withTransition(() => {
      setWindowPos(windowPos === WindowPositions.BOTTOMLEFT ? WindowPositions.CENTER : WindowPositions.BOTTOMLEFT)
    })
  }

  return (
    <dialog
      open
      className={clsx(
        'fixed m-0 rounded-lg border border-black/10 bg-white/80 shadow-xl shadow-black/10 backdrop-blur dark:border-white/10 dark:bg-[#242424]/70 dark:shadow-black/25',
        windowPos
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
            <ArrowLeftIcon
              className={clsx(
                'size-5 opacity-0 transition-opacity group-hover:opacity-100',
                windowPos === WindowPositions.BOTTOMLEFT ? 'rotate-[135deg]' : '-rotate-45'
              )}
              strokeWidth={1.5}
            />
          </button>
        </div>
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
