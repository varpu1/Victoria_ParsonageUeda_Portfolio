var modeToggle = document.querySelector("#modeToggle")
modeToggle.onclick = themeSwitch

function themeSwitch() {
    if (document.body.getAttribute("theme") == "light") {
        document.body.setAttribute("theme", "dark")
    } else {
        document.body.setAttribute("theme", "light")
    }


    // document.body.setAttribute('theme', document.body.getAttribute("theme") ? 'dark' : 'light');
}