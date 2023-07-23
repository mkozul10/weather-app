function WeatherApi(){
    const getWeather=async (city)=>{
        try{
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=f4a11767210a407798f151932232007&q=${city}`);
    
            if(!response.ok)
            {
                throw new Error('Network response was not OK');
            }
            const data = await response.json();
            const weatherData={
                "weather" : {
                    "type" : data.current.condition.text,
                    "icon" : data.current.condition.icon,
                    "tempcelsius" : data.current.temp_c,
                    "tempfahrennheit" : data.current.temp_f,
                    "windkph" : data.current.wind_kph
                },
                "location" : {
                    "city" : data.location.name,
                    "country" : data.location.country 
                }
            }
            return weatherData;

        }catch (error) {
             if (error instanceof TypeError)        console.error("Type error occurred:", error.message);
             else if (error instanceof RangeError)  console.error("Range error occurred:", error.message);
             else                                   console.error("An error occurred:", error.message);
          }
    }
    return {getWeather};
}

function ManipulateDOM(){
    const api=WeatherApi();
    const form=document.querySelector('#form1');
    const container=document.querySelector('#container');

    const callbackFunction=(response)=>{
        container.style.setProperty('display','flex');
        container.innerHTML=
        `<p>📌 ${response.location.city}, ${response.location.country}</p>
        <img src=${"https:"+response.weather.icon}>
        <span>${response.weather.type}</span>
        <span>🌡️ ${response.weather.tempcelsius}°C / ${response.weather.tempfahrennheit}°F</span>
        <span>☴ ${response.weather.windkph}km/h</span>`;
        
    }
    const processForm=(event)=>{
        event.preventDefault();
        const city=document.querySelector('#city-name').value;
        api.getWeather(city)
            .then(callbackFunction);
    }



    form.addEventListener('submit',processForm);

}

ManipulateDOM();







