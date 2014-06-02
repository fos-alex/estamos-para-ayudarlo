<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_Controller extends Base_Controller
{

    //--------------------------------------------------------------------
    protected $JSON_IN;
    protected $JSON_OUT;

    protected $PARAMETROS;
    /**
     * Class constructor
     *
     */
    public function __construct()
    {
        parent::__construct();
        $content = @file_get_contents('php://input');
        $this->JSON_IN = json_decode($content,true);
        $this->JSON_OUT = new Salida();
    }
    //end __construct()


    public function index(){

        $method = $_SERVER['REQUEST_METHOD'];
        
        if(method_exists($this, $method)){
            $this->PARAMETROS = func_get_args();
            $this->$method();
            $this->success();
        }else{
            $this->error(900,"Metodo no implementado");
        }

    }

    public function error($codigo,$mensaje){
        $this->JSON_OUT->codigo=$codigo;
        $this->JSON_OUT->mensaje=$mensaje;
        die( json_encode($this->JSON_OUT) );
    }

    public function success(){
        $this->JSON_OUT->codigo=0;
        $this->JSON_OUT->mensaje="Operacion Satisfactoria";
        die( json_encode($this->JSON_OUT) );
    }
    //--------------------------------------------------------------------

}

class Salida {

    public $codigo = 0;
    public $mensaje = "";
    public $data;
    public $dataAdicional;

}