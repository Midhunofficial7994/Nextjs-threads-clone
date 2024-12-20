import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/thread-logo-w.svg';
import { Icons } from '../../ui/Icons/users';

const NavbarHome: React.FC = () => {
    return (
        <nav className="bg-black w-full h-16 flex items-center justify-between px-5 shadow-md">
            <div className="flex items-center">         
                <Link href="/">
                    <Image src={logo} alt="logo" className="w-10 h-10" />
                </Link>
            </div>

            <ul className="flex items-center space-x-6">
                <li>
                    <Link href="/">
                        <Icons.home className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.search className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.create className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.activity className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.profile className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
                    </Link>
                </li>
            </ul>

            <div>
                <Link href="/login">
                    <button className="bg-gray-100 text-black h-8 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 hover:scale-105 transition duration-300">
                        Log in
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default NavbarHome;
