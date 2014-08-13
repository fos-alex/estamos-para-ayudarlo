<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * reports controller
 */
class reports extends Admin_Controller
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

		$this->auth->restrict('Mapas.Reports.View');
		$this->load->model('mapas_model', null, true);
		$this->lang->load('mapas');
		
		Template::set_block('sub_nav', 'reports/_sub_nav');

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

		// Deleting anything?
		if (isset($_POST['delete']))
		{
			$checked = $this->input->post('checked');

			if (is_array($checked) && count($checked))
			{
				$result = FALSE;
				foreach ($checked as $pid)
				{
					$result = $this->mapas_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('mapas_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('mapas_delete_failure') . $this->mapas_model->error, 'error');
				}
			}
		}

		$records = $this->mapas_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage Mapas');
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
		$this->auth->restrict('Mapas.Reports.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_mapas())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('mapas_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'mapas');

				Template::set_message(lang('mapas_create_success'), 'success');
				redirect(SITE_AREA .'/reports/mapas');
			}
			else
			{
				Template::set_message(lang('mapas_create_failure') . $this->mapas_model->error, 'error');
			}
		}
		Assets::add_module_js('mapas', 'mapas.js');

		Template::set('toolbar_title', lang('mapas_create') . ' Mapas');
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
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('mapas_invalid_id'), 'error');
			redirect(SITE_AREA .'/reports/mapas');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('Mapas.Reports.Edit');

			if ($this->save_mapas('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('mapas_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'mapas');

				Template::set_message(lang('mapas_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('mapas_edit_failure') . $this->mapas_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('Mapas.Reports.Delete');

			if ($this->mapas_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('mapas_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'mapas');

				Template::set_message(lang('mapas_delete_success'), 'success');

				redirect(SITE_AREA .'/reports/mapas');
			}
			else
			{
				Template::set_message(lang('mapas_delete_failure') . $this->mapas_model->error, 'error');
			}
		}
		Template::set('mapas', $this->mapas_model->find($id));
		Template::set('toolbar_title', lang('mapas_edit') .' Mapas');
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
	private function save_mapas($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['text']        = $this->input->post('mapas_text');
		$data['id_super']        = $this->input->post('mapas_id_super');
		$data['latitud']        = $this->input->post('mapas_latitud');
		$data['longitud']        = $this->input->post('mapas_longitud');
		$data['version']        = $this->input->post('mapas_version');

		if ($type == 'insert')
		{
			$id = $this->mapas_model->insert($data);

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
			$return = $this->mapas_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------


}