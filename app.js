document.addEventListener('DOMContentLoaded', function () {
    //получение элементов по их id
    const height_elem = document.getElementById('height')
    const weight_elem = document.getElementById('weight')
    const output_elem = document.getElementById('output')
    const btn_elem = document.getElementById('btn')

    btn_elem.addEventListener('click', function () {
        //получение значений введеных пользователей
        let h = (+height_elem.value) / 100
        let w = +weight_elem.value
        //расчет ИМТ по формуле
        let imt = w / (h * h)
        //запись ответа в поле ответа, с округлением до 2 знаков
        output_elem.value = imt.toFixed(2)

    })
    //регистрация serviceWorker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registred', registration)
            })
            .catch(error => {
                console.log('SW failed, error')
            })
    }
})