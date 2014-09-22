<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Productos_detalle_compra_model extends BF_Model {

    protected $table_name	= "productos_detalle_compra";
    protected $key			= "id";
    protected $soft_deletes	= false;
    protected $date_format	= "datetime";

    protected $log_user 	= FALSE;

    protected $set_created  = FALSE;

    protected $set_modified = FALSE;

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