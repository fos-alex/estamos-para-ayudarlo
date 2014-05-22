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

			<div class="control-group <?php echo form_error('id_supermercado') ? 'error' : ''; ?>">
				<?php echo form_label('Supermercado'. lang('bf_form_label_required'), 'productos_id_supermercado', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productos_id_supermercado' type='text' name='productos_id_supermercado'  value="<?php echo set_value('productos_id_supermercado', isset($productos['id_supermercado']) ? $productos['id_supermercado'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('id_supermercado'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('nombre') ? 'error' : ''; ?>">
				<?php echo form_label('Nombre'. lang('bf_form_label_required'), 'productos_nombre', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productos_nombre' type='text' name='productos_nombre' maxlength="255" value="<?php echo set_value('productos_nombre', isset($productos['nombre']) ? $productos['nombre'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('nombre'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('descripcion') ? 'error' : ''; ?>">
				<?php echo form_label('Descripcion', 'productos_descripcion', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<?php echo form_textarea( array( 'name' => 'productos_descripcion', 'id' => 'productos_descripcion', 'rows' => '5', 'cols' => '80', 'value' => set_value('productos_descripcion', isset($productos['descripcion']) ? $productos['descripcion'] : '') ) ); ?>
					<span class='help-inline'><?php echo form_error('descripcion'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('precio') ? 'error' : ''; ?>">
				<?php echo form_label('Precio'. lang('bf_form_label_required'), 'productos_precio', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productos_precio' type='text' name='productos_precio' maxlength="11" value="<?php echo set_value('productos_precio', isset($productos['precio']) ? $productos['precio'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('precio'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('productos_action_edit'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/developer/productos', lang('productos_cancel'), 'class="btn btn-warning"'); ?>
				
			<?php if ($this->auth->has_permission('Productos.Developer.Delete')) : ?>
				or
				<button type="submit" name="delete" class="btn btn-danger" id="delete-me" onclick="return confirm('<?php e(js_escape(lang('productos_delete_confirm'))); ?>'); ">
					<span class="icon-trash icon-white"></span>&nbsp;<?php echo lang('productos_delete_record'); ?>
				</button>
			<?php endif; ?>
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>