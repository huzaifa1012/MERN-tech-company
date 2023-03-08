let addProduct = document.querySelector(".addBtn")
let getProduct = document.querySelector(".getBtn")
let productNameinp = document.querySelector(".name")
let productPriceinp = document.querySelector(".price")
let productTitle = document.querySelector(".ptitle")
let productPrice = document.querySelector(".pprice")
let main_box = document.querySelector(".all")



const add_Product = async () => {
    let aadProduct = await axios.post("https://my-weather-app.cyclic.app/addproduct", {
        name: productNameinp.value,
        price: productPriceinp.value
    }).then((result) => {
        console.log("Done", result)

    }).catch((err) => {
        console.log("Try Again", err)

    });
    // console.log(productNameinp.value,productPriceinp.value);
}
addProduct.addEventListener("click", add_Product)

const get_Product = async () => {
  try {
    let getAllProduct = await axios.get("https://my-weather-app.cyclic.app/products")
    console.log(getAllProduct.data)

    for (let i = 0; i < getAllProduct.data.length; i++) {

        console.log(`${getAllProduct.data[i].productName}  ${getAllProduct.data[i].productPrice}`);
        main_box.innerHTML += `
        <h1>${getAllProduct.data[i].productName}</h1>
        `
      }
    // productTitle.innerHTML = data.productName
    // productPrice.innerHTML = data.productPrice
  } catch (error) {
    console.log("can't get products Error :",error);
  }
}
getProduct.addEventListener("click", get_Product)
