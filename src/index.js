document.addEventListener("DOMContentLoaded", (e) => {
    // Fetch data downloaded from https://fruityvice.com/api/fruit/all
    fetch("http://localhost:3000/fruits")
    .then((resp) => resp.json())
    .then((data) => {
        displayFruitNav(data);
        displayFruitDetails(data[0]);
        searchBox(data);
    });
});

function displayFruitNav(fruits, filter)
{
    const fruitNav = document.querySelector("#navigation");

    fruits.forEach(fruit => {
        if (fruit.name.toLowerCase().startsWith(filter) || filter === undefined)
        {
            const fruitItem = document.createElement("img");
            fruitItem.src = "assets/" + (fruit.name).toLowerCase() + ".png";
            fruitItem.alt = fruit.name;

            fruitNav.append(fruitItem);

            // Click for Display
            fruitItem.addEventListener('click', (e) => displayFruitDetails(fruit));
        }
    });
}

function displayFruitDetails(fruit)
{
    const contentList = fruit.nutritions;

    const imgDetails = document.querySelector('#imgDetails');
    imgDetails.src = "assets/" + (fruit.name).toLowerCase() + ".png";
    imgDetails.alt = fruit.name;
    
    document.querySelector('h3').textContent = fruit.name;

    // Nutrition Content
    let i=0;
    Object.entries(contentList).forEach(([key,value]) => {
        let ptxtcontent = document.querySelectorAll('p')[i];
        ptxtcontent.textContent = `${key.toUpperCase()}: ${value}g`
        i += 1;
    });
}

function searchBox(fruits)
{
    const fruitNav = document.querySelector("#navigation");

    const searchBox = document.querySelector("#searchbox");
    searchBox.textContent = "Find: ";

    const searchInput = document.createElement("input");
    searchBox.append(searchInput);

    searchInput.addEventListener("change", (x) => {
        fruitNav.textContent = "";
        displayFruitNav(fruits, x.target.value);
    });
}