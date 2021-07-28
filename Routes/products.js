const express=require('express');
const router= express.Router();
const {getAll,getOne, create ,deletePhone,updatePhone}=require('../Controllers/phonesControllers')
router.get('/', async (req,res)=>{
   const data  = await getAll(req,res);
   res.status(200).send(data);
})
router.get('/:id', async (req, res) => {
    const phone = await getOne(req.params.id);
    res.status(200).send(phone);
});
router.post('/delete', async (req, res) => {
    const phone = await deletePhone(req, res);
    res.status(200).send(phone);
});
router.post('/update', async (req, res) => {
    const phone = await updatePhone(req, res);
    res.status(200).send(phone);
});


router.post('/addphone', async(req,res)=>{
    const data=await create(req,res)
})
module.exports=router