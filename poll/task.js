let pollTitle = document.querySelector('.poll__title')
let pollAnswers = document.querySelector('.poll__answers')

function createButton(text) {
    let button = document.createElement('button')
    button.setAttribute('class', 'poll__answer')
    button.textContent = text
    return button
}

function appendAllButton(parentClass, listText) {
    listText.forEach(el => {
        parentClass.appendChild(createButton(el)) 
    })
}

let listener = function(e) {
    if (e.target.classList.contains('poll__answer')) {
        alert('Спасибо, ваш голос засчитан!')
        pollAnswers.removeEventListener('click', listener)
    }
}

;(async() => {
    let url = 'https://students.netoservices.ru/nestjs-backend/poll'
    let response = await fetch(url)
    let a = await response.json()
    
    if (response.ok) {
        let question = a['data']['title']
        let allAnswer = a['data']['answers']

        pollTitle.textContent = question
        appendAllButton(pollAnswers, allAnswer)

        pollAnswers.addEventListener('click', listener)
    }
})()