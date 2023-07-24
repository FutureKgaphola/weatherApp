import { useState } from 'react';
import dark from './assets/dark.jpg'
import axios from 'axios';
import { message } from 'antd';
import brokenClouds from './assets/cloudy.png';
import rain from './assets/rain.png';
import thunder from './assets/thunder.png';
import sunny from './assets/sunny.png';
import foggy from './assets/foggy.png';
import clear from './assets/clear.png';

function App() {
  const [data,setData]=useState({});
  const [place,setplace]=useState('');
  const [messageApi, contextHolder] = message.useMessage();
  
  const getdata= async()=>{
    if(place!==''){
      try {
        var key= process.env.REACT_APP_API_KEY;
        var url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}`;
        var responce= await axios.get(url);
        setData(responce.data);
        
      } catch (error) {
        
        messageApi.open({
          type: 'error',
          content: String(error),
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        });
      }
    }else{

      messageApi.open({
        type: 'error',
        content: 'Opps... please specify a place',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
    
  }

  return (
    <div style={{
      backgroundImage: `url(${dark})`,
      backgroundSize: 'cover',
      height: '100%',
      backgroundRepeat: 'no-repeat'
    }}>

      <div className="container vh-100 d-flex justify-content-center align-items-center"
      >
        <div className="card text-bg-dark mb-3" style={{ width: '28rem' }}>
          {
            data.sys ? <div className="card-header">{data.name}, {data.sys.country}</div> : null
          }
          
          <div style={{margin:'5px'}}>
          <input
          onChange={(e)=>setplace(e.target.value)}
           style={{width:'100%'}} className="form-control" type="text" placeholder="Input location"></input>
           <button
           onClick={()=>getdata()} style={{margin:'5px'}} type="button" className="btn btn-success btn-sm">Search weather conditions</button>
          </div>
          {contextHolder}
          {
            data.main && data.weather[0].description!=='' && (data.weather[0].description).toLowerCase().includes('sun') ? 
            <img style={{margin:'3px'}} src={sunny} alt="..." width="40px" height="40px"/> : null
          }
          {
            data.main && data.weather[0].description!=='' && ((data.weather[0].description).toLowerCase().includes('mist') || (data.weather[0].description).toLowerCase().includes('fog')) ? 
            <img style={{margin:'3px'}} src={foggy} alt="..." width="40px" height="40px"/> : null
          }
          
          {
            data.main && data.weather[0].description!=='' && (data.weather[0].description).toLowerCase().includes('clear sky') ? 
            <img style={{margin:'3px'}} src={clear} alt="..." width="40px" height="40px"/> : null
          }
          {
            data.main && data.weather[0].description!=='' && (data.weather[0].description).toLowerCase().includes('clouds') ? 
            <img style={{margin:'3px'}} src={brokenClouds} alt="..." width="40px" height="40px"/> : null
          }
          {
            data.main && data.weather[0].description!=='' && (data.weather[0].description).toLowerCase().includes('thunder') ? 
            <img style={{margin:'3px'}} src={thunder} alt="..." width="40px" height="40px"/> : null
          }
          {
            data.main && data.weather[0].description!=='' && (data.weather[0].description).toLowerCase().includes('rain') ? 
            <img style={{margin:'3px'}} src={rain} alt="..." width="40px" height="40px"/> : null
          }
          
          <div className="card-body">
            {
              data.main ? <h2 className="card-title">{(data.main.temp-273.15).toFixed(0)} °C</h2> : null
            }
            {
              data.weather ? <p className="card-text">{data.weather[0].description}</p> : null
            }
            {
              data.coord ? <p className="card-text">latitude: {data.coord.lat} and longitude: {data.coord.lon}</p> : null
            }
            {
              data.main ? <p className="card-text">Humidity: {data.main.humidity}</p> : null
            }
            {
              data.wind ? <p className="card-text">wind speed: {data.wind.speed} mph</p> : null
            }
            
          </div>
        </div>
      </div>

    </div>


  );
}

export default App;
