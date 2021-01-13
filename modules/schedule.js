/**
 * @type {Map<{},number>}
 */
const map = new Map()


/**
 * Calculate number of ms till the next time [h,m,s] happens.
 * @param {number} h
 * @param {number} m
 * @param {number} s
 * @returns {number}
 */
function when(h, m, s) {
    const now = new Date()

    const nowMs =
        ((h < 0 ? 0 : now.getHours() * 60 * 60) +
        (m < 0 ? 0 : now.getMinutes() * 60) +
        (s < 0 ? 0 : now.getSeconds())) * 1000 +
        now.getMilliseconds()
    let targetMs =
        ((h < 0 ? 0 : h * 60 * 60) +
        (m < 0 ? 0 : m * 60) +
        (s < 0 ? 0 : s)) * 1000

    // If the time today has passed already, set for next instance.
    if (targetMs < nowMs) targetMs +=
        (s < 0 ? 1 : m < 0 ? 60 : h < 0 ? 60 * 60 : 24 * 60 * 60) * 1000

    // Return number of ms till target.
    return targetMs - nowMs

}

/**
 * Schedule a daily callback.
 * @param {[number,number?,number?]} schedule time of day as [h,m,s]
 * @param {()=>void} action 
 */
export function at([h = 0, m = 0, s = 0], action) {
    const key = {}

    set()
    return key

    function set() {
        const ms = when(h, m, s)
        const timer = setTimeout(fire, ms)
        // console.log('setTimer', { timer, ms })
        // console.log(new Date(Date.now() + ms))
        map.set(key, timer)
    }

    function fire() {
        requestAnimationFrame(action)
        set()
    }
}

/**
 * UnSchedule a callback using the returned key from `at`.
 * @param {{}} key
 */
export function cancel(key) {
    if (map.has(key)) {
        clearTimeout(map.get(key))
        map.delete(key)
    }
}