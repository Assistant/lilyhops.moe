export const Loader = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="animate-pulse">
          <h1 className="m-4 text-6xl sm:text-8xl md:text-9xl font-title text-green-500">Loading...</h1>
        </div>
      </div>
    </div>
  )
}

export const inifiniLoader: JSX.Element = (
  <div className="col-span-full flex">
    <div className="m-auto">
      <div className="animate-pulse">
        <h1 className="mt-2 text-2xl font-title text-green-500">Loading...</h1>
      </div>
    </div>
  </div>
)