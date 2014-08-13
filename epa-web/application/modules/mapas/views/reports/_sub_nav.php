<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/reports/mapas') ?>" id="list"><?php echo lang('mapas_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('Mapas.Reports.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/reports/mapas/create') ?>" id="create_new"><?php echo lang('mapas_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>