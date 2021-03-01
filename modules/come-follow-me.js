import db from './come-follow-me-db.js'
import { at } from './schedule.js'
import { domBuilder } from './dombuilder.js'
import { link } from "./weblink.js"

export default () => {
    // Update once at page load.
    requestAnimationFrame(update)
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
    ['$today', { css: { fontSize: '40px' } }],
    ['$tomorrow', { css: { fontSize: '30px' } }],
    ], scope)

    function update() {
        const today = new Date()
        let y = today.getFullYear()
        let m = today.getMonth() + 1
        let d = today.getDate()
        let scripture = db[y][m][d]
        let href = link(scripture)
        if (href) {
            scope.today.textContent = ""
            scope.today.appendChild(domBuilder(['a', {
                href,
                target:"_blank",
                css:{
                    color:"#fff"
                }
            }, scripture]))
        } else {
            scope.today.textContent = scripture
        }
        const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24)
        y = tomorrow.getFullYear()
        m = tomorrow.getMonth() + 1
        d = tomorrow.getDate()
        scripture = db[y][m][d]
        href = link(scripture)
        if (href) {
            scope.tomorrow.textContent = ""
            scope.tomorrow.appendChild(domBuilder(['span', 'Tomorrow ', ['a', {
                href,
                target:"_blank",
                css:{
                    color:"#fff"
                }
            }, scripture]]))
        } else {
            scope.tomorrow.textContent = 'Tomorrow  ' + scripture
        }
    }
}

