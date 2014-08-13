<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Migration_Install_mapas extends Migration
{
	/**
	 * The name of the database table
	 *
	 * @var String
	 */
	private $table_name = 'mapas';

	/**
	 * The table's fields
	 *
	 * @var Array
	 */
	private $fields = array(
		'id' => array(
			'type' => 'INT',
			'constraint' => 11,
			'auto_increment' => TRUE,
		),
		'text' => array(
			'type' => 'VARCHAR',
			'constraint' => 1000,
			'null' => FALSE,
		),
		'id_super' => array(
			'type' => 'INT',
			'null' => FALSE,
		),
		'latitud' => array(
			'type' => 'FLOAT',
			'constraint' => '8',
			'null' => FALSE,
		),
		'longitud' => array(
			'type' => 'FLOAT',
			'constraint' => '8',
			'null' => FALSE,
		),
		'version' => array(
			'type' => 'INT',
			'null' => FALSE,
		),
	);

	/**
	 * Install this migration
	 *
	 * @return void
	 */
	public function up()
	{
		$this->dbforge->add_field($this->fields);
		$this->dbforge->add_key('id', true);
		$this->dbforge->create_table($this->table_name);
	}

	//--------------------------------------------------------------------

	/**
	 * Uninstall this migration
	 *
	 * @return void
	 */
	public function down()
	{
		$this->dbforge->drop_table($this->table_name);
	}

	//--------------------------------------------------------------------

}