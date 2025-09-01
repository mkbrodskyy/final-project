import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span>Developed by Mykhaylo Brodskyy</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
