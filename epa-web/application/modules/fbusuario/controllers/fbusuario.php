<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Fbusuario extends Api_Controller
{

	public function GET(){
		if(array_key_exists(0, $this->PARAMETROS)){
			$user_id = $this->PARAMETROS[0];
			$this->load->model ( 'users/user_model', null, true );
			$usuario = $this->user_model->find_by ("facebook_id",$user_id);
			if($usuario){
				$this->load->library('users/auth');
				$this->auth->login( $usuario->username , $this->getFBpass($user_id) , FALSE);
			}else{
				header('HTTP/1.1 403 Usuario inexistente');
				$this->error(403,"Usuario inexistente");
			}
		}else{
			header('HTTP/1.1 403 Usuario invalido');
			$this->error(403,"Usuario invalido");
		}
	}

	public function POST(){
		$this->load->model ( 'users/user_model', null, true );
		$fbuser = $this->JSON_IN;
		$usuario = $this->user_model->find_by ("email",$fbuser['email']);

		if($usuario){
				$set = array('facebook_id'=>$fbuser['id']);
				$this->user_model->update($usuario->id,$set);
				$this->JSON_OUT->data = (array ("id" => $usuario->id));
				$this->success();
		}else{
			$this->crearUsuario($fbuser);
		}
	}

	private function crearUsuario($fbuser){
			$this->load->library ( 'users/auth' );
			$data = array();
			$data ['username'] = $fbuser ['email'];
			$data ['email'] = $fbuser ['email'];
			$data ['password'] = $this->getFBpass($fbuser ['id']);
			$data ['facebook_id'] = $fbuser ['id'];
			$data ['active'] = 1;
			if ($user_id = $this->user_model->insert ( $data )) {
				$user_datos = "A Travez de facebook : ". $fbuser ['name']."<br/>";
				
				$data_mail = array (
						'to' => $data ['email'],
						'subject' => str_replace ( '[SITE_TITLE]', $this->settings_lib->item ( 'site.title' ), lang ( 'us_account_reg_complete' ) ),
						'message' => lang ( 'us_account_active_login' ) .$user_datos . lang ( 'us_account_active_login_fin' ) . lang ( 'us_epa_staff' ) 
				);
				$this->sendMail ( $data_mail );
				
				header ( 'HTTP/1.1 200 Usuario creado correctamente' );
				$this->JSON_OUT->data = (array ("id" => $user_id));
				$this->success();
			} else {
				$this->JSON_OUT->dataAdicional = $data;
				$this->error ( 411, "Ha ocurrido un error al registrar usuario. Intente nuevamente más tarde" );
			}
		
		
	}

	private function sendMail($mail) {
		$this->load->library ( 'email' );
		$this->load->library ( 'emailer/emailer' );
		$this->load->model ( 'emailer/emailer_model' );
		
		if (! $this->emailer->send ( $mail )) {
			$error = true;
		}
		
		if ($error) {
			$this->error ( 450, "Error al enviar email" );
		}
	}

	private function getFBpass($user_id){
		return substr($user_id, 0, 8);
	}
}