<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * productosdetalle controller
 */
class productosdetalle extends Front_Controller
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
		$this->load->model('productosdetalle_model', null, true);
		$this->lang->load('productosdetalle');
		

		Assets::add_module_js('productosdetalle', 'productosdetalle.js');
	}

	//--------------------------------------------------------------------


	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function index()
	{

		$records = $this->productosdetalle_model->find_all();

		Template::set('records', $records);
		Template::render();
	}

	//--------------------------------------------------------------------



}