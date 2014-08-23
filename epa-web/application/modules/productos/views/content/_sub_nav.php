<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/content/productos') ?>" id="list"><?php echo lang('productos_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('Productos.Content.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/content/productos/create') ?>" id="create_new"><?php echo lang('productos_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>