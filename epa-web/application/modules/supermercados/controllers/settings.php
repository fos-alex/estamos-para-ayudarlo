<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * settings controller
 */
class settings extends Admin_Controller
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

		$this->auth->restrict('Supermercados.Settings.View');
		$this->load->model('supermercados_model', null, true);
		$this->lang->load('supermercados');
		
		Template::set_block('sub_nav', 'settings/_sub_nav');

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

		// Deleting anything?
		if (isset($_POST['delete']))
		{
			$checked = $this->input->post('checked');

			if (is_array($checked) && count($checked))
			{
				$result = FALSE;
				foreach ($checked as $pid)
				{
					$result = $this->supermercados_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('supermercados_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('supermercados_delete_failure') . $this->supermercados_model->error, 'error');
				}
			}
		}

		$records = $this->supermercados_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage supermercados');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Creates a supermercados object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('Supermercados.Settings.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_supermercados())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('supermercados_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'supermercados');

				Template::set_message(lang('supermercados_create_success'), 'success');
				redirect(SITE_AREA .'/settings/supermercados');
			}
			else
			{
				Template::set_message(lang('supermercados_create_failure') . $this->supermercados_model->error, 'error');
			}
		}
		Assets::add_module_js('supermercados', 'supermercados.js');

		Template::set('toolbar_title', lang('supermercados_create') . ' supermercados');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of supermercados data.
	 *
	 * @return void
	 */
	public function edit()
	{
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('supermercados_invalid_id'), 'error');
			redirect(SITE_AREA .'/settings/supermercados');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('Supermercados.Settings.Edit');

			if ($this->save_supermercados('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('supermercados_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'supermercados');

				Template::set_message(lang('supermercados_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('supermercados_edit_failure') . $this->supermercados_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('Supermercados.Settings.Delete');

			if ($this->supermercados_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('supermercados_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'supermercados');

				Template::set_message(lang('supermercados_delete_success'), 'success');

				redirect(SITE_AREA .'/settings/supermercados');
			}
			else
			{
				Template::set_message(lang('supermercados_delete_failure') . $this->supermercados_model->error, 'error');
			}
		}
		Template::set('supermercados', $this->supermercados_model->find($id));
		Template::set('toolbar_title', lang('supermercados_edit') .' supermercados');
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
	private function save_supermercados($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['nombre']        = $this->input->post('supermercados_nombre');
		$data['id_usuario']        = $this->input->post('supermercados_id_usuario');

		if ($type == 'insert')
		{
			$id = $this->supermercados_model->insert($data);

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
			$return = $this->supermercados_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------


}