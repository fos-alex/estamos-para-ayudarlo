<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class App extends Front_Controller
{

	public function __construct(){
		parent::__construct();
		$this->load->library('users/auth');
	}

	public function login(){
		$post = @file_get_contents('php://input');
		$json = json_decode($post,true);
		if ($this->auth->login( $json['username'] , $json['password'] , FALSE) === TRUE){
			header('HTTP/1.1 200 Login Successful');
		}else{
			header('HTTP/1.1 403 Login Invalid');
		}		
	}

}