<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Migration_Install_productosdetalle extends Migration
{
	/**
	 * The name of the database table
	 *
	 * @var String
	 */
	private $table_name = 'productosdetalle';

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
		'id_producto' => array(
			'type' => 'INT',
			'null' => FALSE,
		),
		'Supermercado' => array(
			'type' => 'INT',
			'null' => FALSE,
		),
		'presentacion' => array(
			'type' => 'VARCHAR',
			'constraint' => 100,
			'null' => FALSE,
		),
		'marca' => array(
			'type' => 'VARCHAR',
			'constraint' => 100,
			'null' => FALSE,
		),
		'precio' => array(
			'type' => 'FLOAT',
			'constraint' => '10',
			'null' => FALSE,
		),
		'descripcion' => array(
			'type' => 'VARCHAR',
			'constraint' => 255,
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