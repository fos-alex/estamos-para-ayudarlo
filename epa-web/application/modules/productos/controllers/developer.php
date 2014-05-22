<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * developer controller
 */
class developer extends Admin_Controller
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

		$this->auth->restrict('Productos.Developer.View');
		$this->load->model('productos_model', null, true);
		$this->lang->load('productos');
		
		Template::set_block('sub_nav', 'developer/_sub_nav');

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

		// Deleting anything?
		if (isset($_POST['delete']))
		{
			$checked = $this->input->post('checked');

			if (is_array($checked) && count($checked))
			{
				$result = FALSE;
				foreach ($checked as $pid)
				{
					$result = $this->productos_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('productos_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('productos_delete_failure') . $this->productos_model->error, 'error');
				}
			}
		}

		$records = $this->productos_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage productos');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Creates a productos object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('Productos.Developer.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_productos())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('productos_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'productos');

				Template::set_message(lang('productos_create_success'), 'success');
				redirect(SITE_AREA .'/developer/productos');
			}
			else
			{
				Template::set_message(lang('productos_create_failure') . $this->productos_model->error, 'error');
			}
		}
		Assets::add_module_js('productos', 'productos.js');

		Template::set('toolbar_title', lang('productos_create') . ' productos');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of productos data.
	 *
	 * @return void
	 */
	public function edit()
	{
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('productos_invalid_id'), 'error');
			redirect(SITE_AREA .'/developer/productos');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('Productos.Developer.Edit');

			if ($this->save_productos('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('productos_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'productos');

				Template::set_message(lang('productos_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('productos_edit_failure') . $this->productos_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('Productos.Developer.Delete');

			if ($this->productos_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('productos_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'productos');

				Template::set_message(lang('productos_delete_success'), 'success');

				redirect(SITE_AREA .'/developer/productos');
			}
			else
			{
				Template::set_message(lang('productos_delete_failure') . $this->productos_model->error, 'error');
			}
		}
		Template::set('productos', $this->productos_model->find($id));
		Template::set('toolbar_title', lang('productos_edit') .' productos');
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
	private function save_productos($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['id_supermercado']        = $this->input->post('productos_id_supermercado');
		$data['nombre']        = $this->input->post('productos_nombre');
		$data['descripcion']        = $this->input->post('productos_descripcion');
		$data['precio']        = $this->input->post('productos_precio');

		if ($type == 'insert')
		{
			$id = $this->productos_model->insert($data);

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
			$return = $this->productos_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------


}