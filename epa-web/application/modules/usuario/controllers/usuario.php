<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Usuario extends Api_Controller
{
	public function __construct(){
		$this->load->library ( 'users/auth' );
		parent::__construct();
	}
	
	public function GET(){
		$this->load->model ( 'users/user_model' );
		
		if( $this->current_user ){
			$id_usuario = $this->current_user->id;
			$usuario = $this->user_model->find($id_usuario);
			$this->JSON_OUT->data = $usuario;
		}else{
			$this->error(403,"Usuario no logueado");
		}		
	}

	public function POST(){
		$json = $this->JSON_IN;
		if ($this->auth->login( $json['username'] , $json['password'] , FALSE) === TRUE){
			header('HTTP/1.1 200 Usuario Correcto');
			die();
		}else{
			header('HTTP/1.1 403 Usuario Invalido');
			die();
		}		
	}

}