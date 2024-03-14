const projDiv = document.querySelector("#projects");

window.onload = generate

function generate() {
    for (let project of projects) {
        let a = document.createElement("a")
        let detailsLink = document.createElement("a")
        let outterHex = document.createElement("div");
        let innerHex = document.createElement("div");
        let img = document.createElement("img");
        let overTxt = document.createElement("div");
        let title = document.createElement("h4");
        let tags = document.createElement("div");

        a.href = project.file
        a.id = project.frameId

        detailsLink.href = "details.html?name=" + project.title
        outterHex.className = "borderHex"

        innerHex.className = "hexHex"
            // innerHex.style.backgroundImage = `url(${project.img })` //sets an image for the hex
        img.src = project.img;

        overTxt.className = "overlayTxt";

        // blurHex.className = "shadeHex";

        /*
                tags.className = "tagsContainer"
                for (let tag of project.tags) {
                    let t = document.createElement("p")
                    t.className = "tag"
                    t.innerHTML = tag
                    switch (tag) {
                        case "js":
                            t.classList.add("jsTag")
                            break;
                        case "html/css":
                            t.classList.add("websiteTag")
                            break;
                        case "API":
                            t.classList.add("apiTag")
                            break;

                    }

                    tags.appendChild(t)

                }
        */
        title.innerHTML = project.title
            // title.innerHTML = "title"

        outterHex.appendChild(innerHex)
        detailsLink.appendChild(outterHex)
        outterHex.appendChild(overTxt)
        innerHex.appendChild(img)

        overTxt.appendChild(title)
        overTxt.appendChild(tags)

        projDiv.appendChild(detailsLink)
    }
}