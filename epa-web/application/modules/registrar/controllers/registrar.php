<?php if (! defined ( 'BASEPATH' ))	exit ( 'No direct script access allowed' );

class Registrar extends Api_Controller {
	public function __construct() {
		parent::__construct ();
	}
	public function POST() {
		$this->load->library ( 'users/auth' );
		$this->load->model ( 'users/user_model' );
		
		$usuario_registro = $this->JSON_IN;
		$data ['username'] = $usuario_registro ['email'];
		$data ['email'] = $usuario_registro ['email'];
		$data ['password'] = $usuario_registro ['password'];
		$data ['active'] = 1;
		
		$this->controlarValidaciones ( $data );
		
		if ($user_id = $this->user_model->insert ( $data )) {
			
			$user_datos = "NOMBRE DE USUARIO: ". $data ['username']."<br/>CONTRASEÑA: ".$data ['password']."<br/>";
			
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
			$this->error ( 409, "Ha ocurrido un error al registrar usuario. Intente nuevamente más tarde" );
		}
	}
	private function controlarValidaciones($data) {
		if (! $data || !isset($data['email']) || !isset($data['password'])) {
			$this->error ( 405, "Debe ingresar datos obligatorios" );
		}
		
		$_POST = $data;
		$this->load->library ( 'form_validation' );
		
		$this->form_validation->set_rules ( 'email', 'lang:bf_email', 'trim|valid_email' );
		if (! ($this->form_validation->run () !== FALSE)) {
			$this->error ( 406, "El formato de correo electronico ingresado es incorrecto" );
		}
		
		$this->form_validation->set_rules ( 'email', 'lang:bf_email', 'unique[users.email]' );
		if (! ($this->form_validation->run () !== FALSE)) {
			$this->error ( 407, "Ya existe un usuario con ese correo electronico" );
		}

		$this->form_validation->set_rules('password', 'lang:bf_password', 'min_length[6]|max_length[40]');
		if (! ($this->form_validation->run () !== FALSE) || ! $this->password_correcta ( $data ['password'] )) {
			$this->error ( 408, "Formato de clave incorrecto. Debe ser alfanumerica entre 6 y 40 caracteres y contener al menos 1 letra y 1 numero" );
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
	public function password_correcta($str) {
		if (0 === preg_match ( '/[0-9]/', $str ) || 0 === preg_match ( '/[a-z]/', $str )) {
			return FALSE;
		}
		return TRUE;
	}
}