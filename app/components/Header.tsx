"use client"
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import {PiPresentationChart, PiSignOut, PiUser} from "react-icons/pi";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  const menuItems = [
    { name: 'Dashboard', link: '/' },
    { name: 'About', link: '/about' }
  ];

  function handleMenuItemClick(url: string) {
    setIsMenuOpen(false);
    router.push(url);
  }

  return (

    <Navbar maxWidth="full" isBordered={true} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle />
        <NavbarBrand className="gap-4">
          <Image src={"AFRY-logo.svg"} alt="AFRY" width={32} height={32} />
          <p className="font-bold text-inherit">Aero Viewer</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="flex items-center gap-1">
          <Image src={"AFRY-logo.svg"} alt="AFRY" width={32} height={32} />
          <p className="font-bold text-inherit">Aero Viewer</p>
        </NavbarItem>
        {menuItems.map((item, index) => (
          <NavbarItem isActive={pathname===item.link} key={`mm-${item.link}-${index}`}>
            <Link className="w-full" href={item.link}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                showFallback
                as="button"
                className="transition-transform"
                size="sm"/>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                onClick={() => handleMenuItemClick('/profile')}
                startContent={<PiUser />}>
                Profile
              </DropdownItem>
              <DropdownItem
                key="logout"

                color="danger"
                startContent={<PiSignOut />}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem isActive={pathname===item.link} key={`dm-${item.link}-${index}`}>
            <div className="p-2 flex items-center justify-start gap-2" onClick={() => handleMenuItemClick(item.link)}>
            {item.name}
            </div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
