import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "../data";

const Navbar = () => {
  const [time, setTime] = useState(() => dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-md text-white">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="logo" className="w-6 h-6" />
          <p className="font-bold">Samiul's Portfolio</p>
        </div>

        <ul className="flex gap-4 text-sm text-gray-300">
          {navLinks.map(({ id, name }) => (
            <li key={id} className="hover:text-white cursor-pointer">
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        <ul className="flex gap-3">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img
                src={img}
                alt=""
                className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
              />
            </li>
          ))}
        </ul>

        <time className="text-sm text-gray-300">
          {time.format("ddd D MMM h:mm:ss A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
