const baseUrl = 'http://127.0.0.1:3000';

const form = document.querySelector("#edit-form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const title = decodeURIComponent(urlParams.get("title"));
const description = decodeURIComponent(urlParams.get("description"));

titleInput.value = title;
descriptionInput.value = description;

function redirect() {
  setTimeout(function() {
    window.location.href = '../index.html';
  }, 2500);
};

function showAlert() {
  const div = document.createElement('div');
  div.className = 'alert alert-success';
  div.appendChild(document.createTextNode('Idea edited! Redirection...'));
  const container = document.querySelector('.container');
  const form = document.querySelector('#edit-form');
  container.insertBefore(div, form);
  setTimeout(() => div.remove(), 2500);
}


let editIdea = async (id, title, description) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    });
    const data = await response.json();
  };


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newTitle = titleInput.value;
  const newDescription = descriptionInput.value;
  await editIdea(id, newTitle, newDescription);
});
