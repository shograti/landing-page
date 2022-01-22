import Navbar from '../components/Navbar';
import PresentationList from '../components/PresentationList'
import Footer from '../components/Footer';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {

    const [posts, setPosts] = useState([])

  const  displayPosts = ()=>{
        Axios.get('http://localhost:3001/articles').then((res)=>{
            setPosts(res.data)
    })
    }
    displayPosts()
    
      
    return (
        <div>
            <Navbar/>
            <div className="result">
     
          <PresentationList posts={posts}/>
         
      </div>
            <Footer/>
            
        </div>
    );
};

export default Home;