import { at } from './schedule.js'

Object.assign(document.body.style, {
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // backgroundSize: "cover",
    transition: 'background-image 30s ease-in-out'
})

const backgrounds = [
    // 'Dramatic-sunset-wallpaper-images.jpg',
    // 'dark-turtle-zebra.jpg',
    'Summer-Flowers-Wallpaper-HD-Windows.jpg',
    // 'jsykw3.jpg'
]

const images = {}

requestAnimationFrame(choose)
at([-1], choose)

function choose() {
    const name = backgrounds[Math.floor(Math.random() * backgrounds.length)]
    const src = `backgrounds/${name}`
    if (images[src]) {
        update()
    } else {
        images[src] = true
        const img = new Image()
        img.src = src
        img.onload = update
    }
    function update() {
        document.body.style.backgroundImage = `url(${src})`
    }
}

