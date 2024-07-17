import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center p-4 bg-gray-100 text-black w-full justify-center space-x-3">
      <Image src="/next.svg" alt="Logo" width={40} height={40} />
      <h1 className="text-xl font-semibold">Header</h1>
    </div>
  );
};

export default Header;
