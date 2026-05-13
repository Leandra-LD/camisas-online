<?php
/**
 * CAMISAS ONLINE — newsletter.php
 * Inscrição de e-mail para receber novidades
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

// ── Lê corpo da requisição ────────────────────────────────
$corpo = file_get_contents('php://input');
$dados = json_decode($corpo, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos.']);
    exit;
}

$email = strtolower(trim($dados['email'] ?? ''));

// ── Validação ─────────────────────────────────────────────
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail inválido.']);
    exit;
}

// ── Verifica duplicatas ───────────────────────────────────
$logDir  = __DIR__ . '/logs';
if (!is_dir($logDir)) mkdir($logDir, 0755, true);

$arquivo = $logDir . '/newsletter.log';

if (file_exists($arquivo)) {
    $conteudo = file_get_contents($arquivo);
    if (strpos($conteudo, $email) !== false) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Este e-mail já está cadastrado.']);
        exit;
    }
}

// ── Salva inscrição ───────────────────────────────────────
$linha = date('Y-m-d H:i:s') . ' | ' . $email . PHP_EOL;
file_put_contents($arquivo, $linha, FILE_APPEND | LOCK_EX);

echo json_encode(['sucesso' => true, 'mensagem' => 'E-mail cadastrado com sucesso!']);
exit;
