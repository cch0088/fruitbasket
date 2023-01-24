document.addEventListener("DOMContentLoaded", (e) => {
    // Fetch data downloaded from https://fruityvice.com/api/fruit/all
    fetch("http://localhost:3000/fruits")
    .then((resp) => resp.json())
    .then((data) => {
        displayFruitNav(data);
        displayFruitDetails(data[0]);
    });
});

function displayFruitNav(fruits)
{
    const fruitNav = document.querySelector("#navigation");

    fruits.forEach(fruit => {
        const fruitItem = document.createElement("img");
        fruitItem.src = "assets/" + (fruit.name).toLowerCase() + ".png";
        fruitItem.alt = fruit.name;

        fruitNav.append(fruitItem);

        // Click for Display
        fruitItem.addEventListener('click', (e) => displayFruitDetails(fruit));
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
