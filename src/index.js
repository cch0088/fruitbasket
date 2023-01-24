document.addEventListener("DOMContentLoaded", (e) => {
    // fetch data downloaded from https://fruityvice.com/api/fruit/all
    fetch("http://localhost:3000/fruits")
    .then((resp) => resp.json())
    .then((data) => displayFruitNav(data))
    clearButtonHandler();
    fruitJson();
    // fetch("http://localhost:3000/fruits")
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         fruitdata = data;
    //     })
    //     .then(() => {
    //         console.log(fruitdata)
    //     })
    //     console.log(fruitdata)
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

function searchBarHandler(fruitList){
    const searchBar = document.querySelector("#search");
    searchBar.addEventListener("input", (e) =>{
        e.preventDefault();
        let value = searchBar.value;

        if(value && value.trim().length > 0){
            value = value.trim().toLowerCase();
            const results = fruitList.filter(fruit => {
                console.log(fruit.name.includes(value))
                return fruit.name.includes(value)
            })
            setResults(results)
        }
        else{

        }
    })
}

function clearButtonHandler(){
    const clearBtn = document.querySelector("#clear");
    clearBtn.addEventListener("click", (e) => {

    })
}

function setResults(results){
    const nav = document.querySelector("#navigation");
    const navItems = document.querySelectorAll(".fruit");
    for(const oldItem of navItems){
        oldItem.remove();
    }
    for(const fruit of results){
        const fruitResult = document.createElement("img");
        fruitResult.className = "fruit-result";
        const fruitSrc = `assets/${fruit.name}.png`;
        fruitResult.src = fruitSrc;
        fruitResult.className = "fruit"
        nav.append(fruitResult);
    }
}

async function fruitJson(){
    let fruitList;
    const resp = await fetch("http://localhost:3000/fruits")
    fruitList = await resp.json();
    fruitList.forEach(fruit => {
        fruit.name = fruit.name.toLowerCase();
    })
    console.log(fruitList);
    searchBarHandler(fruitList);
}