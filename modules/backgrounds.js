import { at } from './schedule.js'

Object.assign(document.body.style, {
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // backgroundSize: "cover",
    transition: 'background-image 30s ease-in-out'
})

const backgrounds = [
    '131084.jpg.webp',
    '131138.jpg.webp',
    '162119.jpg.webp',
    '162122.jpg.webp',
    '162123.jpg.webp',
    '162125.jpg.webp',
    '162126.jpg.webp',
    '162127.jpg.webp',
    '162128.jpg.webp',
    '162129.jpg.webp',
    '162130.jpg.webp',
    '162131.jpg.webp',
    '162132.jpg.webp',
    '162133.jpg.webp',
    '162134.jpg.webp',
    '162140.jpg.webp',
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

