<?php if (!defined('BASEPATH')) exit ('No direct script access allowed');

class Gestormapas extends Api_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function GET()
    {
        if (array_key_exists(0, $this->PARAMETROS)) {
            $barrio = $this->PARAMETROS [0];
            $this->JSON_OUT->data = $this->obtenerSucursales( $barrio );
        } else {
            $this->error(404, "Debe especificar un barrio");
        }
    }

    private function obtenerSucursales($barrio)
    {
        $this->load->model ( 'sucursales/sucursales_model', null, true );
        $this->load->model ( 'supermercados/supermercados_model', null, true );

        $barrio = str_replace('_',' ',$barrio);
        $sucursales = array();

        if ($barrio !== 'undefined')
        {
            $sucursales = $this->supermercados_model
                ->select ( 's.id, supermercados.nombre as supermercado, s.direccion as direccion' )
                ->join ( 'sucursales s', 's.id_supermercado = supermercados.id' )
                ->like('s.direccion', $barrio)
                ->find_all();
        }
        else
        {
            $sucursales = $this->supermercados_model
                ->select ( 's.id, supermercados.nombre as supermercado, s.direccion as direccion' )
                ->join ( 'sucursales s', 's.id_supermercado = supermercados.id' )
                ->find_all();
        }


        return $sucursales;
    }
}
