import { domBuilder } from './dombuilder.js'
import { at } from './schedule.js'

export default () => {
    // Update at the start of every second.
    at([-1, -1, -1], update)
    // Update at page load.
    requestAnimationFrame(update)

    const scope = {}

    return domBuilder([
        '$clock', { css: {
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: '#fff',
            fontSize: '100px',
            padding: '50px',
            borderRadius: '70px',
            border: '3px solid #fff',
            boxShadow: '0 0 20px #000, inset 0 0 20px #fff',
            textShadow: '0 0 10px #000'
        } },
        ['$date', { css: { fontSize: '50px' } }],
        ['$time']
    ], scope)

    function update() {
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        scope.date.textContent = now.toDateString()
        scope.time.textContent = `${(hours + 11) % 12 + 1}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        scope.clock.style.backgroundColor = `rgba(${256 * hours / 24},${256 * minutes / 60},${256 * seconds / 60}, 0.4)`
    }
}