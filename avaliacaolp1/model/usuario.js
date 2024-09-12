const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    usuario: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, select: false },
});

const UsuarioModel = mongoose.model('Usuarios', UsuariosSchema);

module.exports = UsuarioModel;