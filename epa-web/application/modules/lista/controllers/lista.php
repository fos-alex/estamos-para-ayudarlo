<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Lista extends Api_Controller
{

	public function __construct(){
		parent::__construct();
	}

	public function GET(){
		
		if(array_key_exists(0, $this->PARAMETROS)){
			//UNA LISTA
			$id_lista = $this->PARAMETROS[0];
			$this->JSON_OUT->data = $this->obtenerLista($id_lista); 
		}else{
			//TODAS
			$this->JSON_OUT->data = $this->obtenerListas(); 
		}
		
	}

	public function POST(){
		$this->JSON_OUT->data = $this->crearLista($this->JSON_IN); 
	}

	public function PUT(){
		if(array_key_exists(0, $this->PARAMETROS)){
			$this->JSON_OUT->data = $this->modificarLista($this->PARAMETROS[0],$this->JSON_IN); 
		}else{
			$this->error(405,"Falta parametro");
		}
		
	}

	public function DELETE(){
		if(array_key_exists(0, $this->PARAMETROS)){
			$this->JSON_OUT->data = $this->eliminarLista($this->PARAMETROS[0]); 
		}else{
			$this->error(405,"Falta parametro");
		}
		
	}

	private function obtenerLista($id){
			$this->load->model('lista_model', null, true);
			$this->load->library ( 'users/auth' );

			$lista = $this->lista_model->find($id);

			if(!$lista){
				$this->error(404,"La lista $id no existe");
			}
			
			//var_dump($this->auth->user_id( ));
		
			$lista->productos = Modules::run('productos/de_lista',$id);
			return $lista;
	}	

	private function obtenerListas(){
			$this->load->model('lista_model', null, true);

			$listas = $this->lista_model->find_all();
			if($listas){
				foreach ($listas as $key => $lista) {
					$lista->productos = Modules::run('productos/de_lista',$lista->id);
				}
			}
						
			return $listas;
	}	

	private function crearLista($lista){
			$this->load->model('lista_model', null, true);
			$productos = array();
			if(array_key_exists('productos', $lista)){
				$productos = $lista['productos'];
				unset($lista['productos']);
			}
			
			$id = $this->lista_model->insert($lista);
			Modules::run('productos/para_lista',$id,$productos);
			return array("id"=>$id);
	}	

	private function modificarLista($id,$lista){
			$this->load->model('lista_model', null, true);
			$productos = array();
			if(array_key_exists('productos', $lista)){
				$productos = $lista['productos'];
				unset($lista['productos']);
			}
			
			if($this->lista_model->update($id,$lista)){
                Modules::run('productos/cantidad_de_productos_validas',$productos);
				Modules::run('productos/para_lista',$id,$productos);
				return array("id"=>$id);
			}else{
				$this->error(406,"Error modificando la lista $id");	
			}

	}	

	private function eliminarLista($id){
			$this->load->model('lista_model', null, true);

			if($this->lista_model->delete($id)){
				return array("id"=>$id);
			}else{
				$this->error(407,"Error eliminando la lista $id");	
			}

	}
}
