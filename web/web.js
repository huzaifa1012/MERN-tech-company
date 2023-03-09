let addProduct = document.querySelector(".addBtn")
let getProduct = document.querySelector(".getBtn")
let clearAll = document.querySelector(".clearAll")
let productNameinp = document.querySelector(".name")
let productPriceinp = document.querySelector(".price")
let productTitle = document.querySelector(".ptitle")
let productPrice = document.querySelector(".pprice")
let main_box = document.querySelector(".all")


// Adding Products
const add_Product = async () => {
  let addProduct = await axios.post("http://localhost:3000/addproduct", {
    name: productNameinp.value,
    price: productPriceinp.value
  }).then((result) => {
    console.log("Done", result)
    get_Product()
  }).catch((err) => {
    console.log("Try Again", err)
  });
}
addProduct.addEventListener("click", add_Product)

// Getting Products
const get_Product = async () => {
  try {
    let getAllProduct = await axios.get("http://localhost:3000/products")
    console.log(getAllProduct.data)
    main_box.innerHTML = ""
    for (let i = 0; i < getAllProduct.data.length; i++) {
      console.log(`${getAllProduct.data[i].name}  ${getAllProduct.data[i].price}`);
      main_box.innerHTML += `
 <h1 onClick="Delete_product(${getAllProduct.data[i].productId})" >${getAllProduct.data[i].name} <span> ${getAllProduct.data[i].price}</span> </h1>`
    }
  } catch (error) {
    console.log("can't get products Error :", error);
  }
}
getProduct.addEventListener("click", get_Product)

// Delete A product
const Delete_product = async (id) => {
  let deleted = await axios.post("http://localhost:3000/delete_product", {
    deleteID: id
  }).then(
    () => {
      console.log("Api Called called", id);
    }
  )

}
// Clear All Product
const clear_All = async () => {
  let deleted = await axios.delete("http://localhost:3000/clear_all").then(

    () => {

      main_box.innerHTML = ""
      console.log("clearAll");
    }

  )


}
clearAll.addEventListener("click", clear_All)

window.Delete_product = Delete_product;