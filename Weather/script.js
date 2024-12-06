const weatherForm = document.querySelector(".weatherForm")
const cityInput=document.querySelector(".cityInput")
const card=document.querySelector(".card")
const apiKey ="fa1a722438528dc7491c0f82f6ab403d";
weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWEatherInfo(weatherData)

        }catch(error){
            console.error(error)
            displayError(error)
        }
    }else{
        displayError("Por favor, coloque sua cidade")
    }

});
async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const respnse = await fetch(apiURL)
    if(!respnse.ok){
        throw new Error("City not found")
    }
        return await respnse.json()


}
function displayWEatherInfo(data){
    const{name: city, main:{temp, humidity},
     weather:[{description, id}]} = data
     card.textContent = ""
     card.style.display= "flex"
     const cityDisplay = document.createElement("h1")
     const tempDisplay = document.createElement("p")
     const humidityDisplay = document.createElement("p")
     const descDisplay = document.createElement("p")
     const weatherEmoji = document.createElement("p")
     cityDisplay.textContent = city
     tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`
     humidityDisplay.textContent=`Humidity:${humidity}%`
     descDisplay.textContent=description
     weatherEmoji.textContent=getWeatherEmoji(id)

     cityDisplay.classList.add("cityDisplay")
     tempDisplay.classList.add("tempDisplay")
     humidityDisplay.classList.add("humidityDisplay")
     descDisplay.classList.add("descDisplay")
     weatherEmoji.classList.add("WeatherEmoji")

     card.appendChild(cityDisplay)
     card.appendChild(tempDisplay)
     card.appendChild(humidityDisplay)
     card.appendChild(descDisplay)
     card.appendChild(weatherEmoji)

}
function getWeatherEmoji(weatherID){
     switch(true){
        case(weatherID>=200 && weatherID<300):
        return`\u{26C8}`;
        case(weatherID>=300 && weatherID<400):
        return `\u{1F327}`;
        case(weatherID>=500 && weatherID<600):
        return `\u{1F327}`;
        case(weatherID>=600 && weatherID<700):
        return `\u{1F328}`;
        case(weatherID>=700 && weatherID<800):
        return `\u{1F32B}`;
        case(weatherID===800):
        return `\u{1F328}`;
        case(weatherID>=801 && weatherID<810):
        return `\u{2601}`;
        default:
            return "?";
    }

}
function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message
    errorDisplay.classList.add("errorDisplay")
    card.textContent=""
    card.style.display="flex"
    card.appendChild(errorDisplay)
}