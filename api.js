const http = require('http')

const filmes = [
  { id: 1, titulo: 'Interestelar' },
  { id: 2, titulo: 'O Senhor dos Anéis' },
  { id: 3, titulo: 'De Volta para o Futuro' },
  { id: 4, titulo: 'Homem-Aranha' }
]

const servidor = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')

  if (req.url === '/api/filmes' && req.method === 'GET') {
    res.writeHead(200)
    res.end(JSON.stringify(filmes))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ erro: 'Rota nao encontrada' }))
  }
})

servidor.listen(3000, () => {
  console.log('API funcionando em http://localhost:3000')
})