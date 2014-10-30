<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * promociones controller
 */
class Sucursalactual extends Api_Controller
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

	public function POST(){
		$posicion = $this->JSON_IN;
		if (! $posicion || !isset($posicion['latitud']) || !isset($posicion['longitud'])) {
			$this->error ( 405, "No se obtuvieron las coordenadas correctamente" );
		}
		$this->JSON_OUT->data = $this->obtenerSucursalActual($posicion['latitud'],$posicion['longitud']);
	}
	
	
	private function obtenerSucursalActual($posX, $posY)
	{
		$this->load->model('sucursales/sucursales_model', null, true);
		$sucursales = $this->sucursales_model
					->find_all();
		
		$coordenadas = array();
		foreach ($sucursales as $key => $unaSucursal) {
			$posicion = split(",", $unaSucursal->coordenadas);
			$latitud = trim($posicion[0], "(");
			$longitud = trim($posicion[1], ")");
			$distanciaEnMetros = abs(abs($latitud* 111000) - abs($posX* 111000)) + abs(abs($longitud* 111000) - abs($posY* 111000));
	
			array_push($coordenadas,
			array("id"=>$unaSucursal->id,"distancia_en_metros"=> intval($distanciaEnMetros))
			);
		}
		
			usort($coordenadas, function($a, $b) {
				return $a['distancia_en_metros'] <= $b['distancia_en_metros'] ? -1 : 1;
			});

			
		if ($coordenadas[0][distancia_en_metros] !== 0)
			$this->error ( 405, "No se encuentra en una sucursal actualmente" );
		else 
			return array("id"=>$coordenadas[0]['id']);
	}
	


}