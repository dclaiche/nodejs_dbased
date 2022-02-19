import * as model from './model_model.mjs'
import express from 'express'

const app = express()
const PORT = 3000
app.use(express.json()).use(express.urlencoded({ extended: true })) 

//create
app.post("/foo", (req, res) => {

})

//read
app.get("/foo", (req, res) => {
    
})

//update
app.put("/foo/:id", (req, res) => {

})

//delete
app.delete("/foo/:id", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});