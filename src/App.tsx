import UsersDashboard from './components/UsersDashboard'

export default function App() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Dashboard de usuarios</h1>
      <p className="text-xl opacity-[0.7]">Aqui podras ver y filtrar la informacion de los usuarios</p>
      <UsersDashboard />
    </div>
  )
}
