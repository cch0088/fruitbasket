document.addEventListener("DOMContentLoaded", (e) => {
    // Fetch data downloaded from https://fruityvice.com/api/fruit/all
    fetch("http://localhost:3000/fruits")
    .then((resp) => resp.json())
    .then((data) => {
        displayFruitDetails(data[0]);
        displayFruitNav(data);
        displayFilterForm(data);
    });
});

function displayFruitDetails(fruit)
{
    const contentList = fruit.nutritions;

    const imgDetails = document.querySelector('#imgDetails');
    imgDetails.src = "assets/" + (fruit.name).toLowerCase() + ".png";
    imgDetails.alt = fruit.name;
    
    document.querySelector("#fruitName").textContent = fruit.name;

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
            break;
        case "byProtein":
            fruits.sort((f1, f2) => (f1.nutritions.protein < f2.nutritions.protein) ? 1 
            : (f1.nutritions.protein > f2.nutritions.protein) ? -1 : 0);
            break;
        case "byFat":
            fruits.sort((f1, f2) => (f1.nutritions.fat < f2.nutritions.fat) ? 1 
            : (f1.nutritions.fat > f2.nutritions.fat) ? -1 : 0);
            break;
        case "byCalories":
            fruits.sort((f1, f2) => (f1.nutritions.calories < f2.nutritions.calories) ? 1 
            : (f1.nutritions.calories > f2.nutritions.calories) ? -1 : 0);
            break;
        case "bySugar":
            fruits.sort((f1, f2) => (f1.nutritions.sugar < f2.nutritions.sugar) ? 1 
            : (f1.nutritions.sugar > f2.nutritions.sugar) ? -1 : 0);
            break;
        default:
            fruits.sort((f1, f2) => (f1.name < f2.name) ? -1 
            : (f1.name > f2.name) ? 1 : 0);
            break;
    }
}

function displayFilterForm(fruits)
{
    // define search form
    const searchBox = document.querySelector("#searchbox");

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Find a fruit";
    searchBox.append(searchInput);

    const moreOptions = document.createElement("button");
    moreOptions.textContent = "Sort by...";
    searchBox.append(moreOptions);

    // define additional sorting form
    const filterFormBox = document.querySelector("#hiddensearchbox.hidden");
    const filterForm = document.createElement("form");
    const br0 = document.createElement("br");
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");
    const br4 = document.createElement("br");

    // event listener for exposing additional options
    moreOptions.addEventListener("click", (e) =>
    {
        filterFormBox.classList.toggle("hidden");
    });

    const optName = document.createElement("input");
    optName.setAttribute("type", "radio");
    optName.setAttribute("name", "sortOrder");
    optName.setAttribute("value", "byName");
    optName.setAttribute("checked", "true");
    const txtName = document.createTextNode("Default sort (A-Z)");

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

    // define default values
    let sortValue = document.querySelector("input[name='sortOrder']:checked").value;
    let searchValue = searchInput.value;

    // add event listeners
    filterForm.addEventListener("click", (e) => {
        sortValue = document.querySelector("input[name='sortOrder']:checked").value;
        sortObject(fruits, sortValue);
        displayFruitNav(fruits, searchValue);
    });

    searchInput.addEventListener("input", (x) => {
        sortObject(fruits, sortValue);
        searchValue = x.target.value.toLowerCase();
        displayFruitNav(fruits, searchValue);
    });

    let x1, x2, y1, y2;

    filterFormBox.addEventListener("dragstart", (d) => {
        x1 = d.clientX;
        y1 = d.clientY;
    });

    filterFormBox.addEventListener("dragend", (d) => {
        x2 = d.clientX;
        y2 = d.clientY;

        filterFormBox.style.top = `${filterFormBox.offsetTop - (y1 - y2)}px`;
        filterFormBox.style.left = `${filterFormBox.offsetLeft - (x1 - x2)}px`;
    });
}
