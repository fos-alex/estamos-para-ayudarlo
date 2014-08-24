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

if (isset($productosdetalle))
{
	$productosdetalle = (array) $productosdetalle;
}
$id = isset($productosdetalle['id']) ? $productosdetalle['id'] : '';

?>
<div class="admin-box">
	<h3>productosDetalle</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<?php // Change the values in this array to populate your dropdown as required
				$options = array(
				);

				echo form_dropdown('productosdetalle_id_producto', $options, set_value('productosdetalle_id_producto', isset($productosdetalle['id_producto']) ? $productosdetalle['id_producto'] : ''), 'Producto'. lang('bf_form_label_required'));
			?>

			<div class="control-group <?php echo form_error('Supermercado') ? 'error' : ''; ?>">
				<?php echo form_label('id_supermercado'. lang('bf_form_label_required'), 'productosdetalle_Supermercado', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productosdetalle_Supermercado' type='text' name='productosdetalle_Supermercado'  value="<?php echo set_value('productosdetalle_Supermercado', isset($productosdetalle['Supermercado']) ? $productosdetalle['Supermercado'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('Supermercado'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('presentacion') ? 'error' : ''; ?>">
				<?php echo form_label('Presentacion'. lang('bf_form_label_required'), 'productosdetalle_presentacion', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productosdetalle_presentacion' type='text' name='productosdetalle_presentacion' maxlength="100" value="<?php echo set_value('productosdetalle_presentacion', isset($productosdetalle['presentacion']) ? $productosdetalle['presentacion'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('presentacion'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('marca') ? 'error' : ''; ?>">
				<?php echo form_label('Marca', 'productosdetalle_marca', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productosdetalle_marca' type='text' name='productosdetalle_marca' maxlength="100" value="<?php echo set_value('productosdetalle_marca', isset($productosdetalle['marca']) ? $productosdetalle['marca'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('marca'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('precio') ? 'error' : ''; ?>">
				<?php echo form_label('Precio'. lang('bf_form_label_required'), 'productosdetalle_precio', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productosdetalle_precio' type='text' name='productosdetalle_precio' maxlength="10" value="<?php echo set_value('productosdetalle_precio', isset($productosdetalle['precio']) ? $productosdetalle['precio'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('precio'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('descripcion') ? 'error' : ''; ?>">
				<?php echo form_label('Descripcion', 'productosdetalle_descripcion', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='productosdetalle_descripcion' type='text' name='productosdetalle_descripcion' maxlength="255" value="<?php echo set_value('productosdetalle_descripcion', isset($productosdetalle['descripcion']) ? $productosdetalle['descripcion'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('descripcion'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('productosdetalle_action_edit'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/content/productosdetalle', lang('productosdetalle_cancel'), 'class="btn btn-warning"'); ?>
				
			<?php if ($this->auth->has_permission('ProductosDetalle.Content.Delete')) : ?>
				or
				<button type="submit" name="delete" class="btn btn-danger" id="delete-me" onclick="return confirm('<?php e(js_escape(lang('productosdetalle_delete_confirm'))); ?>'); ">
					<span class="icon-trash icon-white"></span>&nbsp;<?php echo lang('productosdetalle_delete_record'); ?>
				</button>
			<?php endif; ?>
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>