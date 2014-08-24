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

		$this->auth->restrict('ProductosDetalle.Content.View');
		$this->load->model('productosdetalle_model', null, true);
		$this->lang->load('productosdetalle');
		
		Template::set_block('sub_nav', 'content/_sub_nav');

		Assets::add_module_js('productosdetalle', 'productosdetalle.js');
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
					$result = $this->productosdetalle_model->delete($pid);
				}

				if ($result)
				{
					Template::set_message(count($checked) .' '. lang('productosdetalle_delete_success'), 'success');
				}
				else
				{
					Template::set_message(lang('productosdetalle_delete_failure') . $this->productosdetalle_model->error, 'error');
				}
			}
		}

		$records = $this->productosdetalle_model->find_all();

		Template::set('records', $records);
		Template::set('toolbar_title', 'Manage productosDetalle');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Creates a productosDetalle object.
	 *
	 * @return void
	 */
	public function create()
	{
		$this->auth->restrict('ProductosDetalle.Content.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_productosdetalle())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('productosdetalle_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'productosdetalle');

				Template::set_message(lang('productosdetalle_create_success'), 'success');
				redirect(SITE_AREA .'/content/productosdetalle');
			}
			else
			{
				Template::set_message(lang('productosdetalle_create_failure') . $this->productosdetalle_model->error, 'error');
			}
		}
		Assets::add_module_js('productosdetalle', 'productosdetalle.js');

		Template::set('toolbar_title', lang('productosdetalle_create') . ' productosDetalle');
		Template::render();
	}

	//--------------------------------------------------------------------


	/**
	 * Allows editing of productosDetalle data.
	 *
	 * @return void
	 */
	public function edit()
	{
		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('productosdetalle_invalid_id'), 'error');
			redirect(SITE_AREA .'/content/productosdetalle');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('ProductosDetalle.Content.Edit');

			if ($this->save_productosdetalle('update', $id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('productosdetalle_act_edit_record') .': '. $id .' : '. $this->input->ip_address(), 'productosdetalle');

				Template::set_message(lang('productosdetalle_edit_success'), 'success');
			}
			else
			{
				Template::set_message(lang('productosdetalle_edit_failure') . $this->productosdetalle_model->error, 'error');
			}
		}
		else if (isset($_POST['delete']))
		{
			$this->auth->restrict('ProductosDetalle.Content.Delete');

			if ($this->productosdetalle_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('productosdetalle_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'productosdetalle');

				Template::set_message(lang('productosdetalle_delete_success'), 'success');

				redirect(SITE_AREA .'/content/productosdetalle');
			}
			else
			{
				Template::set_message(lang('productosdetalle_delete_failure') . $this->productosdetalle_model->error, 'error');
			}
		}
		Template::set('productosdetalle', $this->productosdetalle_model->find($id));
		Template::set('toolbar_title', lang('productosdetalle_edit') .' productosDetalle');
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
	private function save_productosdetalle($type='insert', $id=0)
	{
		if ($type == 'update')
		{
			$_POST['id'] = $id;
		}

		// make sure we only pass in the fields we want
		
		$data = array();
		$data['id_producto']        = $this->input->post('productosdetalle_id_producto');
		$data['Supermercado']        = $this->input->post('productosdetalle_Supermercado');
		$data['presentacion']        = $this->input->post('productosdetalle_presentacion');
		$data['marca']        = $this->input->post('productosdetalle_marca');
		$data['precio']        = $this->input->post('productosdetalle_precio');
		$data['descripcion']        = $this->input->post('productosdetalle_descripcion');

		if ($type == 'insert')
		{
			$id = $this->productosdetalle_model->insert($data);

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
			$return = $this->productosdetalle_model->update($id, $data);
		}

		return $return;
	}

	//--------------------------------------------------------------------


}