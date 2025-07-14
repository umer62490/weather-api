// this is for second project//
// ------------------------------------------------------2nd--------------------------------------------------//


const apiKey = '91ed0ae7fde12e52b77e06011036c7aa';

const getWeather = async (city) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })

    
}

 export default getWeather;







