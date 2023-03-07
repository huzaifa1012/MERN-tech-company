import express from "express"
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log(new Date().toString())
    res.send('Hello World!')

})

app.get('/contact', (req, res) => {
    res.send(`<h1>It's Contact Section</h1>`)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})