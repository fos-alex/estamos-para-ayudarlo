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
		$this->load->model('mapas_model', null, true);
		$this->lang->load('mapas');
		

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

		$records = $this->mapas_model->find_all();

		Template::set('records', $records);
		Template::render();
	}

	//--------------------------------------------------------------------



}