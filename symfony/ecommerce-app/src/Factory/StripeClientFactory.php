<?php

namespace App\Factory;

use Stripe\StripeClient;

class StripeClientFactory
{
    public static function create(string $apiKey): StripeClient
    {
        return new StripeClient($apiKey);
    }
}
