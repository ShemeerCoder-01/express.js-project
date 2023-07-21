const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc GET all Contacts
//@route GET /api/contacts
//@ access private

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});


//@desc GET a Contact
//@route GET /api/contacts/:id
//@ access private

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    else{
        res.status(200).json(contact);
    }
    
});

//@desc POST a Contact
//@route POST /api/contacts
//@ access private

const createContact = asyncHandler(async(req, res) => {
    console.log("The Req body is : ", req.body);
    const { name, email,phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    } else {
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id:req.user.id
        });
        res.status(200).json(contact);
    }
});

//@desc PUT  Contact
//@route PUT /api/contacts/:id
//@ access private

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    else if(contact.user_id.toString() !== req.user.id){
        res.status(203);
        throw new Error("Unauthorized user cannot update the contact information")
    }
    else{
        const updatedcontact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(201).json(updatedcontact);
    }
    
});

//@desc DELETE  Contact
//@route DELETE /api/contacts/:id
//@ access private

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    else if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Unauthorized user cannot update the contact information");
    }
    else{
        await contact.deleteOne({_id: req.params.id});
        res.status(200).json(contact);
    }
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
