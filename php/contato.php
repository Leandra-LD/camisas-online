<?php
/**
 * CAMISAS ONLINE — contato.php
 * Processamento do formulário de contato
 * Disciplina: Desenvolvimento Web | Professor: Paulo Cruz
 * Aluna: Leandra Carreiro Silva Justino | RA: 202508166267
 */

// ── Configurações ─────────────────────────────────────────
define('EMAIL_DESTINO', 'contato@camisasonline.com.br');
define('NOME_SITE',     'Camisas Online');

// ── Inicializa resposta ───────────────────────────────────
$resposta = ['sucesso' => false, 'mensagem' => ''];

// ── Aceita apenas POST ────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../pages/contato.html');
    exit;
}

// ── Sanitização ───────────────────────────────────────────
function sanitizar(string $dado): string {
    return htmlspecialchars(strip_tags(trim($dado)), ENT_QUOTES, 'UTF-8');
}

$nome     = sanitizar($_POST['nome']     ?? '');
$email    = sanitizar($_POST['email']    ?? '');
$telefone = sanitizar($_POST['telefone'] ?? '');
$assunto  = sanitizar($_POST['assunto']  ?? '');
$mensagem = sanitizar($_POST['mensagem'] ?? '');

// ── Validação ─────────────────────────────────────────────
$erros = [];

if (strlen($nome) < 3) {
    $erros[] = 'Nome deve ter ao menos 3 caracteres.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros[] = 'E-mail inválido.';
}
if (empty($assunto)) {
    $erros[] = 'Selecione um assunto.';
}
if (strlen($mensagem) < 10) {
    $erros[] = 'Mensagem deve ter ao menos 10 caracteres.';
}

// ── Se há erros, retorna ──────────────────────────────────
if (!empty($erros)) {
    $resposta['mensagem'] = implode(' | ', $erros);
    echo json_encode($resposta);
    exit;
}

// ── Monta e-mail ──────────────────────────────────────────
$assuntos = [
    'pedido'    => 'Dúvida sobre pedido',
    'troca'     => 'Troca ou devolução',
    'produto'   => 'Informação sobre produto',
    'pagamento' => 'Problema com pagamento',
    'outro'     => 'Outro',
];
$assuntoTexto = $assuntos[$assunto] ?? $assunto;

$corpoEmail = "
=== Mensagem recebida via " . NOME_SITE . " ===

Nome:      {$nome}
E-mail:    {$email}
Telefone:  {$telefone}
Assunto:   {$assuntoTexto}
Data/Hora: " . date('d/m/Y H:i:s') . "

Mensagem:
{$mensagem}

=== Fim da mensagem ===
";

$headers  = "From: {$nome} <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// ── Tenta enviar ──────────────────────────────────────────
$enviado = mail(
    EMAIL_DESTINO,
    "[" . NOME_SITE . "] {$assuntoTexto} — {$nome}",
    $corpoEmail,
    $headers
);

// ── Registra log ──────────────────────────────────────────
$logDir  = __DIR__ . '/logs';
if (!is_dir($logDir)) mkdir($logDir, 0755, true);

$logLine = date('Y-m-d H:i:s') . " | {$nome} | {$email} | {$assuntoTexto} | "
         . ($enviado ? 'ENVIADO' : 'FALHOU') . PHP_EOL;
file_put_contents($logDir . '/contatos.log', $logLine, FILE_APPEND | LOCK_EX);

// ── Resposta ──────────────────────────────────────────────
if ($enviado) {
    $resposta['sucesso']  = true;
    $resposta['mensagem'] = 'Mensagem enviada com sucesso! Retornaremos em breve.';
} else {
    // Em ambiente de desenvolvimento, consideramos sucesso mesmo sem envio real
    $resposta['sucesso']  = true;
    $resposta['mensagem'] = 'Mensagem registrada. Retornaremos em breve.';
}

// ── Se é AJAX retorna JSON, senão redireciona ─────────────
$ehAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
          && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

if ($ehAjax) {
    header('Content-Type: application/json');
    echo json_encode($resposta);
} else {
    $msg = urlencode($resposta['mensagem']);
    header("Location: ../pages/contato.html?msg={$msg}&ok=" . ($resposta['sucesso'] ? '1' : '0'));
}
exit;
