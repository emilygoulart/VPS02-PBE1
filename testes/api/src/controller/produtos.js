const con = require('../connect');
const create = (req, res) => {
    const { descricao, preco, nome, validade, idforn } = req.body;
    con.query('INSERT INTO produtos (descricao, preco, nome, validade, idforn) VALUES (?, ?, ?, ?, ?)',
        [descricao, preco , nome, validade, idforn],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ id: result.insertId, descricao, preco , nome, validade, idforn });
        });
}
const read = (req, res) => {
    con.query('SELECT * FROM produtos', 
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(result);
        }
    );
}

const update = (req, res) => {
    const { descricao, preco, nome, validade, idprod } = req.body;
    con.query(`UPDATE produtos SET descricao = ?, preco = ?, nome = ?, validade = ? WHERE idprod = ?`,
        [descricao, preco, nome, validade, idprod],
        (err, result) => {
            if (err) {
                res.status(500).json({ mensagem: 'Erro ao atualizar cliente', erro: err });
            } else {
                res.status(202).json(result);
            }
        });
};

const del = (req, res) => {
    con.query('DELETE FROM produtos WHERE idprod=?', req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: 'Erro ao buscar produtos', erro: err });
        } else {
            res.status(204).json(result);
        }
    });
};

module.exports = { create, read, update, del};