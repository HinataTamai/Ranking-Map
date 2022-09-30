<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="robots" content="noindex">
		<title>Ranking-Map</title>
        @viteReactRefresh
        @vite('resources/ts/index.tsx')
	</head>
	<body>
		<div id="root"></div>
		<script async
		src="https://maps.googleapis.com/maps/api/js?key={{ config('services.google-map.apikey') }}&libraries=places">
		</script>
	</body>
</html>