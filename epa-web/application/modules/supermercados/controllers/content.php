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

		$this->auth->restrict('Supermercados.Content.View');
		$this->load->model('supermercados_model', null, true);
		$this->lang->load('supermercados');
		
		Template::set_block('sub_nav', 'content/_sub_nav');

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
		$this->load->model('users/user_model');
		$this->auth->restrict('Supermercados.Content.Create');

		if (isset($_POST['save']))
		{
			if ($insert_id = $this->save_supermercados())
			{
				// Log the activity
				log_activity($this->current_user->id, lang('supermercados_act_create_record') .': '. $insert_id .' : '. $this->input->ip_address(), 'supermercados');

				Template::set_message(lang('supermercados_create_success'), 'success');
				redirect(SITE_AREA .'/content/supermercados');
			}
			else
			{
				Template::set_message(lang('supermercados_create_failure') . $this->supermercados_model->error, 'error');
			}
		}
		Assets::add_module_js('supermercados', 'supermercados.js');
		
		$this->user_model->select('users.id as id, display_name as label');
		$where = array('users.deleted' => 0);
		$where['users.role_id'] = 7;
		$this->user_model->where($where);
		$usuarios = $this->user_model->find_all();
		Template::set('usuarios',$usuarios);

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
		$this->load->model('supermercados/usuario_supermercado_model');
		$this->load->model('users/user_model');

		$id = $this->uri->segment(5);

		if (empty($id))
		{
			Template::set_message(lang('supermercados_invalid_id'), 'error');
			redirect(SITE_AREA .'/content/supermercados');
		}

		if (isset($_POST['save']))
		{
			$this->auth->restrict('Supermercados.Content.Edit');

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
			$this->auth->restrict('Supermercados.Content.Delete');

			if ($this->supermercados_model->delete($id))
			{
				// Log the activity
				log_activity($this->current_user->id, lang('supermercados_act_delete_record') .': '. $id .' : '. $this->input->ip_address(), 'supermercados');

				Template::set_message(lang('supermercados_delete_success'), 'success');

				redirect(SITE_AREA .'/content/supermercados');
			}
			else
			{
				Template::set_message(lang('supermercados_delete_failure') . $this->supermercados_model->error, 'error');
			}
		}

		$usuarios = $this->user_model->select("id,username")->find_all_by("role_name","super");
		$usuarios_select = form_options_array("id","username",$usuarios,array( 0=>"" ));
		$id_usuario = $this->usuario_supermercado_model->select("id_usuario")->find_by("id_supermercado",$id);
		$id_usuario_select = ( is_object($id_usuario) )?$id_usuario->id_usuario:0;
		Template::set('supermercados', $this->supermercados_model->find($id));
		Template::set('id_usuario', $id_usuario_select);
		Template::set('usuarios', $usuarios_select);
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
		//$data['id_usuario']        = $this->input->post('supermercados_id_usuario');

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
			$this->usuario_supermercado_model->delete_where(array("id_supermercado"=>$id));
			$this->usuario_supermercado_model->insert(array("id_supermercado"=>$id,"id_usuario"=>$this->input->post('supermercados_id_usuario')));
		}

		return $return;
	}

	//--------------------------------------------------------------------


}