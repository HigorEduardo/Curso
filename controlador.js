const {client} = require('./db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const listUsers = async (req, res) => {
    res.send('lista de usuario')
}
const createUser = async (req, res) => {
    try {
        const{nome, email, senha} = req.body
        const senhacriptografada = await bcryptjs.hashSync(senha, 10)
        const sql = `INSERT INTO usuarios (nome, email, senha) VALUES  ($1, $2, $3) RETURNING *`
        const dados = await client.query(sql, [nome, email, senhacriptografada])
        res.status(201).json({msg:'O user foi criado com sucesso'})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:'Erro ao criar o user'})
    }
}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const{nome, email} = req.body;
        const sql = `UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING*`
        const dados = await client.query(sql, [nome, email, id])
        res.status(201).json({msg:'O user foi atualizado com sucesso'})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:'Erro ao atualizar o user'})
    }
}
const deleteUser = async (req, res) => {
    try{
    res.send('deleta usuarios')
    const id = req.params.id;
    const sql = `DELETE FROM usuarios WHERE  ID = $1`
    const dados = await client.query(sql, [id])
    res.status(200).json({msg:'O usuario doi deletado'})
} catch(err){
    console.log(err)
    res.status(500).json({msg:'Erro ao deletar o user'})
    }
}

const login = async (req, res) => {
    try {
        const{email, senha} = req.body;
        const usuario = await client.query(sql, [email])
        const sql = 'SELECT * FROM  usuarios WHERE email = $1'
        console.log(usuario.rows[0])
        const validPassword = bcrypt.compareSync(senha, usuario.rows[0].senha)
        res.send(500)
    } catch (err) {
        console.log(err)
        res.send(500)
    }
}

const getUser = async (req, res) => {
    res.send('pega usuarios')
}


module.exports = { listUsers, createUser, updateUser, deleteUser, getUser, login};