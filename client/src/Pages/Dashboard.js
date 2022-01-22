import React, {useState} from 'react';
import Axios from 'axios';

const Dashboard = () => {

    const [post, setPost] = useState([]);
    const[content, setContent] = useState('');
    const [img, setImg] = useState('')
   

    const addArticle = () => {
        
    Axios.post('http://localhost:3001/dashboard/create',
    { 
      content:content,
      img:img
    
    }).then(()=>{
      setPost([...post,
      {
        content:content,
      img:img
    
      }])
    })
    };
    return (
        <div>
  
                
            <input type="textarea" cols="30" rows="10" name="create-post" onChange={(event) => {setContent(event.target.value)}}/>
            <input type="text" name="img" onChange={(event) => {setImg(event.target.value)}}/>
            <button type="submit" onClick={()=> addArticle()}>Post !</button>

        </div>
    );
};

export default Dashboard;