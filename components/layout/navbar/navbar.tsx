import { useRouter } from 'next/router'
import { LeftIcon, RightIcon } from './sides'
import { Burger, BurgerProps } from './burger'

export type NavbarProps = {
  links: NavbarLink[],
}

export type NavbarLink = {
  href: string,
  text: string,
}

export const Navbar = (props: NavbarProps) => {
  const router = useRouter()
  const burgerProps: BurgerProps = {links: props.links, path: router.pathname}
  return (
    <nav className='p-5 bg-green-200 md:p-1 flex flex-wrap items-center justify-between'>
      <LeftIcon path={router.pathname} />
      <Burger {...burgerProps} />
      <RightIcon path={router.pathname} />
    </nav>
  )
}