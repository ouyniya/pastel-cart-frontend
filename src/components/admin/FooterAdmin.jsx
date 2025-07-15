import Logo from "../Logo";

const FooterAdmin = () => {
  return (
    <footer className="mt-8 footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <Logo />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="justify-self-center md:place-self-center md:justify-self-end">
        Made with 💘 for our awesome admins!
      </nav>
    </footer>
  );
};
export default FooterAdmin;
