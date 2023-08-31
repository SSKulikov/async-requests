const items = document.querySelector('#items')
const loader = document.querySelector('#loader')

function createNeedElement(code, value) {
    let divItem = document.createElement('div')
    divItem.setAttribute('class', 'item')

    let divItemCode = document.createElement('div')
    divItemCode.setAttribute('class', 'item__code')
    divItemCode.textContent = code

    let divItemValue = document.createElement('div')
    divItemValue.setAttribute('class', 'item__value')
    divItemValue.textContent = value

    let divItemCurrency = document.createElement('div')
    divItemCurrency.setAttribute('class', 'item__currency')
    divItemCurrency.textContent = 'руб.'

    divItem.appendChild(divItemCode)
    divItem.appendChild(divItemValue)
    divItem.appendChild(divItemCurrency)

    return divItem
}

;(async() => {
    let url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses'
    let response = await fetch(url)
    let a = await response.json()
    
    if (response.ok) {
        let list = a['response']['Valute']
        loader.classList.remove('loader_active')
        Object.keys(list).forEach(el => {
            items.appendChild(createNeedElement(list[el].CharCode, list[el].Value.toFixed(2)))
        })
    }
})()


