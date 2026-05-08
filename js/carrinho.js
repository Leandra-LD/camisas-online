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
function adicionarAoCarrinho(idProduto, tamanho, cor) {
  const produto = PRODUTOS.find(p => p.id === idProduto);
  if (!produto) return;
  const tam    = tamanho || produto.tamanhos[1] || produto.tamanhos[0] || 'M';
  const corSel = cor || (produto.cores ? produto.cores[0].nome : null);
  const cart   = obterCarrinho();
  const idx    = cart.findIndex(i =>
    i.id === idProduto &&
    i.tamanho === tam &&
    (i.cor || '') === (corSel || '')
  );
  if (idx > -1) {
    cart[idx].qtd++;
  } else {
    cart.push({ id: idProduto, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, tamanho: tam, cor: corSel, qtd: 1 });
  }
  salvarCarrinho(cart);
  atualizarBadge();
  mostrarToast(`"${produto.nome}" adicionado ao carrinho!`, 'ok');
}

/* ── REMOVER ─────────────────────────────────────────────── */
function removerDoCarrinho(idProduto, tamanho, cor) {
  let cart = obterCarrinho();
  cart = cart.filter(i => !(
    i.id === idProduto &&
    i.tamanho === tamanho &&
    (i.cor || '') === (cor || '')
  ));
  salvarCarrinho(cart);
  atualizarBadge();
  renderizarCarrinho();
}

/* ── ALTERAR QUANTIDADE ──────────────────────────────────── */
function alterarQtd(idProduto, tamanho, cor, delta) {
  const cart = obterCarrinho();
  const idx  = cart.findIndex(i =>
    i.id === idProduto &&
    i.tamanho === tamanho &&
    (i.cor || '') === (cor || '')
  );
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
let descontoPix = 0;

function calcularTotais(cart) {
  const subtotal  = cart.reduce((s, i) => s + i.preco * i.qtd, 0);
  const frete     = cart.length === 0 || subtotal >= 199 ? 0 : 19.90;
  const pctTotal  = Math.min((percentualDesconto || 0) + (descontoPix || 0), 100);
  const desconto  = subtotal * (pctTotal / 100);
  const total     = subtotal + frete - desconto;
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
      ${item.cor ? `<p class="tamanho">Cor: <strong>${item.cor}</strong></p>` : ''}
      <p class="preco-item">${formatarPreco(item.preco)}</p>
      <div class="qtd-controle">
        <button onclick="alterarQtd(${item.id},'${item.tamanho}','${item.cor || ''}',-1)"><i class="fas fa-minus"></i></button>
        <span>${item.qtd}</span>
        <button onclick="alterarQtd(${item.id},'${item.tamanho}','${item.cor || ''}',1)"><i class="fas fa-plus"></i></button>
        <button class="btn-remover-item" onclick="removerDoCarrinho(${item.id},'${item.tamanho}','${item.cor || ''}')">
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
  set('val-total',    formatarPreco(total));

  // Linha de desconto: só mostra se houver desconto
  const linhaDesc = document.getElementById('linha-desconto');
  if (linhaDesc) linhaDesc.style.display = desconto > 0 ? 'flex' : 'none';
  set('val-desconto', `- ${formatarPreco(desconto)}`);

  const elFrete = document.getElementById('val-frete');
  if (elFrete) elFrete.className = 'frete-valor';
}

/* ── MODAL CUPONS ────────────────────────────────────────── */
function abrirModalCupons() {
  const modal = document.getElementById('modal-cupons');
  if (modal) modal.classList.add('aberto');
}
function fecharModalCupons() {
  const modal = document.getElementById('modal-cupons');
  if (modal) modal.classList.remove('aberto');
}
function usarCupom(codigo) {
  const inp = document.getElementById('cupom-input');
  if (inp) inp.value = codigo;
  fecharModalCupons();
  tentarCupom();
}

/* ── APLICAR CUPOM ───────────────────────────────────────── */
const CUPONS = { 'BANGKOK': 10, 'PHUKET': 20, 'CHIANGMAI': 15, 'PATTAYA': 5 };

function tentarCupom() {
  const inp = document.getElementById('cupom-input');
  const msg = document.getElementById('cupom-msg');
  const btn = document.getElementById('btn-remover-cupom');
  if (!inp || !msg) return;
  const cod = inp.value.trim().toUpperCase();
  if (CUPONS[cod]) {
    const pct = CUPONS[cod];
    msg.textContent = `Cupom "${cod}" aplicado — ${pct}% de desconto!`;
    msg.style.color = '#27ae60';
    if (btn) btn.style.display = 'inline';
    aplicarDesconto(pct);
  } else {
    msg.textContent = 'Cupom inválido ou expirado.';
    msg.style.color = '#e74c3c';
    if (btn) btn.style.display = 'none';
  }
}

function removerCupom() {
  percentualDesconto = 0;
  const inp = document.getElementById('cupom-input');
  const msg = document.getElementById('cupom-msg');
  const btn = document.getElementById('btn-remover-cupom');
  if (inp) inp.value = '';
  if (msg) { msg.textContent = 'Cupom removido.'; msg.style.color = '#636e72'; }
  if (btn) btn.style.display = 'none';
  renderizarCarrinho();
}

/* ── MÉTODOS DE PAGAMENTO ────────────────────────────────── */
let metodoPagamento = null;

function selecionarPagamento(metodo) {
  metodoPagamento = metodo;

  // Remover seleção de todos
  document.querySelectorAll('.metodo-card').forEach(c => c.classList.remove('selecionado'));
  // Marcar selecionado
  const card = document.getElementById('metodo-' + metodo);
  if (card) card.classList.add('selecionado');

  // Mostrar/ocultar áreas extras
  const areaParcelas = document.getElementById('area-parcelas');
  const areaPix      = document.getElementById('area-pix');
  const areaBoleto   = document.getElementById('area-boleto');
  if (areaParcelas) areaParcelas.style.display = metodo === 'credito' ? 'block' : 'none';
  if (areaPix)      areaPix.style.display      = metodo === 'pix'     ? 'block' : 'none';
  if (areaBoleto)   areaBoleto.style.display    = metodo === 'boleto'  ? 'block' : 'none';

  // Desconto PIX (5%)
  descontoPix = metodo === 'pix' ? 5 : 0;
  renderizarCarrinho();

  const aviso = document.getElementById('aviso-pagamento');
  if (aviso) aviso.style.display = 'none';
}

function selecionarParcela(parcelas) {
  const total = calcularTotais(obterCarrinho()).total;
  const info  = document.getElementById('info-parcela');
  if (!info) return;
  const n = parseInt(parcelas);
  if (n <= 6) {
    info.textContent = `${n}x de ${formatarPreco(total / n)} sem juros`;
  } else {
    const taxa  = 0.0199;
    const parc  = total * (taxa * Math.pow(1 + taxa, n)) / (Math.pow(1 + taxa, n) - 1);
    info.textContent = `${n}x de ${formatarPreco(parc)} com juros`;
  }
}

/* ── FINALIZAR COMPRA ────────────────────────────────────── */
function finalizarCompra() {
  const cart = obterCarrinho();
  if (cart.length === 0) {
    mostrarToast('Seu carrinho está vazio!', 'aviso');
    return;
  }
  const aviso = document.getElementById('aviso-pagamento');
  if (!metodoPagamento) {
    if (aviso) aviso.style.display = 'block';
    mostrarToast('Selecione uma forma de pagamento!', 'aviso');
    return;
  }
  const nomes = { pix: 'PIX', credito: 'Cartão de Crédito', debito: 'Cartão de Débito', boleto: 'Boleto' };
  const num = 'CO' + Date.now().toString().slice(-6);
  const el  = document.getElementById('num-pedido');
  if (el) el.textContent = `Pedido #${num} — ${nomes[metodoPagamento]}`;

  // QR Code PIX
  const areaQr = document.getElementById('area-qr-pix');
  const imgQr  = document.getElementById('img-qr-pix');
  if (metodoPagamento === 'pix' && areaQr && imgQr) {
    const total   = calcularTotais(cart).total.toFixed(2);
    const pixData = `PIX|camisasonline|contato@camisasonline.com.br|${total}|${num}`;
    imgQr.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pixData)}`;
    areaQr.style.display = 'block';
  } else if (areaQr) {
    areaQr.style.display = 'none';
  }

  const modal = document.getElementById('modal-sucesso');
  if (modal) modal.classList.add('aberto');
}
