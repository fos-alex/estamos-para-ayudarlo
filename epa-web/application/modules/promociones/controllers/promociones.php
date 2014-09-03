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

// 		$this->load->library('form_validation');
// 		$this->load->model('promociones_model', null, true);
// 		$this->lang->load('promociones');
		
// 			Assets::add_css('flick/jquery-ui-1.8.13.custom.css');
// 			Assets::add_js('jquery-ui-1.8.13.min.js');

// 		Assets::add_module_js('promociones', 'promociones.js');
	}

	//--------------------------------------------------------------------


	public function GET() {
		if (array_key_exists ( 0, $this->PARAMETROS )) {
			$id_sucursal = $this->PARAMETROS [0];
			$this->JSON_OUT->data = $this->obtenerPromocion ( $id_promocion );
		} else {
			$this->JSON_OUT->data = $this->obtenerPromociones ();
		}
	}
	
	
	private function obtenerPromociones(){
		$this->load->model('promociones_model', null, true);
	
		$promociones = $this->promociones_model->find_all();
	
		return $promociones;
	}



}