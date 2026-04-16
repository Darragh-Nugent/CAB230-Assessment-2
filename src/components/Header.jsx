import Nav from "./Nav";

// the header
export default function Header({ isAuthenticated, setIsAuthenticated }) {
  return (
    <header>
      <Nav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </header>
  );
}
