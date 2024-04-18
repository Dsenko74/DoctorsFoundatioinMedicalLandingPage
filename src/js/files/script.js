// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
 
const doctors = document.querySelectorAll('.item-doctors');
const show = document.querySelectorAll('.item-doctors__show');
//const color = document.querySelectorAll('.item-doctors');
// doctors.forEach((doctor, index) => {
//   doctor.addEventListener('click', () => {
//     show.forEach((item, i) => {
//       item.classList.toggle("_active", i === index);
//     });
//     doctor.classList.toggle("_active");
//   });
// });
for (let i = 0; i < doctors.length; i++) {
  doctors[i].addEventListener('click', function(e) {
    for (let i = 0; i < doctors.length; i++){
      show[i].classList.remove("_active"); 
      doctors[i].classList.remove("_active");
    }
    show[i].classList.add("_active");
    doctors[i].classList.add("_active");
  })
}



const doctorItems = document.querySelector('.schedule__items');
let data;
let startItem = 0;
let endItem = 7;
if (doctorItems) {
  loadDoctorItems();
}

async function loadDoctorItems() {
  const response = await fetch("files/doctors.json", {
		method: "GET"
	});
	if (response.ok) {
		const responseResult = await response.json();
		data = responseResult;
		initDoctor(data, startItem, endItem, "All");
	} else {
		alert("Error!");
	}
}
function initDoctor(data, startItem, endItem, param) { 
  let childElements = doctorItems.childNodes;
  for (let i = childElements.length - 1; i >=0; i--) {
    let child = childElements[i];
    doctorItems.removeChild(child);
  }; 
	const dataPart = data.items.slice(startItem, endItem);
	dataPart.forEach((item, i) => {
    if (param == "All") {
      buildDoctorItem(item);
    } else if (item.days == param || item.position.includes(param)) {
      buildDoctorItem(item);
    }
	});
}

function buildDoctorItem(item) {

  let doctorItemTemplate = ``;
  doctorItemTemplate +=`<div data-id="${item.id}" class="schedule__item item-schedule">`;
  item.image ? doctorItemTemplate +=
    `<img src="${item.image}" alt="doctor">`
    : null;
  doctorItemTemplate += `<div class="item-schedule__category">${item.category}</div>`;
  doctorItemTemplate += `<div class="item-schedule__name">${item.name}</div>`;
  doctorItemTemplate += `<div class="item-schedule__position">${item.position}</div>`;
  doctorItemTemplate += `<div class="item-schedule__location">${item.location}</div>`;
  doctorItemTemplate += `</div>`;
  doctorItems.insertAdjacentHTML('beforeend', doctorItemTemplate);
}


document.addEventListener('click', documentActions);


function documentActions(e) {
  const targetElement = e.target;
  let param;
	if (targetElement.closest('.diary__btn') || targetElement.closest('.swiper-slide')){
    param = targetElement.innerHTML;
    console.log(param);
    initDoctor(data, startItem, endItem, param);
  }
}
const diaryItem = document.querySelectorAll('.diary__item');
for (let i = 0; i < diaryItem.length; i++) {
  diaryItem[i].addEventListener('click', function(e) {
    for (let i = 0; i < diaryItem.length; i++){
      diaryItem[i].classList.remove("_active"); 
    }
    diaryItem[i].classList.add("_active");
  })
}










