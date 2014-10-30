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

		$this->auth->restrict('Categorias.Settings.View');
		$this->load->model('categorias_model', null, true);
		$this->lang->load('categorias');
		
		Template::set_block('sub_nav', 'settings/_sub_nav');

		Assets::add_module_js('categorias', 'categorias.js');
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
					$result = $this->categorias_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('categorias_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('categorias_delete_failure') . $this->categorias_model->error, 'error');
				}
			}
		}

		$records = $this->categorias_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage Categorias');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Creates a Categorias object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('Categorias.Settings.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_categorias())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('categorias_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'categorias');

				Template::set_message(lang('categorias_create_success'), 'success');
				redirect(SITE_AREA .'/settings/categorias');
			}
			else
			{
				Template::set_message(lang('categorias_create_failure') . $this->categorias_model->error, 'error');
			}
		}
		Assets::add_module_js('categorias', 'categorias.js');

		Template::set('toolbar_title', lang('categorias_create') . ' Categorias');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of Categorias data.
	 *
	 * @return void
	 */
	public function edit()
	{
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('categorias_invalid_id'), 'error');
			redirect(SITE_AREA .'/settings/categorias');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('Categorias.Settings.Edit');

			if ($this->save_categorias('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('categorias_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'categorias');

				Template::set_message(lang('categorias_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('categorias_edit_failure') . $this->categorias_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('Categorias.Settings.Delete');

			if ($this->categorias_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('categorias_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'categorias');

				Template::set_message(lang('categorias_delete_success'), 'success');

				redirect(SITE_AREA .'/settings/categorias');
			}
			else
			{
				Template::set_message(lang('categorias_delete_failure') . $this->categorias_model->error, 'error');
			}
		}
		Template::set('categorias', $this->categorias_model->find($id));
		Template::set('toolbar_title', lang('categorias_edit') .' Categorias');
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
	private function save_categorias($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['nombre']        = $this->input->post('categorias_nombre');

		if ($type == 'insert')
		{
			$id = $this->categorias_model->insert($data);

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
			$return = $this->categorias_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------


}