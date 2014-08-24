<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * categorias controller
 */
class categorias extends Api_Controller
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
	}

	public function GET(){
		if(array_key_exists(0, $this->PARAMETROS)){
			//PRODUCTOS DE UNA CATEGORIA
			$id_categoria = $this->PARAMETROS[0];
			$this->load->model('productos/productos_model', null, true);
			$productos = $this->productos_model->where('id_categoria',$id_categoria)->find_all();
			$this->JSON_OUT->data = $productos; 
		}else{
			//TODAS LAS CATEGORIAS
			$this->load->model('categorias_model', null, true);
			$categorias = $this->categorias_model->find_all();
			$this->JSON_OUT->data = $categorias;
		}
				
	}




}