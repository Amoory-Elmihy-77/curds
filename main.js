let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let delAll = document.getElementById('delAll');

let allProducts;
let temp;
if (localStorage.products) {
    allProducts = JSON.parse(localStorage.products);
} else {
    allProducts = [];
}
btnDelAll();
showData(allProducts);

// function total
function getTotal() {
    if (price.value != '') {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#440";
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = "crimson";
    }
}


// create product
submit.onclick = () => {
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        +count.value < 101) {
        let newPro = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            category: category.value,
        };
        if (submit.innerHTML == 'create') {
            // count
            if (+count.value > 1) {
                for (let i = 0; i < +count.value; i++) {
                    allProducts.push(newPro);
                    // save products to local
                    localStorage.products = JSON.stringify(allProducts);
                }
            } else {
                allProducts.push(newPro);
                // save products to local
                localStorage.products = JSON.stringify(allProducts);
            }
            btnDelAll();
            showData(allProducts);
            cleartInputs();
        } else {
            allProducts[temp] = newPro;
            localStorage.products = JSON.stringify(allProducts);
            btnDelAll();
            showData(allProducts);
            cleartInputs();
            submit.innerHTML = 'create';
            count.style.display = 'block';
            scroll({
                bottom: 50,
                behavior: "smooth"
            });
        }
    }
}

// clear inputs
function cleartInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    getTotal();
}

// Read
function makeTr(i) {
    return `
    <tr>
        <td>${i + 1}</td>
        <td>${allProducts[i].title}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].taxes}</td>
        <td>${allProducts[i].ads}</td>
        <td>${allProducts[i].discount}</td>
        <td>${allProducts[i].total}</td>
        <td>${allProducts[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick = "delPro(${i})" id="delete">delete</button></td>
    </tr>
    `;
}
function showData(allProducts) {
    let table = '';
    for (let i = 0; i < allProducts.length; i++) {
        table += makeTr(i);
    }
    document.getElementById('tbody').innerHTML = table;
}

// Delete
function delPro(i) {
    allProducts.splice(i, 1);
    localStorage.products = JSON.stringify(allProducts);
    showData(allProducts);
    btnDelAll();
}

// Delete All Products
function btnDelAll() {
    if (allProducts.length > 0) {
        delAll.innerHTML = `<button onclick="deleteAll()">delete all (${allProducts.length})</button>`;
    } else {
        delAll.innerHTML = '';
    }
}
function deleteAll() {
    allProducts.splice(0);
    localStorage.products = JSON.stringify(allProducts);
    showData(allProducts);
    btnDelAll();
}

// update
function update(i) {
    scroll({
        top: 0,
        behavior: "smooth"
    });
    count.style.display = 'none';
    title.value = allProducts[i].title;
    price.value = allProducts[i].price;
    taxes.value = allProducts[i].taxes;
    ads.value = allProducts[i].ads;
    discount.value = allProducts[i].discount;
    getTotal();
    category.value = allProducts[i].category;
    submit.innerHTML = 'update';
    temp = i;
}

// search
let searchMood = "title";
function getSearchMood(id) {
    if (id == "searchTitle") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.focus();
}
search.onkeyup = () => {
    if (searchMood == "title") {
        table = "";
        for (let i = 0; i < allProducts.length; i++) {
            if (allProducts[i].title.includes(search.value)) {
                table += makeTr(i);
                document.getElementById("tbody").innerHTML = table;
            }
        }
    } else {
        table = "";
        for (let i = 0; i < allProducts.length; i++) {
            if (allProducts[i].category.includes(search.value)) {
                table += makeTr(i);
                document.getElementById("tbody").innerHTML = table;
            }
        }
    }
}