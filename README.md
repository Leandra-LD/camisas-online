# Camisas Online 👕

Site de e-commerce fictício desenvolvido como trabalho acadêmico para a disciplina de **Desenvolvimento Web** da **Universidade Estácio de Sá**.

---

## Sobre o Projeto

**Camisas Online** é uma loja virtual simulada de camisas. O site apresenta catálogo de produtos, galeria de fotos, carrinho de compras, lista de favoritos e formulário de contato — tudo funcionando no navegador, sem necessidade de servidor.

> Este projeto é fictício e foi criado exclusivamente para fins acadêmicos. Todos os produtos, preços, pessoas e informações de contato são inventados.

---

## Páginas

| Página | Descrição |
|--------|-----------|
| `index.html` | Página inicial com banner, categorias e produtos em destaque |
| `pages/produtos.html` | Catálogo completo com filtros por categoria, tamanho e preço |
| `pages/galeria.html` | Galeria de fotos com lightbox e filtro por categoria |
| `pages/favoritos.html` | Lista de produtos salvos pelo usuário |
| `pages/carrinho.html` | Carrinho de compras com cupons e resumo do pedido |
| `pages/sobre.html` | Apresentação da empresa fictícia |
| `pages/contato.html` | Formulário de contato com validação |

---

## Funcionalidades

- Catálogo com 11 produtos em 5 categorias (Casual, Social, Polo, Estampada, Esporte)
- Filtros por categoria, tamanho, faixa de preço e ordenação
- Busca global que funciona entre páginas
- Seleção de tamanho diretamente no card do produto (PP, P, M, G, GG)
- Carrinho de compras com controle de quantidade e persistência no navegador
- Sistema de cupons de desconto (`ESTACIO10`, `WEB20`, `PROMO15`)
- Lista de favoritos persistida no navegador
- Galeria com lightbox e navegação por teclado (← → ESC)
- Design responsivo para celular, tablet e desktop
- Notificações visuais (toast) para ações do usuário

---

## Tecnologias Utilizadas

- **HTML5** — estrutura semântica das páginas
- **CSS3** — layout com Flexbox e Grid, variáveis CSS, animações e responsividade
- **JavaScript** — interatividade, localStorage/sessionStorage, filtros e validações
- **PHP** — processamento de formulários e integração com banco de dados
- **Font Awesome 6.4** — ícones vetoriais

---

## Estrutura de Pastas

```
Camisas online/
├── index.html              ← Página inicial
├── pages/                  ← Páginas internas
│   ├── produtos.html
│   ├── galeria.html
│   ├── favoritos.html
│   ├── carrinho.html
│   ├── sobre.html
│   └── contato.html
├── css/
│   └── style.css
├── js/
│   ├── main.js             ← Dados dos produtos e funções gerais
│   └── carrinho.js         ← Lógica do carrinho de compras
├── images/                 ← Fotos dos produtos
├── php/                    ← Scripts de back-end
└── relatorio/
    └── relatorio.html      ← Documentação técnica do projeto
```

---

## Como Abrir

Basta abrir o arquivo `index.html` em qualquer navegador. Não é necessário instalar nada.

---

## Informações Acadêmicas

| | |
|---|---|
| **Aluna** | Leandra Carreiro Silva Justino |
| **RA** | 202508166267 |
| **Disciplina** | Desenvolvimento Web |
| **Professor** | Paulo Cruz |
| **Instituição** | Universidade Estácio de Sá |
| **Ano** | 2026 |
