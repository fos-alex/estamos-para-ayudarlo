<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Migration_Install_mapas_permissions extends Migration
{

	/**
	 * Permissions to Migrate
	 *
	 * @var Array
	 */
	private $permission_values = array(
		array(
			'name' => 'Mapas.Content.View',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Content.Create',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Content.Edit',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Content.Delete',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Reports.View',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Reports.Create',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Reports.Edit',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Reports.Delete',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Settings.View',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Settings.Create',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Settings.Edit',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Settings.Delete',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Developer.View',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Developer.Create',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Developer.Edit',
			'description' => '',
			'status' => 'active',
		),
		array(
			'name' => 'Mapas.Developer.Delete',
			'description' => '',
			'status' => 'active',
		),
	);

	/**
	 * The name of the permissions table
	 *
	 * @var String
	 */
	private $table_name = 'permissions';

	/**
	 * The name of the role/permissions ref table
	 *
	 * @var String
	 */
	private $roles_table = 'role_permissions';

	//--------------------------------------------------------------------

	/**
	 * Install this migration
	 *
	 * @return void
	 */
	public function up()
	{
		$role_permissions_data = array();
		foreach ($this->permission_values as $permission_value)
		{
			$this->db->insert($this->table_name, $permission_value);

			$role_permissions_data[] = array(
				'role_id' => '1',
				'permission_id' => $this->db->insert_id(),
			);
		}

		$this->db->insert_batch($this->roles_table, $role_permissions_data);
	}

	//--------------------------------------------------------------------

	/**
	 * Uninstall this migration
	 *
	 * @return void
	 */
	public function down()
	{
		foreach ($this->permission_values as $permission_value)
		{
			$query = $this->db->select('permission_id')
				->get_where($this->table_name, array('name' => $permission_value['name'],));

			foreach ($query->result() as $row)
			{
				$this->db->delete($this->roles_table, array('permission_id' => $row->permission_id));
			}

			$this->db->delete($this->table_name, array('name' => $permission_value['name']));
		}
	}

	//--------------------------------------------------------------------

}