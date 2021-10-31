import Head from 'next/head'

export type ErrorProps = {
  children?: React.ReactNode,
}

export const ErrorPage = (props: ErrorProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      {props.children}
    </>
  )
}