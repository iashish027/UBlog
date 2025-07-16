import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Navbar,
  TextInput,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Avatar,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "flowbite";
import { toggleTheme } from "../redux/theme/themeSlice";
import Logo from "./Logo";
export default function Header() {
  const path = useLocation().pathname;
  const currentUser = useSelector((state) => state.signin.currentUser);
  const currentTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  // Get first letter of name or email
  const userInitial = currentUser
    ? (currentUser.username || currentUser.email || "U")[0].toUpperCase()
    : null;

  return (
    <Navbar className="border-b-2">
      <Logo size="md" />

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          theme={{
            field: {
              input: {
                base: "!bg-white",
              },
            },
          }}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden bg-gray-100" pill>
        <AiOutlineSearch className="text-black" />
      </Button>
      <div className="flex gap-2 items-center justify-end md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline dark:bg-gray-100 bg-[rgb(16,23,42)]"
          onClick={() => dispatch(toggleTheme())}
          pill
        >
          {currentTheme.theme === "dark" ? (
            <FaMoon className="text-black" />
          ) : (
            <FaSun className="text-white" />
          )}
        </Button>
        {currentUser ? (
          <Link to="/profile">
            <Avatar
              rounded
              placeholderInitials={userInitial}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold flex items-center justify-center"
            />
          </Link>
        ) : (
          <Link to="/signin">
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500"
              outline
            >
              Sign in
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink
          as={"div"}
          active={path === "/"}
          theme={{
            base: "text-gray-900 dark:text-white",
            active: {
              on: "text-blue-600 font-semibold",
              off: "text-gray-900",
            },
          }}
        >
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink
          as={"div"}
          active={path === "/about"}
          theme={{
            base: "text-gray-900 dark:text-white",
            active: {
              on: "text-blue-600 font-semibold",
              off: "text-gray-900",
            },
          }}
        >
          <Link to="/about">About us</Link>
        </NavbarLink>
        <NavbarLink
          as={"div"}
          active={path === "/projects"}
          theme={{
            base: "text-gray-900 dark:text-white",
            active: {
              on: "text-blue-600 font-semibold",
              off: "text-gray-900",
            },
          }}
        >
          <Link to="/projects">Projects</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
