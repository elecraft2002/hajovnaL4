

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
    })
}

function setVideoSource() {
    const source = window.innerWidth > 800 ? "videos/Pozvánka_1.mp4" : "videos/Pozvánka_mobile_1.mp4"

    //const video = document.querySelector('[data-video]')
    const video = document.querySelector('video')
    video.src = source
    video.load()
    video.addEventListener("canplaythrough", e => {
        // video.removeEventListener("canplay",e=>{}, { passive: false })
        console.log("loaded")
        setVideoHeight()
        const loading = document.querySelector('[data-loading]')
        loading.classList.add("loading--hidden")
        document.querySelector("body").style.overflowY = "auto"
        setTimeout(() => {
            loading.remove()
        }, 1000);
    }, { once: true })
}

window.addEventListener("resize", () => {
    setVideoHeight()
    //setVideoSource()
})
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

    if (!id && id !== 0)
        return
    if (id < 0 || id >= array.length)
        return
    //const span = document.createElement("span")
    //span.innerHTML = array[id].name
    //span.classList.add("name")
    document.querySelectorAll('[data-name]').forEach(e => {
        //e.append(span)
        e.innerHTML = array[id].name
    })
})

ScrollReveal({ reset: true, distance: "60px", delay: 500, duration: 1500 });
ScrollReveal().reveal('.hedding', { origin: "top", reset: false });
ScrollReveal().reveal('.content__text', { origin: "left", delay: 100 });
ScrollReveal().reveal('.info__block', { origin: "left", delay: 0 });

/* const ucitele = [...document.querySelectorAll(".ucitel")].map(ucitel => {
    const name = ucitel.querySelector("h3").innerText
    const email = ucitel.querySelector(".email a").innerText
    const telefon = ucitel.querySelector(".telefon a").innerText
    return { name, email, telefon }
})
console.log(ucitele) */