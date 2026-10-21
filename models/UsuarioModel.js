const bd = require("../config/database");

const criarUsuario = async (
    nome,
    email,
    telefone,
    cep,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    login,
    senha
) =>  { 
    const sql = 
        INSERT INTO usuarios
        (
                nome,
                email,
                telefone,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                login,
                senha
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const [resultado] = await db.execute(sql, [
                nome,
                email,
                telefone,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                login,
                senha
            ] ) ;

            return resultado;
);

const buscarUsuarios = async () => {

    const sql = `
            SELECT
                id_usuario,
                nome,
                email,
                telefone,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                login,
            FROM usuarios
        `;

        const [usuarios] = await db.execute (sql);

        return usuarios;
);

const buscarPorLogin = async (login) => {

    const sql = `
        SELECT *
        FROM usuarios
        WHERE login = ?
    `;

    const [usuarios] = await db.execute (sql, [login]);

    return usuarios[0];
};


module.exports = {
    criarUsuario,
    buscarUsuarios,
    buscarPorLogin
};
                
            
    
