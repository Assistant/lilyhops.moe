export type DateProps = {
  value: string
}

export default function Duration(props: DateProps) {
  const date: string = props.value.replace(/T.*/,'')
  const dateTime: string = props.value.replace(/T/, ' ').replace(/Z/, ' UTC')

  return (
    <div title={dateTime} className="absolute z-10 right-0 mt-2 mr-2 px-1 rounded bg-gray-900 text-gray-100 opacity-75 text-sm">
      {date}
    </div>
  )
}