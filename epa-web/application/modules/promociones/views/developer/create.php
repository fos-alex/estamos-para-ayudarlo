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

if (isset($promociones))
{
	$promociones = (array) $promociones;
}
$id = isset($promociones['id']) ? $promociones['id'] : '';

?>
<div class="admin-box">
	<h3>Promociones</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<div class="control-group <?php echo form_error('id_supermercado') ? 'error' : ''; ?>">
				<?php echo form_label('Id_Supermercado', 'promociones_id_supermercado', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='promociones_id_supermercado' type='text' name='promociones_id_supermercado'  value="<?php echo set_value('promociones_id_supermercado', isset($promociones['id_supermercado']) ? $promociones['id_supermercado'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('id_supermercado'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('descripcion') ? 'error' : ''; ?>">
				<?php echo form_label('Descripcion', 'promociones_descripcion', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='promociones_descripcion' type='text' name='promociones_descripcion' maxlength="250" value="<?php echo set_value('promociones_descripcion', isset($promociones['descripcion']) ? $promociones['descripcion'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('descripcion'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('fecha_desde') ? 'error' : ''; ?>">
				<?php echo form_label('Fecha_Desde', 'promociones_fecha_desde', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='promociones_fecha_desde' type='text' name='promociones_fecha_desde'  value="<?php echo set_value('promociones_fecha_desde', isset($promociones['fecha_desde']) ? $promociones['fecha_desde'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('fecha_desde'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('fecha_hasta') ? 'error' : ''; ?>">
				<?php echo form_label('Fecha_Hasta', 'promociones_fecha_hasta', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='promociones_fecha_hasta' type='text' name='promociones_fecha_hasta'  value="<?php echo set_value('promociones_fecha_hasta', isset($promociones['fecha_hasta']) ? $promociones['fecha_hasta'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('fecha_hasta'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('promociones_action_create'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/developer/promociones', lang('promociones_cancel'), 'class="btn btn-warning"'); ?>
				
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>