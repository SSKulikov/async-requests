const BYTES_IN_MB = 1048576
const form = document.querySelector('#form')
const fileInput = document.querySelector('#file')
const fileDesc = document.querySelector(".input__wrapper-desc");
const progress = document.querySelector('#progress')

const status1 = document.querySelector('.status') 

fileInput.addEventListener('change', function() {
    const file = this.files[0]
    if (file.size > 5 * BYTES_IN_MB) {
        console.log('Файлы до 5мб')
        this.value = null
        fileDesc.textContent = 'Имя файла...'
    }
})

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let fileUpload = fileInput.files[0]
    let sent = new FormData()
    let xhr = new XMLHttpRequest()
    console.log(fileUpload)
    sent.append('file', fileUpload)
    xhr.upload.addEventListener('progress', (e) => {
        let result = e.loaded / e.total
        progress.value = result
        status1.textContent = `Загруженно ${Math.round(result*100)}%`
    })
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload')
    xhr.send(sent)
})