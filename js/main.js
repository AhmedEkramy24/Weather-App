const navList = document.querySelector("#nav-links");
const navicon = document.querySelector("#nav-icon");

navicon.addEventListener("click", function () {
  if (navList.classList.contains("to-up")) {
    navList.classList.replace("to-up", "to-down");
  } else if (navList.classList.contains("to-down")) {
    navList.classList.replace("to-down", "to-up");
  }
});

// day 1 data

const dayOne = document.querySelector("#day-1");
const dateOne = document.querySelector("#date");
const city = document.querySelector("#city");
const tempDayOne = document.querySelector("#temp-day-1");
const stateOne = document.querySelector("#state-1");
const imgOne = document.querySelector("#img-1");
const rain = document.querySelector("#rain");
const wind = document.querySelector("#wind");
const compass = document.querySelector("#compass");

// day 2 data

const dayTwo = document.querySelector("#day-2");
const maxTempDayTwo = document.querySelector("#max-temp-day-2");
const minTempDayTwo = document.querySelector("#min-temp-day-2");
const stateTwo = document.querySelector("#state-2");
const imgTwo = document.querySelector("#img-2");

// day 3 data

const dayThree = document.querySelector("#day-3");
const maxTempDayThree = document.querySelector("#max-temp-day-3");
const minTempDayThree = document.querySelector("#min-temp-day-3");
const stateThree = document.querySelector("#state-3");
const imgThree = document.querySelector("#img-3");

// input & btn

let inp = document.querySelector("#inp");
let btn = document.querySelector("#find");

// App

async function getWeather(city) {
  try {
    const apiKey = "3bd8f67fe68b46ec89f213900240912";
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    let data = await response.json();
    let weather = data.forecast.forecastday;
    let dayOneWeather = {
      date: new Date(weather[0].date),
      city: data.location.name,
      temp: data.current.temp_c,
      img: data.current.condition.icon,
      state: data.current.condition.text,
      rain: `${weather[0].day.daily_will_it_rain}%`,
      wind: `${data.current.wind_kph} km/h`,
    };

    displayDayOne(dayOneWeather);

    let dayTwoWeather = {
      date: new Date(weather[1].date),
      maxTemp: weather[1].day.maxtemp_c,
      minTemp: weather[1].day.mintemp_c,
      state: weather[1].day.condition.text,
      img: weather[1].day.condition.icon,
    };

    displayDayTwo(dayTwoWeather);

    let dayThreeWeather = {
      date: new Date(weather[2].date),
      maxTemp: weather[2].day.maxtemp_c,
      minTemp: weather[2].day.mintemp_c,
      state: weather[2].day.condition.text,
      img: weather[2].day.condition.icon,
    };

    displayDayThree(dayThreeWeather);
  } catch (error) {
    console.log(error);
  }
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayDayOne(x) {
  dayOne.innerHTML = daysOfWeek[x.date.getDay()];
  dateOne.innerHTML = `${x.date.getDate()} ${months[x.date.getMonth()]}`;
  city.innerHTML = x.city;
  tempDayOne.innerHTML = x.temp;
  imgOne.setAttribute("src", x.img);
  stateOne.innerHTML = x.state;
  rain.innerHTML = x.rain;
  wind.innerHTML = x.wind;
}

function displayDayTwo(x) {
  dayTwo.innerHTML = daysOfWeek[x.date.getDay()];
  maxTempDayTwo.innerHTML = x.maxTemp;
  minTempDayTwo.innerHTML = x.minTemp;
  imgTwo.setAttribute("src", x.img);
  stateTwo.innerHTML = x.state;
}

function displayDayThree(x) {
  dayThree.innerHTML = daysOfWeek[x.date.getDay()];
  maxTempDayThree.innerHTML = x.maxTemp;
  minTempDayThree.innerHTML = x.minTemp;
  imgThree.setAttribute("src", x.img);
  stateThree.innerHTML = x.state;
}

getWeather("cairo");

inp.addEventListener("input", function () {
  getWeather(this.value);
});

btn.addEventListener("click", function () {
  getWeather(inp.value);
});
