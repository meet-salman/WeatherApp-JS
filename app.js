const rightnow = new Date;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// let nnn = rightnow.toLocaleTimeString()
// console.log(nnn);

const hours = rightnow.getHours();
const minutes = rightnow.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
const hours12 = hours % 12 || 12;
const time = `${hours12}:${minutes} ${ampm}`;

const dayName = days[rightnow.getDay()];
const day = rightnow.getDate();
const monthName = months[rightnow.getMonth()];
const year = rightnow.getFullYear();
const date = `${dayName}, ${day} ${monthName} ${year}`;

// let nnn = rightnow.toLocaleTimeString()

const weatherContainer = document.querySelector('#weather-container');
const form = document.querySelector('#form');
const input = document.querySelector('#input');

const data = [];




form.addEventListener('submit', (e) => {
    e.preventDefault()

    weatherContainer.innerHTML = ''

    axios.get(`https://api.weatherapi.com/v1/current.json?key=49625a312e254d0fa9e93711231710&q=${input.value}`)
        .then((res) => {
            const obj = res.data
            console.log(obj);


            let value = {
                'Name': obj.location.name,
                'Region': obj.location.region,
                'Country': obj.location.country,
                'Text': obj.current.condition.text,
                'Icon': obj.current.condition.icon,
                'Temperature': obj.current.temp_c,
                'FeelsLike': obj.current.feelslike_c,
                'Humidity': obj.current.humidity,
                'Visibility': obj.current.vis_km,
                'Pressure': obj.current.pressure_mb,
                'Wind': obj.current.wind_kph,
                'WindDegree': obj.current.wind_degree,
                'Gust': obj.current.gust_kph,
                'Time': obj.location.localtime
            }

            data.unshift(value);
            input.value = '';

            data.forEach(item => {
weatherContainer.style.color = "white" 
                weatherContainer.innerHTML += `
                <div id="weather-box" class="wrap">
        
                    <div  id="location-box" class="lf-padd">
                        <div    class="d-flex justify-between">
                            <p> <i class="fa-solid fa-location-dot" style="color: #ffffff;"></i> &nbsp; ${item.Name}, ${item.Region}, ${item.Country}  </p>
                            <p  id="date">${date} </p>
                        </div>
                        <hr>
                    </div>

                    <div class="lf-padd">
                        <p id="current-weather-head"> Current Weather </p>
                        <p  id="time">${item.Time} </p>
                    </div>
        
                    <div  class="d-flex gap">
                        <div  class="d-flex">
                            <img  id="icon" src="${item.Icon}" alt="icon"  width="120px"  height="120px">
                            <p  id="temp"> ${item.Temperature}<sup id="temp-unit">°C</sup> </p>
                        </div>

                        <div>
                            <p  id="text"> ${item.Text}</p>
                            <p  id="feels-like"> Feels Like &nbsp; ${item.FeelsLike}°</p>
                        </div>
                    </div>

                    <div  class="d-flex gap lf-padd">
                        <div>
                            <p class="short-head"> Humidity </p>
                            <p> ${item.Humidity}% </p>
                        </div>
                        <div>
                            <p class="short-head"> Visibility </p>
                            <p> ${item.Visibility} km </p>
                        </div>
                        <div>
                            <p class="short-head"> Pressure </p>
                            <p> ${item.Pressure} mb </p>
                        </div>
                        <div>
                            <p class="short-head"> Wind </p>
                            <p> ${item.Wind} kph </p>
                        </div>
                        <div>
                            <p class="short-head"> Wind Degree </p>
                            <p> ${item.WindDegree}° </p>
                        </div>
                        <div>
                            <p class="short-head"> Gust </p>
                            <p> ${item.Gust} kph </p>
                        </div>
                    </div>

        
            </div>`
            });

        })
        .catch((rej) => {
weatherContainer.style.color = "red" 
weatherContainer.innerHTML = ` <p> Data Not Found .</p> `
            console.log(rej);
        })


});


