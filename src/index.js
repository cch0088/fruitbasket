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
        fruitItem.className = "fruit";

        fruitNav.append(fruitItem);

        /* Click for Display */
        fruitItem.addEventListener('click',()=>{
            console.log(fruit.nutritions)
            const imgDetails = document.querySelector('#imgDetails') 
            imgDetails.src = fruitItem.src
            
            document.querySelector('h3').textContent = fruit.name

            /* Nutrition Content */
            Nutrition_content = fruit.nutritions
            let i=0;
            Object.entries(Nutrition_content).forEach(([key,value]) => {
                let ptxtcontent = document.querySelectorAll('p')[i]
                ptxtcontent.textContent = `${key.toUpperCase()}: ${value}g`
                console.log(`${key} and ${value}`)
                i++
            }) 
        })
    });
}
