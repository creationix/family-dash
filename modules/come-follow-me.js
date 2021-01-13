import db from './come-follow-me-db.js'
import { at } from './schedule.js'
import { domBuilder } from './dombuilder.js'
import { link } from "./weblink.js"

export default () => {
    // Update once at page load.
    requestAnimationFrame(update)
    // Update after 8pm with tomorrow's scripture
    at([21], update)
    // Update after midnight to change "tomorrow" to "today"
    at([], update)

    const scope = {}
    
    return domBuilder(['div', {
        css: {
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: '#fff',
            fontSize: '50px',
            padding: '30px',
            border: '3px solid #fff',
            // boxShadow: '0 0 20px #000, inset 0 0 20px #fff',
            textShadow: '0 0 10px #000',
            backgroundColor: 'rgba(0,10,80,.8)'
        } },
    ['div', {
        css: {
            fontWeight: 'bold',
            color: '#aaf'
        } }, 'Come Follow Me'],
    ['$date', { css: { color: '#', fontSize: '40px' } }],
    ['$scripture']
    ], scope)

    function update() {
        const soon = new Date(Date.now() + 1000 * 60 * 60 * 3)
        const now = new Date()
        const y = soon.getFullYear()
        const m = soon.getMonth() + 1
        const d = soon.getDate()
        scope.date.textContent = now.getDate() === soon.getDate() ? 'Today' : 'Tomorrow'
        const scripture = db[y][m][d]
        const href = link(scripture)
        if (href) {
            scope.scripture.textContent = ""
            scope.scripture.appendChild(domBuilder(['a', {
                href,
                target:"_blank",
                css:{
                    color:"#fff"
                }
            }, scripture]))
        } else {
            scope.scripture.textContent = scripture
        }
    }
}

