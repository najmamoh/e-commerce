import { Router } from "express";

import {createproducts,getproducts,Deleteproducts,findproducts,Udateproducts} from '../Controller/products'
const router=Router()

router.post('/new',createproducts)
router.get('/get',getproducts)
router.delete('/delete/:id',Deleteproducts)
router.get('/get/:id',findproducts)
router.put('/update/:id',Udateproducts)

export default router