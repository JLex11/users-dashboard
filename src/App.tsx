import GithubIcon from './components/icons/GithubIcon'
import UserDetails from './components/UserDetails'
import { UsersContextProvider } from './components/UsersContextProvider'
import UsersDashboard from './components/UsersDashboard'
import { getUsers } from './services/getUsers'

export default function App() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Dashboard de usuarios</h1>
      <p className="text-xl opacity-[0.7]">Aqui podras ver y filtrar la informacion de los usuarios</p>
      <UsersContextProvider usersFn={getUsers}>
        <UsersDashboard />
        <UserDetails />
      </UsersContextProvider>
      <footer className="flex w-full items-center justify-start gap-4 px-2">
        <a
          href="https://github.com/JLex11/users_dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md group inline-flex max-w-fit items-center justify-center gap-2 space-x-2 rounded-xl border border-black/20 px-3 py-2 text-base shadow transition hover:text-blue-500 focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/80 focus-visible:ring-white focus-visible:ring-offset-2 active:bg-black dark:bg-[#242424] dark:text-white dark:hover:border-white/15"
        >
          <GithubIcon className="size-6" />
          Code
        </a>
        <p className="flex items-center gap-1">
          <span className="opacity-70">Made by</span>
          <a
            href="https://www.linkedin.com/in/john-alexander-calle"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 opacity-100 hover:underline"
          >
            Alexander
          </a>
        </p>
      </footer>
    </div>
  )
}
