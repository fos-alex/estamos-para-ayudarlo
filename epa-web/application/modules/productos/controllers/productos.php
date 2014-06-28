<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * productos controller
 */
class productos extends Api_Controller
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
		$this->load->model('productos_model', null, true);
		$productos = $this->productos_model->find_all();
		$this->JSON_OUT->data = $productos;
	}

	public function de_lista($id_lista){
		$this->load->model('productos_lista_model', null, true);
		$productos = $this->productos_lista_model->join('productos p', 'id_producto = p.id')->find_all_by('id_lista',$id_lista);
		return empty($productos)?array():$productos;
	}

	public function para_lista($id_lista,$productos){
		$productos_actuales = $this->de_lista($id_lista);
		foreach ($productos as $key => $producto) {
			if( ($posicion = $this->existe_producto_en_lista($productos_actuales,$id_lista,$producto['id'])) !== FALSE ){
				$this->productos_lista_model
						->update( array("id_lista"=>$id_lista,"id_producto"=>$producto['id']),array("cantidad"=>$producto['cantidad']) );
				array_splice($productos_actuales,$posicion,1);
			}else{
				$this->productos_lista_model->insert(
					array("id_lista"=>$id_lista,"id_producto"=>$producto['id'],"cantidad"=>$producto['cantidad'])
				);
			}
		}
		foreach ($productos_actuales as $key => $producto) {
			$this->productos_lista_model->delete_where( array("id_lista"=>$id_lista,"id_producto"=>$producto->id) );
		}
	}

	private function existe_producto_en_lista($productos_actuales,$id_lista,$id_producto){
		
		foreach ($productos_actuales as $key => $producto) {
			if( $producto->id_lista == $id_lista && $producto->id == $id_producto) 
				return $key;
		}

		return FALSE;

	}

	
}