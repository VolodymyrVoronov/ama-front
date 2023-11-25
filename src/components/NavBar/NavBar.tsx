import { memo, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
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

import { useAuthStore } from "../../store/auth";

import { Path } from "../../constants";

import Logo from "../Logo/Logo";

const NavBar = memo((): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const { jwtToken, logOut } = useAuthStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Home",
      link: Path.HOME,
    },
    {
      label: "Questions",
      link: Path.QUESTIONS,
    },
    ...(jwtToken ? [{ label: "Admin", link: Path.ADMIN }] : []),
  ];

  const onLoginButtonClick = (): void => {
    navigate(Path.AUTH);
  };

  const onLogoutButtonClick = (): void => {
    logOut();
    navigate(Path.HOME);
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      height="5rem"
      isBordered
    >
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
              underline={location.pathname === item.link ? "always" : "none"}
              className="font-bold text-xl tracking-wider"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {jwtToken ? (
          <NavbarItem>
            <Button
              onClick={onLogoutButtonClick}
              color="danger"
              variant="bordered"
              className="font-semibold text-lg"
            >
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              onClick={onLoginButtonClick}
              color="primary"
              variant="shadow"
              className="font-semibold text-lg bg-gradient-to-tr from-cyan-500 to-blue-500"
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-gray-50 border-1.5 z-50">
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
              underline={location.pathname === item.link ? "always" : "none"}
              className="font-bold text-xl tracking-wider"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
});

export default NavBar;
