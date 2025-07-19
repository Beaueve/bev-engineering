import Link from "next/link";

interface NavBarProps {
  title: string;
}

export default function NavBar({ title }: NavBarProps) {
  title = (title ? title : "no title found") + " Ohn oooo";
  let navigators = ["Beep", "Boop", "Contact"];
  return (
    <nav className="bg-gray-800 text-white p-4">
      <h1> {title} </h1>
      <ul className="bg-gray-800 text-white p-4">
        {navigators.map((name) => (
          <li key={name}><a href="#">{name}</a></li>
        ))}
      </ul>
    </nav>
  );
}
