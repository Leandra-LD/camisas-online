/* ============================================================
   CAMISAS ONLINE — main.js
   Dados dos produtos + funções de renderização
   ============================================================ */

const PRODUTOS = [
  {
    id: 1,
    nome: "Camisa Casual Branca Premium",
    categoria: "casual",
    preco: 89.90,
    precoDe: 119.90,
    imagem: "camisa-casual-branca-premium.jpg",
    avaliacao: 4.8,
    avaliacoes: 124,
    tag: "destaque",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Camisa casual 100% algodão, perfeita para o dia a dia."
  },
  {
    id: 2,
    nome: "Camisa Social Slim",
    categoria: "social",
    preco: 129.90,
    precoDe: 169.90,
    imagem: "camisa-social-slim.jpg",
    avaliacao: 4.9,
    avaliacoes: 87,
    tag: "novo",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Camisa social azul slim fit ideal para trabalho e eventos formais."
  },
  {
    id: 3,
    nome: "Polo Premium",
    categoria: "polo",
    preco: 99.90,
    precoDe: 139.90,
    imagem: "polo-classica.jpg",
    avaliacao: 4.7,
    avaliacoes: 56,
    tag: "oferta",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Polo premium com listras, tecido respirável e confortável."
  },
  {
    id: 4,
    nome: "Camisa Estampada",
    categoria: "estampada",
    preco: 79.90,
    precoDe: 109.90,
    imagem: "camisa-estampada.jpg",
    avaliacao: 4.5,
    avaliacoes: 203,
    tag: "destaque",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Estampada tropical vibrante, perfeita para o verão."
  },
  {
    id: 6,
    nome: "Camisa Casual",
    categoria: "casual",
    preco: 94.90,
    precoDe: 124.90,
    imagem: "camisa-casual.jpg",
    avaliacao: 4.7,
    avaliacoes: 78,
    tag: "novo",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Listras modernas em tecido macio e durável."
  },
  {
    id: 7,
    nome: "Camisa Esportiva Dry-Fit",
    categoria: "esporte",
    preco: 69.90,
    precoDe: 99.90,
    imagem: "camisa-esportiva-dry-fit.jpg",
    avaliacao: 4.6,
    avaliacoes: 145,
    tag: "destaque",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Tecnologia dry-fit para máximo desempenho nos treinos."
  },
  {
    id: 8,
    nome: "Polo Clássica",
    categoria: "polo",
    preco: 109.90,
    precoDe: 149.90,
    imagem: "polo-premium.jpg",
    avaliacao: 4.8,
    avaliacoes: 91,
    tag: "novo",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Polo clássica com acabamento elegante e confortável."
  },
  {
    id: 9,
    nome: "Camisa Estampada com Letras",
    categoria: "estampada",
    preco: 84.90,
    precoDe: 114.90,
    imagem: "camisa-estampada-com-letras.jpg",
    avaliacao: 4.4,
    avaliacoes: 66,
    tag: "oferta",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Estampas coloridas e únicas, para quem ama se destacar."
  },
  {
    id: 10,
    nome: "Camisa Casual Branca",
    categoria: "casual",
    preco: 74.90,
    precoDe: 99.90,
    imagem: "camisa-casual-branca.jpg",
    avaliacao: 4.6,
    avaliacoes: 189,
    tag: "destaque",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Clássica camisa branca, combina com tudo."
  },
  {
    id: 11,
    nome: "Camisa Social Xadrez",
    categoria: "social",
    preco: 119.90,
    precoDe: 159.90,
    imagem: "camisa-social-xadrez.jpg",
    avaliacao: 4.7,
    avaliacoes: 54,
    tag: "novo",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Xadrez clássico em corte social com toque moderno."
  },
  {
    id: 12,
    nome: "Camisa Simples",
    categoria: "casual",
    preco: 79.90,
    precoDe: 109.90,
    imagem: "camisa-simples.jpg",
    avaliacao: 4.5,
    avaliacoes: 230,
    tag: "oferta",
    tamanhos: ["PP","P","M","G","GG"],
    descricao: "Modelo simples e versátil para o dia a dia."
  }
];

/* ── MAPA DE CAMINHOS (ROOT vs /pages/) ──────────────────── */
function ePagina() {
  return window.location.pathname.includes('/pages/');
}
function prefixo() {
  return ePagina() ? '../' : '';
}

/* ── GERAÇÃO DE ESTRELAS ─────────────────────────────────── */
function gerarEstrelas(nota) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(nota)) html += '<i class="fas fa-star"></i>';
    else if (i - nota < 1)     html += '<i class="fas fa-star-half-alt"></i>';
    else                        html += '<i class="far fa-star"></i>';
  }
  return html;
}

/* ── FORMATAR PREÇO ──────────────────────────────────────── */
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ── HTML DO CARD ────────────────────────────────────────── */
function criarCardProduto(p) {
  const tags = { oferta:'OFERTA', novo:'NOVO', destaque:'DESTAQUE' };
  const clsTags = { oferta:'oferta', novo:'novo', destaque:'destaque' };
  const tamSelecionado = p.tamanhos[1] || p.tamanhos[0];
  const botoesTom = p.tamanhos.map(t => `
    <button class="btn-tam-card${t === tamSelecionado ? ' sel' : ''}"
      onclick="selecionarTamCard(this, ${p.id})" data-tam="${t}">${t}</button>
  `).join('');
  return `
  <div class="card-produto" data-id="${p.id}" data-tam-sel="${tamSelecionado}">
    <span class="tag-produto ${clsTags[p.tag]}">${tags[p.tag]}</span>
    <div class="produto-foto-wrap">
      <img class="produto-foto" src="${prefixo()}images/${p.imagem}" alt="${p.nome}" loading="lazy" />
    </div>
    <div class="produto-corpo">
      <p class="produto-cat">${p.categoria}</p>
      <h3 class="produto-nome">${p.nome}</h3>
      <div class="estrelas">
        ${gerarEstrelas(p.avaliacao)}
        <span class="nota-num">${p.avaliacao.toFixed(1)}</span>
        <span class="separador-av">·</span>
        <span class="qtd-av">${p.avaliacoes} avaliações</span>
      </div>
      <div class="precos">
        <span class="preco-de">${formatarPreco(p.precoDe)}</span>
        <span class="preco-por">${formatarPreco(p.preco)}</span>
      </div>
      <div class="tam-card-wrap">
        <span class="tam-label">Tamanho:</span>
        <div class="tam-card-btns">${botoesTom}</div>
      </div>
      <div class="acoes-produto">
        <button class="btn-add-cart" onclick="adicionarAoCarrinhoComTam(${p.id})">
          <i class="fas fa-cart-plus"></i> Adicionar
        </button>
        <button class="btn-fav" onclick="toggleFavorito(this)" data-id="${p.id}" title="Favoritar">
          <i class="${obterFavoritos().includes(p.id) ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
    </div>
  </div>`;
}

function selecionarTamCard(btn, idProduto) {
  const card = btn.closest('.card-produto');
  card.querySelectorAll('.btn-tam-card').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  card.dataset.tamSel = btn.dataset.tam;
}

function adicionarAoCarrinhoComTam(idProduto) {
  const card = document.querySelector(`.card-produto[data-id="${idProduto}"]`);
  const tam = card ? card.dataset.tamSel : null;
  adicionarAoCarrinho(idProduto, tam);
}

/* ── RENDERIZAR DESTAQUES (index) ────────────────────────── */
function renderizarDestaques() {
  const el = document.getElementById('destaques-grid');
  if (!el) return;
  const dest = PRODUTOS.filter(p => p.tag === 'destaque').slice(0, 4);
  el.innerHTML = dest.map(criarCardProduto).join('');
}

/* ── RENDERIZAR TODOS OS PRODUTOS ────────────────────────── */
let filtroAtivo = { cats: [], tams: [], maxPreco: 9999, busca: '', ordem: 'padrao' };

function renderizarTodos() {
  const el = document.getElementById('lista-produtos');
  if (!el) return;

  let lista = [...PRODUTOS];

  if (filtroAtivo.cats.length) {
    lista = lista.filter(p => filtroAtivo.cats.includes(p.categoria));
  }
  if (filtroAtivo.tams.length) {
    lista = lista.filter(p => p.tamanhos.some(t => filtroAtivo.tams.includes(t)));
  }
  lista = lista.filter(p => p.preco <= filtroAtivo.maxPreco);
  if (filtroAtivo.busca) {
    const q = filtroAtivo.busca.toLowerCase();
    lista = lista.filter(p => p.nome.toLowerCase().includes(q) || p.categoria.includes(q));
  }
  if (filtroAtivo.ordem === 'menor')  lista.sort((a,b) => a.preco - b.preco);
  if (filtroAtivo.ordem === 'maior')  lista.sort((a,b) => b.preco - a.preco);
  if (filtroAtivo.ordem === 'nome')   lista.sort((a,b) => a.nome.localeCompare(b.nome));

  const total = document.getElementById('total-resultados');
  if (total) total.textContent = `${lista.length} produto${lista.length !== 1 ? 's' : ''} encontrado${lista.length !== 1 ? 's' : ''}`;

  el.innerHTML = lista.length
    ? lista.map(criarCardProduto).join('')
    : '<p style="text-align:center;color:#636e72;padding:40px 0">Nenhum produto encontrado com esses filtros.</p>';
}

function aplicarFiltros() {
  const chks = document.querySelectorAll('.grupo-filtro input[type="checkbox"]:checked');
  filtroAtivo.cats = [...chks].map(c => c.value);
  filtroAtivo.maxPreco = parseFloat(document.getElementById('range-preco')?.value || 9999);
  filtroAtivo.ordem = document.getElementById('select-ordem')?.value || 'padrao';
  const busca = document.getElementById('busca-input');
  filtroAtivo.busca = busca ? busca.value.trim() : '';
  renderizarTodos();
}

function selecionarTamanho(btn, tam) {
  btn.classList.toggle('sel');
  if (btn.classList.contains('sel')) {
    filtroAtivo.tams.push(tam);
  } else {
    filtroAtivo.tams = filtroAtivo.tams.filter(t => t !== tam);
  }
  renderizarTodos();
}

function atualizarPreco(val) {
  filtroAtivo.maxPreco = parseFloat(val);
  const span = document.getElementById('preco-display');
  if (span) span.textContent = formatarPreco(parseFloat(val));
  renderizarTodos();
}

function limparFiltros() {
  filtroAtivo = { cats: [], tams: [], maxPreco: 9999, busca: '', ordem: 'padrao' };
  document.querySelectorAll('.grupo-filtro input[type="checkbox"]').forEach(c => c.checked = false);
  document.querySelectorAll('.btn-tamanho').forEach(b => b.classList.remove('sel'));
  const rp = document.getElementById('range-preco');
  if (rp) { rp.value = rp.max; const sp = document.getElementById('preco-display'); if (sp) sp.textContent = formatarPreco(parseFloat(rp.max)); }
  const so = document.getElementById('select-ordem');
  if (so) so.value = 'padrao';
  const bi = document.getElementById('busca-input');
  if (bi) bi.value = '';
  renderizarTodos();
}

function toggleView(modo) {
  const grid = document.getElementById('lista-produtos');
  if (!grid) return;
  if (modo === 'lista') {
    grid.style.gridTemplateColumns = '1fr';
  } else {
    grid.style.gridTemplateColumns = '';
  }
  document.querySelectorAll('.toggle-view button').forEach(b => b.classList.remove('ativo'));
  document.getElementById('btn-' + modo)?.classList.add('ativo');
}

/* ── FAVORITO ────────────────────────────────────────────── */
const CHAVE_FAV = 'camisas_favoritos';

function obterFavoritos() {
  return JSON.parse(localStorage.getItem(CHAVE_FAV) || '[]');
}
function salvarFavoritos(favs) {
  localStorage.setItem(CHAVE_FAV, JSON.stringify(favs));
}

function toggleFavorito(btn) {
  const id = parseInt(btn.dataset.id);
  const ico = btn.querySelector('i');
  const favs = obterFavoritos();
  const idx = favs.indexOf(id);

  if (idx === -1) {
    favs.push(id);
    ico.classList.replace('far', 'fas');
    btn.classList.add('ativo');
    mostrarToast('Adicionado aos favoritos!', 'ok');
  } else {
    favs.splice(idx, 1);
    ico.classList.replace('fas', 'far');
    btn.classList.remove('ativo');
    mostrarToast('Removido dos favoritos.', '');
  }

  salvarFavoritos(favs);
  atualizarBadgeFavoritos();
  if (document.getElementById('lista-favoritos')) renderizarFavoritos();
}

function atualizarBadgeFavoritos() {
  const total = obterFavoritos().length;
  document.querySelectorAll('.badge-favoritos').forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });
}

function renderizarFavoritos() {
  const el = document.getElementById('lista-favoritos');
  const vazio = document.getElementById('favoritos-vazio');
  if (!el) return;
  const favs = obterFavoritos();
  const lista = PRODUTOS.filter(p => favs.includes(p.id));
  if (lista.length === 0) {
    el.innerHTML = '';
    if (vazio) vazio.style.display = 'block';
  } else {
    if (vazio) vazio.style.display = 'none';
    el.innerHTML = lista.map(criarCardProduto).join('');
    // marcar corações como ativos
    el.querySelectorAll('.btn-fav').forEach(btn => {
      btn.querySelector('i').classList.replace('far', 'fas');
      btn.classList.add('ativo');
    });
  }
}

/* ── TOAST ───────────────────────────────────────────────── */
function mostrarToast(msg, tipo = '') {
  const t = document.createElement('div');
  t.className = `toast ${tipo}`;
  t.innerHTML = `<i class="fas fa-${tipo === 'ok' ? 'check-circle' : tipo === 'aviso' ? 'exclamation-circle' : 'info-circle'}"></i> ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* ── ATUALIZAR CONTADOR CARRINHO NO HEADER ───────────────── */
function atualizarBadge() {
  const cart = JSON.parse(localStorage.getItem('camisas_cart') || '[]');
  const total = cart.reduce((s, i) => s + i.qtd, 0);
  document.querySelectorAll('.badge-carrinho').forEach(b => b.textContent = total);
}

/* ── BUSCA GLOBAL (HEADER) ───────────────────────────────── */
function buscarGlobal(val) {
  if (val.trim().length > 1) {
    sessionStorage.setItem('busca_pendente', val.trim());
    const destino = ePagina() ? 'produtos.html' : 'pages/produtos.html';
    window.location = destino;
  }
}

function iniciarBuscaHeader() {
  const inp = document.getElementById('busca-header');
  const btn = document.getElementById('btn-busca-header');
  if (!inp) return;
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') buscarGlobal(inp.value); });
  if (btn) btn.addEventListener('click', () => buscarGlobal(inp.value));
}
