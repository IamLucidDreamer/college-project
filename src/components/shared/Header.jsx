import React, { Fragment, useEffect, useState } from "react";
import AppLogo from "../images/AppLogo";
import { Transition, Dialog } from "@headlessui/react";
import {
  OfficeBuildingIcon,
  UserCircleIcon,
  XIcon,
  AcademicCapIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
import { clearAuth, getAuthToken } from "../../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { LibraryIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state?.user);

  return (
    <div className={`bg-white duration-500`} style={{ zIndex: 999 }}>
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <AppLogo width="50" height="50" classname="rounded-full" />
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center justify-center text-secondary text-lg gap-8 mx-6">
            <a class=" hover:text-secondary border-b-2 border-white hover:border-secondary duration-300">
              Home
            </a>
            <a class=" hover:text-secondary border-b-2 border-white hover:border-secondary duration-300">
              About
            </a>
            <a class=" hover:text-secondary border-b-2 border-white hover:border-secondary duration-300">
              Contact Us
            </a>
          </nav>
          <div className="flex gap-3">
            {!user?.name ? (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  class="inline-flex items-center bg-secondary border-0 py-1 px-3 focus:outline-none hover:bg-primary rounded text-base mt-4 md:mt-0 text-white font-semibold duration-200"
                >
                  Sign Up
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <button
                  onClick={() => navigate("/login")}
                  class="inline-flex items-center bg-secondary border-0 py-1 px-3 focus:outline-none hover:bg-primary rounded text-base mt-4 md:mt-0 text-white font-semibold duration-200"
                >
                  Log In
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  dispatch(logout());
                  clearAuth();
                  navigate("/");
                }}
                class="inline-flex items-center bg-secondary border-0 py-1 px-3 focus:outline-none hover:bg-primary rounded text-base mt-4 md:mt-0 text-white font-semibold duration-200"
              >
                Log Out
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between">
        <button
          className="lg:hidden h-7 flex flex-col justify-between items-stretch"
          onClick={() => setOpen(true)}
        >
          <div className="w-8 h-1 bg-secondary" />
          <div className="w-8 h-1 bg-secondary" />
          <div className="w-8 h-1 bg-secondary" />
        </button>
      </div>

      <DrawerMenu
        openModal={open}
        closeModal={() => setOpen(false)}
        navigate={navigate}
      />
    </div>
  );
};

export default Header;

const DrawerMenu = ({ openModal, closeModal, navigate }) => {
  const dispatch = useDispatch();

  return (
    <Transition show={openModal} as={Fragment}>
      <Dialog
        as="div"
        style={{ zIndex: 9999 }}
        className="fixed inset-0 overflow-hidden"
        onClose={closeModal}
      >
        <div className="absolute inset-0  overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity w-auto" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="min-h-screen bg-white w-96">
                <div className="my-4 mx-6">
                  <div className="w-full">
                    <XIcon
                      className="w-8 h-8 text-secondary ml-auto self-end"
                      onClick={closeModal}
                    />
                  </div>
                  <nav className="flex flex-col text-secondary font-semibold text-xl">
                    <Link to={"/dashboard/predictor"}>
                      <button className="my-4 flex gap-2 items-center">
                        <AcademicCapIcon className="w-5 h-5" />
                        Predictor
                      </button>
                    </Link>
                    <Link to={"/dashboard/colleges"}>
                      <button className="my-4 flex gap-2 items-center">
                        <LibraryIcon className="w-5 h-5" /> Colleges
                      </button>
                    </Link>
                    <Link to={"/dashboard/blogs"}>
                      <button className="my-4 flex gap-2 items-center">
                        <DocumentTextIcon className="w-5 h-5" />
                        Blogs
                      </button>
                    </Link>
                    <Link to={"/dashboard/updates"}>
                      <button className="my-4 flex gap-2 items-center">
                        <BellIcon className="w-5 h-5" />
                        Updates
                      </button>
                    </Link>
                    <Link to={"/about"}>
                      <button className="my-4 flex gap-2 items-center">
                        <InformationCircleIcon className="w-5 h-5" />
                        About
                      </button>
                    </Link>
                    <Link to={"/profile"}>
                      <button className="my-4 flex gap-2 items-center">
                        <UserCircleIcon className="w-5 h-5" />
                        Profile
                      </button>
                    </Link>
                    {/* <button className="my-4">Profile</button>
                    </Link> */}
                    <button
                      className="my-4 flex gap-2 items-center"
                      onClick={() => {
                        dispatch(logout());
                        clearAuth();
                        navigate("/");
                      }}
                    >
                      <ArrowCircleRightIcon className="w-5 h-5" />
                      Logout
                    </button>
                  </nav>
                </div>
                <div className="absolute bottom-0 w-full mb-2">
                  <AppLogo logotType={1} width={"175px"} classname="mx-auto" />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
