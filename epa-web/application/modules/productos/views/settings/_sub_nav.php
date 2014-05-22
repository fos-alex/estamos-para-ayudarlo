<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/settings/productos') ?>" id="list"><?php echo lang('productos_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('Productos.Settings.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/settings/productos/create') ?>" id="create_new"><?php echo lang('productos_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>