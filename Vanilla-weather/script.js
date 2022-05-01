const apiKey = "82cb994c9173802b756653cd51c63e51";
var longitude;
var latitude;
const kelvin = 273;
var weatherIcon = document.querySelector(".weather-icon");
var place = document.querySelector(".location");
var notification = document.querySelector(".notification");
var temperature = document.querySelector(".temp-value");

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            var unit = "metric";
            var imperial = "imperial"
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=" + unit;
            temperature.addEventListener("click", (event) => {
                console.log(event);
                setTimeout(() => {
                    unit = imperial;
                }, 5000)
            })
            fetch(apiUrl)
                .then((response) => {
                    var data = response.json();
                    return data;
                })
                .then((data) => {
                    console.log(data);
                    var weatherImg = data.weather[0].icon;
                    var imageUrl = "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
                    place.textContent = data.name;
                    temperature.innerHTML = Math.floor(data.main.temp) + " °C";
                    weatherIcon.innerHTML = "<img src =" + imageUrl + ">";
                    var descriptionF = data.weather[0].description;
                    var upperDescription = descriptionF.slice(0,1);
                    var desRem = descriptionF.slice(1,descriptionF.length);
                    var init = upperDescription.toUpperCase();
                    
                    notification.innerHTML =init+desRem;
                })
        }, (Error)=>{
 notification.innerHTML="<p style = 'color: red'>Location access denied</p>."
        })
    }
})


