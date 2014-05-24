<div class="jumbotron" text-align="center">
	<h1>Bienvenido</h1>

	<p class="lead">"Estamos para Ayudarlo" es una aplicacion para Supermercados que ayudan a los clientes a realizar sus compras.</p>

	<?php if (isset($current_user->email)) : ?>
		<a href="<?php echo site_url(SITE_AREA) ?>" class="btn btn-large btn-success">Ir al panel de administrador</a>
	<?php else :?>
		<a href="<?php echo site_url(LOGIN_URL); ?>" class="btn btn-large btn-primary"><?php echo lang('bf_action_login'); ?></a>
	<?php endif;?>

</div>

<hr />

<div class="row-fluid">

	<div class="span4">
		<h4>Lector de QR y tags NFC</h4>

		<p>Los productos deberan ser cargados para generar los codigos QR y NFC con la informacion basica de cada producto</p>

	</div>
	<div class="span4">
		<h4>Gestor de Mapas</h4>

		<p>Creación de mapas y localizacion de productos</p>
		
	</div>
	<div class="span4">
		<h4>Estadisticas y Reportes</h4>

		<p>Se podran obtener diferentes estadisticas y reportes para que los usuario mejoren sus compras.</p>
	</div>
</div>
