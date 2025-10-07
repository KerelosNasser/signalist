import React from 'react'
import Link from "next/link";
import NavItems from "@/components/navItems";
import UseDropdown from "@/components/useDropdown";
import Image from "next/image";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                        <Image src="/assets/icons/logo.svg" alt="logo"
                               width={140} height={40} className="cursor-pointer w-auto h-8" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems/>
                </nav>
                <UseDropdown/>
            </div>
        </header>
    )
}
export default Header
