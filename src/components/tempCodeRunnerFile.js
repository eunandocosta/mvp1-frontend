import React, { useState } from "react"

const Inserir = (props) => {
  const [dados, setDados] = useState({
    imagem: "",
    nome: "",
    descricao: "",
    valor: 0
  })

  const handleSubmit = e => {
    e.preventDefault()

    fetch("http://localhost:5000/inserir_produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    .then((response)=>response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error)=>{
      console.error("Erro ao enviar dados: ", error)
    })
  }

  const handleChange = e => {
    const {name, value} = e.target
    setDados({...dados, [name]: value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imagem">Imagem:</label>
        <input type="text" name="imagem" id="imagem" onChange={handleChange} />
        <label htmlFor="nome">Nome:</label>
        <input type="text" name="nome" id="nome" onChange={handleChange} />
        <label htmlFor="descricao">Descrição:</label>
        <input type="text" name="descricao" id="descricao" onChange={handleChange} />
        <label htmlFor="valor">Valor:</label>
        <input type="number" name="valor" id="valor" onChange={handleChange} />
        <input type="submit" value="Inserir" />
      </form>
    </div>
  );
};

export default Inserir;
