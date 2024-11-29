const con = require('../connect');
const create = (req, res) => {
    const { nome, cnpj, email } = req.body;
    con.query('INSERT INTO fornecedores (nome, cnpj, email) VALUES (?, ?, ?)',
        [nome, cnpj, email],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ id: result.insertId, nome, cnpj, email });
        });
}
const read = (req, res) => {
    con.query('SELECT * FROM fornecedores', 
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(result);
        }
    );
}

const update = (req, res) => {
    const {nome, cnpj, email} = req.body;
    con.query(`UPDATE fornecedores SET nome = ?, cnpj = ?, email = ?`,
        [nome, cnpj, email],
        (err, result) => {
            if (err) {
                res.status(500).json({ mensagem: 'Erro ao atualizar fornecedores', erro: err });
            } else {
                res.status(202).json(result);
            }
        });
};

const del = (req, res) => {
    con.query('DELETE FROM fornecedores WHERE idforn=?', req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: 'Erro ao buscar clientes', erro: err });
        } else {
            res.status(204).json(result);
        }
    });
};

module.exports = { create, read, update, del};