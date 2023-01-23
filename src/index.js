document.addEventListener("DOMContentLoaded", (e) => {
    // fetch data downloaded from https://fruityvice.com/api/fruit/all
    fetch("http://localhost:3000/fruits")
    .then((resp) => resp.json())
    .then((data) => console.log(data))
});


