const linkBtn = document.querySelector("#projectLink");
const imgDiv = document.querySelector("#mediaImg");
const vidDiv = document.querySelector("#mediaVid")
const vidDivSrc = document.querySelector("#mediaVidSrc")
const nextBtn = document.querySelector("#nextBtn")
const lastBtn = document.querySelector("#lastBtn")

var slideShow = []
var index = 0

window.addEventListener("load", linkSet);

function linkSet() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('name');
    let project = projects.find(obj => obj.title == projectName);


    for (let slide of project.slides) {
        if (slide.includes("http")) {
            slideShow.push(slide)
        } else {
            slideShow.push(`https://varpu1.github.io/Victoria_ParsonageUeda_Portfolio/assets/slideAssets/${project.num}/${slide}`)
        }
    }
    if (slideShow.length > 1) {
        nextBtn.style.display = "block"
        lastBtn.style.display = "block"
    } else {
        nextBtn.style.display = "none"
        lastBtn.style.display = "none"
    }
    load()
}

function load() {
    slide = slideShow[index]
    slideType = slide.slice(slide.slice(slide.indexOf("assets")).indexOf(".") + slide.indexOf("assets"))
        console.log(slideType)
    if (slideType == ".mp4"||slideType == ".mov") {
        vidDiv.style.display = "block"
        imgDiv.style.display = "none"

        vidDivSrc.src = slide
        vidDiv.load()
        vidDiv.play()
            // console.log(vidDiv)
            // console.log(vidDiv.readyState)
        vidDiv.addEventListener("readystatechange", () => { console.log(vidDiv.readyState + " blooob") })
        if (vidDiv.readyState == 4) {
            console.log("loaded")
        }
    } else {
        vidDiv.style.display = "none"
        imgDiv.style.display = "block"

        imgDiv.src = slide
    }
}


nextBtn.onclick = next

function next() {
    if (index != slideShow.length - 1) {
        index++
    } else {
        index = 0
    }
    load()
}
lastBtn.onclick = last

function last() {
    if (index != 0) {
        index--
    } else {
        index = slideShow.length - 1
    }
    load()
}