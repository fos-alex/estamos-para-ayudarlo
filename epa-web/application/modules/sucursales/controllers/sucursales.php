<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * sucursales controller
 */
class sucursales extends Front_Controller
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
		$this->load->model('sucursales_model', null, true);
		$this->lang->load('sucursales');
		

		Assets::add_module_js('sucursales', 'sucursales.js');
	}

	//--------------------------------------------------------------------


	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function index()
	{

		$records = $this->sucursales_model->find_all();

		Template::set('records', $records);
		Template::render();
	}

	//--------------------------------------------------------------------



}