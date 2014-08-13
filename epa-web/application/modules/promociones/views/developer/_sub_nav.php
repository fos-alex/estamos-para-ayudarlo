<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/developer/promociones') ?>" id="list"><?php echo lang('promociones_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('Promociones.Developer.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/developer/promociones/create') ?>" id="create_new"><?php echo lang('promociones_new'); ?></a>
	</li>
	<?php endif; ?>
</ul>