import Brands from './Brands'
import './BrandList.css'


const BrandsList = (props) => {
    return (  
        <div className="brand-list">
        {props.brands.map(brand =>
             <Brands key={brand.brands_id} brand={brand}/>)}
    </div>
    );
}
 
export default BrandsList;