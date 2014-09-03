<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Lista_model extends BF_Model {

	protected $table_name	= "lista";
	protected $key			= "id";
	protected $soft_deletes	= false;
	protected $date_format	= "datetime";

	protected $log_user 	= FALSE;

	protected $set_created  = TRUE;
    protected $created_field    = 'fecha_creacion';

	protected $set_modified = TRUE;
	protected $modified_field    = 'fecha_modificacion';

	/*
		For performance reasons, you may require your model to NOT return the
		id of the last inserted row as it is a bit of a slow method. This is
		primarily helpful when running big loops over data.
	 */
	protected $return_insert_id 	= TRUE;

	// The default type of element data is returned as.
	protected $return_type 			= "object";

	//--------------------------------------------------------------------

	
}
