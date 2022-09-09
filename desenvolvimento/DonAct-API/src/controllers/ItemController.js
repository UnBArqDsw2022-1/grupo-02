const Item = require('../models/ItemModel.js');


module.exports = {
    cadastrar: async (req, res) => {

        try {
            await Item.create(req.body)
            res.send("Item criado com sucesso!")


        } catch (err) {
            res.status(400).send({ error: err.message })
        }

    },

    mostrar: async (req, res) => {
        try {
            const item = await Item.findAll();
            if (item.length > 0) {
                res.status(200).send({ item });
            }
            else
                res.status(400).send({ error: "Sem itens!" });
        } catch (err) {
            res.status(400).send({ error: err.message });

        }

    },

    mostrarId: async (req, res) => {

        try {
            const item = await Item.findByPk(req.params.id)
            if (item.length > 0) {
                res.status(200).send({ item });
            }
            else
                res.status(400).send({ erro: 'Item não existente' })

        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },

    editar: async (req, res) => {

        try {
            const item = await Item.findByPk(req.params.id)
            if (item.length > 0) {
                await Item.update(
                    {
                        "quantidade": req.body.quantidade,
                        "descrição": req.body.descricao,
                        "foto": req.body.foto,
                        "nome": req.body.nome,
                    },
                    {
                        where: { "id": req.params.id },
                        truncate: false,
                    });
                res.status(200).send("Item editado com sucesso!");
            }
            else {
                res.status(404).send({ error: 'Item não encontrado' })
            }


        } catch (err) {
            res.status(400).send({ error: err.message });

        }
    },

    deletar: async (req, res) => {

        try {
            const item = await Item.findByPk(req.params.id)
            if (item.length > 0) {
                await Item.destroy({
                    where: { "id": req.params.id },
                    truncate: false,
                }, res.send("Deletado com sucesso"))
            }
            else {
                res.status(404).send({ error: 'Item não encontrado' })
            }

        } catch (err) {

            res.status(400).send({ error: err.message });

        }
    },

}