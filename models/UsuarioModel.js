const db = require("../config/database");

const criarUsario = async (

    nome,
    login,
    senha
) => {
    const sql = `INSERT INTO
                  usuarios(nome,login,senha)
                 VALUES(?,?,?)`;
    
    const [resultado] = await db.execute(sql, [nome, login, senha]);
    return resultado;            

}
