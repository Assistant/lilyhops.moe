export type DurationProps = {
  value: string
}

export default function Duration(props: DurationProps) {
  const time: string = props.value.replace(/[hm]/g, ":").replace(/s/, "")
  const finalTime: string = time.split(':').map((value: string) => value.padStart(2, '0')).join(':')

  return (
    <div className="absolute z-10 mt-2 ml-2 px-1 rounded bg-gray-900 text-gray-100 opacity-75 text-sm">
      {finalTime}
    </div>
  )
}