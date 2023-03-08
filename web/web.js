let btn = document.querySelector(".btn")
let wet = document.querySelector(".wet")
let hum = document.querySelector(".hum")
btn.addEventListener("click", fetchWeather)
async function fetchWeather() {

    let weater = await axios.get("https://my-weather-app.cyclic.app/weather")
    data = weater.data
    console.log(data);
    wet.innerHTML = data.temp
    hum.innerHTML = data.humadity
}