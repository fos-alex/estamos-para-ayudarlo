<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Fbusuario extends Api_Controller
{

	public function GET(){
		if(array_key_exists(0, $this->PARAMETROS)){
			$user_id = $this->PARAMETROS[0];
			$this->load->model ( 'users/user_model', null, true );
			$usuario = $this->user_model->find_by ("facebook_id",$user_id);
			if($usuario){

			}else{
				$this->error(403,"Usuario inexistente");
			}
		}else{
			$this->error(403,"Usuario inexistente");
		}
	}

	public function POST(){
		$this->load->library('users/auth');
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