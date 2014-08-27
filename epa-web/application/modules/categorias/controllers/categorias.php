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
			$this->load->model('categorias_model', null, true);
			$categoria = $this->categorias_model->find($id_categoria);
			if(!$categoria){
				$this->error(404,"Categora inexistente");
			}
			$this->load->model('productos/productos_model', null, true);
			$categoria->productos = $this->productos_model->where('id_categoria',$id_categoria)->find_all();
			$this->JSON_OUT->data = $categoria; 
		}else{
			//TODAS LAS CATEGORIAS
			$this->load->model('categorias_model', null, true);
			$categorias = $this->categorias_model->find_all();
			$this->JSON_OUT->data = $categorias;
		}
				
	}




}