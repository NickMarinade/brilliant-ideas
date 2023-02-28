const getButton = document.querySelector('.get')
const baseUrl = 'http://127.0.0.1:3000/test';
const input = document.querySelector('.input');
const text = document.querySelector('.text')

let getInfo = async(e) => {
    e.preventDefault();
    const response = await fetch(baseUrl,
        {
            method: 'GET'
        })
        
    const data = await response.json()
    console.log(data)
    text.append(data[0].title);
}

document.addEventListener('click', getInfo)