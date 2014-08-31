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

if (isset($precioscuidados))
{
	$precioscuidados = (array) $precioscuidados;
}
$id = isset($precioscuidados['id']) ? $precioscuidados['id'] : '';

?>
<div class="admin-box">
	<h3>preciosCuidados</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<div class="control-group <?php echo form_error('categoria') ? 'error' : ''; ?>">
				<?php echo form_label('Categoria'. lang('bf_form_label_required'), 'precioscuidados_categoria', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='precioscuidados_categoria' type='text' name='precioscuidados_categoria' maxlength="255" value="<?php echo set_value('precioscuidados_categoria', isset($precioscuidados['categoria']) ? $precioscuidados['categoria'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('categoria'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('producto') ? 'error' : ''; ?>">
				<?php echo form_label('Producto'. lang('bf_form_label_required'), 'precioscuidados_producto', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='precioscuidados_producto' type='text' name='precioscuidados_producto' maxlength="255" value="<?php echo set_value('precioscuidados_producto', isset($precioscuidados['producto']) ? $precioscuidados['producto'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('producto'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('marca') ? 'error' : ''; ?>">
				<?php echo form_label('Marca'. lang('bf_form_label_required'), 'precioscuidados_marca', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='precioscuidados_marca' type='text' name='precioscuidados_marca' maxlength="255" value="<?php echo set_value('precioscuidados_marca', isset($precioscuidados['marca']) ? $precioscuidados['marca'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('marca'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('cantidad') ? 'error' : ''; ?>">
				<?php echo form_label('Cantidad'. lang('bf_form_label_required'), 'precioscuidados_cantidad', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='precioscuidados_cantidad' type='text' name='precioscuidados_cantidad' maxlength="255" value="<?php echo set_value('precioscuidados_cantidad', isset($precioscuidados['cantidad']) ? $precioscuidados['cantidad'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('cantidad'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('precio') ? 'error' : ''; ?>">
				<?php echo form_label('Precio'. lang('bf_form_label_required'), 'precioscuidados_precio', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='precioscuidados_precio' type='text' name='precioscuidados_precio' maxlength="255" value="<?php echo set_value('precioscuidados_precio', isset($precioscuidados['precio']) ? $precioscuidados['precio'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('precio'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('vigencia') ? 'error' : ''; ?>">
				<?php echo form_label('Vigencia', 'precioscuidados_vigencia', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='precioscuidados_vigencia' type='text' name='precioscuidados_vigencia'  value="<?php echo set_value('precioscuidados_vigencia', isset($precioscuidados['vigencia']) ? $precioscuidados['vigencia'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('vigencia'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('precioscuidados_action_create'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/content/precioscuidados', lang('precioscuidados_cancel'), 'class="btn btn-warning"'); ?>
				
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>