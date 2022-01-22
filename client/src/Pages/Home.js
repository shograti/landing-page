import Navbar from '../components/Navbar';
import PresentationList from '../components/PresentationList'
import Footer from '../components/Footer';
import BrandsList from '../components/BrandList'
import Axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {

    const [posts, setPosts] = useState([])
    const [brands, setBrands] = useState([])


    useEffect(() => {
        Axios.get('http://localhost:3001/articles').then((res)=>{
            setPosts(res.data)
        });
      }, []);
      useEffect(() => {
        Axios.get('http://localhost:3001/brands').then((res)=>{
            setBrands(res.data)
        });
      }, []);
    return (
        <div>
            <Navbar/>
            <div className="result">
     
          <PresentationList posts={posts}/>
          <BrandsList brands={brands}/>
      </div>
            <Footer/>
            
        </div>
    );
};

export default Home;