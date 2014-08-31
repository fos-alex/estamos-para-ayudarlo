<?
$app =& get_instance();
$app->load->library('phpexcel');

class LectorExcel{

	private $tipos;
	private $ci;
	private $objPHPExcel;

	function __construct($tipos){
		$this->tipos = $tipos;
	}

	public function cargar($ruta){
		$this->objPHPExcel = PHPExcel_IOFactory::load($ruta);
	}

	public function obtenerFilas(){
		$filas = array();
		$sheet = $this->objPHPExcel->getSheet(0); 
		$highestRow = $sheet->getHighestRow(); 
		$highestColumn = $sheet->getHighestColumn();

		for ($row = 2; $row <= $highestRow; $row++){ 
		    $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,
		                                    NULL,
		                                    TRUE,
		                                    FALSE);
		    $fila = array();
		    foreach ($this->tipos as $key => $value) {
		    	$fila[$value] = ($rowData[0][$key])?$rowData[0][$key]:'';
		    }
		    array_push($filas, $fila);
		}

		return $filas;
	}

}

?>