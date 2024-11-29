const con = require('../connect');
const create = (req, res) => {
    const { idcliente, idprod, idtelefone, datalancamento, total } = req.body;
    con.query('INSERT INTO pedidos (idcliente, idprod, idtelefone, datalancamento, total) VALUES (?, ?, ?, ?, ?)'
        [idcliente, idprod, idtelefone, datalancamento, total],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({id: result.insertId, idcliente, idprod, idtelefone, datalancamento, total});
        });
}

const read = (req, res) => {
    con.query('SELECT * FROM pedidos', 
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(result);
        }
    );
}

const update = (req, res) => {
    const { idcliente, idprod, idtelefone, datalancamento, total, idpedido } = req.body;
    con.query(`UPDATE pedidos SET idcliente = ?, idprod = ?, idtelefone = ?, datalancamento = ?, total = ? WHERE idpedido = ?`,
        [idcliente, idprod, idtelefone, datalancamento, total, idpedido],
        (err, result) => {
            if (err) {
                res.status(500).json({ mensagem: 'Erro ao atualizar pedidos', erro: err });
            } else {
                res.status(202).json(result);
            }
        });
};

const del = (req, res) => {
    con.query('DELETE FROM pedidos WHERE idpedido=?', req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: 'Erro ao buscar pedidos', erro: err });
        } else {
            res.status(204).json(result);
        }
    });
};

module.exports = { create, read, update, del};