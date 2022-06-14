

document.querySelectorAll(".video").forEach(videoSection => {
    const video = videoSection.querySelector(".video__section")
    const videoEl = videoSection.querySelector("video")

    function scrollPlay() {
        const percentage = (videoEl.getBoundingClientRect().top - video.getBoundingClientRect().top) / (video.clientHeight - videoEl.clientHeight)
        const time = percentage * videoEl.duration
        if (time) {
            //console.log(time)
            videoEl.currentTime = time
        }
        window.requestAnimationFrame(scrollPlay)
    }
    scrollPlay()
})

function setVideoHeight() {
    document.querySelectorAll(".video").forEach(videoSection => {
        const video = videoSection.querySelector(".video__section")
        const videoContent = videoSection.querySelector(".video__content")
        video.style.height = videoContent.clientHeight + window.innerHeight + "px"
        console.log(videoContent.clientHeight)
    })
}

window.addEventListener("resize", () => {
    setVideoHeight()
})
setVideoHeight()

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
readTextFile("names.json", array => {
    const id = 0
    array = JSON.parse(array)
    console.log(array)
    const span = document.createElement("span")
    span.innerHTML = array[id].name
    span.classList.add("name")
    document.querySelectorAll('[data-name]').forEach(e=>{
        e.append(span)
    })
})

ScrollReveal({ reset: true, distance: "60px", delay: 500 });
ScrollReveal().reveal('.content__text', { origin: "left" });