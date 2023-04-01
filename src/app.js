import express from 'express'
import { pool } from './db.js'
import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
const app = express()//llamo de express

app.use(cors())
app.use(express.static("frontend"));
//prueba
app.get('/busqueda', async (req, res) => {//ruta / hago consulta para ver usuarios y devuelvo json
  const [rows] = await pool.query('SELECT * FROM users')
  res.json(rows)
})

app.get('/ping', async (req, res) => {//rita /ping devuelvo texto de prueba
  const [result] = await pool.query(`SELECT "hello world" as RESULT`);
  res.json(result[0])
})

app.get('/create', async (req, res) => {//crea usuario
  const result = await pool.query('INSERT INTO users(name) VALUES ("John")')
  res.json(result)
})

app.listen(process.env.PORT)//pongo a escuchar en el puerto
console.log('Server on port', process.env.PORT)
