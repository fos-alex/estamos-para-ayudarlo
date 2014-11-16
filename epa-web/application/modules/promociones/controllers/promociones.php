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
		if(array_key_exists("distancia", $posicion)){
			$this->JSON_OUT->data = $this->superCercanos($posicion['latitud'],$posicion['longitud'],$posicion['distancia']);	
		}else{
			$this->JSON_OUT->data = $this->superCercanos($posicion['latitud'],$posicion['longitud']);	
		}
		
	}
	
	private function obtenerPromociones(){
		$this->load->model('promociones_model', null, true);
		$promociones = $this->promociones_model->find_all();
		
		foreach ($promociones as $key => $unaPromocion) {
			$desde = $unaPromocion->fecha_desde;
			$hasta = $unaPromocion->fecha_hasta;
			$unaPromocion->fecha_desde = date_format(date_create_from_format('Y-m-d', $desde), 'd-m-Y');
			$unaPromocion->fecha_hasta = date_format(date_create_from_format('Y-m-d', $hasta), 'd-m-Y');
		}
		return $promociones;
	}
	
	private function obtenerPromocionesDeSupermercado($id_supermercado){
		$this->load->model('promociones_model', null, true);
		$promociones = $this->promociones_model->find_all_by('id_supermercado', $id_supermercado);

		foreach ($promociones as $key => $unaPromocion) {
			$desde = $unaPromocion->fecha_desde;
			$hasta = $unaPromocion->fecha_hasta;
			$unaPromocion->fecha_desde = date_format(date_create_from_format('Y-m-d', $desde), 'd-m-Y');
			$unaPromocion->fecha_hasta = date_format(date_create_from_format('Y-m-d', $hasta), 'd-m-Y');
		}
		return $promociones;
	}
	
	
	
	private function superCercanos($posX, $posY, $distanciaMaxima = 2000){
		
		$this->load->model('sucursales/sucursales_model', null, true);
		$sucursales = $this->sucursales_model
					->select('coordenadas, direccion, s.nombre, sucursales.nombre as sucursal')
					->join('supermercados s', 'id_supermercado = s.id')
					->find_all();
				
		$coordenadas = array();
		foreach ($sucursales as $key => $unaSucursal) {
			$posicion = explode(",", $unaSucursal->coordenadas);
			$latitud = trim($posicion[0], "(");
			$longitud = trim($posicion[1], ")");
// 			$distanciaEnGrados = sqrt(pow($latitud - $posX,2) + pow($longitud - $posY,2));
			$distanciaEnMetros = abs(abs($latitud* 111000) - abs($posX* 111000)) + abs(abs($longitud* 111000) - abs($posY* 111000));

			//TODO: Agregar el filtro o pedirlo x parametro		
 			if ($distanciaEnMetros < $distanciaMaxima){
				array_push($coordenadas, 
					array("sucursal"=>$unaSucursal->sucursal,"super"=>$unaSucursal->nombre,"direccion"=> $unaSucursal->direccion,"distancia_en_metros"=> intval($distanciaEnMetros))
				);
			}

		}
		
		usort($coordenadas, function($a, $b) {
			return $a['distancia_en_metros'] <= $b['distancia_en_metros'] ? -1 : 1;
		});
		return $coordenadas; 
	}
	


}