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

if (isset($supermercados))
{
	$supermercados = (array) $supermercados;
}
$id = isset($supermercados['id']) ? $supermercados['id'] : '';

?>
<div class="admin-box">
	<h3>supermercados</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<div class="control-group <?php echo form_error('nombre') ? 'error' : ''; ?>">
				<?php echo form_label('Nombre'. lang('bf_form_label_required'), 'supermercados_nombre', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='supermercados_nombre' type='text' name='supermercados_nombre' maxlength="50" value="<?php echo set_value('supermercados_nombre', isset($supermercados['nombre']) ? $supermercados['nombre'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('nombre'); ?></span>
				</div>
			</div>

			<?php // Change the values in this array to populate your dropdown as required
				$options = array(
				);

				echo form_dropdown('supermercados_id_usuario', $options, set_value('supermercados_id_usuario', isset($supermercados['id_usuario']) ? $supermercados['id_usuario'] : ''), 'Usuario'. lang('bf_form_label_required'));
			?>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('supermercados_action_edit'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/developer/supermercados', lang('supermercados_cancel'), 'class="btn btn-warning"'); ?>
				
			<?php if ($this->auth->has_permission('Supermercados.Developer.Delete')) : ?>
				or
				<button type="submit" name="delete" class="btn btn-danger" id="delete-me" onclick="return confirm('<?php e(js_escape(lang('supermercados_delete_confirm'))); ?>'); ">
					<span class="icon-trash icon-white"></span>&nbsp;<?php echo lang('supermercados_delete_record'); ?>
				</button>
			<?php endif; ?>
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>