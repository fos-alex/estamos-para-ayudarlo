<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Lista extends Api_Controller
{

	public function __construct(){
		$this->load->library ( 'users/auth' );

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

			$lista = $this->lista_model->find($id);

			if(!$lista){
				$this->error(404,"La lista $id no existe");
			}
			
// 			if((int)$lista->bloqueada == 1){
// 				$this->error(410,"La lista $lista->nombre esta siendo modificada");
// 			}
			
// 			$data['bloqueada'] = 1;
// 			$this->lista_model->update($id,$data);
			
			$lista->productos = Modules::run('productos/de_lista',$id);
			return $lista;
	}	

	private function obtenerListas(){
			$this->load->model('lista_model', null, true);
			$this->load->model('usuario_lista_model', null, true);

			$id_usuario = $this->current_user->id;
			$listas = $this->usuario_lista_model->join('lista l', 'id_lista = l.id')->find_all_by('id_usuario',$id_usuario);
				
			if($listas){
				foreach ($listas as $key => $lista) {
					//Ver con pablo como sacar estas cosas para no mandar data de mas!!!!!!!
// 					$lista = (array)$lista;
// 					unset($lista['permisos']);
// 					unset($lista['id_usuario']);
// 					unset($lista['id_lista']);
// 					$lista = (object)$lista;
					
					$lista->productos = Modules::run('productos/de_lista',$lista->id);
				}
			}
			//var_dump($listas);
						
			return $listas;
	}	

	private function crearLista($lista){
			$this->load->model('lista_model', null, true);
			$this->load->model('usuario_lista_model', null, true);
			
			$productos = array();
			if(array_key_exists('productos', $lista)){
				$productos = $lista['productos'];
				unset($lista['productos']);
			}
			
			$id = $this->lista_model->insert($lista);
			
			$id_usuario = $this->current_user->id;

			//necesito saber el usuario asi le asigno permisos de creador
			$this->usuario_lista_model->insert(array("id_lista"=>$id,"id_usuario"=>$id_usuario,"permisos"=> 0));
			
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

// 			$lista['bloqueada'] = 0;
			
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
			$this->load->model('usuario_lista_model', null, true);
			$this->load->model('productos/productos_lista_model', null, true);

			$id_usuario = $this->current_user->id;
			
			$lista = $this->lista_model->find($id);
			
			if($this->usuario_lista_model->find_all_by(array('id_usuario'=>$id_usuario,'id_lista'=>$id,'permisos'=>0)))
			{
				
				//Si borro una lista
					//Borro los productos de esa lista
					//Borro los permisos asociados de esa lista
				if($this->lista_model->delete($id)){
					$this->productos_lista_model->delete_where(array('id_lista'=>$id));
					$this->usuario_lista_model->delete_where(array('id_lista'=>$id));
					
					return array("id"=>$id);
				}else{
					$this->error(407,"Error eliminando la lista $lista->nombre");	
				}
			}
			else
				$this->error(407,"No tiene permisos para borrar la lista $lista->nombre");
	}
}
