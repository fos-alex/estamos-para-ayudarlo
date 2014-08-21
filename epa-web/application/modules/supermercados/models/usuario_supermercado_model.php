<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_supermercado_model extends BF_Model {

	protected $table_name	= "usuario_supermercado";
	protected $key			= array("id_usuario","id_supermercado");
	protected $soft_deletes	= false;

	protected $log_user 	= FALSE;

	protected $set_created	= false;
	protected $set_modified = false;

}

?>