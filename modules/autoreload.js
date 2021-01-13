const stored = localStorage.getItem('last-modified')

let delay = 5000

delayCheck()

function delayCheck() {
    // Slowly and randomly increase delay using expontial growth and cap.
    delay = Math.min(delay * (.75 + Math.random()), 5 * 60 * 1000)

    return setTimeout(check, delay)
}

async function check() {
    const res = await fetch(`manifest.json?${Date.now().toString(36)}`)
    const actual = res.headers.get('last-modified')
    if (stored !== actual) {
        localStorage.setItem('last-modified', actual)
        if (stored) window.location.reload(true)
    }
    return delayCheck()
}

// const audio = new Audio('startup.ogg')
// audio.play()
