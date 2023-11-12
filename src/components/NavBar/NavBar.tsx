import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { Path } from "../../constants";

import Logo from "../Logo/Logo";

const menuItems = [
  {
    label: "Home",
    link: Path.HOME,
  },
  {
    label: "Questions",
    link: Path.QUESTIONS,
  },
];

const NavBar = (): JSX.Element => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="flex justify-center sm:justify-normal">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem
            key={item.label}
            isActive={location.pathname === item.link}
          >
            <Link
              as={RouterLink}
              to={item.link}
              size="lg"
              color={location.pathname === item.link ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" variant="shadow">
            Login
          </Button>
        </NavbarItem>
        {/* <NavbarItem>
          <Button color="primary" variant="shadow">
            Logout
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu className="bg-gray-50 border-1.5">
        {menuItems.map((item) => (
          <NavbarMenuItem
            key={item.label}
            isActive={location.pathname === item.link}
          >
            <Link
              as={RouterLink}
              to={item.link}
              size="lg"
              color={location.pathname === item.link ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
