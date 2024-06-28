document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const search = document.querySelector(".search-box button");
  const searchInput = document.querySelector("#search-input");
  const weatherBox = document.querySelector(".weather-box");
  const weatherDetails = document.querySelector(".weather-details");
  const error404 = document.querySelector(".not-found");

  const fetchWeather = () => {
    const openWeatherApiKey = "ae8e063da1df5b402ef32dd62bf29536";
    const city = searchInput.value.trim();

    if (city === "") return;

    // OpenWeatherMap API를 사용하여 한글 주소로 직접 날씨 정보 조회
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherApiKey}`
    )
      .then(response => response.json())
      .then(json => {
        if (json.cod === "404") {
          container.style.height = "400px";
          weatherBox.style.display = "none";
          weatherDetails.style.display = "none";
          error404.style.display = "block";
          error404.classList.add("fadeIn");
          return;
        }

        error404.style.display = "none"; // 404 페이지 숨기기
        error404.classList.remove("fadeIn");

        const weatherAnimation = document.getElementById("weather-animation");
        weatherAnimation.innerHTML = "";

        const iframe = document.createElement("iframe");
        iframe.style.width = "200px";
        iframe.style.height = "200px";
        iframe.style.border = "none";

        switch (json.weather[0].main) {
          case "Clear":
            iframe.src =
              "https://lottie.host/embed/93264c63-2f94-499d-802d-2272a9f6a32d/trG00gxeOo.json";
            break;
          case "Rain":
            iframe.src =
              "https://lottie.host/embed/9ec7bbb7-a95e-47bd-b6a0-81d67a6f1127/IUDprNQ4Eh.json";
            break;
          case "Snow":
            iframe.src =
              "https://lottie.host/embed/cf580154-2b57-4a12-88b9-332bea8356ed/5ANGutl2lr.json";
            break;
          case "Clouds":
            iframe.src =
              "https://lottie.host/embed/9f02a567-fd23-4b3c-9e6c-b1b34d8dc317/JMjifTSZvN.json";
            break;
          case "Haze":
            iframe.src =
              "https://lottie.host/embed/08d3294a-df23-4964-9d70-491df00fb25f/e4DIx6PoCC.json";
            break;
          default:
            iframe.src = "";
        }

        weatherAnimation.appendChild(iframe);

        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const wind = document.querySelector(".weather-details .wind span");

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        error404.textContent = "데이터를 불러오는 중 오류가 발생했습니다.";
      });
  };

  search.addEventListener("click", fetchWeather);
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  });
});
