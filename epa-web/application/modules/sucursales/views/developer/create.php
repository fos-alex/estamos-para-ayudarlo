<?php

$validation_errors = validation_errors();

if ($validation_errors) :
?>
<div class="alert alert-block alert-error fade in">
	<a class="close" data-dismiss="alert">&times;</a>
	<h4 class="alert-heading">Please fix the following errors:</h4>
	<?php echo $validation_errors; ?>
</div>
<?php
endif;

if (isset($sucursales))
{
	$sucursales = (array) $sucursales;
}
$id = isset($sucursales['id']) ? $sucursales['id'] : '';

?>
<div class="admin-box">
	<h3>sucursales</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<div class="control-group <?php echo form_error('id_supermercado') ? 'error' : ''; ?>">
				<?php echo form_label('Supermercado'. lang('bf_form_label_required'), 'sucursales_id_supermercado', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='sucursales_id_supermercado' type='text' name='sucursales_id_supermercado'  value="<?php echo set_value('sucursales_id_supermercado', isset($sucursales['id_supermercado']) ? $sucursales['id_supermercado'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('id_supermercado'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('nombre') ? 'error' : ''; ?>">
				<?php echo form_label('Nombre'. lang('bf_form_label_required'), 'sucursales_nombre', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='sucursales_nombre' type='text' name='sucursales_nombre' maxlength="50" value="<?php echo set_value('sucursales_nombre', isset($sucursales['nombre']) ? $sucursales['nombre'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('nombre'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('direccion') ? 'error' : ''; ?>">
				<?php echo form_label('Direccion'. lang('bf_form_label_required'), 'sucursales_direccion', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='sucursales_direccion' type='text' name='sucursales_direccion' maxlength="500" value="<?php echo set_value('sucursales_direccion', isset($sucursales['direccion']) ? $sucursales['direccion'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('direccion'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('coordenadas') ? 'error' : ''; ?>">
				<?php echo form_label('Coordenadas'. lang('bf_form_label_required'), 'sucursales_coordenadas', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='sucursales_coordenadas' type='text' name='sucursales_coordenadas' maxlength="100" value="<?php echo set_value('sucursales_coordenadas', isset($sucursales['coordenadas']) ? $sucursales['coordenadas'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('coordenadas'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('sucursales_action_create'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/developer/sucursales', lang('sucursales_cancel'), 'class="btn btn-warning"'); ?>
				
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>