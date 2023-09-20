import React, { useState, useEffect } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Produto = (props) => {
    const [dados, setDados] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetch("http://localhost:5000/produto/exibir", {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            setDados(data.dados)
        })
        .catch(err => {
            console.error('Erro em buscar dados para exibição: ', err)
        })
    }, []);

    function handleDelete(nome){
        fetch(`http://localhost:5000/produto/deletar/${nome}`,{
            method: 'DELETE',
        })
        .then(response => {
            console.log(response)
            if (response.status === 200){
                console.log('Exclusão bem sucedida')
            } else {
                console.error('Erro ao excluir produto de nome ', nome)
            }
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação de exclusão para ', nome, ' Erro ->', error);
        })
    }

    function handleEstoque(nome, novoEstoque){
        console.log('JSON enviado:', JSON.stringify({ novoEstoque }));
        fetch(`http://localhost:5000/produto/estoque/${nome}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', // Indica que estamos enviando dados JSON
            },
            body: JSON.stringify({ "novoEstoque": novoEstoque })
        })
        .then(response => {
            console.log(novoEstoque)
            if (response.status === 200){
                console.log('Estoque modificado para ', novoEstoque)

                const novosDados = dados.map(produto => {
                    if (produto.nome === nome){
                        return { ...produto, estoque: novoEstoque };
                    }
                    return produto
                })
                setDados(novosDados)
            } else {
                console.error('Erro modificar o estoque do produto')
            }
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação de modificação para ', nome, ' Erro ->', error);
        })
    }


    function card(dados, searchQuery){
        const filterQuery = dados.filter((produto=>
            produto.nome.toLowerCase().includes(searchQuery.toLowerCase())))
        return(
            <>
                {filterQuery.map((produto)=>(
                    <div className="card" key={produto.nome}>
                        <img src={produto.imagem} alt={produto.descricao}/>
                        <div className="bottom">
                            <h3 className="productName">{produto.nome}</h3>
                            <p className="productAuthor">Escrito por <b>{produto.autor}</b></p>
                            <h4 className="productValue">R$ {produto.valor}</h4>
                            <p>{produto.descricao}</p>
                            <p style={{fontSize: '12px', color: 'red'}}>
                                Quantidade em estoque: <b>{produto.estoque}</b>
                            </p>
                        </div>
                        <div className="estoqueButton">
                            <div className="plusButton" 
                            onClick={e=>handleEstoque(produto.nome, produto.estoque+=1)}> <AddIcon/> </div>
                            <div className="minusButton" 
                            onClick={e=>handleEstoque(produto.nome, produto.estoque-=1)}> <RemoveIcon/> </div>
                        </div>
                        <div className="deleteButton" onClick={e=>handleDelete(produto.nome)}>
                            <DeleteIcon/>
                        </div>
                    </div>
                ))}
            </>
    )}
  return (
    <div className="container">
        <h1 className="title">Resultados</h1>
        <input className="searchBar" name="searchBar" placeholder="Pesquisa" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
        {card(dados,searchQuery)}
    </div>
  )
};

export default Produto;
