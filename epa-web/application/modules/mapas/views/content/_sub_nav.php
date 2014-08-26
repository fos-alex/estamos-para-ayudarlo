<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/content/mapas') ?>" id="list"><?php echo lang('mapas_list'); ?></a>
	</li>
	<?if(isset($id_sucursal)){?>
	<li>
		<a href="<?php echo site_url(SITE_AREA .'/content/sucursales/edit/'.$id_sucursal) ?>"><?php echo "Volver a la sucursal"; ?></a>
	</li>
	<?}?>
</ul>