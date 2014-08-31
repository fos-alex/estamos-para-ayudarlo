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

		$this->auth->restrict('PreciosCuidados.Content.View');
		$this->load->model('precioscuidados_model', null, true);
		$this->lang->load('precioscuidados');
		
			Assets::add_css('flick/jquery-ui-1.8.13.custom.css');
			Assets::add_js('jquery-ui-1.8.13.min.js');
		Template::set_block('sub_nav', 'content/_sub_nav');

		Assets::add_module_js('precioscuidados', 'precioscuidados.js');
	}

	//--------------------------------------------------------------------


	/**
	 * Displays a list of form data.
	 *
	 * @return void
	 */
	public function index()
	{

		// Deleting anything?
		if (isset($_POST['delete']))
		{
			$checked = $this->input->post('checked');

			if (is_array($checked) && count($checked))
			{
				$result = FALSE;
				foreach ($checked as $pid)
				{
					$result = $this->precioscuidados_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('precioscuidados_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('precioscuidados_delete_failure') . $this->precioscuidados_model->error, 'error');
				}
			}
		}

		$records = $this->precioscuidados_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage preciosCuidados');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Creates a preciosCuidados object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('PreciosCuidados.Content.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_precioscuidados())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('precioscuidados_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'precioscuidados');

				Template::set_message(lang('precioscuidados_create_success'), 'success');
				redirect(SITE_AREA .'/content/precioscuidados');
			}
			else
			{
				Template::set_message(lang('precioscuidados_create_failure') . $this->precioscuidados_model->error, 'error');
			}
		}
		Assets::add_module_js('precioscuidados', 'precioscuidados.js');

		Template::set('toolbar_title', lang('precioscuidados_create') . ' preciosCuidados');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of preciosCuidados data.
	 *
	 * @return void
	 */
	public function edit()
	{
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('precioscuidados_invalid_id'), 'error');
			redirect(SITE_AREA .'/content/precioscuidados');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('PreciosCuidados.Content.Edit');

			if ($this->save_precioscuidados('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('precioscuidados_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'precioscuidados');

				Template::set_message(lang('precioscuidados_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('precioscuidados_edit_failure') . $this->precioscuidados_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('PreciosCuidados.Content.Delete');

			if ($this->precioscuidados_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('precioscuidados_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'precioscuidados');

				Template::set_message(lang('precioscuidados_delete_success'), 'success');

				redirect(SITE_AREA .'/content/precioscuidados');
			}
			else
			{
				Template::set_message(lang('precioscuidados_delete_failure') . $this->precioscuidados_model->error, 'error');
			}
		}
		Template::set('precioscuidados', $this->precioscuidados_model->find($id));
		Template::set('toolbar_title', lang('precioscuidados_edit') .' preciosCuidados');
		Template::render();
	}

	//--------------------------------------------------------------------

	//--------------------------------------------------------------------
	// !PRIVATE METHODS
	//--------------------------------------------------------------------

	/**
	 * Summary
	 *
	 * @param String $type Either "insert" or "update"
	 * @param Int	 $id	The ID of the record to update, ignored on inserts
	 *
	 * @return Mixed    An INT id for successful inserts, TRUE for successful updates, else FALSE
	 */
	private function save_precioscuidados($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['categoria']        = $this->input->post('precioscuidados_categoria');
		$data['producto']        = $this->input->post('precioscuidados_producto');
		$data['marca']        = $this->input->post('precioscuidados_marca');
		$data['cantidad']        = $this->input->post('precioscuidados_cantidad');
		$data['precio']        = $this->input->post('precioscuidados_precio');
		$data['vigencia']        = $this->input->post('precioscuidados_vigencia') ? $this->input->post('precioscuidados_vigencia') : '0000-00-00';

		if ($type == 'insert')
		{
			$id = $this->precioscuidados_model->insert($data);

			if (is_numeric($id))
			{
				$return = $id;
			}
			else
			{
				$return = FALSE;
			}
		}
		elseif ($type == 'update')
		{
			$return = $this->precioscuidados_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------
	//--------------------------------------------------------------------

	public function carga_masiva(){
		$this->auth->restrict('PreciosCuidados.Content.Edit');
		Assets::add_css('//hayageek.github.io/jQuery-Upload-File/uploadfile.min.css');
		Assets::add_js('//hayageek.github.io/jQuery-Upload-File/jquery.uploadfile.min.js');
		Template::set('toolbar_title', lang('productosdetalle_cargamasiva') .' Producto');
		Template::render();
	}

	public function uploadFile(){
		$this->auth->restrict('PreciosCuidados.Content.Edit');
				
		$tipos = array(
				"0"=>"producto",
				"0"=>"categoria",
				"1"=>"marca",
				"2"=>"presentacion",
				"3"=>"precio",
				"4"=>"descripcion"
			);

		$this->load->library('excel/lectorexcel',$tipos);
		$this->lectorexcel->cargar($_FILES['productos']['tmp_name']);
		$productosleidos = $this->lectorexcel->obtenerFilas();
		$productoscargados = array();
		$productosnocargados = array();
		
		foreach ($productosleidos as $key => $producto) {
			$producto['id_supermercado'] = (string)$this->current_user->supermercado->id;
			$tipo = $producto['id_producto'];
			$productosTipo = $this->productos_model->where('LOWER(nombre)',trim(strtolower($tipo)))->find_all();
			if(!$productosTipo){
				$producto['id_producto'] = 0;
			}else{
				$producto['id_producto'] = $productosTipo[0]->id;
			}

			if($this->productosdetalle_model->insert($producto))
				array_push($productoscargados, $producto);
			else
				array_push($productosnocargados, $producto);
		}

		die(json_encode(array(
				"CORRECTOS"=> sizeof($productoscargados),
				"FALLIDOS"=> sizeof($productosnocargados)
			)));

	}

}