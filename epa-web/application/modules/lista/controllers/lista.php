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
			
			//aca deberia bloquearla para q nadie mas la pueda tocar  bloqueado = 1
			
			
			$lista->productos = Modules::run('productos/de_lista',$id);
			return $lista;
	}	

	private function obtenerListas(){
			$this->load->model('lista_model', null, true);
			$this->load->model('usuario_lista_model', null, true);
			$this->load->library ( 'users/auth' );

			$listas;
			if ($id_usuario = $this->auth->user_id( )) //Si se quu usuario es
				$listas = $this->usuario_lista_model->join('lista l', 'id_lista = l.id')->find_all_by('id_usuario',$id_usuario);
			else
				$listas = $this->lista_model->find_all();
				
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
			$this->load->library ( 'users/auth' );
			
			$productos = array();
			if(array_key_exists('productos', $lista)){
				$productos = $lista['productos'];
				unset($lista['productos']);
			}
			
			$id = $this->lista_model->insert($lista);
			
			//TODO boletear esto una vez q sepa el user
			$id_usuario = 1;
			if ($this->auth->user_id( ))
				$id_usuario = $this->auth->user_id( );

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

			//aca deberia desbloquear la lista  bloqueado = 0
			
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
			$this->load->library ( 'users/auth' );

			//solo borrar si es el creador
			$id_usuario = 101;
			if ($this->auth->user_id( ))
				$id_usuario = $this->auth->user_id( );
			
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
