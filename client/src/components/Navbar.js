import './Navbar.css';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1 className="title">Fermine</h1>
            <div className="links">
            <a href="">Candidatures</a>
            <a href="">Emploi</a>
            <a href="">Références</a>
            <a href="">Méthodologie</a>
            </div>
        </nav>
     );
}
 
export default Navbar;