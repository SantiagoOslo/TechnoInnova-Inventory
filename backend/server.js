const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB (actualizado para versiones recientes de mongoose)
mongoose.connect('mongodb://localhost:27017/inventario')
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

// Modelo de Producto
const Producto = mongoose.model('Producto', new mongoose.Schema({
    producto: String,
    categoria: String,
    cantidad: Number,
    proveedor: String,
    fechaIngreso: Date,
}));

// Endpoint para registrar productos
app.post('/api/productos', async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).send(producto);
    } catch (error) {
        res.status(400).send({ error: 'Error al registrar el producto', details: error });
    }
});

// Endpoint para obtener todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).send(productos);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los productos', details: error });
    }
});

// Endpoint para obtener productos por categoría
app.get('/api/productos/categoria/:categoria', async (req, res) => {
    try {
        const productos = await Producto.find({ categoria: req.params.categoria });
        res.status(200).send(productos);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los productos por categoría', details: error });
    }
});

// Endpoint para actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!productoActualizado) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        res.status(200).send(productoActualizado);
    } catch (error) {
        res.status(400).send({ error: 'Error al actualizar el producto', details: error });
    }
});

// Endpoint para eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) {
            return res.status(404).send({ error: 'Producto no encontrado' });
        }
        res.status(200).send({ message: 'Producto eliminado', producto: productoEliminado });
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar el producto', details: error });
    }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
