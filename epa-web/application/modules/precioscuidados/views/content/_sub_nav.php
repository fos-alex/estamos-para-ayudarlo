<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/content/precioscuidados') ?>" id="list"><?php echo lang('precioscuidados_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('PreciosCuidados.Content.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/content/precioscuidados/create') ?>" id="create_new"><?php echo lang('precioscuidados_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>