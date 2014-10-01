<?php if (!defined('BASEPATH')) exit ('No direct script access allowed');


class Estadisticas extends Api_Controller
{
    public function __construct()
    {
        $this->load->library('users/auth');

        parent::__construct();
    }

    public function GET()
    {
        if (array_key_exists(0, $this->PARAMETROS)) {
            $mes = $this->PARAMETROS [0];
            
            $tipoEstadistica = $this->PARAMETROS [1];
            
            if ($tipoEstadistica == 0)
            	$this->JSON_OUT->data = $this->obtenerEstadisticasPorMes($mes);
            else
                $this->JSON_OUT->data = $this->obtenerEstadisticaDetallada($mes);
        } else
        	$this->error ( 404, "Debe especificar un mes" );
    }

    private function obtenerEstadisticasPorMes($mes)
    {
        $this->load->model('precioscuidados/precioscuidados_model', null, true);
        $this->load->model('productosdetalle/productosdetalle_model', null, true);
        $this->load->model('compra/compra_model', null, true);

        $importe = $this->compra_model
            ->select_sum('importe_total')
            ->find_all_by('month(fecha) = ' . $mes);

        $total_por_mes;
        $importe[0]->importe_total == 0? $total_por_mes = 0 : $total_por_mes = $importe[0]->importe_total;
        
        
        $cant_compras_por_mes = $this->compra_model
            ->count_by('month(fecha) = ' . $mes);

       return array("total_por_mes"=>$total_por_mes, "cantidad_compras"=>$cant_compras_por_mes);
    }
    
    
    private function obtenerEstadisticaDetallada($mes)
    {
    	$this->load->model('precioscuidados/precioscuidados_model', null, true);
    	$this->load->model('productosdetalle/productosdetalle_model', null, true);
    	$this->load->model('compra/compra_model', null, true);
    	$this->load->model('compra/precios_cuidados_compra_model', null, true);
    	$this->load->model('compra/productos_detalle_compra_model', null, true);
    	$this->load->model('categorias/categorias_model', null, true);
    	
    	$cuidados = $this->precios_cuidados_compra_model
	    	->select ( 'cat.nombre as categoria, count(*) as cantidad, sum(pc.precio) as precio' )
	    	->join ( 'precioscuidados pc', 'precios_cuidados_compra.id_preciocuidado = pc.id' )
	    	->join ( 'productos p', 'pc.producto = p.nombre' )
	    	->join ( 'categorias cat', 'p.id_categoria = cat.id' )
	    	->join ( 'compra c', 'precios_cuidados_compra.id_compra = c.id' )
	    	->group_by( 'cat.nombre' )
	    	->find_all_by('month(fecha) = ' . $mes);
    	
    	$comunes = $this->productos_detalle_compra_model
	    	->select ( 'cat.nombre as categoria, count(*) as cantidad, sum(pd.precio) as precio' )
	    	->join ( 'productosdetalle pd', 'productos_detalle_compra.id_productodetalle = pd.id' )
	    	->join ( 'productos p', 'pd.id_producto = p.id' )
	    	->join ( 'categorias cat', 'p.id_categoria = cat.id' )
	    	->join ( 'compra c', 'productos_detalle_compra.id_compra = c.id' )
	    	->group_by( 'cat.nombre' )
	    	->find_all_by('month(fecha) = ' . $mes);

    	$categorias = array();    	
		foreach ($cuidados as $key => $cuidado)
		{
			array_push($categorias, $cuidado->categoria);
		}    
		foreach ($comunes as $key => $comun)
		{
			if (!(in_array($comun->categoria, $categorias)))
				array_push($categorias, $comun->categoria);
		}	
    	
		sort($categorias);
     	$total = array();
    	
    	for($i=0; $i < count($categorias); $i++)
    	{
    		$cant_comunes = 0;
    		$cant_cuidados = 0;
    		$importe_por_categoria = 0;
    		
    		foreach ($cuidados as $key => $cuidado)
    		{
    			if ($categorias[$i] == $cuidado->categoria){ 
    				$cant_cuidados = $cuidado->cantidad;
    				$importe_por_categoria += $cuidado->precio;
     			}
    		}
    		foreach ($comunes as $key => $comun)
    		{
    			if ($categorias[$i] == $comun->categoria){ 
    				$cant_comunes = $comun->cantidad;
    				$importe_por_categoria += $comun->precio;
    			}
    		}
    		
    		array_push ( $total, array('categoria'=>$categorias[$i], 'importe_por_categoria'=> intval($importe_por_categoria)
    						,'cantidad_comunes'=>$cant_comunes,'cantidad_cuidados'=>$cant_cuidados));
    	}
    	
    	return $total;
    }
    
}

