fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function (oneCat) {

        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`);
        document.querySelector("nav").appendChild(a);
        a.textContent=oneCat;

        const section = document.createElement("section");
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);

    })
    getProducts();
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })

}

function showData(jsonData) {
    jsonData.forEach(showDish)
    console.log(jsonData)
}

function showDish(dish) {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("img").content = dish.image;
    clone.querySelector("h4").textContent = dish.name;
    clone.querySelector("p").textContent = dish.shortdescription;



    //clone.querySelector(".price").textContent = newPrice;

    if (dish.discount) {
        const newPrice = dish.price - dish.price * dish.discount / 100;
        clone.querySelector(".price span").textContent = dish.price;
        clone.querySelector(".price").classList.add("old-price");
        clone.querySelector(".discount-price span").textContent = newPrice;
    } else {
        clone.querySelector(".discount-price").remove()
        clone.querySelector(".price span").textContent = dish.price;
    }



    const imageName = dish.image; // this would be dynamic
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    clone.querySelector("img").src = smallImg;

    //const parent = document.querySelector("main");
    //parent.appendChild(clone);

   // document.querySelector("main").appendChild(clone);
    document.querySelector(`#${dish.category}`).appendChild(clone);
}





function sayHi(name, feeling) {
    console.log(`hi ${name} I ${feeling} you`)
}

sayHi("Laufey", "love")
