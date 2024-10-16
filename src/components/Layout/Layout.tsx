import Text from '../common/Text';
import Image from 'next/image';

import { LayoutProps } from './Layout.interfaces';

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden h-full">
      <nav className="fixed inset-0 top-0 w-full shadow-md shadow-black/20 z-50 bg-white h-fit">
        <div className="max-w-6xl flex flex-row items-center justify-between w-full lg:px-0 mx-auto h-16 px-2">
          <Image
            alt="Hero Image"
            width={100}
            height={100}
            src="/buscodepa.png"
          />
          <Image alt="Hero Image" width={80} height={80} src="/lontue.png" />
        </div>
      </nav>
      {children}
      <footer className="w-full bg-gray-300 h-full py-10">
        <div className="max-w-6xl flex flex-row items-center justify-between w-full lg:px-0 px-2 mx-auto">
          <Image
            alt="Hero Image"
            width={100}
            height={100}
            src="/buscodepa.png"
          />
          <div className="flex flex-col space-y-1 justify-end items-end">
            <Text variant="label">Desarrollado por</Text>
            <Image alt="Hero Image" width={80} height={80} src="/lontue.png" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
