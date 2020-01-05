
searchEl=document.querySelector(".search");


//String(searchEl.value);

pictureEl = document.querySelector(".picture");

iconEl = document.querySelector(".icono");

detailsEl = document.querySelector(".details");

cityEl = document.querySelector(".city");

forecastEl = document.querySelector(".forecast");

tempEl = document.querySelector(".temp");


class Cityandweather {
    constructor() {
        let searchInput = String(searchEl.value);
        this.input = searchInput;
    }

   getCityDetails (searchInput) {

        cityEl.innerText=searchInput;
        
    
            fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=WeERAuEOIhhjZODtsMFPY5snLAJOk3Jz&q=${searchInput}`)
            .then(response =>response.json())
            .then(response=>this.getForecast(response[0].Key))
            .catch(err=>console.log(err))}

    getForecast = (city) => {

                // searchInput="";
                // searchEl.value="";
             
                 fetch(`http://dataservice.accuweather.com/currentconditions/v1/${city}?apikey=WeERAuEOIhhjZODtsMFPY5snLAJOk3Jz`)    
                     
                     .then(response =>response.json())
                     .then(response=>this.outputWeather(response[0]))
                     .catch(err=>console.log(err))}

    outputWeather = (forecast) => {

        forecastEl.innerHTML = forecast.WeatherText;
        tempEl.innerText= forecast.Temperature.Metric.Value;

        if (forecast.IsDayTime) {pictureEl.src="images/partly-cloudy.svg";}

         else {pictureEl.src="images/night.svg"};

            if (forecast.WeatherText=="Mostly clear") {
            iconEl.src=`images/partly-cloudy.svg`;
            }

            else if (forecast.WeatherText=="Clear") {
                iconEl.src=`images/sunny.svg`;
                }

            else if (forecast.WeatherText=="Sunny") {
                    iconEl.src=`images/sunny.svg`;
                    }
            
            else if (forecast.WeatherText=="Rain") {
                iconEl.src=`images/rainy.svg`;
                }
            else if (forecast.WeatherText=="Cloudy") {
                    iconEl.src=`images/cloudy.svg`;
                    }
            
        }};


const weather = new Cityandweather();

// EVent listener on the search

searchEl.addEventListener('input', function (e) {

e.preventDefault();

searchInput = String(searchEl.value);

updateStorage(searchInput);

weather.getCityDetails(searchInput);

});




//Get city ID




const updateStorage = (city) => {

    localStorage.clear();

    localStorage.setItem('city', city);
}

const getFromStorage = () => {

    const city = localStorage.getItem('city');

    weather.getCityDetails(city);

}

getFromStorage();