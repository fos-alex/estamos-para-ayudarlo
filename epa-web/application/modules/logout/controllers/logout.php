<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Logout extends Api_Controller
{
	public function POST(){

		$this->load->library('users/auth');
		$this->auth->logout();
		header('HTTP/1.1 200 Sesion Cerrada');
		$this->success();
		
	}
}
