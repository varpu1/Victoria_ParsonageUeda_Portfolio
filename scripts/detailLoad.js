const linkBtn = document.querySelector("#projectLink");

window.onload = linkSet;

function linkSet() {
    console.log("woof")
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('name');
    let project = projects.find(obj => obj.title == projectName);
    console.log(project.file)
    console.log(project)
    if (project.file != "") {
        linkBtn.href = project.file
    } else {
        pLink.style.display = "none";
    }
}