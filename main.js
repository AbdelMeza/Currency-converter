const fromCurrencyBtn = document.querySelector('.from-currency .currency-selection')
const toCurrencyBtn = document.querySelector('.to-currency .currency-selection')
const currencyContainer = document.querySelectorAll('.currency-container')
const currencyOptionTemplate = document.querySelector('.currency-option-template').content
const amount = document.querySelector('.amount')
const convertBtn = document.querySelector('.convert-btn')
const switchBtn = document.querySelector('.switch-btn')
const resultContainer = document.querySelector('.result')

// Currency data

const currencies = [
    {
        currencyName: 'EUR',
        currencyFlag: 'https://wise.com/web-art/assets/flags/eur.svg',
        currencyDescription:'Euro',
        rate: 1,
    }, {
        currencyName: 'DZD',
        currencyFlag: 'https://wise.com/web-art/assets/flags/dzd.svg',
        currencyDescription:'Dinar algérien',
        rate: 150.26,
    },{
        currencyName: 'USD',
        currencyFlag: 'https://wise.com/web-art/assets/flags/usd.svg',
        currencyDescription:'Dollar américain',
        rate: 1.16,
    }, {
        currencyName: 'CAD',
        currencyFlag: 'https://wise.com/web-art/assets/flags/cad.svg',
        currencyDescription:'Dollar canadien',
        rate: 1.62,
    }, {
        currencyName: 'GBP',
        currencyFlag: 'https://wise.com/web-art/assets/flags/gbp.svg',
        currencyDescription:'Livre sterling',
        rate: 0.88,
    }, {
        currencyName: 'BRL',
        currencyFlag: 'https://wise.com/web-art/assets/flags/brl.svg',
        currencyDescription:'Réal brésilien',
        rate: 6.22,
    }, {
        currencyName: 'CNY',
        currencyFlag: 'https://wise.com/web-art/assets/flags/cny.svg',
        currencyDescription: 'Yuan chinois',
        rate: 8.21,
    }
]

// Initial selection

window.addEventListener('load', function() {
    selectCurrency(0, 0)
    selectCurrency(1, 1)
})

// Add currency options to the dropdowns

for (const [currencyIndex, currency] of currencies.entries()) {
    currencyContainer.forEach((container, containerIndex) => {
        let newOption = currencyOptionTemplate.cloneNode(true)
        let option = newOption.querySelector('.currency-option')

        option.setAttribute('data-index', currencyIndex)
        option.querySelector('.currency-flag').src = currency.currencyFlag
        option.querySelector('.currency-name').textContent = currency.currencyName
        option.querySelector('.currency-description').textContent = currency.currencyDescription

        option.addEventListener('click', function () {
            // Remove all active classes to prevent multiple active selections
            container.querySelectorAll('.currency-option.active').forEach(opt => opt.classList.remove('active'))
            
            this.classList.add('active')
            // Update the selected currency and recalculate
            selectCurrency(currencyIndex, containerIndex)
            calculate()
        })

        // Append the new option to the container
        container.appendChild(newOption)
    })
}

// Event listeners for opening and closing the currency dropdowns

fromCurrencyBtn.addEventListener('click', function() {
    currencyContainer[1].classList.remove('active')
    currencyContainer[0].classList.toggle('active')
})

toCurrencyBtn.addEventListener('click', function() {
    currencyContainer[0].classList.remove('active')
    currencyContainer[1].classList.toggle('active')
})

// Close dropdowns when clicking outside

window.addEventListener('click', function(e) {
    if(!e.target.closest('.currency-container') && !e.target.closest('.currency-selection')) {
        currencyContainer.forEach(container => container.classList.remove('active'))
    }
})

// Function to select currency

function selectCurrency(currencyIndex, containerIndex) {
    document.querySelectorAll('.currency-container').forEach((container, idex) => {
        if (containerIndex === idex) {
            container.querySelectorAll('.currency-option').forEach((option, idx) => {
                // Remove all active classes to prevent multiple active selections
                option.classList.remove('active')

                if(currencyIndex === idx){
                    option.classList.add('active')
                }
            })

            let selector = container.parentElement.querySelector('.currency-selection')
            selector.setAttribute('data-index', currencyIndex)

            selector.querySelector('.currency-flag').src = currencies[currencyIndex].currencyFlag
            selector.querySelector('.currency-name').textContent = currencies[currencyIndex].currencyName
        }
    })
}

// Convert button event listener

convertBtn.addEventListener('click', function() {
    calculate()
})

// Switch currencies function

switchBtn.addEventListener('click', function(){
    let fromCurrencyIndex = document.querySelector('.from-currency .currency-selection').getAttribute('data-index') 
    let toCurrencyIndex = document.querySelector('.to-currency .currency-selection').getAttribute('data-index') 
    
    fromCurrencyIndex = parseInt(fromCurrencyIndex)
    toCurrencyIndex = parseInt(toCurrencyIndex)


    selectCurrency(toCurrencyIndex, 0)
    selectCurrency(fromCurrencyIndex, 1)
    calculate()
})

// Conversion function

function calculate() {
    let fromCurrencyIndex = document.querySelector('.from-currency .currency-selection').getAttribute('data-index') 
    let toCurrencyIndex = document.querySelector('.to-currency .currency-selection').getAttribute('data-index') 
    
    fromCurrencyIndex = parseInt(fromCurrencyIndex)
    toCurrencyIndex = parseInt(toCurrencyIndex)

    let result = amount.value / currencies[fromCurrencyIndex].rate
    result = result * currencies[toCurrencyIndex].rate
    result = Math.round(result * 100) / 100

    if(amount.value !== ''){
        resultContainer.textContent = result
    } else{
        resultContainer.textContent = '0.00'
    }
}

// Calculate on Enter key press

window.addEventListener('keydown', function(e) {
    if(e.key === 'Enter'){
        calculate()
    }
})