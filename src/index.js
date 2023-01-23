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
        const fruitItem = document.createElement("img");
        fruitItem.src = "assets/" + (fruit.name).toLowerCase() + ".png"
        fruitItem.alt = fruit.name;

        fruitNav.append(fruitItem);

        // fruitItem.addEventListener('click',()=>{
            
        //     const imgdetails = document.querySelector('#details')
        //     imgdisplay.src = 
            
        // })
    });

    
}