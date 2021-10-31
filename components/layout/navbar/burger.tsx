import { useState } from 'preact/hooks'
import Link from 'next/link'

export type BurgerProps = {
  links: NavbarLink[],
  path: string,
}

export type NavbarLink = {
  href: string,
  text: string,
}

export const Burger = (props: BurgerProps) => {
  let [burger, setBurger] = useState(false)
  const toggle = () => setBurger(!burger)
  const getBurger = (burger: boolean) => burger ? 'hidden' : ''
  const getColor = (title: string) => props.path.toLowerCase().includes(title.toLowerCase()) ? 'text-green-500' : ''
  const colors: string = 'text-green-900 hover:text-green-500 border-green-900 hover:border-green-500'
  return (
    <>
      <div className={`flex md:hidden ${colors}`}>
        <button onClick={toggle}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10 block' + ${getBurger(burger)}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-10 h-10 ${getBurger(!burger)}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className={`font-title text-3xl mt-5 md:mt-0 border-t-2 md:flex w-full md:w-auto text-right text-bold md:border-none border-green-900 ${getBurger(!burger)}`}>
        {props.links.map((value: NavbarLink) => {
          if (getColor(value.text)) return <Link key={value.text} href={value.href}><a className={`block md:inline-block p-4 md:py-2 border-b-2 md:border-none text-green-500 border-green-500`}>{value.text}</a></Link>
          else return <Link key={value.text} href={value.href}><a className={`block md:inline-block p-4 md:py-2 border-b-2 md:border-none ${colors}`}>{value.text}</a></Link>
        })}
      </div>
    </>
  )
}