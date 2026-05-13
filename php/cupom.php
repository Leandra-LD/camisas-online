<?php
/**
 * CAMISAS ONLINE — cupom.php
 * Validação server-side de cupons de desconto
 * Disciplina: Desenvolvimento Web | Professor: Paulo Cruz
 * Aluna: Leandra Carreiro Silva Justino | RA: 202508166267
 */

header('Content-Type: application/json; charset=UTF-8');

// ── Aceita apenas POST ────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['valido' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

// ── Lê corpo da requisição ────────────────────────────────
$corpo  = file_get_contents('php://input');
$dados  = json_decode($corpo, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['valido' => false, 'mensagem' => 'Dados inválidos.']);
    exit;
}

$codigo   = strtoupper(trim($dados['codigo']   ?? ''));
$subtotal = (float)($dados['subtotal'] ?? 0);

// ── Cupons disponíveis (definidos no servidor) ────────────
$cupons = [
    'PATTAYA'   => ['desconto' => 5,  'minimo' => 50  ],
    'BANGKOK'   => ['desconto' => 10, 'minimo' => 100 ],
    'CHIANGMAI' => ['desconto' => 15, 'minimo' => 150 ],
    'PHUKET'    => ['desconto' => 20, 'minimo' => 200 ],
];

// ── Verifica existência ───────────────────────────────────
if (!isset($cupons[$codigo])) {
    echo json_encode(['valido' => false, 'mensagem' => 'Cupom inválido ou expirado.']);
    exit;
}

$cupom = $cupons[$codigo];

// ── Verifica valor mínimo ─────────────────────────────────
if ($subtotal < $cupom['minimo']) {
    $falta = $cupom['minimo'] - $subtotal;
    echo json_encode([
        'valido'   => false,
        'mensagem' => 'Compra mínima de R$ ' . number_format($cupom['minimo'], 2, ',', '.') .
                      ' para este cupom. Faltam R$ ' . number_format($falta, 2, ',', '.') . '.',
    ]);
    exit;
}

// ── Cupom válido ──────────────────────────────────────────
echo json_encode([
    'valido'   => true,
    'desconto' => $cupom['desconto'],
    'mensagem' => 'Cupom "' . $codigo . '" aplicado — ' . $cupom['desconto'] . '% de desconto!',
]);
exit;
