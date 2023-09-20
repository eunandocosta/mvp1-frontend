import React, { useState } from "react"

const Inserir = (props) => {
  const [dados, setDados] = useState({
    imagem: "",
    nome: "",
    autor: "",
    descricao: "",
    valor: 0,
    estoque: 0
  });

  console.log(dados)

  const handleSubmit = e => {
    e.preventDefault();

    const novoProduto = dados

    fetch("http://localhost:5000/produto/inserir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoProduto)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Erro ao enviar dados: ", error);
    });
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <div className="container">
      <h1 className="title">Inserir Produto</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formGap">
          <label className="submitLabel" htmlFor="imagem">Imagem:</label>
          <input className="inputInsert" type="text" name="imagem" id="imagem" onChange={handleChange} />
        </div>
        <div className="formGap">
          <label className="submitLabel" htmlFor="nome">Nome:</label>
          <input className="inputInsert" type="text" name="nome" id="nome" onChange={handleChange} />
        </div>
        <div className="formGap">
          <label className="submitLabel" htmlFor="autor">Autor:</label>
          <input className="inputInsert" type="text" name="autor" id="autor" onChange={handleChange} />
        </div>
        <div className="formGap">
          <label className="submitLabel" htmlFor="descricao">Descrição:</label>
          <input className="inputInsert" type="text" name="descricao" id="descricao" onChange={handleChange} />
        </div>
        <div className="formGap">
          <label className="submitLabel" htmlFor="valor">Valor:</label>
          <input className="inputInsert"  step="0.01" type="number" name="valor" id="valor" onChange={handleChange} />
        </div>
        <div className="formGap">
          <label className="submitLabel" htmlFor="estoque">Estoque:</label>
          <input className="inputInsert"  step="1" type="number" name="estoque" id="estoque" onChange={handleChange} />
        </div>
        <input  className='submitBtn' type="submit" value="Inserir" />
      </form>
    </div>
  );
};

export default Inserir;
