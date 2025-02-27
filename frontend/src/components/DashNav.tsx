import Image from "next/image";
import logo from "../../public/assets/images/temp_log.png";

const DashNav = () => {
  return (
    <nav className="flex items-center justify-between w-full min-h-[85px] bg-[#ededf0]">
      <div className="logos flex items-center gap-2 cursor-pointer mx-2">
        <Image
          src={logo}
          alt="product_logo"
          className="w-[32px] md:w-[40px]"
        ></Image>
        <p className="text-lg font-GeistSans font-[600]">Dashboard</p>
      </div>
      <div className="mx-6 flex gap-5 items-center">
        <p>Hi, User</p>

        <button className="px-2 py-1 rounded-lg border-2 border-gray-400 text-white bg-black hover:bg-white hover:border-gray- hover:text-black">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashNav;
