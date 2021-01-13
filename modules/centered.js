
export default (...content) => {
    const div = document.createElement('div')
    Object.assign(div.style, {

        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column'
    })
    for (const child of content) {
        div.appendChild(child)
    }
    return div
}