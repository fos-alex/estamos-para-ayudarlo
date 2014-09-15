<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * promociones controller
 */
class promociones extends Api_Controller
{

	//--------------------------------------------------------------------


	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();

	}

	//--------------------------------------------------------------------


	public function GET() {
		if (array_key_exists ( 0, $this->PARAMETROS )) {
			$id_supermercado = $this->PARAMETROS [0];
			$this->JSON_OUT->data = $this->obtenerPromocionesDeSupermercado($id_supermercado);
		} else {
			$this->JSON_OUT->data = $this->obtenerPromociones();
		}
	}
	
	public function POST(){
		$posicion = $this->JSON_IN;
		if (! $posicion || !isset($posicion['latitud']) || !isset($posicion['longitud'])) {
			$this->error ( 405, "Debe ingresar datos obligatorios" );
		}
		
		$this->JSON_OUT->data = $this->superCercanos($posicion['latitud'],$posicion['longitud']);
	}
	
	
	
	
	
	
	private function obtenerPromociones(){
		$this->load->model('promociones_model', null, true);
		$promociones = $this->promociones_model->find_all();
		return $promociones;
	}
	
	private function obtenerPromocionesDeSupermercado($id_supermercado){
		$this->load->model('promociones_model', null, true);
		$promociones = $this->promociones_model->find_all_by('id_supermercado', $id_supermercado);
		
		return $promociones;
	}
	
	
	
	private function superCercanos($posX, $posY){
		
		$this->load->model('sucursales/sucursales_model', null, true);
		$sucursales = $this->sucursales_model->join('supermercados s', 'id_supermercado = s.id')->find_all();
		
		$sucursales = $this->sucursales_model->select('coordenadas, direccion, s.nombre')->join('supermercados s', 'id_supermercado = s.id')->find_all();
				
		$coordenadas = array();
		foreach ($sucursales as $key => $unaSucursal) {
			$posicion = split(",", $unaSucursal->coordenadas);
			$latitud = trim($posicion[0], "(");
			$longitud = trim($posicion[1], ")");
// 			$distanciaEnGrados = sqrt(pow($latitud - $posX,2) + pow($longitud - $posY,2));
			$distanciaEnGrados = abs(abs($latitud) - abs($posX)) + abs(abs($longitud) - abs($posY));

 			$distanciaEnMetros = $distanciaEnGrados * 111000; 
			
			if ($distanciaEnMetros < 2000){
			array_push($coordenadas, array("super"=>$unaSucursal->nombre,"direccion"=> $unaSucursal->direccion,
							"x"=> $latitud,"y"=> $longitud, "distancia_en_grados"=> $distanciaEnGrados, "distancia_en_metros"=> $distanciaEnMetros));
			}
		}
		
		usort($coordenadas, function($a, $b) {
			return $a['distancia_en_metros'] <= $b['distancia_en_metros'] ? -1 : 1;
		});

		return $coordenadas; 
	}
	


}