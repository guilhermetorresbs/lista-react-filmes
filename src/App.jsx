
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [filmes, setFilmes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await fetch('http://localhost:3000/api/filmes')

        if (!resposta.ok) {
          throw new Error('Erro ao consultar filmes')
        }

        const dados = await resposta.json()
        setFilmes(dados)
      } catch (erro) {
        setErro(erro.message)
      } finally {
        setCarregando(false)
      }
    }

    buscarFilmes()
  }, [])

  return (
    <main className="container">
      <header className="cabecalho">
        <h1>Lista de Filmes</h1>
        <p>Filmes carregados através de uma API usando React.</p>
      </header>

      {carregando && (
        <p className="mensagem">Carregando filmes...</p>
      )}

      {erro && (
        <p className="mensagem erro">
          Não foi possível carregar os filmes: {erro}
        </p>
      )}

      {!carregando && !erro && filmes.length === 0 && (
        <p className="mensagem">Nenhum filme encontrado.</p>
      )}

      {!carregando && !erro && filmes.length > 0 && (
        <section className="lista">
          {filmes.map((filme) => (
            <article className="filme" key={filme.id}>
              <span className="numero">{filme.id}</span>
              <h2>{filme.titulo || filme.nome || filme.title}</h2>
            </article>
          ))}
        </section>
      )}

      <footer>
        <p>Exemplo desenvolvido com React, useState, useEffect e fetch.</p>
      </footer>
    </main>
  )
}

export default App
