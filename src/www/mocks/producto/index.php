<?php

if (isset($_REQUEST['accion'])) {
    $accion = $_REQUEST['accion'];
}

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
}

$productos = array (
    array(
        'id'            => 12,
        'nombre'        => 'LECHE',
        'descripcion'   => 'Leche descremada'
    ),
    array(
        'id'            => 13,
        'nombre'        => 'MANTECA',
        'descripcion'   => 'Danica Dorada era para untar'
    ),
    array(
        'id'            => 11,
        'nombre'        => 'DULCE DE LECHE',
        'descripcion'   => 'La Serenísima Colonial'
    ),
    array(
        'id'            => 14,
        'nombre'        => 'CARNE',
        'descripcion'   => 'Bife de chorizo'
    ),
    array(
        'id'            => 16,
        'nombre'        => 'TOMATE',
        'descripcion'   => 'Tomate perita para ensaladas'
    )
);
$data = $productos;
if (isset($id) and !empty($id)) {
    foreach ($productos as $producto) {
        if ($producto['id'] != $id) {
            continue;
        }
        $data = array($producto);
        break;
    }
}

$response = array (
    'codigo'         => 0,
    'mensaje'        => 'Operacion Satisfactoria',
    'data'           => $data,
    'data_adicional' => array()
);

die(json_encode($response, JSON_FORCE_OBJECT));