import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ props }) {
  const router = useRouter();
  return (
    <ul className="nav nav-tabs justify-content-center">
      {props.items.map((item, index) => {
        return (
          <li className="nav-item" key={index}>
            <Link href={item.pathname}>
              <a className={`nav-link fw-bold fs-6 p-4 ${router.pathname === item.pathname ? "active" : ""}`}>{item.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
