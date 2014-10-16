<?php if (!defined('BASEPATH')) exit ('No direct script access allowed');

class Compraondemand extends Api_Controller
{
    public function __construct()
    {
        $this->load->library('users/auth');
        parent::__construct();
    }

    public function GET()
    {
        if (array_key_exists(0, $this->PARAMETROS)) {
            $id_producto = $this->PARAMETROS [0];
            $this->JSON_OUT->data = $this->obtenerDetalleDeProducto($id_producto);
        } else {
            $this->error(404, "Debe especificar un producto");
        }
    }

    private function obtenerDetalleDeProducto($id)
    {
        $this->load->model('categorias/categorias_model', null, true);
        $this->load->model('productos/productos_model', null, true);
        $this->load->model('precioscuidados/precioscuidados_model', null, true);
        $this->load->model('productosdetalle/productosdetalle_model', null, true);

        $info_producto = array();

        //id, descripcion, categoria y precio

        if ($this->esPrecioCuidado($id))
        {
            $info_producto = $this->precioscuidados_model
                ->select('precioscuidados.id, producto, marca, precio, c.nombre as categoria')
                ->join('productos p', 'precioscuidados.producto = p.nombre')
                ->join('categorias c', 'p.id_categoria = c.id')
                ->find($id);

            if ($info_producto)
            {
                $descripcion = $info_producto->producto . " " . $info_producto->marca;
                unset ( $info_producto->marca );
                unset ( $info_producto->producto );
                $info_producto->descripcion = $descripcion;
            }
        }
        else
        {
            $info_producto = $this->productosdetalle_model
                ->select('productosdetalle.id, marca, productosdetalle.descripcion, presentacion, precio, c.nombre as categoria, p.nombre as generico')
                ->join('productos p', 'productosdetalle.id_producto = p.id')
                ->join('categorias c', 'p.id_categoria = c.id')
                ->find($id);

            if ($info_producto)
            {
                $descripcion = $info_producto->generico . " " . $info_producto->marca . " " . $info_producto->presentacion . " " . $info_producto->descripcion;
                unset ( $info_producto->generico );
                unset ( $info_producto->marca );
                unset ( $info_producto->presentacion );
                unset ( $info_producto->descripcion );
                $info_producto->descripcion = $descripcion;
            }
        }

        if (!$info_producto)
            $this->error(405, "No existe un producto con ese id");

        return $info_producto;
    }


    private function esPrecioCuidado($id)
    {
        return $id >= 10000;
    }

}
