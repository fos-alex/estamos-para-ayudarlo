<?php
if (! defined ( 'BASEPATH' ))
	exit ( 'No direct script access allowed' );

/**
 * mapas controller
 */
class mapas extends Api_Controller {
	
	// --------------------------------------------------------------------
	
	/**
	 * Constructor
	 *
	 * @return void
	 */
	public function __construct() {
		parent::__construct ();
		
		// $this->load->library('form_validation');
		// Assets::add_module_js('mapas', 'mapas.js');
	}
	
	// --------------------------------------------------------------------
	
	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function editar() {
		// PODES AGREGAR JS en la carpeta assets de este modulo
		// Assets::add_module_js('mapas', 'mapas.js');
		// O ASI de cualquier lado
		// Assets::add_js("//maps.googleapis.com/maps/api/js?key=AIzaSyBnU9uPcmEmXTau_3noivK_G8Z17MjhpAo&sensor=false&libraries=places&r");
		Template::render ();
	}
	// --------------------------------------------------------------------
	
	
	public function GET() {
		if (array_key_exists ( 0, $this->PARAMETROS )) {
			$id_sucursal = $this->PARAMETROS [0];
			$this->JSON_OUT->data = $this->obtenerMapa ( $id_sucursal );
		} else {
			$this->JSON_OUT->data = $this->obtenerMapas ();
		}
	}
	
	public function PUT(){
		if(array_key_exists(0, $this->PARAMETROS)){
			$this->JSON_OUT->data = $this->modificarMapa($this->PARAMETROS[0],$this->JSON_IN);
		}else{
			$this->error(405,"Falta parametro");
		}
	}
	
	
	private function obtenerMapa($id) {
		$this->load->model ( 'mapas_model', null, true );
		$sucursal = $this->mapas_model->find ( $id );
		if (! $sucursal) {
			$this->error ( 404, "El mapa $id no existe" );
		}
		return json_decode($sucursal->mapa);
	}
	
	private function obtenerMapas(){
		$this->load->model('mapas_model', null, true);
	
		$sucursales = $this->mapas_model->find_all();
		$mapas = array();
		
		foreach ($sucursales as $key => $unaSucursal) {
			array_push($mapas, array("mapa"=> $this->obtenerMapa($unaSucursal->id)));
		}
		return $mapas;
	}
	
	private function modificarMapa($id,$mapa){
				
		$this->load->model ( 'mapas_model', null, true );
		$sucursal = $this->mapas_model->find ( $id );
		
		if (!$sucursal) {
			$this->error ( 404, "El mapa $id no existe" );
		}
		
		$sucursal = array( "mapa" => json_encode($mapa) );

		if($this->mapas_model->update_where( "id",$id,$sucursal)){
			return array("id"=>$id);
		}else{
			$this->error(406,"Error modificando el mapa $id");
		}	
	}

	
	
	
}