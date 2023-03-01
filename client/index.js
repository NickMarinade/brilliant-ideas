const addButton = document.querySelector('#addIdea')
const baseUrl = 'http://127.0.0.1:3000/test';
const list = document.querySelector('#ideas-list');

let getInfo = async() => {
    const response = await fetch(baseUrl,
        {
            method: 'GET'
        })
        
    const data = await response.json()
    console.log(data)

    for (let i = 0; i < data.length; i++) {
      const row = document.createElement("tr");
      const formattedData = new Date(data[i].created_at).toLocaleString()
      row.innerHTML = `
        <td>${data[i].title}</td>
        <td>${data[i].description}</td>
        <td>${formattedData}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
  getInfo();
});








            
