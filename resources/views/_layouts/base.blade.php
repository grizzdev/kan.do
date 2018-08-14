<!doctype html>
<html lang="{{ App::getLocale() }}">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <meta name="description" content="@yield('meta_description')" />
        <meta name="keywords" content="@yield('meta_keywords')" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>@yield('title') Kan.Do</title>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}" />
    </head>
    <body>
        <header></header>
        <main>@yield('content')</main>
        <footer></footer>
        <script src="{{ mix('js/app.js') }}"></script>
        <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
        <script>
            window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
            ga('create','UA-XXXXX-Y','auto');ga('send','pageview')
        </script>
        <script src="https://www.google-analytics.com/analytics.js" async defer></script>
    </body>
</html>
