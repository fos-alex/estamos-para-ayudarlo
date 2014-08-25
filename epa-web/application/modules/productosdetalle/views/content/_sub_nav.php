<ul class="nav nav-pills">
	<li <?php echo $this->uri->segment(4) == '' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/content/productosdetalle') ?>" id="list"><?php echo lang('productosdetalle_list'); ?></a>
	</li>
	<?php if ($this->auth->has_permission('ProductosDetalle.Content.Create')) : ?>
	<li <?php echo $this->uri->segment(4) == 'create' ? 'class="active"' : '' ?> >
		<a href="<?php echo site_url(SITE_AREA .'/content/productosdetalle/create') ?>" id="create_new"><?php echo lang('productosdetalle_new'); ?></a>
	</li>
	<?php endif; ?>
	<li <?php echo $this->uri->segment(4) == 'carga_masiva' ? 'class="active"' : '' ?>>
		<a href="<?php echo site_url(SITE_AREA .'/content/productosdetalle/carga_masiva') ?>" id="list"><?php echo lang('productosdetalle_cargamasiva'); ?></a>
	</li>
</ul>