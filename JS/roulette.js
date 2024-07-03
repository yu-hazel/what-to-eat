document.addEventListener("DOMContentLoaded", () => {
  const homeButton = document.querySelector("#home-button");

  homeButton.addEventListener("click", () => {
    window.history.back();
  });
});

const $c = document.querySelector("canvas");
const ctx = $c.getContext("2d");
const product = [];
const colors = [];
const proportions = []; 

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const getRandomProportion = () => {
  return Math.random() + 0.1; 
};

const newMake = () => {
  ctx.clearRect(0, 0, $c.width, $c.height);
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const totalProportions = proportions.reduce((acc, curr) => acc + curr, 0); 

  let startAngle = 0;

  for (let i = 0; i < product.length; i++) {
    const arc = (Math.PI * 2 * proportions[i]) / totalProportions; 
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, startAngle, startAngle + arc);
    ctx.fill();
    ctx.closePath();
    startAngle += arc;
  }

  ctx.fillStyle = "#fff";
  ctx.font = "20px Pretendard";
  ctx.textAlign = "center";

  startAngle = 0;

  for (let i = 0; i < product.length; i++) {
    const arc = (Math.PI * 2 * proportions[i]) / totalProportions;
    const angle = startAngle + arc / 2;

    ctx.save();

    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );

    ctx.rotate(angle + Math.PI / 2);

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
    startAngle += arc;
  }
};

const rotate = () => {
  if (product.length === 0) {
    alert("메뉴를 추가해주세요!");
    return;
  }

  $c.style.transform = "initial";
  $c.style.transition = "initial";

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);
    const totalProportions = proportions.reduce((acc, curr) => acc + curr, 0);
    const arc = 360 / totalProportions;
    const rotate =
      360 * 3 -
      (arc * proportions.slice(0, ran).reduce((acc, curr) => acc + curr, 0) +
        (arc * proportions[ran]) / 2);

    $c.style.transform = `rotate(${rotate}deg)`;
    $c.style.transition = "2s";

    setTimeout(() => {
      alert(`오늘의 선택은?! ${product[ran]} 어떠신가요?? 😎`);
      document.getElementById("rotateBtn").innerText = "다시 돌리기";
      document.getElementById("rotateBtn").onclick = resetRoulette;
    }, 2000);
  }, 1);
};

const addMenu = () => {
  const input = document.getElementById("menuInput");
  const menu = input.value.trim();

  if (menu && product.length < 10) {
    product.push(menu);
    colors.push(getRandomColor());
    proportions.push(getRandomProportion());
    newMake();
    updateMenuList();
    input.value = "";
  } else if (product.length >= 10) {
    alert("메뉴는 최대 10개까지 추가할 수 있습니다.");
  } else {
    alert("메뉴를 입력해주세요.");
  }
};

const removeMenu = index => {
  product.splice(index, 1);
  colors.splice(index, 1);
  proportions.splice(index, 1);
  newMake();
  updateMenuList();
};

const resetRoulette = () => {
  product.length = 0;
  colors.length = 0;
  proportions.length = 0;
  newMake();
  updateMenuList();
  document.getElementById("rotateBtn").innerText = "룰렛 돌리기";
  document.getElementById("rotateBtn").onclick = rotate;
};

const handleKeyPress = event => {
  if (event.key === "Enter") {
    addMenu();
  }
};

const updateMenuList = () => {
  const menuList = document.getElementById("menuList");
  menuList.innerHTML = "";
  product.forEach((menu, index) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.innerHTML = `<span>${menu}</span><button onclick="removeMenu(${index})">삭제</button>`;
    menuList.appendChild(menuItem);
  });
};

newMake();
updateMenuList();
