/* ============================================================
   CAMISAS ONLINE — carrinho.js
   Lógica completa do carrinho (localStorage)
   ============================================================ */

const CHAVE = 'camisas_cart';

function obterCarrinho() {
  return JSON.parse(localStorage.getItem(CHAVE) || '[]');
}
function salvarCarrinho(cart) {
  localStorage.setItem(CHAVE, JSON.stringify(cart));
}

/* ── ADICIONAR ───────────────────────────────────────────── */
function adicionarAoCarrinho(idProduto, tamanho) {
  const produto = PRODUTOS.find(p => p.id === idProduto);
  if (!produto) return;
  const tam = tamanho || produto.tamanhos[1] || produto.tamanhos[0];
  const cart = obterCarrinho();
  const idx  = cart.findIndex(i => i.id === idProduto && i.tamanho === tam);
  if (idx > -1) {
    cart[idx].qtd++;
  } else {
    cart.push({ id: idProduto, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, tamanho: tam, qtd: 1 });
  }
  salvarCarrinho(cart);
  atualizarBadge();
  mostrarToast(`"${produto.nome}" adicionado ao carrinho!`, 'ok');
}

/* ── REMOVER ─────────────────────────────────────────────── */
function removerDoCarrinho(idProduto, tamanho) {
  let cart = obterCarrinho();
  cart = cart.filter(i => !(i.id === idProduto && i.tamanho === tamanho));
  salvarCarrinho(cart);
  atualizarBadge();
  renderizarCarrinho();
}

/* ── ALTERAR QUANTIDADE ──────────────────────────────────── */
function alterarQtd(idProduto, tamanho, delta) {
  const cart = obterCarrinho();
  const idx  = cart.findIndex(i => i.id === idProduto && i.tamanho === tamanho);
  if (idx === -1) return;
  cart[idx].qtd += delta;
  if (cart[idx].qtd <= 0) { cart.splice(idx, 1); }
  salvarCarrinho(cart);
  atualizarBadge();
  renderizarCarrinho();
}

/* ── LIMPAR CARRINHO ─────────────────────────────────────── */
function limparCarrinho() {
  salvarCarrinho([]);
  atualizarBadge();
  renderizarCarrinho();
}

/* ── CALCULAR TOTAIS ─────────────────────────────────────── */
let percentualDesconto = 0;

function calcularTotais(cart) {
  const subtotal = cart.reduce((s, i) => s + i.preco * i.qtd, 0);
  const frete    = subtotal >= 199 ? 0 : 19.90;
  const desconto = subtotal * (percentualDesconto / 100);
  const total    = subtotal + frete - desconto;
  return { subtotal, frete, desconto, total };
}

function aplicarDesconto(pct) {
  percentualDesconto = pct;
  renderizarCarrinho();
}

/* ── RENDERIZAR CARRINHO ─────────────────────────────────── */
function renderizarCarrinho() {
  const lista  = document.getElementById('lista-carrinho');
  const vazio  = document.getElementById('carrinho-vazio');
  if (!lista) return;

  const cart = obterCarrinho();

  if (cart.length === 0) {
    lista.innerHTML = '';
    if (vazio) vazio.style.display = 'block';
    atualizarResumo(calcularTotais([]));
    return;
  }
  if (vazio) vazio.style.display = 'none';

  lista.innerHTML = cart.map(item => `
  <div class="item-cart">
    <img class="item-cart-img" src="${prefixo()}images/${item.imagem}" alt="${item.nome}" />
    <div class="item-cart-info">
      <h4>${item.nome}</h4>
      <p class="tamanho">Tamanho: <strong>${item.tamanho}</strong></p>
      <p class="preco-item">${formatarPreco(item.preco)}</p>
      <div class="qtd-controle">
        <button onclick="alterarQtd(${item.id},'${item.tamanho}',-1)"><i class="fas fa-minus"></i></button>
        <span>${item.qtd}</span>
        <button onclick="alterarQtd(${item.id},'${item.tamanho}',1)"><i class="fas fa-plus"></i></button>
        <button class="btn-remover-item" onclick="removerDoCarrinho(${item.id},'${item.tamanho}')">
          <i class="fas fa-trash-alt"></i> Remover
        </button>
      </div>
    </div>
    <div class="item-cart-total">
      ${formatarPreco(item.preco * item.qtd)}
    </div>
  </div>`).join('');

  atualizarResumo(calcularTotais(cart));
}

function atualizarResumo({ subtotal, frete, desconto, total }) {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('val-subtotal', formatarPreco(subtotal));
  set('val-frete',    frete === 0 ? 'Grátis' : formatarPreco(frete));
  set('val-desconto', `- ${formatarPreco(desconto)}`);
  set('val-total',    formatarPreco(total));
  const elFrete = document.getElementById('val-frete');
  if (elFrete) elFrete.className = 'frete-valor';
}

/* ── APLICAR CUPOM ───────────────────────────────────────── */
const CUPONS = { 'ESTACIO10': 10, 'WEB20': 20, 'PROMO15': 15, 'LEANDRA5': 5 };

function tentarCupom() {
  const inp = document.getElementById('cupom-input');
  const msg = document.getElementById('cupom-msg');
  if (!inp || !msg) return;
  const cod = inp.value.trim().toUpperCase();
  if (CUPONS[cod]) {
    const pct = CUPONS[cod];
    msg.textContent = `Cupom "${cod}" aplicado — ${pct}% de desconto!`;
    msg.style.color = '#27ae60';
    aplicarDesconto(pct);
  } else {
    msg.textContent = 'Cupom inválido ou expirado.';
    msg.style.color = '#e74c3c';
  }
}

/* ── FINALIZAR COMPRA ────────────────────────────────────── */
function finalizarCompra() {
  const cart = obterCarrinho();
  if (cart.length === 0) {
    mostrarToast('Seu carrinho está vazio!', 'aviso');
    return;
  }
  const num = 'CO' + Date.now().toString().slice(-6);
  const el  = document.getElementById('num-pedido');
  if (el) el.textContent = `Número do pedido: #${num}`;
  const modal = document.getElementById('modal-sucesso');
  if (modal) modal.classList.add('aberto');
}
