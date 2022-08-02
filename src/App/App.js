import React, {useState,useEffect} from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import axios from 'axios';
import './component/bootstrap.min.css';
import Map from './component/Map';
import Disease from './component/Disease'
import Pest from './component/Pest';
import Pest2 from './img/bet1.jpg';




const Routes=()=>{
//   const server = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDoCvneKACzoJJWpn6Na1oFVgoAg4WTj4I&callback=initMap';
  
//  const [ googleMap, setgoogleMap ] = useState({})

//    const fetchDto=()=>{
//     axios.get(server).then((result)=>{
//         setgoogleMap(result);
//          console.log(server)
//      })
//     }

//      useEffect(() => {
//      fetchDto();
    
//    }, [])
  
    return(
      
    <BrowserRouter>
    
          <Switch>
       <Route exact path="/">
       <Home/>
       
       </Route>
      
       <Route exact path="/Login">
       <Login/>
       </Route>
       <Route exact path="/Disease">
       <Disease/>
       </Route>
       <Route exact path="/Map">
       <Map/>
       </Route>

       <Route exact path="/Pest">
       <Pest
       img={Pest2}
       />
       </Route>
      
      </Switch>
    
    </BrowserRouter>
    );
  }



function App() {
  
  return (
    <div className="App" >
     <Routes/>
     
    
      
    </div>
  );
}

export default App;
