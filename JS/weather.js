document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const search = document.querySelector(".search-box button");
  const searchInput = document.querySelector("#search-input");
  const weatherBox = document.querySelector(".weather-box");
  const weatherDetails = document.querySelector(".weather-details");
  const error404 = document.querySelector(".not-found");
  const foodRecommendations = document.querySelector(".food-recommendations");
  const foodRecommendationText = document.querySelector(
    "#food-recommendation-text"
  );
  const findRestaurantBtn = document.querySelector("#find-restaurant");
  const foodButtons = document.querySelector("#food-buttons");
  const introTitle = document.querySelector(".title_intro");

  // 타이틀 문구 타이핑
  const title = "그래서 뭐 먹지? 🤔";
  let cnt = 0;

  const typingIntroTitle = () => {
    if (cnt < title.length) {
      introTitle.innerHTML += title[cnt++];
    } else {
      clearInterval(timer);
    }
  };

  const timer = setInterval(typingIntroTitle, 200);

  const fetchWeather = () => {
    const openWeatherApiKey = "ae8e063da1df5b402ef32dd62bf29536";
    const city = searchInput.value.trim();

    if (city === "") return;

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
          error404.innerHTML =
            '<iframe src="https://lottie.host/embed/57f97fb0-933c-48cd-ba3c-14b60aa01c57/ycrh11e795.json" style="width: 400px; height: 200px; border: none;"></iframe><p>다시 한번 검색해보시겠어요...?🙏🏻</p>';
          findRestaurantBtn.style.display = "none"; // 버튼 숨기기
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

        // 날씨에 따른 음식 추천 버튼 설정
        foodRecommendations.style.display = "block";
        foodRecommendationText.style.display = "block";
        foodButtons.innerHTML = ""; // 기존 버튼 초기화

        let foodList = [];
        switch (json.weather[0].main) {
          case "Rain":
            foodRecommendationText.textContent =
              "비가 오네요, 이런 음식은 어때요?";
            foodList = [
              "파전",
              "오뎅탕",
              "국밥",
              "칼국수",
              "부대찌개",
              "된장찌개",
              "라면",
              "전",
            ];
            break;
          case "Clouds":
            foodRecommendationText.textContent =
              "구름 낀 날이네요, 이런 음식은 어때요?";
            foodList = [
              "마라탕",
              "국밥",
              "튀김",
              "순대국",
              "제육볶음",
              "닭갈비",
              "보쌈",
              "족발",
            ];
            break;
          case "Clear":
            foodRecommendationText.textContent =
              "맑은 날씨네요, 이런 음식은 어때요?";
            foodList = [
              "카페",
              "아이스크림",
              "샐러드",
              "브런치",
              "스시",
              "샌드위치",
              "파스타",
              "스테이크",
            ];
            break;
          default:
            foodRecommendationText.textContent = "이 메뉴는 어때요?";
            foodList = ["음식점"];
        }

        // 리스트를 랜덤으로 섞기
        foodList.sort(() => Math.random() - 0.5);

        // 첫 번째 8개의 음식 버튼 만들기
        foodList.slice(0, 8).forEach(food => {
          const button = document.createElement("button");
          button.textContent = food;
          button.addEventListener("click", () => {
            window.location.href = `map.html?city=${city}&food=${food}`; // 클릭 이벤트 설정
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
        error404.innerHTML =
          '<iframe src="https://lottie.host/embed/57f97fb0-933c-48cd-ba3c-14b60aa01c57/ycrh11e795.json" style="width: 400px; height: 200px; border: none;"></iframe><p>다시 한번 검색해보시겠어요...?🙏🏻</p>';

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
