import './App.css';

import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {

/*   const [content, setContent] = useState('');
  const [img, setImg] = useState('');

  const [articleList, setArticleList] = useState([])

 


  const addArticle = () => {
Axios.post('http://localhost:3001/dashboard/create',
{ 
  content : content,
  img:img
}).then(()=>{
  setArticleList([...articleList,
  {
    content : content,
    img:img
  }])
})
}; */



/* const updateEmployeeWage = (id) =>{
  Axios.put('http://localhost:3001/update', {wage:newWage,
id:id}).then((response)=> {
  setEmployeeList(employeeList.map((val)=>{
    return val.id === id ? {
      id:val.id,
    name:val.name,
    age:val.age,
  country:val.country,
position:val.position,
wage:newWage} : val
  }))
})
}

const deleteEmployee = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}` )
  .then((response)=>{
setEmployeeList(employeeList.filter((val)=>{
  return val.id !== id
}))
  })
} */



  return (
    <div className="App">

<BrowserRouter>
<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Home/>}/>
</Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
