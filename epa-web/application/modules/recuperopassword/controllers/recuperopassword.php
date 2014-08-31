<?php if (! defined ( 'BASEPATH' ))	exit ( 'No direct script access allowed' );

class RecuperoPassword extends Api_Controller {
	public function __construct() {
		parent::__construct ();
	}
	public function POST() {
		$this->load->library ( 'users/auth' );
		$this->load->model ( 'users/user_model' );
		
		$data['email'] = $this->JSON_IN['email'];
		$this->validarMail ($data);
		
		$user = $this->user_model->find_by ('email', $data['email']);
		if (!$user)
			$this->error ( 405, "El email ingresado no esta registrado");
		
		//todo generar un password random
		
		$random_pass = '123456b';
		$password = $this->auth->hash_password($random_pass);
		$new_password['password_hash']	= $password['hash'];
		$new_password['password_iterations']	= $password['iterations'];
		
		if ($user_id = $this->user_model->update ($user->id,$new_password))
			{
				$this->sendMail($data['email'],$random_pass);
				
				$this->JSON_OUT->data = (array ("id" => $user->id));
				$this->success();
			}
		else
			{
				$this->error ( 406, "No se ha podido cambiar reiniciar su contraseña. Por favor intente mas tarde");
			} 
		
	}
	
	
	private function validarMail($data) {
		if (! $data || !isset($data['email'])) {
			$this->error ( 405, "Debe ingresar su mail" );
		}
		
		$_POST = $data;
		$this->load->library ( 'form_validation' );
		
		$this->form_validation->set_rules ( 'email', 'lang:bf_email', 'trim|valid_email' );
		if (! ($this->form_validation->run () !== FALSE)) {
			$this->error ( 406, "El formato de correo electronico ingresado es incorrecto" );
		}
		
	}
	
	private function sendMail($email,$new_pass) {
		$this->load->library ( 'email' );
		$this->load->library ( 'emailer/emailer' );
		$this->load->model ( 'emailer/emailer_model' );
		
		$user_datos = "NOMBRE DE USUARIO: ". $email."<br/>NUEVA CLAVE: ".$new_pass."<br/>";
			
		$data_mail = array (
				'to' => $email,
				'subject' => 'Reinicializacion de su clave',
				'message' => $user_datos. lang ( 'us_epa_staff' )
		);
		
		if (! $this->emailer->send ( $data_mail )) {
			$error = true;
		}
		
		if ($error) {
			$this->error ( 450, "Error al enviar email" );
		}
		
	}
}