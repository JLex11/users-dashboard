import { withTransition } from '@/utils'

interface Props {
  setCountryQuery: (countryQuery: string) => void
}

export default function QueryInput({ setCountryQuery }: Props) {
  const handleSetCountryQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    withTransition(() => setCountryQuery(value))
  }

  return (
    <input
      type="text"
      role="textbox"
      className="w-64 rounded-md border bg-white/85 px-3 py-2 shadow-sm transition-colors focus:border-blue-700 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:placeholder:text-white/40"
      placeholder="Netherlands, United Kingdom..."
      onChange={handleSetCountryQuery}
    />
  )
}
