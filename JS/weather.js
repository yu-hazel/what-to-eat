document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const search = document.querySelector(".search-box button");
  const searchInput = document.querySelector("#search-input");
  const weatherBox = document.querySelector(".weather-box");
  const weatherDetails = document.querySelector(".weather-details");
  const error404 = document.querySelector(".not-found");
  const foodRecommendations = document.querySelector(".food-recommendations"); 
  const foodRecommendationText = document.querySelector("#food-recommendation-text");
  const findRestaurantBtn = document.querySelector("#find-restaurant");
  const foodButtons = document.querySelector("#food-buttons");


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
          findRestaurantBtn.style.display = "none"; // 버튼 숨기기
          return;
        }

        console.log(json);
        // 0629 혜인 추가 : 날씨 정보 어떻게 받아오는지 확인용 (weather[0].main 에서 날씨 설명 확인가능)
        console.log(json.weather[0].main)

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
          case "Mist":
            iframe.src =
              "https://lottie.host/embed/2475a98a-42ce-49ae-8abb-a24b599eb9e6/nZTmfKv5b2.json";
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

        // findRestaurantBtn.style.display = "block"; // 버튼 표시
        // // 결과에 따른 정보 map.html로 넘김
        // findRestaurantBtn.addEventListener("click", () => {
        //   const weatherMain = json.weather[0].main;
        //   const city = searchInput.value.trim();
        //   window.location.href = `map.html?city=${city}&weather=${weatherMain}`;
        // });

      // 날씨에 따른 음식 추천 버튼 설정
      foodRecommendations.style.display = "block";
      foodRecommendationText.style.display = "block"
      foodButtons.innerHTML = ""; // 기존 버튼 초기화

      let foodList = [];
      switch (json.weather[0].main) {
        case 'Rain':
          foodRecommendationText.textContent = "비가 오네요, 이런 음식은 어때요?";
          foodList = ['파전', '오뎅탕', '국밥', '칼국수'];
          break;
        case 'Clouds':
          foodRecommendationText.textContent = "구름 낀 날이네요, 이런 음식은 어때요?";
          foodList = ['마라탕', '국밥', '튀김'];
          break;
        case 'Clear':
          foodRecommendationText.textContent = "맑은 날씨네요, 이런 음식은 어때요?";
          foodList = ['카페', '아이스크림', '샐러드', '브런치'];
          break;
        // 다른 날씨에 따른 설정 추가 가능
        default:
          foodRecommendationText.textContent = "이 메뉴는 어때요?";
          foodList = ['음식점'];
        // ❗️ 이때 키워드 리스트로 바로 이동시키기 (추가구현필요)
      }

      foodList.forEach(food => {
        const button = document.createElement('button');
        button.textContent = food;
        button.addEventListener('click', () => {
          window.location.href = `map.html?city=${city}&food=${food}`;  // 클릭 이벤트 설정
        });
        foodButtons.appendChild(button);
      });

      })
      .catch(error => {
        console.error("Error fetching data:", error);
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        error404.textContent = "데이터를 불러오는 중 오류가 발생했습니다.";

        findRestaurantBtn.style.display = "none"; // 버튼 숨기기
      });
  };

  search.addEventListener("click", fetchWeather);
  searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  });

  findRestaurantBtn.addEventListener("click", () => {
    window.location.href = "map.html"; // 버튼 클릭 시 이동
  });
});
