require("dotenv").config();
const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const handDBError = (res, error) => {
  console.error("Error de acceso a la BD:", error);
  res.status(500).json({ error: "Database error" });
};

app.get("/api/vehiculos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM vehiculos");
    res.status(200).json(rows);
  } catch (error) {
    handDBError(res, error);
  }
});

app.get("/api/vehiculos/:marca", async (req, res) => {
  try {
    const {marca}=req.params;//URL
    const [rows] = await pool.query("SELECT * FROM vehiculos where marca=?",[marca]);
    if(rows.length===0){
      return res.status(404).json({message:"Vehiculo no encontrado"});
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    handDBError(res, error);
  }
});

app.post("/api/vehiculos", async (req, res) => {
  const { marca, modelo, color, precio, placa } = req.body;

  //todos los datos son obligatorios
  if (!marca || !modelo || !color || !precio || !placa) {
    //no se podra realizar el registro
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO VEHICULOS (marca, modelo, color,precio,placa) VALUES (?, ?, ?, ?, ?)",
      [marca, modelo, color, precio, placa ]
    );

    //obtenemos el pk generado
    const id=result.insertId;
    res.status(201).json({'id':id});
  } catch (error) {
    if(error.code==="ER_DUP_ENTRY"){
      return res.status(409).json({error:"Placa ya registrada"});
    }
    handDBError(res, error);
  }
});

app.put("/api/vehiculos/:id", async (req, res) => {
  const {id}=req.params;//URL
  const { marca, modelo, color, precio, placa } = req.body; //JSON

  //todos los datos son obligatorios
  if (!marca || !modelo || !color || !precio || !placa) {
    //no se podra realizar el registro
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  try {
    const [result] = await pool.query(
      "UPDATE VEHICULOS SET marca=?, modelo=?, color=?,precio=?,placa=? WHERE id=?",
      [marca, modelo, color, precio, placa, id]
    );

    if(result.affectedRows===0){
      return res.status(404).json({success:false,message:"Vehiculo no encontrado"});
    }
    res.status(200).json({success:true,message:"Vehiculo actualizado"});
  } catch (error) {
    if(error.code==="ER_DUP_ENTRY"){
      return res.status(409).json({error:"Placa ya registrada"});
    }
    handDBError(res, error);
  }
});

app.delete("/api/vehiculos/:id", async (req, res) => {
  const {id}=req.params;//URL
  try {
    const [result] = await pool.query(
      "DELETE FROM VEHICULOS WHERE id=?",
      [id]
    );
    if(result.affectedRows===0){
      return res.status(404).json({success:false,message:"Vehiculo no encontrado"});
    }
    res.status(200).json({success:true,message:"Vehiculo eliminado"});
  } catch (error) {
    handDBError(res, error);
  }
});
//Iniciar nuestro servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
