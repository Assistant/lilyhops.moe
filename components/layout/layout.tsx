import type { ComponentChildren } from "preact";
import { Navbar, NavbarProps } from "./navbar/navbar"

type Props = {
  children: ComponentChildren,
}

const navbarProps: NavbarProps = {
  links: [
    {href: '/vods', text: 'Vods'},
    {href: '/highlights', text: 'Highlights'},
    {href: '/clips', text: 'Clips'},
  ]
}

export const Layout = (props: Props) => {
  return (
    <>
      <Navbar {...navbarProps} />
      { props.children }
    </>
  )
}