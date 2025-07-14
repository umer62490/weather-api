// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';
// import { FiSearch } from 'react-icons/fi';
// import Cloud from './assets/cloudweather.png';
// import Clear from './assets/clearweather.png';
// import Rain from './assets/rainweather.png';
// import Drizzle from './assets/drizzleweather.png';
// import Mist from './assets/mistweather.png';
// import Loader from './Loader'; // Import your loader component

// function WeatherApp() {
//     const [data, setData] = useState({
//         celcius: 10,
//         name: 'London',
//         humidity: 10,
//         speed: 2,
//         condition: 'Clouds',
//     });
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false); // New loading state

//     const handleClick = () => {
//         if (name !== "") {
//             setLoading(true);
//             const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=91ed0ae7fde12e52b77e06011036c7aa&units=metric`;
    
//             axios.get(apiUrl)
//                 .then(res => {
//                     setTimeout(() => {
//                         setData({
//                             celcius: res.data.main.temp,
//                             name: res.data.name,
//                             humidity: res.data.main.humidity,
//                             speed: res.data.wind.speed,
//                             condition: res.data.weather[0].main,
//                         });
//                         setError('');
//                         setLoading(false); // End loading after 2 seconds
//                     }, 1000); // 2-second delay
//                 })
//                 .catch(err => {
//                     setTimeout(() => {
//                         if (err.response && err.response.status === 404) {
//                             setError("Invalid City Name");
//                         } else {
//                             setError('An error occurred. Please try again.');
//                         }
//                         setLoading(false); // End loading after 2 seconds
//                     }, 1000); // 2-second delay
//                 });
//         }
//     };

//     const getWeatherImage = () => {
//         switch (data.condition) {
//             case "Clouds":
//                 return Cloud;
//             case "Clear":
//                 return Clear;
//             case "Rain":
//                 return Rain;
//             case "Drizzle":
//                 return Drizzle;
//             case "Mist":
//                 return Mist;
//             default:
//                 return Cloud;
//         }
//     };

//     return (
//         <div className="container">
//             <div className="weather">
//                 <div className="search">
//                     <input
//                         value={name}
//                         type="text"
//                         placeholder="Enter City Name"
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <button onClick={handleClick}>
//                         <FiSearch size={20} />
//                     </button>
//                 </div>
//                 <div className="error">
//                     <p>{error}</p>
//                 </div>

//                 {loading ? (
//                     <Loader /> // Show the loader while data is being fetched
//                 ) : (
//                     <div className="winfo">
//                         <img src={getWeatherImage()} alt={data.condition} className="weather-icon" />
//                         <h1>{Math.round(data.celcius)}°C</h1>
//                         <h2>{data.name}</h2>
//                         <div className="details">
//                             <div className="col">
//                                 <p>{Math.round(data.humidity)}% Humidity</p>
//                             </div>
//                             <div className="col">
//                                 <p>{Math.round(data.speed)} km/h Wind</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default WeatherApp;


//-------------------------------------------------------------------------------2nd-------------------------------//


// import "./App.css";
// import { Search, MapPin, Wind, Mic, MicOff } from "react-feather"; 
// import getWeather from "./api"; 
// import { useState, useEffect } from "react";
// import dateFormat from "dateformat";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import Loader from "./Loader";

// function WeatherApp() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [isListening, setIsListening] = useState(false);

//   const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript) {
//       setCity(cleanInput(transcript));
//     }
//   }, [transcript]);

//   useEffect(() => {
//     if (weather.weather) {
      
//       document.body.className = getBackgroundClass(weather.weather[0].main);
//     }
//   }, [weather]);

  
//   const cleanInput = (input) => {
//     const normalizedCity = input
//       .replace(/\s+/g, ' ')
//       .replace(/^\s+|\s+$/g, '')
//       .replace(/[.]+/g, '')
//       .toLowerCase();
//     return normalizedCity;
//   };

//   const startListening = () => {
//     SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
//     setIsListening(true);
//   };

//   const stopListening = () => {
//     SpeechRecognition.stopListening();
//     setIsListening(false);
//     handleSpeechToText();
//   };

//   const getWeatherbyCity = async () => {
//     if (!city) {
//       alert("Please enter a city name.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const weatherData = await getWeather(city);
//       setWeather(weatherData);
//     } catch (error) {
//       alert("Could not fetch weather data. Please try again.");
//     } finally {
//       setLoading(false);
//       setIsListening(false);
//       setCity(""); 
//       resetTranscript();
//       SpeechRecognition.stopListening();
//     }
//   };

//   const renderDate = () => {
//     const now = new Date();
//     return dateFormat(now, "dddd, mmmm dS, h:MM TT");
//   };

//   const handleSpeechToText = () => {
//     if (transcript) {
//       setCity(cleanInput(transcript));
//     }
//   };

//   const getBackgroundClass = (weatherCondition) => {
//     if (weatherCondition.includes("Clouds")) {
//       return "weather-cloudy";
//     } else if (weatherCondition.includes("Fog")) {
//       return "weather-foggy";
//     } else if (weatherCondition.includes("Clear")) {
//       return "weather-clear";
//     } else if (weatherCondition.includes("Mist")) {
//       return "weather-mist";  
//     } else if (weatherCondition.includes("Rain")) {
//       return "weather-rain";  
//     } else if (weatherCondition.includes("Snow")) {
//       return "weather-snow";  
//     } else if (weatherCondition.includes("Sunny")) {
//       return "weather-sunny";  
//     }
//     return "";  
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return <p>Speech Recognition is not supported in this browser.</p>;
//   }

//   return (
//     <div className="app">
//       <h1>Weather App</h1>
//       <div className="input-wrapper">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter City Name"
//         />
//         <div className="speech-btn" onClick={isListening ? stopListening : startListening}>
//           {isListening ? <MicOff /> : <Mic />}
//         </div>
//         <button onClick={getWeatherbyCity}>
//           <Search />
//         </button>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : weather && weather.weather ? (
//         <div className="content">
//           <div className="location d-flex">
//             <MapPin />
//             <h2>
//               {weather.name} <span>({weather.sys.country})</span>
//             </h2>
//           </div>
//           <p className="datetext">{renderDate()}</p>

//           <div className="weatherdesc d-flex flex-c">
//             <img
//               src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//               alt=""
//             />
//             <h3>{weather.weather[0].description}</h3>
//           </div>

//           <div className="tempstats d-flex flex-c">
//             <h1>
//               {weather.main.temp} <span>&deg;C</span>
//             </h1>
//             <h3>
//               Feels Like {weather.main.feels_like} <span>&deg;C</span>
//             </h3>
//           </div>

//           <div className="windstats d-flex">
//             <Wind />
//             <h3>
//               Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;
//             </h3>
//           </div>
//         </div>
//       ) : (
//         <div className="content">
//           <h4>No Data found!</h4>
//         </div>
//       )}
//     </div>
//   );
// }

// export default WeatherApp;


//------------------------------------------------------------------speech to text------------------------------------------//


// import "./App.css"
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import useClipboard from "react-use-clipboard";
// import {useState} from "react";


// const App = () => {
//     const [textToCopy, setTextToCopy] = useState();
//     const [isCopied, setCopied] = useClipboard(textToCopy, {
//         successDuration:1000
//     });

//     const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
//     const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//     if (!browserSupportsSpeechRecognition) {
//         return null
//     }

//     return (
//         <>
//             <div className="container">
//                 <h2>Speech to Text Converter</h2>
//                 <br/>
//                 <p>A React hook that converts speech from the microphone to text and makes it available to your React
//                     components.</p>

//                 <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
//                     {transcript}
//                 </div>

//                 <div className="btn-style">

//                     <button onClick={setCopied}>
//                         {isCopied ? 'Copied!' : 'Copy to clipboard'}
//                     </button>
//                     <button onClick={startListening}>Start Listening</button>
//                     <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

//                 </div>

//             </div>

//         </>
//     );
// };

// export default App;

//----------------------------------------------------------------------------practice weather app----------------------------------------------------------------------//



// import React, { useState,useEffect } from 'react';
// import { Search, MapPin, Wind, Mic, MicOff } from "react-feather"; 
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import getWeather from "./api/api"; 
// import "./App.css";
// import dateFormat from "dateformat";
// import Loader from "./Loader";

// const WeatherApp = () => {
//   const [city,setCity] = useState()
//   const [isListening, setIsListening] = useState(false);
//   const [weather, setWeather] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

//   // useEffect(() => {
//   //       if (transcript) {
//   //         setCity(cleanInput(transcript));
//   //       }
//   //     }, [transcript]);

//       const cleanInput = (input) => {
//             const normalizedCity = input
//               .replace(/\s+/g, ' ')
//               .replace(/^\s+|\s+$/g, '')
//               .replace(/[.]+/g, '')
//               .toLowerCase();
//             return normalizedCity;
//           };

//           const startListening = () => {
//                 SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
//                 setIsListening(true);
//               };
            
//               const stopListening = () => {
//                 SpeechRecognition.stopListening();
//                 setIsListening(false);
//                 handleSpeechToText();
//               };

//               const handleSpeechToText = () => {
//                     if (transcript) {
//                       setCity(cleanInput(transcript));
//                     }
//                   };

//                   if (!browserSupportsSpeechRecognition) {
//                         return <p>Speech Recognition is not supported in this browser.</p>;
//                       }
            

//   const handleSearch = async () => {
//           if (!city) {
//             alert("Please enter a city name.");
//             return;
//           }
//           setLoading(true);
//           try {
//             const weatherData = await getWeather(city);
//             setWeather(weatherData);
//           } catch (error) {
//             alert("Could not fetch weather data. Please try again.");
//           } finally {
//             setLoading(false);
//             setIsListening(false);
//             setCity(""); 
//             resetTranscript();
//             SpeechRecognition.stopListening();
//           }
//         };

//         useEffect(() => {
//               if (weather.weather) {
                
//                 document.body.className = getBackgroundClass(weather.weather[0].main);
//               }
//             }, [weather]);
      
//             const renderDate = () => {
//                   const now = new Date();
//                   return dateFormat(now, "dddd, mmmm dS, h:MM TT");
//                 };

//                 const getBackgroundClass = (weatherCondition) => {
//                       if (weatherCondition.includes("Clouds")) {
//                         return "weather-cloudy";
//                       } else if (weatherCondition.includes("Fog")) {
//                         return "weather-foggy";
//                       } else if (weatherCondition.includes("Clear")) {
//                         return "weather-clear";
//                       } else if (weatherCondition.includes("Mist")) {
//                         return "weather-mist";  
//                       } else if (weatherCondition.includes("Rain")) {
//                         return "weather-rain";  
//                       } else if (weatherCondition.includes("Snow")) {
//                         return "weather-snow";  
//                       } else if (weatherCondition.includes("Sunny")) {
//                         return "weather-sunny"; 
//                       }
//                       return "";  
//                     };

  


//   return (
//     <div>

//     <h1>Weather App</h1>

//    <div className='input-wrapper'>

//    <input placeholder='Enter Place' value={city} onChange={(e)=>setCity(e.target.value)}/>
//    <div className="speech-btn" onClick={isListening ? stopListening : startListening}>
//            {isListening ? <MicOff /> : <Mic />}
//          </div>
//     <button onClick={handleSearch}><Search></Search></button>

//    </div>
//    {loading ? (
//          <Loader />
//        ) : weather && weather.weather ? (
//          <div className="content">
//            <div className="location d-flex">
//              <MapPin />
//              <h2>
//                {weather.name} <span>({weather.sys.country})</span>
//              </h2>
//            </div>
//            <p className="datetext">{renderDate()}</p>

//            <div className="weatherdesc d-flex flex-c">
//              <img
//                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//                alt=""
//              />
//              <h3>{weather.weather[0].description}</h3>
//            </div>

//            <div className="tempstats d-flex flex-c">
//              <h1>
//                {weather.main.temp} <span>&deg;C</span>
//              </h1>
//              <h3>
//                Feels Like {weather.main.feels_like} <span>&deg;C</span>
//              </h3>
//            </div>

//            <div className="windstats d-flex">
//              <Wind />
//              <h3>
//                Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;
//              </h3>
//            </div>
//          </div>
//        ) : (
//          <div className="content">
//            <h4>No Data found!</h4>
//          </div>
//        )}
     
   

   
      
//     </div>
//   )
// }

// export default WeatherApp


//-----------------------------------------------------------------------task -----------------------------------------------------------------///


import React, { useState,useEffect } from 'react';
import { Search, MapPin, Wind, Mic, MicOff } from "react-feather"; 
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import getWeather from "./api/api"; 
import "./App.css";
import dateFormat from "dateformat";
import Loader from "./Loader";

const WeatherApp = () => {

  const[place,setPlace] = useState('')
  const[weather,setWeather] = useState({})
  const[loading,setLoading] = useState(false)
  const[isListening,setIsListening]= useState(false)
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => {
          SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
          setIsListening(true);
        };
                
        const stopListening = () => {
                    SpeechRecognition.stopListening();
          setIsListening(false);
          handleSpeechToText();
        };

        const cleanInput = (input) => {
                      const normalizedCity = input
                        .replace(/\s+/g, ' ')
                        .replace(/^\s+|\s+$/g, '')
                        .replace(/[.]+/g, '')
                        .toLowerCase();
                      return normalizedCity;
                    };

        const handleSpeechToText = () => {
          if(transcript){
            setPlace(cleanInput(transcript))
          }
        }

        const handleSearch = async () => {
          if(!place){
            alert('please enter place')
            return
          }
          setLoading(true)
          try{
            const weatherData = await getWeather(place)
            setWeather(weatherData)

          }
          catch(error){
            alert("Could not fetch weather data. Please try again.",error.message);
            throw error; 

          }
          finally{
            setLoading(false)
            setIsListening(false)
            setPlace('')
            resetTranscript();
             SpeechRecognition.stopListening();
          }

        }

        if(!browserSupportsSpeechRecognition){
          alert("browser does not support voice")
        }

        const renderDate = () => {
            const now = new Date();
            return dateFormat(now, "dddd, mmmm dS, h:MM TT");
          };

        useEffect(() => {
                      if (weather.weather) {                    
                        document.body.className = getBackgroundClass(weather.weather[0].main);
                      }
                    }, [weather]);
                                  
                           
                            
            const getBackgroundClass = (weatherCondition) => {
                  if (weatherCondition.includes("Clouds")) {
                    return "weather-cloudy";
                  } else if (weatherCondition.includes("Fog")) {
                    return "weather-foggy";
                  } else if (weatherCondition.includes("Clear")) {
                    return "weather-clear";
                  } else if (weatherCondition.includes("Mist")) {
                    return "weather-mist";  
                  } else if (weatherCondition.includes("Rain")) {
                    return "weather-rain";  
                  } else if (weatherCondition.includes("Snow")) {
                    return "weather-snow";  
                  } else if (weatherCondition.includes("Sunny")) {
                    return "weather-sunny";  
                  }
                  return "";  
                };
                            

  return (

    <div>
    <h1 style={{color:'black' , textAlign: "center"}}>WEATHER APP</h1>

    <div className='input-wrapper'>
      <input placeholder='Enter Place' value={place} onChange={(e)=>setPlace(e.target.value)}/>
      
      <div style={{color:'red' ,  marginRight: "10px", translate:" 2px 5px" }} className="speech-btn " onClick={isListening ? stopListening : startListening}>
            {isListening ? <MicOff /> : <Mic />}
          </div>
      <button onClick={handleSearch}>
      <Search></Search>
        
      </button>
    </div>
    

    {loading?(
      <Loader />
    ):  weather && weather.weather ? (
          <div className="content">
            <div className="location d-flex">
              <MapPin />
              <h2 className='text-color'>
                {weather.name} <span>({weather.sys.country})</span>
              </h2>
            </div>
            <p className="datetext text-color">{renderDate()}</p>

            <div className="weatherdesc d-flex flex-c">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
              <h3 className='text-color'>{weather.weather[0].description}</h3>
            </div>

            <div className="tempstats d-flex flex-c">
              <h1 className='text-color'>
                {weather.main.temp} <span>&deg;C</span>
              </h1>
              <h3 className='text-color'>
                Feels Like {weather.main.feels_like} <span>&deg;C</span>
              </h3>
            </div>

            <div className="windstats d-flex">
              <Wind />
              <h3>
                Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;
              </h3>
            </div>
          </div>
        ) : (
          <div className="content">
            <h4>No Data found!</h4>
          </div>
        )}
      
    </div>
  )
}

export default WeatherApp











//---------------------------------------------------------------------card api response------------------------------------------------------//


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const WeatherApp = () => {
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const response = await axios.get('https://dummyjson.com/carts');
//         setCartData(response.data.carts); // Save the carts data to the state
//         console.log(response.data); // Log the data for debugging
//       } catch (error) {
//         console.error('Error fetching cart data:', error); // Error handling
//       }
//     };

//     fetchCartData(); // Call the async function to fetch data
//   }, []); // Empty dependency array to fetch only once on mount


  

//   return (
//     <div>
//       <h1>Product Carts</h1>
//       {cartData.map((cart) => {
//         return (
//           <div key={cart.id}>
//             <h3>Cart ID: {cart.id}</h3>
//             {cart.products.map((product) => {
//               return (
//                 <div key={product.id}>
//                   <img src={product.thumbnail} alt={product.title} />
//                   <h4>{product.title}</h4>
//                   <p>Price: ${product.price}</p>
//                   <p>Quantity: {product.quantity}</p>
//                   <p>Total: ${product.total}</p>
//                   <p>Discounted Total: ${product.discountedTotal}</p>
//                   <p>Discounted Percentage: ${product.discountPercentage}</p>

//                 </div>
//               );
//             })}
//             <div style={{ marginTop: '20px', padding: '15px', border: '2px solid black', backgroundColor: '#f9f9f9' }} className='total-details'>
//             <p>Total Cart Price: ${cart.total}</p>
//             <p>Discounted Total: ${cart.discountedTotal}</p>
//             <p>Total Products in Cart: {cart.totalProducts}</p>
//             <p>Total Quantity in Cart: {cart.totalQuantity}</p>

//             </div>
//           </div>
//         );
//       })}
    
//     </div>
    
//   );
// };

