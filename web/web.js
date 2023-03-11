let addProduct = document.querySelector(".addBtn")
let getProduct = document.querySelector(".getBtn")
let getIdBtn = document.querySelector(".GetID")
let idBox = document.querySelector(".idInp")
let productNameinp = document.querySelector(".name")
let productPriceinp = document.querySelector(".price")
let productTitle = document.querySelector(".ptitle")
let productPrice = document.querySelector(".pprice")
let main_box = document.querySelector(".all")


// Adding Products
const add_Product = async () => {
  let addProduct = await axios.post("https://vast-rose-lizard-kit.cyclic.app/addproduct", {
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
    let getAllProduct = await axios.get("https://vast-rose-lizard-kit.cyclic.app/products")
    main_box.innerHTML = ""
    for (let i = 0; i < getAllProduct.data.length; i++) {
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
  let deleted = await axios.post("https://vast-rose-lizard-kit.cyclic.app/delete_product", {
    deleteID: id
  }).then(
    () => {
      console.log("Api Called called", id);
    }
  )

}
// get By ID
const GetByID = async () => {
let id = idBox.value

  console.log("ID", id)
  let searchResult = await axios.post(`https://vast-rose-lizard-kit.cyclic.app/products/${id}`,{
    name:prompt(),
    price:prompt()
  })
  .then(
    (searchResult) => {

      console.log(idBox.value,
        searchResult,"www"
        );
    }
  ).catch((e)=>{console.log("WWW")})
}
getIdBtn.addEventListener("click", GetByID)

window.Delete_product = Delete_product;