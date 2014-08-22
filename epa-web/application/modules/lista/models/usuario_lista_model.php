<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_lista_model extends BF_Model {

	protected $table_name	= "usuario_lista";
	protected $key			= "id_usuario";
	protected $soft_deletes	= false;
	protected $date_format	= "datetime";

	protected $log_user 	= FALSE;

	protected $set_created  = FALSE;
    protected $created_field    = 'fecha_creacion';

	protected $set_modified = false;

	/*
		For performance reasons, you may require your model to NOT return the
		id of the last inserted row as it is a bit of a slow method. This is
		primarily helpful when running big loops over data.
	 */
	protected $return_insert_id 	= FALSE;

	// The default type of element data is returned as.
	protected $return_type 			= "object";

	//--------------------------------------------------------------------

	
}