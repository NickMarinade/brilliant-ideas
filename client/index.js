const addButton = document.querySelector('#addIdea')
const baseUrl = 'http://127.0.0.1:3000';
const list = document.querySelector('#ideas-list');
const ideaInput = document.querySelector("#idea-form"); 


let getIdeas = async() => {
    const response = await fetch(baseUrl,
        {
            method: 'GET'
        })
        
    const data = await response.json();
    // list.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      const row = document.createElement("tr");
      const formattedData = new Date(data[i].created_at).toLocaleString();
      row.innerHTML = `
        <td>${data[i].title}</td>
        <td>${data[i].description}</td>
        <td>${formattedData}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      row.setAttribute('data-id', data[i].id);
      list.appendChild(row);
    }
    
};

let postIdea = async(title, description) => {
  const response = await fetch(baseUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    });

  const data = await response.json();

  const row = document.createElement("tr");
  const formattedData = new Date(data.created_at).toLocaleString();
  row.innerHTML = `
    <td>${data.title}</td>
    <td>${data.description}</td>
    <td>${formattedData}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
  `;  
  list.appendChild(row);
};


function showAlert(message, className) {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#idea-form');
  container.insertBefore(div, form);
  setTimeout(() => div.remove(), 3000);
}


let deleteIdea = async(id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  showAlert(data.message, 'success');
};



document.addEventListener("DOMContentLoaded", () => {
  getIdeas();
});

ideaInput.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  postIdea(title, description);
  ideaInput.reset();
  window.location.reload();
  // getIdeas();
});


list.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete")) {
    const row = event.target.parentNode.parentNode;
    const id = row.dataset.id;
    await deleteIdea(id);
    row.remove();
  }
});










            
