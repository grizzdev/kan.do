<?php

function setState($key, $value) {
    $state = session('state');
    $state[$key] = $value;
    session(['state' => $state]);
}

function setAppState() {
    Cookie::queue(
        Cookie::make(
            'state',
            json_encode(session('state')),
            0,
            '/',
            '.' . env('APP_DOMAIN'),
            false,
            false
        )
    );
}
