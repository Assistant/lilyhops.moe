import Linkify from 'react-linkify';

export type DescriptionProps = {
  description: string
}

export default function Description(props: DescriptionProps) {
  return (
    <div className="mx-6 md:mx-8 pb-5 text-sm md:text-lg">
      <Linkify>{props.description}</Linkify>
    </div>
  )
}