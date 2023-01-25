document.addEventListener("DOMContentLoaded", (e) => {
    // Fetch data downloaded from https://fruityvice.com/api/fruit/all
    fetch("http://localhost:3000/fruits")
    .then((resp) => resp.json())
    .then((data) => {
        displayFruitDetails(data[0]);
        displayFruitNav(data);
        displayFilterForm();
    });
});

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
        ptxtcontent.textContent = `${key.toUpperCase()}: ${value}g`;
        i += 1;
    });
}

function displayFruitNav(fruits, filter)
{
    const fruitNav = document.querySelector("#navigation");
    fruitNav.textContent = "";

    fruits.forEach(fruit => {
        if (fruit.name.toLowerCase().match(filter) || filter === undefined)
        {
            const fruitItem = document.createElement("img");
            fruitItem.src = "assets/" + (fruit.name).toLowerCase() + ".png";
            fruitItem.alt = fruit.name;
            fruitItem.className = "fruit";

            fruitNav.append(fruitItem);

            // Click for Display
            fruitItem.addEventListener('click', (e) => displayFruitDetails(fruit));
        }
    });
}

function sortObject(fruits, sortBy)
{
    switch (sortBy)
    {
        case "byCarbs":
            fruits.sort((f1, f2) => (f1.nutritions.carbohydrates < f2.nutritions.carbohydrates) ? 1 
            : (f1.nutritions.carbohydrates > f2.nutritions.carbohydrates) ? -1 : 0);
            searchBox(fruits);
            break;
        case "byProtein":
            fruits.sort((f1, f2) => (f1.nutritions.protein < f2.nutritions.protein) ? 1 
            : (f1.nutritions.protein > f2.nutritions.protein) ? -1 : 0);
            searchBox(fruits);
            break;
        case "byFat":
            fruits.sort((f1, f2) => (f1.nutritions.fat < f2.nutritions.fat) ? 1 
            : (f1.nutritions.fat > f2.nutritions.fat) ? -1 : 0);
            searchBox(fruits);
            break;
        case "byCalories":
            fruits.sort((f1, f2) => (f1.nutritions.calories < f2.nutritions.calories) ? 1 
            : (f1.nutritions.calories > f2.nutritions.calories) ? -1 : 0);
            searchBox(fruits);
            break;
        case "bySugar":
            fruits.sort((f1, f2) => (f1.nutritions.sugar < f2.nutritions.sugar) ? 1 
            : (f1.nutritions.sugar > f2.nutritions.sugar) ? -1 : 0);
            searchBox(fruits);
            break;
        default:
            fruits.sort((f1, f2) => (f1.name < f2.name) ? -1 
            : (f1.name > f2.name) ? 1 : 0);
            searchBox(fruits);
            break;
    }
}

function displayFilterForm()
{
    // define search form
    const searchBox = document.querySelector("#searchbox");
    searchBox.textContent = "Find: ";

    const searchInput = document.createElement("input");
    searchBox.append(searchInput);

    // define additional sorting form
    const filterFormBox = document.querySelector("#hiddensearchbox.hidden");
    const filterForm = document.createElement("form");
    const br0 = document.createElement("br");
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");
    const br4 = document.createElement("br");

    const optName = document.createElement("input");
    optName.setAttribute("type", "radio");
    optName.setAttribute("name", "sortOrder");
    optName.setAttribute("value", "byName");
    optName.setAttribute("checked", "true");
    const txtName = document.createTextNode("Default sort");

    const optCarbs = document.createElement("input");
    optCarbs.setAttribute("type", "radio");
    optCarbs.setAttribute("name", "sortOrder");
    optCarbs.setAttribute("value", "byCarbs");
    const txtCarbs = document.createTextNode("Carbohydrate content");

    const optProtein = document.createElement("input");
    optProtein.setAttribute("type", "radio");
    optProtein.setAttribute("name", "sortOrder");
    optProtein.setAttribute("value", "byProtein");
    const txtProtein = document.createTextNode("Protein content");

    const optFat = document.createElement("input");
    optFat.setAttribute("type", "radio");
    optFat.setAttribute("name", "sortOrder");
    optFat.setAttribute("value", "byFat");
    const txtFat = document.createTextNode("Fat content");

    const optCalories = document.createElement("input");
    optCalories.setAttribute("type", "radio");
    optCalories.setAttribute("name", "sortOrder");
    optCalories.setAttribute("value", "byCalories");
    const txtCalories = document.createTextNode("Calorie content");

    const optSugar = document.createElement("input");
    optSugar.setAttribute("type", "radio");
    optSugar.setAttribute("name", "sortOrder");
    optSugar.setAttribute("value", "bySugar");
    const txtSugar = document.createTextNode("Sugar content");

    filterForm.append(optName, txtName, br0,
                      optCarbs, txtCarbs, br1,
                      optProtein, txtProtein, br2,
                      optFat, txtFat, br3,
                      optCalories, txtCalories, br4,
                      optSugar, txtSugar);

    filterFormBox.append(filterForm);


}
