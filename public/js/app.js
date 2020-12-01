
console.log('client side js file is loading  - Rodando no browser')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // faz com que a pagina não fique recarregando ao clica no submit de um formu
    const location = searchInput.value
    msg1.textContent ='Loading ...'
    msg2.textContent =''
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msg1.textContent = data.error
        } else {
            msg1.textContent =`In ${data.location}`
            msg2.textContent = `The weather looks like ${data.forecastData} . It feelslike ${data.feelslike}, whit the humidity is ${data.humidity}`
            console.log(data)
        }
    })
})
})
