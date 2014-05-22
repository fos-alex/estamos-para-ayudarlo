<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * supermercados controller
 */
class supermercados extends Front_Controller
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
		$this->load->model('supermercados_model', null, true);
		$this->lang->load('supermercados');
		

		Assets::add_module_js('supermercados', 'supermercados.js');
	}

	//--------------------------------------------------------------------


	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function index()
	{

		$records = $this->supermercados_model->find_all();

		Template::set('records', $records);
		Template::render();
	}

	//--------------------------------------------------------------------



}