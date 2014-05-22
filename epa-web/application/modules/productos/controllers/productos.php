<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * productos controller
 */
class productos extends Front_Controller
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
		$this->load->model('productos_model', null, true);
		$this->lang->load('productos');
		

		Assets::add_module_js('productos', 'productos.js');
	}

	//--------------------------------------------------------------------


	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function index()
	{

		$records = $this->productos_model->find_all();

		Template::set('records', $records);
		Template::render();
	}

	//--------------------------------------------------------------------



}