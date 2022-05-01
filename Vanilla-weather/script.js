const apiKey = "82cb994c9173802b756653cd51c63e51";
var longitude;
var latitude;
const kelvin = 273;
var weatherIcon = document.querySelector(".weather-icon");
var place = document.querySelector(".location");
var notification = document.querySelector(".notification");
var tempValue = document.querySelector(".temp-value");
var pressure = document.querySelector(".atm-pressure");
var humidity = document.querySelector(".humidity");

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            var unit = "metric";
            var imperial = "imperial"
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + unit;
            
            fetch(apiUrl)
                .then((response) => {
                    var data = response.json();
                    return data;
                })
                .then((data) => {
                    console.log(data);
                    var weatherImg = data.weather[0].icon;
                    var imageUrl = "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
                    place.textContent = "You are in " + data.name + " now!";
                    
                    tempValue.innerHTML = Math.floor(data.main.temp) + " °C";
                    weatherIcon.innerHTML = "<img src =" + imageUrl + ">";
                    var descriptionF = data.weather[0].description;
                    var upperDescription = descriptionF.slice(0,1);
                    var desRem = descriptionF.slice(1,descriptionF.length);
                    var init = upperDescription.toUpperCase();
                    
                    notification.innerHTML =init+desRem;
                    var hmv = Math.floor(data.main.humidity);
                    humidity.innerHTML = "The humidity is " + hmv + "% here in " + data.name ;
                    var atmV = Math.floor(data.main.pressure);
                    pressure.innerHTML = "The atmospheric pressure is " + atmV + " hPa here in " + data.name;
                })
        }, (Error)=>{
 notification.innerHTML="Location access denied."
        })
    }
})


