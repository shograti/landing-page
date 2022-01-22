import './Footer.css'
import facebooklogo from '../assets/facebooklogo.png';
import instagramlogo from '../assets/instagramlogo.png'
import twitterlogo from '../assets/twitterlogo.png'

const facebookLogo = facebooklogo;
const instagramLogo = instagramlogo;
const twitterLogo = twitterlogo;

const Footer = () => {
    return ( 
    <div className="footer">
<div className="links-container">
    <ul>
    <li><a href="">Candidatures</a></li>
    <li><a href="">Emploi</a></li>
    <li><a href="">Methodologie</a></li>
    <li><a href="">References</a></li>
    </ul>

</div>
<div className="social-container">
<img src={facebookLogo} alt="" />
<img src={instagramLogo} alt="" />
<img src={twitterLogo} alt="" />

</div>
<div className="newsletter-container">
<input type="text" placeholder="Souscrivez à notre Newsletter !" />
</div>
    </div> );
}
 
export default Footer;