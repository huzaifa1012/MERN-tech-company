import express from "express"
const app = express()
const port = 3000;
import cors from "cors"
import mongoose from "mongoose";
app.use(express.json());
app.use(cors())

mongoose.connect("mongodb+srv://huzaifa:asdasd@onlinestore.t23bgpu.mongodb.net/theStore?retryWrites=true&w=majority").then(
    () => {
        console.log("connected");
    }
).catch(() => {
    console.log("Failed To Connect DB");
})


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})

const productModel = mongoose.model('products', productSchema)

let database = [];

app.get('/', (req, res) => {
    console.log(new Date().toString())
    res.send('Hello World!')

})
app.post('/addproduct', (req, res) => {
    const { name, price } = req.body
    console.log("product :", req.body)
    // database.push({
    //     productId: `${new Date().getTime()}`,
    //     productName: name,
    //     productPrice: price
    // })
    let send = productModel.create({
        name: name,
        price: price
    })
    if (!send) {
        console.log("failed to save products");
        res.status(404).send("saved successfully");
    }
    else {

        res.status(200).send("saved successfully");
        console.log("successfully added the product");
    }
})


app.get('/products', (req, res) => {
    const fetch = async () => {
        try {
            let productFetched = await productModel.find({})
            if (!productFetched) {
                res.status(400).send(`Failed to fetch  product`)
                console.log("nhi");
            }
            else {
                console.log("he", productFetched);
                res.status(200).send(productFetched)
            }
        } catch (error) {
            res.status(200).send(`Faild to get product `)
        }
    }
    fetch()
})

app.delete('/delete_product/:id', async (req, res) => {
    const id = req.params.id
    try {

        let isDelete = await productModel.deleteOne({ _id: id }); // returns {deletedCount: 1}
        console.log("Yes", isDelete)
        if (isDelete.deletedCount == !1) {
            res.status(404).send({ message: "sorry your data can't be deleted" })
            console.log("deleted count", isDelete.deletedCount)
        return;
        }
        else {
            res.status(200).send({ message: "Data deleted by Given ID" })
        }
    } catch (err) {
        console.log("sorry It's Catch");

    }
    // for (let i = 0; i < database.length; i++) {
    //     if (database[i].productId == id) {
    //         database.splice(i, 1)
    //         console.log("Yes", database[i])
    //     }
    //     else { console.log("sooryy", database[i].productId,); }
    // }
    res.send(database)
})


app.delete('/clear_all', (req, res) => {
    database = []
    console.log(database);
    res.send(database)
})
// search by ID

app.get('/products/:id', async (req, res) => {

    let id = req.params.id.toString()
    const findData = await productModel.findOne({ _id: id })
    console.log(id)
    res.send(findData)
})
app.use('/page', express.static('./web'))

app.get('/contact', (req, res) => {
    res.send(`<h1>It's Contact Section</h1>`)

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})