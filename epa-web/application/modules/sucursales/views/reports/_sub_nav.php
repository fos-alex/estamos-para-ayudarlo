<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/reports/sucursales') ?>" id="list"><?php echo lang('sucursales_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('Sucursales.Reports.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/reports/sucursales/create') ?>" id="create_new"><?php echo lang('sucursales_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>