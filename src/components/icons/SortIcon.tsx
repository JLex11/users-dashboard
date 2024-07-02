import { SortDirection } from '@/enums'

interface Props extends React.SVGProps<SVGSVGElement> {
  direction?: SortDirection
}

export default function SortIcon({ direction = SortDirection.ASC, ...props }: Props) {
  const pathValues: Record<typeof direction, string[]> = {
    [SortDirection.ASC]: ['M4 6l7 0', 'M4 18l9 0', 'M15 9l3 -3l3 3'],
    [SortDirection.DESC]: ['M4 6l9 0', 'M4 18l7 0', 'M15 15l3 3l3 -3']
  }

  const getAnimateProps = (i: number) => {
    return {
      id: 'animation',
      attributeName: 'd',
      dur: '0.5s',
      from: pathValues[direction][i],
      to: pathValues[direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC][i],
      repeatCount: '1',
      fill: 'freeze'
    }
  }

  return (
    <svg
      {...props}
      key={direction}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d={pathValues[direction][0]}>
        <animate {...getAnimateProps(0)} />
      </path>
      <path d="M4 12l7 0" />
      <path d={pathValues[direction][1]}>
        <animate {...getAnimateProps(1)} />
      </path>
      <path d={pathValues[direction][2]}>
        <animate {...getAnimateProps(2)} />
      </path>
      <path d="M18 6l0 10" />
    </svg>
  )
}
