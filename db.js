const {Client} = require('pg')

const client = new Client ({
    host:process.env.host,
    port:process.env.port,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

const connectDB = async () =>{
    client
    .connect()
    .then(() => {
        console.log('a conexão funcionou');
    }).catch((err) => {
        console.error('erro ao conectar na db')
    });
};


const setup = async(req, res) => {
    try {
        const data = await client.query('CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nome VARCHAR(100), email VARCHAR(100), senha VARCHAR(100))')
        res.status(200).json({msg:'A TABELA CRIADA'})
    } catch (err){
        console.log('erro ao criar a tabela')
        res.status(500)
    }
}
module.exports = {connectDB, setup, client}