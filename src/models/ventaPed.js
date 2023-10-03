const mongoose = require('mongoose');
const { Schema } = mongoose;

const ventaPedSchema = new mongoose.Schema({
    idPedido: { type: String, unique: true }, // Configura como único
    metodoPago: String,
    nombreProducto: String,
    estadoPedido: String,
    fechaPedido: String,
    fechaVentaPedido: String,
    precioTotalPedido: Number,
    cantidadProducto: Number,
    estadoVenta: String,
    precioUnitario: Number
    
});

module.exports = mongoose.model('VentaPed', ventaPedSchema);
