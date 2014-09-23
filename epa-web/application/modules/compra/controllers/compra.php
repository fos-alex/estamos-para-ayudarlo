<?php

if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access allowed' );
class Compra extends Api_Controller {
	public function __construct() {
		$this->load->library ( 'users/auth' );
		
		parent::__construct ();
	}
	public function GET() {
		if (array_key_exists ( 0, $this->PARAMETROS )) {
			$id_supermercado = $this->PARAMETROS [0];
			$this->JSON_OUT->data = $this->obtenerProductos ( $id_supermercado );
		} else {
			$this->error ( 404, "Debe especificar un supermercado" );
		}
	}
	private function obtenerProductos($id) {
		$this->load->model ( 'categorias/categorias_model', null, true );
		$this->load->model ( 'productos/productos_model', null, true );
		$this->load->model ( 'precioscuidados/precioscuidados_model', null, true );
		$this->load->model ( 'productosdetalle/productosdetalle_model', null, true );
		
		$productos_cuidados = $this->precioscuidados_model
		->select ( 'precioscuidados.id, producto, marca, precio as precioConPromocion, c.nombre as categoria, p.nombre as generico' )
		->join ( 'productos p', 'precioscuidados.producto = p.nombre' )
		->join ( 'categorias c', 'p.id_categoria = c.id' )
		->find_all ();
		
		foreach ( $productos_cuidados as $key => $producto_cuidado ) {
			$nombre = $producto_cuidado->producto . " " . $producto_cuidado->marca;
			
			unset ( $producto_cuidado->marca );
			unset ( $producto_cuidado->producto );
			
			$producto_cuidado->nombre = $nombre;
			$producto_cuidado->precio = null;
		}
		
		$productos = $this->productosdetalle_model
		->select ( 'productosdetalle.id, marca, productosdetalle.descripcion, presentacion, precio, c.nombre as categoria, p.nombre as generico' )
		->join ( 'productos p', 'productosdetalle.id_producto = p.id' )
		->join ( 'categorias c', 'p.id_categoria = c.id' )
		->find_all_by ( 'id_supermercado', $id );
		
		if ($productos) {
			foreach ( $productos as $key => $producto ) {
				$nombre = $producto->generico . " " . $producto->marca . " " . $producto->presentacion . " " . $producto->descripcion;
				
				unset ( $producto->marca );
				unset ( $producto->presentacion );
				unset ( $producto->descripcion );
				
				$producto->nombre = $nombre;
				$producto->precioConPromocion = null;
				
				array_push ( $productos_cuidados, $producto);
			}
		}
		
		return $productos_cuidados;
	}
}
