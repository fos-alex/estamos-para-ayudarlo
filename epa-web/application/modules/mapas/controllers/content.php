<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * content controller
 */
class content extends Admin_Controller
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

		$this->auth->restrict('Mapas.Content.View');

		$this->lang->load('mapas');
		
		Template::set_block('sub_nav', 'content/_sub_nav');

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

	//--------------------------------------------------------------------


	/**
	 * Creates a Mapas object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('Mapas.Content.Create');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of Mapas data.
	 *
	 * @return void
	 */
	public function edit()
	{
        $this->auth->restrict('Mapas.Content.Create');
        $id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('mapas_invalid_id'), 'error');
			redirect(SITE_AREA .'/content/mapas');
		}
		$this->load->model('sucursales/sucursales_model', null, true);
		$sucursal = $this->sucursales_model->find($id);
        Assets::add_js("underscore-min.js");
        Assets::add_js("kinetic-v5.1.0.min.js");
        Assets::add_js("mapa-plugin.js");
		Template::set('id_sucursal', $id);
		Template::set('mapa', ($sucursal)?$sucursal->mapa:'');
		Template::set('toolbar_title', lang('mapas_edit') .' Mapas');
		Template::render();
	}

}