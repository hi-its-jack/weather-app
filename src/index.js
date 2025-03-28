import "./styles.css"

const API_KEY = process.env.API_KEY

document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector("#weatherForm")
    const locationData = document.querySelector("#location")
    const mainContainer = document.querySelector(".main-section")
    const loading = document.querySelector(".loading") 

    const fetchWeather = async (location) => {
        loading.style.display = "block"
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`, {
                mode: 'cors'})
            if (!response.ok) {
                throw new Error("Failed to fetch the weather data")
            }
            const data = await response.json()
            loading.style.display = "none"
            displayWeather(data)
        } catch (error) {
            loading.style.display = "none"
            alert("Could not retrieve weather data!")
        }
    }

    const displayWeather = (data) => {

        const address = data.resolvedAddress
        const conditions = data.currentConditions.conditions
        const container = document.querySelector(".main-section")    

        const location = document.createElement("h2")
        location.textContent = address 
        const currentConditions = document.createElement("p")
        currentConditions.textContent = conditions
        container.append(location, currentConditions)
    }

    weatherForm.addEventListener("submit", (e) => {
        mainContainer.innerHTML = ""
        e.preventDefault()
        const location = locationData.value
        fetchWeather(location)
    })
});
