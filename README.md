# 🤔 그래서 뭐 먹지?


### 매일 뭐 먹을지 망설이는 당신을 위한 날씨 기반 메뉴 추천 서비스

이 프로젝트는 openweather API, Kakao API를 활용한 프로젝트입니다. <br>
HTML5, CSS3, Vanilla JavaScript를 이용하여 구현하였습니다. <br>


사용자로부터 지역명을 입력받고, 해당 지역의 날씨를 알려주며 어울리는 메뉴들을 랜덤하게 키워드로 보여줍니다. <br>
키워드 선택시 입력받은 지역명을 기반으로 키워드의 식당 정보를 띄워주며 식사 메뉴 선택을 효과적으로 이끌어주는 것을 목표했습니다. <br>

<br>

## 개요

- 프로젝트 이름 : 그래서 뭐 먹지?
- 진행 기간 : 2024.06.25 ~ 2024.07.15
- [배포 주소](https://yu-hazel.github.io/what-to-eat/HTML/index.html)

<br>

## 팀원 소개

| **유혜인** | **박강민** |
| :---: | :---: |
| [@yu-hazel](https://github.com/yu-hazel) | [@Sally8p](https://github.com/sally8p/) |
| 전체 페이지 레이아웃, 지도 페이지 | 날씨 페이지, 룰렛 페이지 |

<br>

## 사용 기술

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

<br>

## 미리 보기

| 날씨 페이지 | 지도 페이지 |
| :---: | :---: |
![](https://github.com/user-attachments/assets/34dc7a49-8849-44b5-80b4-f7f89e11fd33) | ![](https://github.com/user-attachments/assets/b6ac2bd3-9c91-4f10-9570-3c407613a00c)
| 사용자가 입력한 지역의 현재 날씨 정보 제공<br>날씨에 따른 랜덤 메뉴 키워드 표시 | 키워드 선택시 '지역명 + 키워드'가 표시되는 지도 페이지로 이동<br>이전 페이지에서 표시되었던 키워드 중 하나로 재선택 가능<br>날씨 페이지로 이동, 룰렛 페이지로 이동 버튼으로 페이지 이동 가능 |

| 룰렛 페이지 (결과 도출 전) | 룰렛 결과 페이지 |
| :---: | :---: |
![](https://github.com/user-attachments/assets/9317e6b4-6a6e-4e87-8810-f1a651dbd655) | ![](https://github.com/user-attachments/assets/70e89bcf-1f4c-4553-b169-50189377bd4a)
| 사용자 입력 키워드로 룰렛 채우기 가능<br>각 선택지의 크기 랜덤하게 설정 | 결과 도출시 사용자가 최초 입력했던 '지역명 + 룰렛 결과'가 표시되는 지도 페이지로 이동 가능 |

<br>

## JavaScript 기능 및 특징 (개인 작업분)

### 날씨 페이지 (index.html / weather.js)
- **날씨 결과 출력**: 날씨 정보를 콘솔에 출력하여 `weather[0].main` 값을 확인할 수 있습니다. 이 값을 기준으로 날씨에 따라 추천 메뉴 키워드를 배열로 미리 설정해 두었습니다.
- **메뉴 추천**: 날씨에 따라 미리 설정된 메뉴 배열에서 랜덤하게 4개의 메뉴를 선택하여 사용자에게 추천합니다.

### 지도 페이지 (map.html / map.js)
- **장소 검색 및 표시**: Kakao Map API의 '키워드로 장소 검색하고 목록으로 표출하기' 기능을 활용하여 사용자에게 검색 결과를 목록과 마커로 표시합니다.
- **쿼리 파라미터 사용**: index.html (날씨 페이지)에서 지도 페이지로 이동할 때 사용자가 입력한 지역명과 키워드를 로컬 스토리지에 저장하고, `/map.html?city=청주시&food=순대`와 같은 형태로 URL에 붙여서 지도 페이지로 전달합니다. 이를 통해 적절한 검색 결과를 보여줍니다.
- **키워드 재선택 기능**: 날씨 페이지에서 표시된 4개의 키워드를 로컬 스토리지에 저장하여 지도 페이지 상단에 표시하고, 사용자가 이를 다시 선택할 수 있도록 하였습니다.

### 룰렛 페이지 (roulette.js)
- **룰렛 결과 처리**: 룰렛을 돌린 결과로 나온 키워드를 `selectedFood` 변수에 저장하고, 로컬 스토리지에 저장된 지역명과 결합하여 사용자가 룰렛 결과를 지도로 보고자 할 때 적절한 결과가 나올 수 있도록 하였습니다.
- **결과 지도로 보기**: 룰렛 결과를 지도로 다시 보기 위한 버튼을 추가하여, 클릭 시 `map.html`로 이동하고 `selectedFood`와 지역명을 기반으로 검색 결과를 표시합니다.






