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

if (isset($mapas))
{
	$mapas = (array) $mapas;
}
$id = isset($mapas['id']) ? $mapas['id'] : '';

?>
<div class="admin-box">
	<h3>Mapas</h3>
	<?php echo form_open($this->uri->uri_string(), 'class="form-horizontal"'); ?>
		<fieldset>

			<div class="control-group <?php echo form_error('text') ? 'error' : ''; ?>">
				<?php echo form_label('Text', 'mapas_text', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='mapas_text' type='text' name='mapas_text' maxlength="1000" value="<?php echo set_value('mapas_text', isset($mapas['text']) ? $mapas['text'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('text'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('id_super') ? 'error' : ''; ?>">
				<?php echo form_label('Id_Supermercado', 'mapas_id_super', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='mapas_id_super' type='text' name='mapas_id_super'  value="<?php echo set_value('mapas_id_super', isset($mapas['id_super']) ? $mapas['id_super'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('id_super'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('latitud') ? 'error' : ''; ?>">
				<?php echo form_label('Latitud', 'mapas_latitud', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='mapas_latitud' type='text' name='mapas_latitud' maxlength="8" value="<?php echo set_value('mapas_latitud', isset($mapas['latitud']) ? $mapas['latitud'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('latitud'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('longitud') ? 'error' : ''; ?>">
				<?php echo form_label('Longitud', 'mapas_longitud', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='mapas_longitud' type='text' name='mapas_longitud' maxlength="8" value="<?php echo set_value('mapas_longitud', isset($mapas['longitud']) ? $mapas['longitud'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('longitud'); ?></span>
				</div>
			</div>

			<div class="control-group <?php echo form_error('version') ? 'error' : ''; ?>">
				<?php echo form_label('Version', 'mapas_version', array('class' => 'control-label') ); ?>
				<div class='controls'>
					<input id='mapas_version' type='text' name='mapas_version'  value="<?php echo set_value('mapas_version', isset($mapas['version']) ? $mapas['version'] : ''); ?>" />
					<span class='help-inline'><?php echo form_error('version'); ?></span>
				</div>
			</div>

			<div class="form-actions">
				<input type="submit" name="save" class="btn btn-primary" value="<?php echo lang('mapas_action_edit'); ?>"  />
				<?php echo lang('bf_or'); ?>
				<?php echo anchor(SITE_AREA .'/content/mapas', lang('mapas_cancel'), 'class="btn btn-warning"'); ?>
				
			<?php if ($this->auth->has_permission('Mapas.Content.Delete')) : ?>
				or
				<button type="submit" name="delete" class="btn btn-danger" id="delete-me" onclick="return confirm('<?php e(js_escape(lang('mapas_delete_confirm'))); ?>'); ">
					<span class="icon-trash icon-white"></span>&nbsp;<?php echo lang('mapas_delete_record'); ?>
				</button>
			<?php endif; ?>
			</div>
		</fieldset>
    <?php echo form_close(); ?>
</div>