const router = require('express').Router();

//Import our authentication middleware function
const authMiddleware = require('./authMiddleware');
const { Choferes,Vehiculos,Habilitaciones, sequelizeusers, sequelizelogistica } = require("../modelos.js");
//This is a protected route - we pass in the authMiddleware function to verify the JWT token before returning anything.
//curl -X GET -H "auth-token:`cat archivo_token.txt`" http://localhost:3000/api/logistica/choferes

//GET ALL CHOFERES
router.get('/choferes', authMiddleware,async  (req, res)=>{
    try {
        const choferes = await Choferes.findAll();
        // console.log("get /api/logistica/choferes");
        res.json(choferes);
    } catch (error) {
        console.error("Error al leer choferes:", error);
        res.status(500).send('Error al leer choferes');
    }
});

//GET CHOFER DNI
router.get('/choferes/:dni', authMiddleware, async (req, res) => {
    const { dni } = req.params;
    try {
        const chofer = await Choferes.findOne({ where: { dni } });
        res.json(chofer);
    } catch (error) {
        console.error("Error al leer chofer:", error);
        res.status(500).send('Error al leer chofer');
    }
});


//curl -X GET -H "auth-token:`cat archivo_token.txt`" http://localhost:3000/api/logistica/vehiculos 
//GET all vehiculos
router.get('/vehiculos', authMiddleware, async (req, res) => {
    try {
        const vehiculos = await Vehiculos.findAll();
        res.json(vehiculos);
    } catch (error) {
        console.error("Error al leer vehiculos:", error);
        res.status(500).send('Error al leer vehiculos');
    }
});

//curl -X GET -H "auth-token:`cat archivo_token.txt`" http://localhost:3000/api/logistica/habilitaciones
//GET all habilitaciones
router.get('/habilitaciones', authMiddleware, async (req, res) => {
    try {
        const habilitaciones = await Habilitaciones.findAll();
        res.json(habilitaciones);
    } catch (error) {
        console.error("Error al leer habilitaciones:", error);
        res.status(500).send('Error al leer habilitaciones');
    }
});

//CREATE CHOFER
router.post('/choferes', authMiddleware, async (req, res) => {
    const { id, nombre, apellido, dni, licencia, edad } = req.body;
    try {
        await Choferes.create({ id_chofer: id, nombre, apellido, dni, licencia, edad });
        res.send('Chofer creado con éxito');
    } catch (error) {
        console.error("Error al crear chofer:", error);
        res.status(500).send('Error al crear chofer');
    }
});

//UPDATE CHOFER
router.put('/choferes/:dni', authMiddleware, async (req, res) => {
    const { dni } = req.params;
    const { nombre, apellido, edad } = req.body;
    try {
        await Choferes.update({ nombre, apellido, edad }, { where: { dni } });
        res.send('Chofer actualizado con éxito');
    } catch (error) {
        console.error("Error al actualizar chofer:", error);
        res.status(500).send('Error al actualizar chofer');
    }
});

//DELETE CHOFER x nombre
//elimino chofer por nombre
router.delete('/choferes/:nombre', authMiddleware, async (req, res) => {
    const { nombre } = req.params;
    try {
        await Choferes.destroy({ where: { nombre } });
        res.send('Chofer eliminado con éxito');
    } catch (error) {
        console.error("Error al eliminar chofer:", error);
        res.status(500).send('Error al eliminar chofer');
    }
});






module.exports = router;