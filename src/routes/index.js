const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const VentaPed = require('../models/ventaPed'); // Importa el modelo correctamente




const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index.ejs');
});

// USUARIOS

router.get("/registrar", (req, res, next) => {
    res.render('registrar.ejs');
});
router.post("/registrar", passport.authenticate('local-registrar', {
    successRedirect: '/profile',
    failureRedirect: '/registrar',
    passReqToCallback: true
}));

router.get("/ingresar", (req, res, next) => {
    res.render('ingresar.ejs');
});
router.post("/ingresar", passport.authenticate('local-ingresar', {
    successRedirect: '/profile',
    failureRedirect: '/ingresar',
    passReqToCallback: true
}));

router.get("/salir", (req, res, next) => {
    req.logout(() => {
        res.redirect('/');
    });
    
});

router.get("/profile", isAuthenticated, async (req, res, next) => {
    try {
        const users = await User.find({});
        res.render('profile.ejs', { users });
    } catch (error){
        console.error(error);
        res.status(500).send('Error datos');
    }
    
});

router.get("/usuarios", isAuthenticated, async (req, res, next) => {
    try {
        const users = await User.find({});
        res.render('./usuarios/usuarios.ejs', { users });
    } catch (error){
        console.error(error);
        res.status(500).send('Error datos');
    }
});

router.get("/create-user", isAuthenticated, async (req, res, next) => {
    try {
        const users = await User.find({});
        res.render('./usuarios/create-usuario.ejs', { users });

    } catch (error){
        console.error(error);
        res.status(500).send('Error datos');
    }
});

router.post("/createUser", isAuthenticated, async (req, res, next) => {
    try {
        if (req.body.rol == "Admin"){
            const user = new User({
                idUser: req.body.idUser,
                name: req.body.user,
                email: req.body.email,
                password: req.body.password,
                estado: {
                    estadoUsuario: 1,
                    nombreRol: req.body.rol,
                    estadoRol: 1,
                    nombrePermiso: {
                        configuracion: [ 
                            "registrarUsuario", 
                            "consultarUsuario", 
                            "modificarUsuario" 
                        ],
                        roles: [
                            "registrarRol",
                            "consultarRol",
                            "modificarRol",
                            "eliminarRol"
                        ],
                        compras: [
                            "registrarCompra",
                            "consultarCompra",
                            "modificarCompra"
                        ],
                        ventas: [
                            "registrarVenta",
                            "consultarVenta",
                            "modificarVenta"
                        ],
                        servicios: [
                            "registrarServicio",
                            "consultarServicio",
                            "modificarServicio",
                            "eliminarServicio"
                        ],
                        citas: [
                            "registrarCita",
                            "consultarCita",
                            "modificarCita",
                            "eliminarCita"
                        ],
                        pedidos: [
                            "registrarPedido",
                            "consultarPedido",
                            "modificarPedido",
                            "eliminarPedido"
                        ],
                        empleados: [
                            "registrarEmpleado",
                            "consultarEmpleado",
                            "modificarEmpleado",
                            "eliminarEmpleado"
                        ],
                        clientes: [
                            "registrarCliente",
                            "consultarCliente",
                            "modificarCliente",
                            "eliminarCliente"
                        ],
                        productos: [
                            "registrarProducto",
                            "consultarProducto",
                            "modificarProducto",
                            "eliminarProducto"
                        ],
                        proveedores: [
                            "registrarProveedor",
                            "consultarProveedor",
                            "modificarProveedor",
                            "eliminarProveedor"
                        ],
                        servicio: [
                            "registrarServicio",
                            "consultarServicio",
                            "modificarServicio"
                        ]
                    }
                }
            });
            user.password = user.encryptPass(req.body.password);
            user.save();
        }else if (req.body.rol == "Empleado"){
            const user = new User({
                idUser: req.body.idUser,
                name: req.body.user,
                email: req.body.email,
                password: req.body.password,
                estado: {
                    estadoUsuario: 1,
                    nombreRol: req.body.rol,
                    estadoRol: 1,
                    nombrePermiso: {
                        configuracion: [ 
                            "registrarUsuario", 
                            "consultarUsuario", 
                            "modificarUsuario" 
                        ],
                        
                        compras: [
                            "registrarCompra",
                            "consultarCompra"
                        ],
                        ventas: [
                            "registrarVenta",
                            "consultarVenta",
                            "modificarVenta"
                        ],
                        servicios: [
                            "registrarServicio",
                            "consultarServicio",
                            "modificarServicio",
                            "eliminarServicio"
                        ],
                        citas: [
                            "registrarCita",
                            "consultarCita",
                            "modificarCita",
                            "eliminarCita"
                        ],
                        pedidos: [
                            "registrarPedido",
                            "consultarPedido",
                            "modificarPedido",
                            "eliminarPedido"
                        ],
                        
                        clientes: [
                            "registrarCliente",
                            "consultarCliente",
                            "modificarCliente",
                            "eliminarCliente"
                        ],
                        productos: [
                            "registrarProducto",
                            "consultarProducto",
                            "modificarProducto",
                            "eliminarProducto"
                        ]
                    }
                }
            });
            user.password = user.encryptPass(req.body.password);
            user.save();
        }else if (req.body.rol == "Cliente") {
            const user = new User({
                idUser: req.body.idUser,
                name: req.body.user,
                email: req.body.email,
                password: req.body.password,
                estado: {
                    estadoUsuario: 1,
                    nombreRol: req.body.rol,
                    estadoRol: 1,
                    nombrePermiso: {
                        citas: [
                            "registrarCita",
                            "consultarCita",
                            "modificarCita",
                            "eliminarCita"
                        ],
                        pedidos: [
                            "registrarPedido",
                            "consultarPedido",
                            "modificarPedido",
                            "eliminarPedido"
                        ]
                    }
                }
            });
            user.password = user.encryptPass(req.body.password);
            user.save();
        }
        const users = await User.find({});
        res.render('./usuarios/usuarios.ejs', { users });
    } catch (error){
        console.error(error);
        res.status(500).send('Error datos');
    }
});

router.get("/edit-user/:id", isAuthenticated, async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findOne({_id: id});

    res.render("./usuarios/edit-user.ejs", { user });
});

router.post("/editUser", isAuthenticated, async (req, res, next) => {
    try {
        const id = req.body.IDMongo;
        const email = req.body.email;

        await User.findByIdAndUpdate(id, {
            email: email
        });
        
        const users = await User.find({});
        res.render('./usuarios/usuarios.ejs', { users });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error de edición');
    }
});

// ROLES

router.get("/roles", isAuthenticated, async (req, res, next) => {
    const users = await User.find({});
    res.render('./roles/roles.ejs', { users });
});

router.get("/create-rol", isAuthenticated, async (req, res, next) => {
    try {
        const users = await User.find({});
        res.render('./roles/create-rol.ejs', { users });
    } catch (error){
        console.error(error);
        res.status(500).send('Error datos');
    }
});

router.post("/createRol", isAuthenticated, async (req, res, next) => {
    // nothing
});

// COMPRAS
const Compras = require('../models/compra');
const Productos = require("../models/producto");
const Proveedores = require("../models/proveedor");

router.get("/compras", isAuthenticated, async (req, res, next) => {
    try {
        const compras = await Compras.find({});
        const productos = await Productos.find({})
        const proveedores = await Proveedores.find({})
        res.render('./compras/compras.ejs', { compras, productos, proveedores });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error de datos');
    }
});

router.get('/detallesCompra', isAuthenticated, async (req, res, next) =>{
    try{
        const compras = await Compras.find({});
        res.render('./compras/detallesCompra.ejs', {compras})
    }catch (error){
        console.error(error);
        res.status(500).send('Error de datos')
    }
})

router.post("/createComp", isAuthenticated, async (req, res, next) => {
     const cantidadDetalles = req.body.detalleCompra;

    let compraData = {
      idCompra: req.body.IDCompra,
      fechaCompra: req.body.fechaCompra,
      descrip: req.body.desc,
      factura: req.body.factura,
      costoTotalCompra: 0
    };

    if (Array.isArray(cantidadDetalles)) {
      compraData.DetallesCompra = cantidadDetalles.map((detalle, index) => ({
        codigoDetalleCompra: Array.isArray(req.body.codigoDetalleCompra)
          ? req.body.detalleCompra[index]
          : req.body.detalleCompra,
        proveedor: Array.isArray(req.body.proveedor)
          ? req.body.proveedor[index]
          : req.body.proveedor,
        product: Array.isArray(req.body.product)
          ? req.body.product[index]
          : req.body.product,
        precio: Array.isArray(req.body.precio)
          ? req.body.precio[index]
          : req.body.precio,
        cantidad: Array.isArray(req.body.cantidad)
          ? req.body.cantidad[index]
          : req.body.cantidad,
        costoTotalUnitario: req.body.cantidad[index] * req.body.precio[index],
      }));
    } else {
      compraData.DetallesCompra = [
        {
          detalleCompra: req.body.detalleCompra,
          proveedor: req.body.proveedor,
          product: req.body.product,
          precio: req.body.precio,
          cantidad: req.body.cantidad,
          costoTotalUnitario: req.body.cantidad * req.body.precio,
        },
      ];
    }

    let compraTotal = 0;

    compraData.DetallesCompra.forEach(costoCompraTotal => {
        compraTotal += costoCompraTotal.costoTotalUnitario
    });

    compraData.costoTotalCompra = compraTotal;

    const compra = new Compras(compraData);

    compra.save()
    .then(async doc => {
        const compras = await Compras.find({});
        const productos = await Productos.find({});
        const proveedores = await Proveedores.find({});
        res.render("./compras/compras.ejs", {compras, productos, proveedores});
        console.log('Compra registrada', doc);
    }).catch(err => {
        console.log("Error al registrar: ",err.message);
    });
});

//PRODUCTOS

router.get('/productos', isAuthenticated, async (req, res, next) => {
    try{
        const productos = await Productos.find({});
        res.render('./productos/productos.ejs', {productos});
    }catch (error) {
        console.error(error);
        res.status(500).send('Error de datos')
    }
})

router.post("/createProd", isAuthenticated, async (req, res, next) => {
    const producto = new Productos({
        nombre: req.body.nombreProducto,
        descripcion: req.body.desc,
        saldoInventario: 0,
        precioVenta: req.body.precioVenta,
        estado: 'agotado'
    })

    producto.save()
    .then(async doc => {
        const productos = await Productos.find({})
        res.render('./productos/productos.ejs', {productos})
        console.log('Producto registrado', doc)
    }).catch(err => {
        console.log('Error al registrar: ', err.message)
    })
});

router.get("/editProduct/:id", isAuthenticated, async (req, res, next) => {
    const id = req.params.id;

    const productos = await Productos.findOne({_id:id})

    res.render("./productos/editProduct.ejs", {productos});
});

router.post('/editProduct', isAuthenticated, async (req, res, next) => {
    try{
        const id = req.body.IDMongo;
        const nombre = req.body.nombreProducto;
        const desc = req.body.desc;
        const precVenta = req.body.precioVenta;

        await Productos.findByIdAndUpdate(id, {
            nombre: nombre,
            descripcion: desc,
            precioVenta: precVenta
        });

        const productos = await Productos.find({});
        res.render('./productos/productos.ejs', { productos })
    }catch (err) {
        console.log(err);
        res.status(500).send('Error de edición')
    }
})

router.get('/deleteProduct/:id', isAuthenticated, async (req, res, next) => {
    try{
        const id = req.params.id;

        await Productos.findByIdAndDelete(id)

        const productos = await Productos.find({})
        res.render('./productos/productos.ejs', { productos });
    }catch(err){
        console.log(err);
        res.status(500).send('Error al eliminar producto')
    }
})

//PROVEEDOR

router.get("/proveedores", isAuthenticated, async (req, res, next) => {
    try{
        const proveedores = await Proveedores.find({});
        res.render("./proveedores/proveedores.ejs", { proveedores });
    }catch (err){
        console.log(err);
        res.status(500).send('Error de datos')
    }
});

router.post('/createProveedor', isAuthenticated, async (req, res, next) => {
        const proveedor = new Proveedores({
          tipoProveedor: req.body.tipoProveedor,
          nombre: req.body.nombreProveedor,
          contacto: req.body.contacto,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          estado: "Habilitado",
        });

        proveedor.save()
          .then(async (doc) => {
            const proveedores = await Proveedores.find({});
            res.render("./proveedores/proveedores.ejs", { proveedores });
            console.log("Producto registrado", doc);
          })
          .catch((err) => {
            console.log("Error al registrar: ", err.message);
          });
})

router.get("/editProveedor/:id", isAuthenticated, async (req, res, next) => {
  const id = req.params.id;

  const proveedores = await Proveedores.findOne({ _id: id });

  res.render("./proveedores/editProveedor.ejs", { proveedores });
});

router.post("/editProveedor", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.body.IDMongo;
    const tipProveedor = req.body.tipoProveedor;
    const nomb = req.body.nombreProveedor
    const contac = req.body.contacto
    const direc = req.body.direccion
    const tel = req.body.telefono

    await Proveedores.findByIdAndUpdate(id, {
      tipoProveedor: tipProveedor,
      nombre: nomb,
      contacto: contac,
      direccion: direc,
      telefono: tel,
    });

    const proveedores = await Proveedores.find({});
    res.render("./proveedores/proveedores.ejs", { proveedores });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error de edición");
  }
});

router.get("/deleteProveedor/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;

    await Proveedores.findByIdAndDelete(id);

    const proveedores = await Proveedores.find({});
    res.render("./proveedores/proveedores.ejs", { proveedores });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al eliminar producto");
  }
});

// SERVICIOS
const Servicios = require('../models/servicio');

router.get("/servicios", isAuthenticated, async (req, res, next) => {
    try {
        const servicios = await Servicios.find({});
        res.render('./servicios/servicios.ejs', { servicios });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error de datos');
    }
});

router.get("/create-servicio", isAuthenticated, async (req, res, next) => {
    try {
        const servicios = Servicios.find().sort({idCita: -1}).limit(1);
        res.render("./servicios/create-servicio.ejs", { servicio: servicios[0] });
    } catch (error) {
        console.log("Error al consultar DB", error);
        res.status(500).send("Error de datos")
    }
});

router.post("/createSer", isAuthenticated, async (req, res, next) => {
    const servicio = new Servicios({
        idServicio: req.body.IDServicio,
        idEmpleado: req.body.IDEmpleado,
        idCita: req.body.IDCita,
        nombreServicio: req.body.nombreServicio,
        precioServicio: req.body.precioServicio,
        nombreEmpleado: req.body.nombreEmpleado,
        cedulaEmpleado: req.body.cedulaEmpleado,
        duracionServicio: req.body.duracionServicio,
        estadoCita: req.body.estadoCita,
        fechaCita: req.body.fechaCita    
    });
    servicio.save()
    .then(async doc => {
        const servicios = await Servicios.find({});
        console.log('Servicio registrado', doc);
        res.render('./servicios/servicios.ejs', { servicios });
    }).catch(err => {
        console.log("Error al registrar: ", err.message);
    });
});

router.get("");

// VENTAS

const Ventas = require("../models/venta");

router.get("/ventas", isAuthenticated, async (req, res, next) => {
    try {
        const ventas = await Ventas.find({});
        res.render("../views/ventas/ventas.ejs", { ventas })
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de datos");
    }
});

router.get("/create-venta-servicio", isAuthenticated, async (req, res, next) => {
    try {
        const ventas = Ventas.find().sort({idVenta: -1}).limit(1);
        res.render("../views/ventas/create-venta-servicio.ejs", { venta: ventas[0] });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de datos");
    }
});

router.get("/create-venta-pedido", isAuthenticated, async (req, res, next) => {
    try {
        const ventas = Ventas.find().sort({idVenta: -1}).limit(1);
        res.render("../views/ventas/create-venta-pedido.ejs", { venta: ventas[0] });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de datos");
    }
});

router.get("/createVentaSer", isAuthenticated, async (req, res, next) => {
    try { const ventaSer = new ventaServ ({
            nombreEmpleado: req.body.nombreEmpleado,
            nombreCliente: req.body.nombreCliente,
            idCita: req.body.idCita,
            fechaResgitro: req.body.fechaRegistro,
            costoTotalCita: req.body.costoTotalCita,
            fechaVentaServicio: req.body.fechaVentaServicio,
            formaPagoServicio: req.body.formaPagoServicio,
            estadoVentaServicio: req.body.estadoVentaServicio,  
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error de datos");
    }
});

//VentaPedido
const { v4: uuidv4 } = require('uuid');

router.post("/createVentaPed", isAuthenticated, async (req, res, next) => {
    try {
        // Genera un nuevo idPedido único
        const idPedido = uuidv4();

        // Crea una instancia de VentaPed utilizando el modelo de Mongoose
        const nuevaVentaPed = new VentaPed({
            idPedido, // Usa el idPedido generado
            metodoPago: req.body.metodoPago,
            nombreProducto: req.body.nombreProducto,
            estadoPedido: req.body.estadoPedido,
            fechaPedido: req.body.fechaPedido,
            fechaVentaPedido: req.body.fechaVentaPedido,
            precioTotalPedido: req.body.precioTotalPedido,
            cantidadProducto: req.body.cantidadProducto,
            precioUnitario: req.body.precioUnitario
        });

        // Guarda la nueva venta en la base de datos
        await nuevaVentaPed.save();

        // Redirecciona a una página de éxito o a donde desees después de crear la venta
        const ventas = await VentaPed.find({});
        res.render("../views/ventas/ventas.ejs", { ventas });
        console.log("Venta registrada", nuevaVentaPed);
    } catch (error) {
        console.log("Error al registrar venta:", error.message);
        res.status(500).send("Error de datos");
    }
});

// Ruta para actualizar el estado del interruptor
router.post('/updateEstadoVenta', async (req, res) => {
    try {
        const ventaId = req.body.ventaId; // ID de la venta
        const nuevoEstado = req.body.nuevoEstado; // Nuevo estado como cadena ('Habilitado' o 'Deshabilitado', por ejemplo)

        // Actualiza el estado en la base de datos
        // Reemplaza 'TuModelo' con el nombre correcto de tu modelo de datos
        const result = await VentaPed.findByIdAndUpdate(
            ventaId,
            { $set: { estadoVenta: nuevoEstado } }, // Actualiza el campo 'estadoPedido'
            { new: true } // Esto devuelve el documento actualizado
        );

        if (!result) {
            return res.status(404).send('Venta no encontrada');
        }

        res.status(200).send('Estado actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        res.status(500).send('Error al actualizar el estado');
    }
});


// Ruta para eliminar una venta por su ID
router.get("/deleteVenta/:id", isAuthenticated, async (req, res, next) => {
    try {
        const ventaId = req.params.id;

        // Utiliza el modelo VentaPed y el método findByIdAndRemove para eliminar la venta por su ID
        const deletedVenta = await VentaPed.findByIdAndRemove(ventaId);

        if (!deletedVenta) {
            return res.status(404).send("Venta no encontrada");
        }

        // Redirecciona a una página de éxito o a donde desees después de eliminar la venta
        const ventas = await VentaPed.find({});
        res.render("../views/ventas/ventas.ejs", { ventas });
        console.log("Venta eliminada:", deletedVenta);
    } catch (error) {
        console.log("Error al eliminar venta:", error.message);
        res.status(500).send("Error de datos");
    }
});


// Ruta para buscar ventas en función de un término de búsqueda
router.get('/buscarVentas', async (req, res) => {
    try {
        const terminoBusqueda = req.query.termino; // Obtén el término de búsqueda de la consulta

        // Realiza una búsqueda en la base de datos en función del término de búsqueda
        const ventasEncontradas = await VentaPed.find({ nombreProducto: { $regex: terminoBusqueda, $options: 'i' } });

        // Envía los resultados de la búsqueda como respuesta
        res.json({ ventas: ventasEncontradas });
    } catch (error) {
        console.error('Error al buscar ventas:', error);
        res.status(500).send('Error al buscar ventas');
    }
});



const PDFDocument = require('pdfkit');
const fs = require('fs');
const ventaPed = require('../models/ventaPed');

router.get('/generar-informe-pdf', async (req, res) => {
    try {
        // Consulta los datos de ventas desde tu base de datos o desde donde los almacenes
        const ventas = await ventaPed.find({}).lean();

        // Crea un nuevo documento PDF
        const doc = new PDFDocument();
        const pdfStream = fs.createWriteStream('informe-ventas.pdf');

        // Configura el encabezado del documento PDF
        doc
            .font('Helvetica-Bold')
            .fontSize(24)
            .text('Informe de Ventas', { align: 'center' })
            .moveDown(1);

        // Agrega el contenido del informe (tabla de ventas)
        // Define las columnas que deseas mostrar en el informe
        const columnas = [
            'D Venta',
            'ID Pedido',
            'Método de Pago',
            'Nombre del Producto',
            'Estado del Pedido',
            'Fecha del Pedido',
            'Fecha de Venta del Pedido',
            'Precio Total del Pedido',
            'Cantidad de Producto',
            'Precio Unitario',
        ];

        // Crea la cabecera de la tabla
        doc
            .font('Helvetica')
            .fontSize(12)
            .text(columnas.join(' | '), { align: 'left' })
            .moveDown(0.5);

        // Recorre tus datos de ventas y agrégalos al informe
        ventas.forEach((venta) => {
            // Mapea los campos de la venta a las columnas correspondientes
            const fila = [
                venta._id || '-',
                venta.idPedido || '-',
                venta.metodoPago || '-',
                venta.nombreProducto || '-',
                venta.estadoPedido || '-',
                venta.fechaPedido || '-',
                venta.fechaVentaPedido || '-',
                venta.precioTotalPedido || '-',
                venta.cantidadProducto || '-',
                venta.precioUnitario || '-',
            ];

            // Agrega la fila al informe
            doc.text(fila.join(' | '), { align: 'left' }).moveDown(0.3);
        });

        // Finaliza el documento
        doc.end();

        // Envía el documento PDF como descarga
        pdfStream.on('finish', () => {
            res.download('informe-ventas.pdf', 'informe-ventas.pdf');
        });

        // Pipe el documento PDF al archivo de salida
        doc.pipe(pdfStream);
    } catch (error) {
        console.error('Error al generar el informe en PDF:', error);
        res.status(500).send('Error al generar el informe en PDF');
    }
});

module.exports = router;






// middleware
function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;