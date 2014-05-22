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

		$this->auth->restrict('Sucursales.Content.View');
		$this->load->model('sucursales_model', null, true);
		$this->lang->load('sucursales');
		
		Template::set_block('sub_nav', 'content/_sub_nav');

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

		// Deleting anything?
		if (isset($_POST['delete']))
		{
			$checked = $this->input->post('checked');

			if (is_array($checked) && count($checked))
			{
				$result = FALSE;
				foreach ($checked as $pid)
				{
					$result = $this->sucursales_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('sucursales_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('sucursales_delete_failure') . $this->sucursales_model->error, 'error');
				}
			}
		}

		$records = $this->sucursales_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage sucursales');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Creates a sucursales object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('Sucursales.Content.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_sucursales())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('sucursales_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'sucursales');

				Template::set_message(lang('sucursales_create_success'), 'success');
				redirect(SITE_AREA .'/content/sucursales');
			}
			else
			{
				Template::set_message(lang('sucursales_create_failure') . $this->sucursales_model->error, 'error');
			}
		}
		Assets::add_module_js('sucursales', 'sucursales.js');

		Template::set('toolbar_title', lang('sucursales_create') . ' sucursales');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of sucursales data.
	 *
	 * @return void
	 */
	public function edit()
	{
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('sucursales_invalid_id'), 'error');
			redirect(SITE_AREA .'/content/sucursales');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('Sucursales.Content.Edit');

			if ($this->save_sucursales('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('sucursales_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'sucursales');

				Template::set_message(lang('sucursales_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('sucursales_edit_failure') . $this->sucursales_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('Sucursales.Content.Delete');

			if ($this->sucursales_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('sucursales_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'sucursales');

				Template::set_message(lang('sucursales_delete_success'), 'success');

				redirect(SITE_AREA .'/content/sucursales');
			}
			else
			{
				Template::set_message(lang('sucursales_delete_failure') . $this->sucursales_model->error, 'error');
			}
		}
		Template::set('sucursales', $this->sucursales_model->find($id));
		Template::set('toolbar_title', lang('sucursales_edit') .' sucursales');
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
	private function save_sucursales($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['id_supermercado']        = $this->input->post('sucursales_id_supermercado');
		$data['nombre']        = $this->input->post('sucursales_nombre');
		$data['direccion']        = $this->input->post('sucursales_direccion');
		$data['coordenadas']        = $this->input->post('sucursales_coordenadas');

		if ($type == 'insert')
		{
			$id = $this->sucursales_model->insert($data);

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
			$return = $this->sucursales_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------


}