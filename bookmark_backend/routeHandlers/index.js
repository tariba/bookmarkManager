import express from 'express';
import { getAllData, getDataByTitle, postData, deleteData, updateData } from '../modelFunctions/index.js'

const router = express.Router();

router.get('/', async(req, res)=>{
    
    
    if(req.query.title) {
        const response = await getDataByTitle(req.query.title)
        res.status(200).send({
            succes:true,
            payload: response
        })
    } else {
        const response = await getAllData();
        res.status(200).send({
            success:true,
            payload: response
        })
    }
    
})

router.post('/', async (req, res) => {
    const data = req.body
    const response = await postData(data)
    res.status(200).json({
        success: true,
        payload: response

    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const response = await deleteData(id)
    console.log(response)
    if (response === []) {
        res.status(404).send("data not found")
    } else {  
        res.status(200).json ({
            success:true,
            payload: response
        })
    }
})

router.put ('/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    const response = await updateData(id, data)
    console.log(response)
    res.status(200).json ({
        success:true,
        payload: response
    })
})
export default router