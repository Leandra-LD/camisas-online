<?php
/**
 * CAMISAS ONLINE — pedido.php
 * Processamento de pedidos
 * Disciplina: Desenvolvimento Web | Professor: Paulo Cruz
 * Aluna: Leandra Carreiro Silva Justino | RA: 202508166267
 */

header('Content-Type: application/json; charset=UTF-8');

// ── Aceita apenas POST ────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

// ── Lê o corpo da requisição ──────────────────────────────
$corpo  = file_get_contents('php://input');
$dados  = json_decode($corpo, true);

if (json_last_error() !== JSON_ERROR_NONE || empty($dados)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos.']);
    exit;
}

// ── Sanitização ───────────────────────────────────────────
function sanitizar(string $v): string {
    return htmlspecialchars(strip_tags(trim($v)), ENT_QUOTES, 'UTF-8');
}

$itens    = $dados['itens']    ?? [];
$subtotal = (float)($dados['subtotal'] ?? 0);
$total    = (float)($dados['total']    ?? 0);
$cliente  = $dados['cliente']  ?? [];

// ── Valida itens ──────────────────────────────────────────
if (empty($itens) || !is_array($itens)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Carrinho vazio.']);
    exit;
}

// ── Gera número do pedido ─────────────────────────────────
$numeroPedido = 'CO' . date('Ymd') . strtoupper(substr(md5(uniqid()), 0, 6));

// ── Monta resumo do pedido ────────────────────────────────
$itensTxt = '';
foreach ($itens as $item) {
    $nome    = sanitizar($item['nome']    ?? 'Produto');
    $tam     = sanitizar($item['tamanho'] ?? 'M');
    $qtd     = (int)($item['qtd']         ?? 1);
    $preco   = (float)($item['preco']     ?? 0);
    $itensTxt .= "  - {$nome} | Tam: {$tam} | Qtd: {$qtd} | R$ " . number_format($preco, 2, ',', '.') . "\n";
}

// ── Registra pedido em arquivo ────────────────────────────
$logDir = __DIR__ . '/pedidos';
if (!is_dir($logDir)) mkdir($logDir, 0755, true);

$registro = [
    'numero'   => $numeroPedido,
    'data'     => date('Y-m-d H:i:s'),
    'itens'    => $itens,
    'subtotal' => $subtotal,
    'total'    => $total,
    'cliente'  => $cliente,
    'status'   => 'pendente',
];

$arquivo = $logDir . "/{$numeroPedido}.json";
file_put_contents($arquivo, json_encode($registro, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// ── Simula processamento de pagamento ─────────────────────
// Em produção, integrar com gateway (PagSeguro, Mercado Pago, etc.)
$pagamentoAprovado = true;

if ($pagamentoAprovado) {
    // Atualiza status
    $registro['status'] = 'aprovado';
    file_put_contents($arquivo, json_encode($registro, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // Log geral
    $logLine = date('Y-m-d H:i:s') . " | #{$numeroPedido} | Total: R$ "
             . number_format($total, 2, ',', '.') . " | APROVADO\n";
    file_put_contents($logDir . '/pedidos.log', $logLine, FILE_APPEND | LOCK_EX);

    echo json_encode([
        'sucesso'      => true,
        'numeroPedido' => $numeroPedido,
        'mensagem'     => "Pedido #{$numeroPedido} confirmado com sucesso!",
        'total'        => number_format($total, 2, ',', '.'),
    ]);
} else {
    echo json_encode([
        'sucesso'  => false,
        'mensagem' => 'Falha no processamento do pagamento. Tente novamente.',
    ]);
}
exit;
