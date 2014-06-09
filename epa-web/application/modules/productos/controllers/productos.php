<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * productos controller
 */
class productos extends Api_Controller
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

	public function GET(){
		$this->load->model('productos_model', null, true);
		$productos = $this->productos_model->find_all();
		$this->JSON_OUT->data = $productos;
	}

	
}