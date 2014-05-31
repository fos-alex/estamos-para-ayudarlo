<?php

if (isset($_REQUEST['accion'])) {
    $accion = $_REQUEST['accion'];
}

if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
}

$listas = array (
    array(
        'id'            => 1,
        'nombre'        => 'Prueba',
        'productos'     => array(
            array(
                'id'            => 12,
                'nombre'        => 'LECHE',
                'descripcion'   => 'LECHE ENTERA'
            ),
            array(
                'id'            => 13,
                'nombre'        => 'MANTECA',
                'descripcion'   => 'DANICA DORADA'
            ),
        )
    ),
    array(
        'id'            => 2,
        'nombre'        => 'Prueba2',
        'productos'     => array(
            array(
                'id'            => 11,
                'nombre'        => 'DULCE DE LECHE',
                'descripcion'   => 'LA SERENISIMA COLONIAL'
            ),
            array(
                'id'            => 13,
                'nombre'        => 'MANTECA',
                'descripcion'   => 'DANICA DORADA'
            ),
        )
    )
);
$data = $listas;
if (isset($id) and !empty($id)) {
    foreach ($listas as $lista) {
        if ($lista['id'] != $id) {
            continue;
        }
        $data = array($lista);
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