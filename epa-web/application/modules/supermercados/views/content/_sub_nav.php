<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/content/supermercados') ?>" id="list"><?php echo lang('supermercados_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('Supermercados.Content.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/content/supermercados/create') ?>" id="create_new"><?php echo lang('supermercados_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>