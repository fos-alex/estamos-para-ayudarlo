<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class compartir extends Api_Controller
{

	public function __construct(){
		parent::__construct();
	}

	public function POST(){
		$this->load->model('users/user_model', null, true);
		$this->load->model('lista/lista_model', null, true);

		if(!array_key_exists(0, $this->PARAMETROS)){
			$this->error(400,"Los datos para compartir son incorrectos, por favor indicar la lista");
		}
		$id_lista = $this->PARAMETROS[0];
		if(!$id_lista){
			$this->error(401,"La lista es invalida");
		}
		$lista = $this->lista_model->find($id_lista);
		if(!$lista){
			$this->error(402,"La lista $id_lista no existe");
		}

		$usuario_datos = $this->JSON_IN;
		if(!$usuario_datos || !array_key_exists('email', $usuario_datos) ){
			$this->error(403,"Los datos para compartir son incorrectos, por favor indicar el email");
		}

		$usuario = $this->user_model->select("id")->find_by('email', $usuario_datos['email']);
		if(!$usuario){
			$this->error(404,"El usuario ".$usuario_datos['email']." no existe");	
		}
		$this->JSON_OUT->data = $this->compartirLista($id_lista,$usuario->id);
		
		
		$data_mail =  array(
				'to' => $usuario_datos['email'],
				'subject' => "Se ha compartido una lista con usted!",
				'message' => "Estimado/a<br/> El usuario XXXXXXXXX ha compartido una lista con vos.<br/>Ya puedes visualizarla en tu aplicación.<br/><br/>Atte. EPA Staff"
		);
		
		$this->sendMail($data_mail);
	}

	private function compartirLista($id_lista,$id_usuario){
		$this->load->model('lista/usuario_lista_model', null, true);

		if(!$this->usuario_lista_model->insert(array("id_lista"=>$id_lista,"id_usuario"=>$id_usuario,"permisos"=> 1)) ){
			$error_db = $this->db->_error_number();
			if($error_db == 1062){
				$this->error(405,"El usuario ya tiene esa lista");	
			}else if($error_db > 0){
				$this->error(406,"Error al compartir");	
			}	
			
		}

	}
	

	private function sendMail($mail)
	{
	
		$this->load->library('email');
		$this->load->library('emailer/emailer');
		$this->load->model('emailer/emailer_model');
	
		if (!$this->emailer->send($mail)) {
			$error = true;
		}
	
		if ($error) {
			$this->error(450, "Error al enviar email");
		}
	}
	

	
}