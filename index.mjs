import express from "express"
const app = express()
const port = 3000;
import cors from "cors"
app.use(express.json());
app.use(cors())

let database = [];

app.get('/', (req, res) => {
    console.log(new Date().toString())
    res.send('Hello World!')

})
app.post('/addproduct', (req, res) => {
    const { name, price } = req.body
    console.log("product :", req.body)
    res.send(`Done, added product ${name}`);
    database.push({
        productId: `${new Date().getTime()}`,
        productName: name,
        productPrice: price
    })
    console.log("Product Added");

})
app.get('/products', (req, res) => {
    res.send(database)

})

// let id = 343242

// database= [
//     {
//     id:402304,
//     name:"asd"
// },
// {
//     id:343242,
//     name:"asd"
// },
// {
//     id:938434,
//     name:"asd"
// }
// ]



app.post('/delete_product', (req, res) => {
    const id = req.body.deleteID.toString()

    for (let i = 0; i < database.length; i++) {
        if (database[i].productId == id) {
            database.splice(i,1)
            console.log("Yes", database[i])
        }
        else { console.log("sooryy", database[i].productId,); }
    }
    res.send(database)
})

app.delete('/clear_all', (req, res) => {
    database = []
    console.log(database);
    res.send(database)
})

app.use('/page', express.static('./web'))

app.get('/contact', (req, res) => {
    res.send(`<h1>It's Contact Section</h1>`)

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})