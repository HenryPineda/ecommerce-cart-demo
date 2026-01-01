<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Shop</title>
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/shop.tsx'])
    </head>
    <body>
        <div id="shop-app"></div>
    </body>
</html>
