<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class App extends Front_Controller
{

	public function __construct(){
		parent::__construct();
		$this->load->library('users/auth');
	}

	public function login(){
		if ($this->auth->login($this->input->post('username'), $this->input->post('password'), FALSE) === TRUE){
			header('HTTP/1.1 200 Login Successful');
		}else{
			header('HTTP/1.1 403 Login Invalid');
		}		
	}

}