import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { navLinks, navIcons } from "../data";

const Navbar = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Samiul's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt="" />
            </li>
          ))}
        </ul>

        <time>{time.format("ddd D MMM h:mm:ss A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
