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
        productName: name,
        productPrice: price
    })
    console.log("Data From DB", database);

})
 app.get('/products', (req,res)=>{
    res.send(database)

 })

app.use('/page', express.static('./web'))

app.get('/contact', (req, res) => {
    res.send(`<h1>It's Contact Section</h1>`)

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})