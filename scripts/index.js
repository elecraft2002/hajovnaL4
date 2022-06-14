

document.querySelectorAll(".video").forEach(videoSection => {
    const video = videoSection.querySelector(".video__section")
    const videoEl = videoSection.querySelector("video")
    function scrollPlay() {
        const percentage = (videoEl.getBoundingClientRect().top - video.getBoundingClientRect().top) / (video.clientHeight - videoEl.clientHeight)
        const time = percentage * videoEl.duration
        if (time) {
            //console.log(time)
            gsap.to(videoEl, {
                currentTime: time
            })
            //videoEl.currentTime = time
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

function setVideoSource() {
    const source = window.innerWidth > 800 ? "videos/Pozvánka_1.mp4" : "videos/Pozvánka_mobile_1.mp4"

    //const video = document.querySelector('[data-video]')
    const video = document.querySelector('video')
    video.src = source
    video.addEventListener("canplaythrough", e => {
        console.log("loaded")
        const loading = document.querySelector('[data-loading]')
        loading.classList.add("loading--hidden")
        document.querySelector("body").style.overflowY = "auto"
        setTimeout(() => {
            loading.remove()
        }, 1000);
    })
}

window.addEventListener("resize", () => {
    setVideoHeight()
    //setVideoSource()
})
setVideoHeight()
setVideoSource()

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

function urlParams() {
    const queryString = window.location.search;
    return urlParams = new URLSearchParams(queryString);
}

readTextFile("names.json", array => {
    const id = parseInt(urlParams().get("id"))
    array = JSON.parse(array)
    console.log(array)

    if (!id && id !== 0)
        return
    if (id < 0 || id >= array.length)
        return
    console.log(id)
    const span = document.createElement("span")
    span.innerHTML = array[id].name
    span.classList.add("name")
    document.querySelectorAll('[data-name]').forEach(e => {
        e.append(span)
    })
})

ScrollReveal({ reset: true, distance: "60px", delay: 500, duration: 1500 });
ScrollReveal().reveal('.hedding', { origin: "top", reset: false });
ScrollReveal().reveal('.content__text', { origin: "left" });
ScrollReveal().reveal('.info__block', { origin: "bottom", delay: 0 });