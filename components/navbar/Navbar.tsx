import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/thread-logo-w.svg';
import { Icons } from '../../ui/Icons/users';

const NavbarHome: React.FC = () => {
    return ( 
        <nav className="bg-[#0A0A0A] w-full h-[60px] flex items-center justify-between px-5 shadow-md">
            <div className="flex items-center">
                <Link href="/">
                    <Image src={logo} alt="logo" className="w-10 h-10" />
                </Link>
            </div>
            <ul className="flex items-center list-none flex-grow justify-center space-x-6">
                <li>
                    <Link href="/">
                        <Icons.home className="w-8 h-8 hover:scale-110 hover:brightness-125 transition-transform" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.search className="w-8 h-8 hover:scale-110 hover:brightness-125 transition-transform" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.create className="w-8 h-8 hover:scale-110 hover:brightness-125 transition-transform" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.activity className="w-8 h-8 hover:scale-110 hover:brightness-125 transition-transform" />
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <Icons.profile className="w-8 h-8 hover:scale-110 hover:brightness-125 transition-transform" />
                    </Link>
                </li>
            </ul>
            <div>
                <Link href="/login">
                    <div className="flex items-center justify-center h-8 px-4 bg-white text-black rounded-md font-medium text-sm cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:scale-105">
                        Log in
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default NavbarHome;
