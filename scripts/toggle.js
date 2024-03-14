var modeToggle = document.querySelector("#modeToggle")
modeToggle.onclick = themeSwitch

function themeSwitch() {
    if (document.body.getAttribute("theme") == "light") {
        document.body.setAttribute("theme", "dark")
        localStorage.setItem("theme", "dark")
    } else {
        document.body.setAttribute("theme", "light")
        localStorage.setItem("theme", "light")
    }


    // document.body.setAttribute('theme', document.body.getAttribute("theme") ? 'dark' : 'light');
}

window.addEventListener("pageshow", getTheme)

function getTheme() {
    if (localStorage.getItem("theme") == "dark") {
        document.body.setAttribute("theme", "dark")
    } else {
        document.body.setAttribute("theme", "light")
    }
}
document.onreadystatechange = function(e) {
    if (document.readyState === 'complete') {
        getTheme()
    }
};