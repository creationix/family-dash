import './modules/autoreload.js'
import './modules/backgrounds.js'

import centered from './modules/centered.js'
import clock from './modules/clock.js'
import comeFollowMe from './modules/come-follow-me.js'

document.body.appendChild(
    centered(
        comeFollowMe(),
        clock()
    )
)
