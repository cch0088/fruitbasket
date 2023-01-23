document.addEventListener("DOMContentLoaded", (e) => {
    // fetch data downloaded from https://fruityvice.com/api/fruit/all
    fetch("http://localhost:3000/fruits")
    .then((resp) => resp.json())
    .then((data) => displayFruitNav(data))
});

function displayFruitNav(fruits)
{
    const fruitNav = document.querySelector("#navigation");

    fruits.forEach(fruit => {
        const fruitItem = document.createElement("span");
        fruitItem.textContent = fruit.name;

        fruitNav.append(fruitItem);
    });
}