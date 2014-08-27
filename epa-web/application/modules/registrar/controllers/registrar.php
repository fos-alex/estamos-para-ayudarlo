<?php if (!defined('BASEPATH')) exit ('No direct script access allowed');

class Registrar extends Api_Controller
{

	
	protected $JSON_OUT;
	
    public function __construct()
    {
        parent::__construct();
    }

    public function POST()
    {
        $this->load->library('users/auth');
        $this->load->model('users/user_model');

        $data ['username'] = $this->JSON_IN['email'];
        $data ['email'] = $this->JSON_IN['email'];
        $data ['password'] = $this->JSON_IN['password'];
        $data ['active'] = 1;

        if (array_key_exists('localidad', $data)) {
            //$data ['algun campo'] = $this->JSON_IN ['localidad'];
            unset($data['localidad']);
        }

        // Cargo validaciones
        $_POST = $data;
        $this->load->library('form_validation');
        $this->form_validation->set_rules('email', 'lang:bf_email', 'required|trim|valid_email|max_length[50]|unique[users.email]');
        $this->form_validation->set_rules('username', 'lang:bf_username', 'required|trim|max_length[30]|unique[users.username]');
        $this->form_validation->set_rules('password', 'lang:bf_password', 'required|max_length[40]|valid_password');

        if ($this->form_validation->run() !== FALSE) {

            if ($user_id = $this->user_model->insert($data)) {
            	
            	$data_mail =  array(
		            'to' => $data['email'],
		            'subject' => str_replace('[SITE_TITLE]', $this->settings_lib->item('site.title'), lang('us_account_reg_complete')),
		            'message' => lang('us_account_active_login'). lang('us_account_active_login_fin'). lang('us_epa_staff')
		        );
            	
                $this->sendMail($data_mail);
                
                header('HTTP/1.1 200 Usuario creado correctamente');
                $this->JSON_OUT->data = (array("id" => $user_id));
                $this->success();
            } else {
                $this->error(1000, 'us_registration_fail');
            }

        } else {
            $this->error(455, $this->form_validation->validation_errors_list());
            
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