<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class App extends Front_Controller
{

	private $JSON_IN;

	public function __construct(){
		parent::__construct();
		$this->load->library('users/auth');
		$post = @file_get_contents('php://input');
		$this->JSON_IN = json_decode($post,true);
	}

	public function login(){
		$json = $this->JSON_IN;
		if ($this->auth->login( $json['username'] , $json['password'] , FALSE) === TRUE){
			header('HTTP/1.1 200 Login Successful');
		}else{
			header('HTTP/1.1 403 Login Invalid');
		}		
	}

	public function lista($id){
		
		if($_SERVER['REQUEST_METHOD'] == 'GET'){
			$respuesta = (object)array();
			$respuesta->codigo=0;
			$respuesta->mensaje="Operacion Satisfactoria";
			$lista = (object)array();
			$lista->id=$id;
			$lista->nombre="Prueba";
			$productos = array();
			$producto = (object)array();
			$producto->id = 12;
			$producto->nombre = "LECHE";
			$producto->descripcion = "LECHE ENTERA";
			array_push($productos,$producto);
			$lista->productos=$productos;
			$respuesta->data=$lista;
			$respuesta->data_adicional=(object)array();
			die(json_encode($respuesta));
		}
		
	}


}