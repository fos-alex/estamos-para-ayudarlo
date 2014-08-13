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

		$this->auth->restrict('Promociones.Reports.View');
		$this->load->model('promociones_model', null, true);
		$this->lang->load('promociones');
		
			Assets::add_css('flick/jquery-ui-1.8.13.custom.css');
			Assets::add_js('jquery-ui-1.8.13.min.js');
		Template::set_block('sub_nav', 'reports/_sub_nav');

		Assets::add_module_js('promociones', 'promociones.js');
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
					$result = $this->promociones_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('promociones_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('promociones_delete_failure') . $this->promociones_model->error, 'error');
				}
			}
		}

		$records = $this->promociones_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage Promociones');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Creates a Promociones object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('Promociones.Reports.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_promociones())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('promociones_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'promociones');

				Template::set_message(lang('promociones_create_success'), 'success');
				redirect(SITE_AREA .'/reports/promociones');
			}
			else
			{
				Template::set_message(lang('promociones_create_failure') . $this->promociones_model->error, 'error');
			}
		}
		Assets::add_module_js('promociones', 'promociones.js');

		Template::set('toolbar_title', lang('promociones_create') . ' Promociones');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of Promociones data.
	 *
	 * @return void
	 */
	public function edit()
	{
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('promociones_invalid_id'), 'error');
			redirect(SITE_AREA .'/reports/promociones');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('Promociones.Reports.Edit');

			if ($this->save_promociones('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('promociones_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'promociones');

				Template::set_message(lang('promociones_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('promociones_edit_failure') . $this->promociones_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('Promociones.Reports.Delete');

			if ($this->promociones_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('promociones_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'promociones');

				Template::set_message(lang('promociones_delete_success'), 'success');

				redirect(SITE_AREA .'/reports/promociones');
			}
			else
			{
				Template::set_message(lang('promociones_delete_failure') . $this->promociones_model->error, 'error');
			}
		}
		Template::set('promociones', $this->promociones_model->find($id));
		Template::set('toolbar_title', lang('promociones_edit') .' Promociones');
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
	private function save_promociones($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['id_supermercado']        = $this->input->post('promociones_id_supermercado');
		$data['descripcion']        = $this->input->post('promociones_descripcion');
		$data['fecha_desde']        = $this->input->post('promociones_fecha_desde') ? $this->input->post('promociones_fecha_desde') : '0000-00-00';
		$data['fecha_hasta']        = $this->input->post('promociones_fecha_hasta') ? $this->input->post('promociones_fecha_hasta') : '0000-00-00';

		if ($type == 'insert')
		{
			$id = $this->promociones_model->insert($data);

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
			$return = $this->promociones_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------


}