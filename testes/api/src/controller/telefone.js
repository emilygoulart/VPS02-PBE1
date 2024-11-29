    const con = require('../connect');
    const create = (req, res) => {
        const { numero, idcliente, idforn } = req.body;
        con.query('INSERT INTO telefone (numero, idcliente, idforn) VALUES (?, ?, ?)',
            [numero, idcliente, idforn],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.status(201).json({ id: result.insertId, numero, idcliente, idforn });
            });
    }
    const read = (req, res) => {
        con.query('SELECT * FROM telefone', 
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.status(200).json(result);
            }
        );
    }

    const update = (req, res) => {
        const { idtelefone, numero, idcliente, idforn } = req.body;
        con.query(`UPDATE telefone SET numero = ?, idcliente = ?, idforn = ? WHERE idtelefone = ?`,
            [idtelefone, numero, idcliente, idforn],
            (err, result) => {
                if (err) {
                    res.status(500).json({ mensagem: 'Erro ao atualizar telefone', erro: err });
                } else {
                    res.status(202).json(result);
                }
            });
    };

    const del = (req, res) => {
        con.query('DELETE FROM telefone WHERE idtelefone=?', req.params.id, (err, result) => {
            if (err) {
                res.status(500).json({ mensagem: 'Erro ao buscar telefone', erro: err });
            } else {
                res.status(204).json(result);
            }
        });
    };

    module.exports = { create, read, update, del};