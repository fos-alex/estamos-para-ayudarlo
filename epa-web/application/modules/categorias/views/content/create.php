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

if (isset($categorias))
{
	$categorias = (array) $categorias;
}
$id = isset($categorias['id']) ? $categorias['id'] : '';

?>
<div class="admin-box">
	<h3>Categorias</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<div class="control-group <?php echo form_error('nombre') ? 'error' : ''; ?>">
				<?php echo form_label('Nombre'. lang('bf_form_label_required'), 'categorias_nombre', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='categorias_nombre' type='text' name='categorias_nombre' maxlength="50" value="<?php echo set_value('categorias_nombre', isset($categorias['nombre']) ? $categorias['nombre'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('nombre'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('categorias_action_create'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/content/categorias', lang('categorias_cancel'), 'class="btn btn-warning"'); ?>
				
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>