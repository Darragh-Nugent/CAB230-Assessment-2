import Nav from "./Nav";

// the header
export default function Header({ authenticated }) {
  return (
    <header>
      <Nav authenticated={authenticated} />
    </header>
  );
}
