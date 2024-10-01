import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/thread-logo-w.svg';
import thumbtack from '../../public/assets/thumbtack.svg';
import { Icons } from '../../ui/Icons/users';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black w-16 h-screen fixed flex flex-col items-center justify-between">
      {/* Logo */}
      <div className="mt-8 mb-8">
        <Link href="/">
          <Image src={logo} alt="logo" className="w-10 h-10" />
        </Link>
      </div>

      {/* Navigation Icons */}
      <ul className="flex flex-col items-center space-y-6 flex-grow justify-center">
        <li>
          <Link href="/main">
            <Icons.home className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
          </Link>
        </li>
        <li>
          <Link href="/main/search">
            <Icons.search className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
          </Link>
        </li>
        <li>
          <Link href="">
            <Icons.create className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
          </Link>
        </li>
        <li>
          <Link href="/main/activity">
            <Icons.activity className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
          </Link>
        </li>
        <li>
          <Link href="/main/profile">
            <Icons.profile className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
          </Link>
        </li>
      </ul>

      {/* Utility Icons */}
      <div className="mb-4 flex flex-col items-center space-y-6">
        <Link href="/">
          <Image src={thumbtack} alt="Pin" className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
        </Link>
        <Link href="/">
          <Icons.menu className="w-7 h-7 hover:scale-110 hover:filter-brightness-125 transition duration-300" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
