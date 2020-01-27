

// Arrow function
// https://www.w3schools.com/js/js_arrow_function.asp
let currentImage1 = "";
let currentImage2 = "";

const findLimits = () => {
  let minValue = 999;
  let maxValue = -999;
  let i;
  for (i = 0; i < dataset.length; i++) {
    const temp = dataset[i].sodankylaTemp
    if (minValue > temp) {
      minValue = temp
    }
    if (maxValue < temp) {
      maxValue = temp
    }
  }
  console.log("minValue: " + minValue)
  console.log("maxValue: " + maxValue)
}

// Metodi, joka asettaa oikean kuvatason ja näyttää vuoden
const visualize = (layerImage1, layerImage2, year, temp) => {
    if (currentImage1 !== layerImage1) {
      console.log("currentImage1", layerImage1);
      document.getElementById("eko-layer-1").src = "images/" + layerImage1;
      currentImage1 = layerImage1;
    }
    if (currentImage2 !== layerImage2) {
      console.log("currentImage2", layerImage2);
      document.getElementById("eko-layer-2").src = "images/" + layerImage2;
      currentImage2 = layerImage2;
    }

    document.getElementById("currentYear").innerText = year;
    document.getElementById("lampotila").innerText = temp;
}

// Metodi, jossa käyttäjän valinnan pohjalta laitaan oikea tasokuva
const calculateLayer = (range) => {
    const data = dataset[range]
    //console.log(data)

    let decade = 1908;

    if (data.year >= 2000) {
      decade = 2000;
    } else if (data.year < 2000 && data.year >= 1950) {
      decade = 1950
    } else if (data.year < 1950 && data.year >= 1930) {
      decade = 1930
    } else if (data.year < 1930 && data.year >= 1908) {
      decade = 1908
    }

    const yearImage = "year" + decade.toString(10) + ".png";
    const tempImage = "temp" + Math.round(data.sodankylaTemp) + ".png";
    //console.log(imageFile)
    visualize(yearImage, tempImage, data.year, data.sodankylaTemp)
}

// Slider event listener / kuuntelija
const onSliderAction = () => {
    const range = document.getElementById("sliderRange").value;
    calculateLayer(range)
}

// Aloitetaan lukemalla nykyinen slider-asento
const ekoInit = () => {
    onSliderAction()
}
ekoInit()
findLimits()

// Lisätään kuunetelija
document.getElementById('sliderRange').addEventListener('input', onSliderAction, false);
