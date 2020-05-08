//-------------------------------------DEPENDENCIES---------------------------
const express = require('express');  
const router = express.Router();
const debug = require('debug')('dev') // remember to set DEBUG=dev
const axios = require('axios');
//-------------------------------------METHODS---------------------------

async function getSomeCharacters() {
        const url = 'https://rickandmortyapi.com/api/character/?page=1';
        try {
            const respose = await axios.get(url)
            return respose.data.results;
        } catch (error) {
            return error
        }
}
//-------------------------------------MOCKS---------------------------
let allCharacters;
getSomeCharacters().then( response => allCharacters=response);

//-------------------------------------ROUTES---------------------------
router.get('/all', (req, res)=>{
    debug('request from: ', req.originalUrl);
    res.send(allCharacters)
})

router.post('/new', (req,res)=>{
    debug('request from: ', req.originalUrl);
    const { body } = req

    const lastID =(allCharacters[allCharacters.length -1].id || 0) +1
    const character = {
        id: lastID,
        ...body
    }
    allCharacters.push(character);
    res.send( {
        status: 'success',
        newCharacter: character
    });
})

router.delete('/delete/:id', (req, res)=>{
    debug('request from: ', req.originalUrl);
    const { params } = req
    const character = allCharacters.find(item => item.id === parseInt(params.id) )
    if(!character) return res.status(404).send( { status: 'error', message: 'character not found :('});

    const index = allCharacters.indexOf(character);
    allCharacters.splice(index, 1)

    res.send(character)
})

router.put('/edit', (req, res)=>{
    debug('request from: ', req.originalUrl);
    const { body } = req
    
    const character = allCharacters.find(item => item.id === body.id )
    if(!character) return res.status(404).send( { status: 'error', message: 'character not found :('});

    const index = allCharacters.indexOf(character);
    allCharacters[index]=body

    res.send(allCharacters[index])
})

router.get('/:id', (req, res)=>{
    debug('request from: ', req.originalUrl);
    const { params } = req
    const character = allCharacters.find(item => item.id === parseInt(params.id) )
    if(!character) return res.status(404).send( { status: 'error', message: 'character not found :('});

    res.send(character)
})

module.exports = router;
