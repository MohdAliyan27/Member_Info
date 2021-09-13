const express = require('express');
const router = express.Router();
const members = require('../../Members')
const uuid = require('uuid')

//Get all the members 
router.get('/', (req,res) => res.json(members))

//Get a single member.
router.get('/:id', (req,res) =>{ 
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else{
        res.status(400).json({msg:`No such member found with id ${req.params.id}`})
    }
})

//Creating a new Member
router.post('/', (req,res) =>{
    const newMember={
        id:uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status:"Active"
    }
    if(!newMember.name){
        return res.status(400).json({msg:"Name cannot be empty"})
    }else if(!newMember.email){
        return res.status(400).json({msg:"Email cannot be empty"})
    }
    members.push(newMember);
    //res.json(members); // change if need the API
    res.redirect('/')  // change if needed on the wensite.
})


//Update new member.
router.put('/:id', (req,res) =>{ 
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        const updateMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({msg: "Member updated Succesfully", member:member})
            }
        })
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else{
        res.status(400).json({msg:`No such member found with id ${req.params.id}`})
    }
})

//Delete a member 

router.delete('/:id', (req,res) =>{ 
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found){
        res.json({
            msg:`Member with id ${req.params.id} is deleted.`,
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
    } else{
        res.status(400).json({msg:`No such member found with id ${req.params.id}`})
    }
})
module.exports = router;