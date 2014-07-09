<?

	$method = "GET";
	$url = "http://local.epaweb/app/productos/";
	//$url = "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app/lista";

$data = array( 
                "nombre" => "Lista con productos",
                "descripcion" => "Esta va con productos",
                "productos"=>array(
                    array("id"=>1,"cantidad"=>71) ,
                    array("id"=>2,"cantidad"=>101)
                  )
                );                                                                    
$data_string = json_encode($data);  
//$data_string = "";  


if(!isset($adb_handle)) $adb_handle = curl_init();
$header = array('Content-Type: application/json','Content-Length: ' . strlen($data_string) ); 
  // Compose querry
  $options = array(
    CURLOPT_URL => $url,
    CURLOPT_CUSTOMREQUEST => $method, // GET POST PUT PATCH DELETE HEAD OPTIONS 
    CURLOPT_POSTFIELDS => $data_string,
    CURLOPT_HTTPHEADER =>  $header
  ); 

  curl_setopt_array($adb_handle,($options)); 

  // send request and wait for responce
  //$responce =  json_decode(curl_exec($adb_handle),true);
  $responce =  curl_exec($adb_handle);
  //var_dump($responce);

?>