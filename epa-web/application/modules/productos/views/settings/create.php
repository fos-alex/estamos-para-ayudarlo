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

if (isset($productos))
{
	$productos = (array) $productos;
}
$id = isset($productos['id']) ? $productos['id'] : '';

?>
<div class="admin-box">
	<h3>productos</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<?php // Change the values in this array to populate your dropdown as required
				$options = array(
				);

				echo form_dropdown('productos_Categoria', $options, set_value('productos_Categoria', isset($productos['Categoria']) ? $productos['Categoria'] : ''), 'id_categoria'. lang('bf_form_label_required'));
			?>

			<div class="control-group <?php echo form_error('nombre') ? 'error' : ''; ?>">
				<?php echo form_label('Nombre'. lang('bf_form_label_required'), 'productos_nombre', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productos_nombre' type='text' name='productos_nombre' maxlength="45" value="<?php echo set_value('productos_nombre', isset($productos['nombre']) ? $productos['nombre'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('nombre'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('descripcion') ? 'error' : ''; ?>">
				<?php echo form_label('Descripcion', 'productos_descripcion', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productos_descripcion' type='text' name='productos_descripcion' maxlength="255" value="<?php echo set_value('productos_descripcion', isset($productos['descripcion']) ? $productos['descripcion'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('descripcion'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('productos_action_create'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/settings/productos', lang('productos_cancel'), 'class="btn btn-warning"'); ?>
				
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>