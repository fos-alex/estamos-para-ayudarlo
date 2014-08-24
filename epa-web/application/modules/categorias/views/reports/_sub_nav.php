<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/reports/categorias') ?>" id="list"><?php echo lang('categorias_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('Categorias.Reports.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/reports/categorias/create') ?>" id="create_new"><?php echo lang('categorias_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>