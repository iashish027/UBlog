import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Navbar,
  TextInput,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import "flowbite";
export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 dark:bg-black dark:text-white">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500 rounded-lg text-white">
          U
        </span>
        Blog
      </Link>

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
        <Button className="w-12 h-10 hidden sm:inline bg-gray-100" pill>
          <FaMoon className="text-black" />
        </Button>
        <Link to="/SignIn">
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500"
            outline
          >
            Sign in
          </Button>
        </Link>
        <NavbarToggle></NavbarToggle>
      </div>
      <NavbarCollapse>
        <NavbarLink as={"div"} active={path === "/"}>
          <Link to="/">Home</Link>
        </NavbarLink>
        <NavbarLink as={"div"} active={path === "/about"}>
          <Link to="/about">About us</Link>
        </NavbarLink>
        <NavbarLink as={"div"} active={path === "/projects"}>
          <Link to="/projects">Projects</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
