<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * mapas controller
 */
class mapas extends Front_Controller
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

		$this->load->library('form_validation');
		Assets::add_module_js('mapas', 'mapas.js');

	}

	//--------------------------------------------------------------------


	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function index()
	{
		Template::render();
	}

	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function editar()
	{
		//PODES AGREGAR JS en la carpeta assets de este modulo
		//Assets::add_module_js('mapas', 'mapas.js'); 
		//O ASI de cualquier lado
		//Assets::add_js("//maps.googleapis.com/maps/api/js?key=AIzaSyBnU9uPcmEmXTau_3noivK_G8Z17MjhpAo&sensor=false&libraries=places&r");
		
		Template::render();
	}
	//--------------------------------------------------------------------



}