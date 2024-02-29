import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {Routes,Route,useNavigate} from 'react-router-dom'
import {useEffect,useState, createContext} from 'react'
import axios from './axiosConfig'

export const AppState= createContext();
function App() {
  const [user,setuser] = useState({})

  const token = localStorage.getItem('token')
  
  const navigate = useNavigate()
async function checkUser(){
  
try {
  const {data} = await axios.get('/users/check',{
    headers: {
      Authorization: 'Bearer ' + token,
    },
    
  });
  //  console.log(data)
  setuser(data)

} catch (error) {
  // console.log(error.response)
  navigate('/login')
}

}


useEffect(()=>{
checkUser();
},[])

  return (
    <AppState.Provider value={{user, setuser}}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={<Register />} />
      
   
    
      </Routes>
    
    </AppState.Provider>
  );
}

export default App;
