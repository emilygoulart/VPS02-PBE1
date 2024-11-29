const con = require('../connect');
const create = (req, res) => {
    const { nome, pagamento } = req.body;
    con.query('INSERT INTO clientes (nome, pagamento) VALUES (?, ?)',
        [nome, pagamento],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ id: result.insertId, nome, pagamento });
        });
}
const read = (req, res) => {
    con.query('SELECT * FROM clientes', 
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(result);
        }
    );
}

const update = (req, res) => {
    const { nome, pagamento, idcliente } = req.body;
    con.query(`UPDATE clientes SET nome = ?, pagamento = ? WHERE idcliente = ?`,
        [nome, pagamento, idcliente],
        (err, result) => {
            if (err) {
                res.status(500).json({ mensagem: 'Erro ao atualizar clientes', erro: err });
            } else {
                res.status(202).json(result);
            }
        });
};

const del = (req, res) => {
    con.query('DELETE FROM clientes WHERE idcliente=?', req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: 'Erro ao buscar clientes', erro: err });
        } else {
            res.status(204).json(result);
        }
    });
};

module.exports = { create, read, update, del};