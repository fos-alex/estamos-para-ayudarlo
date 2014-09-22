<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Compra extends Api_Controller
{

    public function __construct()
    {
        $this->load->library('users/auth');

        parent::__construct();
    }

    public function GET()
    {
        if (array_key_exists(0, $this->PARAMETROS)) {
            $id_supermercado = $this->PARAMETROS[0];
            $this->JSON_OUT->data = $this->obtenerProductos($id_supermercado);
        } else {
            $this->error(404, "Debe especificar un supermercado");
        }

    }


    private function obtenerProductos($id)
    {
        $this->load->model('categorias/categorias_model', null, true);
        $this->load->model('productos/productos_model', null, true);
        $this->load->model('precioscuidados/precioscuidados_model', null, true);
        $this->load->model('productosdetalle/productosdetalle_model', null, true);

        $productos = $this->productosdetalle_model
            ->select('productosdetalle.id, marca, productosdetalle.descripcion, presentacion, precio, c.nombre as categoria, p.nombre as generico')
            ->join('productos p', 'productosdetalle.id_producto = p.id')
            ->join('categorias c', 'p.id_categoria = c.id')
            ->find_all_by('id_supermercado',$id);

        if (!$productos) {
            $this->error(404, "No hay productos para ese supermercado");
        }

        return $productos;
    }
}
