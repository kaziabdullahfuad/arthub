"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTicketAlt, FaUser, FaSignOutAlt, FaThLarge } from "react-icons/fa";
import logo from '../../assets/arthub-logo.jpg'
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  // console.log(session);


  return (
    <nav className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/80 backdrop-blur-xl py-4 px-6 shadow-sm">
    <div className="max-w-7xl mx-auto flex items-center justify-between">

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src={logo}
          alt="ArtHub Logo"
          width={400}
          height={400}
          className="h-12 w-auto object-contain"
        />

        <div className="hidden md:block">
          <h1 className="font-extrabold text-xl bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            ArtHub
          </h1>
          <p className="text-xs text-gray-500 -mt-1">
            Online Art Marketplace
          </p>
        </div>
      </Link>

      {/* NAVIGATION LINKS */}
      <div className="hidden md:flex items-center gap-8">

        <Link
          href="/"
          className={`text-sm font-semibold transition-all duration-200 ${
            pathname === "/"
              ? "text-orange-500"
              : "text-gray-600 hover:text-orange-500"
          }`}
        >
          Home
        </Link>

        <Link
          href="/events"
          className={`text-sm font-semibold transition-all duration-200 ${
            pathname.startsWith("/events")
              ? "text-orange-500"
              : "text-gray-600 hover:text-orange-500"
          }`}
        >
          Browse Artworks
        </Link>

        {session && session?.user && (
          <Link
            href={`/dashboard/${session?.user?.role}`}
            className={`text-sm font-semibold transition-all duration-200 ${
              pathname.startsWith("/dashboard")
                ? "text-orange-500"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {!session && (
          <div className="flex items-center gap-3">

            <Link href="/login">
              <button className="h-10 px-5 rounded-xl font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-all">
                Login
              </button>
            </Link>

            <Link
              href="/register"
              className="h-10 px-5 rounded-xl flex items-center justify-center font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg hover:scale-[1.03] transition-all"
            >
              Sign Up
            </Link>

          </div>
        )}

        {session && session?.user && (
          <div className="relative" ref={dropdownRef}>

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center transition-transform hover:scale-105 cursor-pointer"
            >
              <Image
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-orange-400 shadow-md"
                src={session?.user?.image}
                alt="avatar"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-orange-100 rounded-2xl shadow-2xl py-2 overflow-hidden">

                {/* User Info */}
                <div className="px-4 py-3 border-b border-orange-100">

                  <p className="text-[11px] uppercase tracking-wider font-bold text-orange-500">
                    {session.user.role} Account
                  </p>

                  <p className="font-bold text-gray-800 mt-1">
                    {session.user.name}
                  </p>

                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>

                </div>

                {/* Dashboard */}
                <Link
                  href="/dashboard/organizer"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 transition"
                >
                  <FaThLarge className="text-orange-500" />
                  <span>My Dashboard</span>
                </Link>

                {/* Profile */}
                <Link
                  href={`/dashboard/${session.user.role}`}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 transition"
                >
                  <FaUser className="text-orange-500" />
                  <span>Profile Settings</span>
                </Link>

                <div className="border-t border-orange-100 my-1" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt />
                  <span>Log Out</span>
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </nav>
  );
}