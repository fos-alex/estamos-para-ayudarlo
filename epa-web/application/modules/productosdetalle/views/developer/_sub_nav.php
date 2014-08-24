<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/developer/productosdetalle') ?>" id="list"><?php echo lang('productosdetalle_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('ProductosDetalle.Developer.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/developer/productosdetalle/create') ?>" id="create_new"><?php echo lang('productosdetalle_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>