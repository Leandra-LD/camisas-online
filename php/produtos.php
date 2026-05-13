<?php
/**
 * CAMISAS ONLINE — produtos.php
 * API de catálogo de produtos (retorna JSON)
 * Suporta filtro por categoria: ?cat=casual
 * Disciplina: Desenvolvimento Web | Professor: Paulo Cruz
 * Aluna: Leandra Carreiro Silva Justino | RA: 202508166267
 */

header('Content-Type: application/json; charset=UTF-8');

// ── Catálogo de produtos ──────────────────────────────────
$produtos = [
    [
        'id'         => 1,
        'nome'       => 'Camisa Casual Branca Premium',
        'categoria'  => 'casual',
        'preco'      => 89.90,
        'precoDe'    => 119.90,
        'imagem'     => 'camisa-casual-branca-premium.jpg',
        'avaliacao'  => 4.8,
        'avaliacoes' => 124,
        'tag'        => 'destaque',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => null,
        'descricao'  => 'Camisa casual 100% algodão, perfeita para o dia a dia.',
    ],
    [
        'id'         => 2,
        'nome'       => 'Camisa Social Slim',
        'categoria'  => 'social',
        'preco'      => 129.90,
        'precoDe'    => 169.90,
        'imagem'     => 'camisa-social-slim.jpg',
        'avaliacao'  => 4.9,
        'avaliacoes' => 87,
        'tag'        => 'novo',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => [
            ['nome' => 'Branca',       'hex' => '#f8f8f8'],
            ['nome' => 'Preta',        'hex' => '#1f2937'],
            ['nome' => 'Vinho',        'hex' => '#7c2d2d'],
            ['nome' => 'Cinza Escuro', 'hex' => '#4b5563'],
        ],
        'descricao'  => 'Camisa slim fit ideal para trabalho e eventos formais.',
    ],
    [
        'id'         => 3,
        'nome'       => 'Polo Premium',
        'categoria'  => 'polo',
        'preco'      => 99.90,
        'precoDe'    => 139.90,
        'imagem'     => 'polo-premium.jpg',
        'avaliacao'  => 4.7,
        'avaliacoes' => 56,
        'tag'        => 'oferta',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => [
            ['nome' => 'Branca', 'hex' => '#f8f8f8'],
            ['nome' => 'Preta',  'hex' => '#1f2937'],
            ['nome' => 'Bege',   'hex' => '#d4b896'],
            ['nome' => 'Cinza',  'hex' => '#9ca3af'],
            ['nome' => 'Coral',  'hex' => '#f08060'],
        ],
        'descricao'  => 'Polo premium com listras, tecido respirável e confortável.',
    ],
    [
        'id'         => 4,
        'nome'       => 'Camisa Estampada',
        'categoria'  => 'estampada',
        'preco'      => 79.90,
        'precoDe'    => 109.90,
        'imagem'     => 'camisa-estampada.jpg',
        'avaliacao'  => 4.5,
        'avaliacoes' => 203,
        'tag'        => 'destaque',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => null,
        'descricao'  => 'Estampada tropical vibrante, perfeita para o verão.',
    ],
    [
        'id'         => 6,
        'nome'       => 'Camisa Casual',
        'categoria'  => 'casual',
        'preco'      => 94.90,
        'precoDe'    => 124.90,
        'imagem'     => 'camisa-casual.jpg',
        'avaliacao'  => 4.7,
        'avaliacoes' => 78,
        'tag'        => 'novo',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => null,
        'descricao'  => 'Listras modernas em tecido macio e durável.',
    ],
    [
        'id'         => 7,
        'nome'       => 'Camisa Esportiva Dry-Fit',
        'categoria'  => 'esporte',
        'preco'      => 69.90,
        'precoDe'    => 99.90,
        'imagem'     => 'camisa-esportiva-dry-fit.jpg',
        'avaliacao'  => 4.6,
        'avaliacoes' => 145,
        'tag'        => 'destaque',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => [
            ['nome' => 'Branca',      'hex' => '#f8f8f8'],
            ['nome' => 'Preta',       'hex' => '#1f2937'],
            ['nome' => 'Vermelha',    'hex' => '#dc2626'],
            ['nome' => 'Vinho',       'hex' => '#7c2d2d'],
            ['nome' => 'Azul Escuro', 'hex' => '#1e3a5f'],
            ['nome' => 'Amarelo',     'hex' => '#eab308'],
        ],
        'descricao'  => 'Tecnologia dry-fit para máximo desempenho nos treinos.',
    ],
    [
        'id'         => 8,
        'nome'       => 'Polo Clássica',
        'categoria'  => 'polo',
        'preco'      => 109.90,
        'precoDe'    => 149.90,
        'imagem'     => 'polo-classica.jpg',
        'avaliacao'  => 4.8,
        'avaliacoes' => 91,
        'tag'        => 'novo',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => [
            ['nome' => 'Branca',       'hex' => '#f8f8f8'],
            ['nome' => 'Preta',        'hex' => '#1f2937'],
            ['nome' => 'Verde',        'hex' => '#16a34a'],
            ['nome' => 'Coral',        'hex' => '#f08060'],
            ['nome' => 'Cinza Escuro', 'hex' => '#4b5563'],
            ['nome' => 'Azul Escuro',  'hex' => '#1e3a5f'],
        ],
        'descricao'  => 'Polo clássica com acabamento elegante e confortável.',
    ],
    [
        'id'         => 9,
        'nome'       => 'Camisa Estampada com Letras',
        'categoria'  => 'estampada',
        'preco'      => 84.90,
        'precoDe'    => 114.90,
        'imagem'     => 'camisa-estampada-com-letras.jpg',
        'avaliacao'  => 4.4,
        'avaliacoes' => 66,
        'tag'        => 'oferta',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => null,
        'descricao'  => 'Estampas coloridas e únicas, para quem ama se destacar.',
    ],
    [
        'id'         => 10,
        'nome'       => 'Camisa Casual Branca',
        'categoria'  => 'casual',
        'preco'      => 74.90,
        'precoDe'    => 99.90,
        'imagem'     => 'camisa-casual-branca.jpg',
        'avaliacao'  => 4.6,
        'avaliacoes' => 189,
        'tag'        => 'destaque',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => null,
        'descricao'  => 'Clássica camisa branca, combina com tudo.',
    ],
    [
        'id'         => 11,
        'nome'       => 'Camisa Social Xadrez',
        'categoria'  => 'social',
        'preco'      => 119.90,
        'precoDe'    => 159.90,
        'imagem'     => 'camisa-social-xadrez.jpg',
        'avaliacao'  => 4.7,
        'avaliacoes' => 54,
        'tag'        => 'novo',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => null,
        'descricao'  => 'Xadrez clássico em corte social com toque moderno.',
    ],
    [
        'id'         => 12,
        'nome'       => 'Camisa Simples',
        'categoria'  => 'casual',
        'preco'      => 79.90,
        'precoDe'    => 109.90,
        'imagem'     => 'camisa-simples.jpg',
        'avaliacao'  => 4.5,
        'avaliacoes' => 230,
        'tag'        => 'oferta',
        'tamanhos'   => ['PP','P','M','G','GG'],
        'cores'      => null,
        'descricao'  => 'Modelo simples e versátil para o dia a dia.',
    ],
];

// ── Filtro por categoria (opcional) ──────────────────────
$categoriasValidas = ['casual', 'social', 'polo', 'estampada', 'esporte'];
$cat = isset($_GET['cat']) ? strtolower(trim($_GET['cat'])) : null;

if ($cat && in_array($cat, $categoriasValidas)) {
    $produtos = array_values(array_filter($produtos, function($p) use ($cat) {
        return $p['categoria'] === $cat;
    }));
}

echo json_encode($produtos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
exit;
