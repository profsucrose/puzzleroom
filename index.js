window.ondragstart = () => false
let isDraggingWindow = false
let lastMouseXY = {}
let currentWindowDraggingID = ""
let counter = 10 // hacky but works
setInterval(setTime, 1000)

document.querySelector('.notes-text').onkeydown = e => {
    console.log(e)
    const linebreaks = (document.querySelector('.notes-text').value.match(/\n/g) || []).length
    if (linebreaks > 26 && e.code === "Enter") {
        e.preventDefault()
    }
}

document.onmousemove = ({clientX, clientY}) => {
    if (isDraggingWindow) {
        if (typeof(lastMouseXY.clientX) != 'undefined') {
            const [ diffX, diffY ] = [ clientX - lastMouseXY.clientX, clientY - lastMouseXY.clientY ]
            const bottomDragLimit = getBottomDragLimit()
            const windowClass = `.${currentWindowDraggingID}`
            const newOffsetTop = document.querySelector(windowClass).offsetTop + diffY < bottomDragLimit ? document.querySelector(windowClass).offsetTop + diffY : bottomDragLimit

            document.querySelector(windowClass).style.left = `${document.querySelector(windowClass).offsetLeft + diffX}px`
            document.querySelector(windowClass).style.top = `${newOffsetTop}px`
        
        }
        lastMouseXY = { clientX, clientY }
    }
}

function getBottomDragLimit() {
    return document.querySelector('.timebox').offsetTop - document.querySelector(`.${currentWindowDraggingID}`).clientHeight
}

function changeDragging(isDragging, newWindowDraggingID) {
    
    if (isDragging) {
        if (currentWindowDraggingID)
            document.querySelector(`.${currentWindowDraggingID}`).style.zIndex = 1
        counter += 1
        document.querySelector(`.${newWindowDraggingID}`).style.zIndex = counter
        currentWindowDraggingID = newWindowDraggingID
    }

    
    
    console.log(isDragging)
    isDraggingWindow = isDragging
    if (!isDragging) lastMouseXY = {}
}

function openWindow(windId) {
    document.querySelector(`.${windId}`).style.display = 'block'
    counter += 1
    document.querySelector(`.${windId}`).style.zIndex = counter
}

function closeWindow(windId) {
    document.querySelector(`.${windId}`).style.display = 'none'
}

function setTime() {
    const d = new Date()
    const hour = d.getHours()
    const minute = formatTime(d.getMinutes())
    const second = formatTime(d.getSeconds())
    const afternoon = hour > 12 ? 'PM' : 'AM'
    document.querySelector('.time').innerText = `${hour === 12 ? 12 : hour % 12}:${minute}:${second} ${afternoon}`
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}