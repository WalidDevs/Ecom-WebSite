<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/panier/add' => [[['_route' => 'panier_add', '_controller' => 'App\\Controller\\PanierController::add'], null, ['POST' => 0], null, false, false, null]],
        '/api/panier' => [[['_route' => 'get_panier', '_controller' => 'App\\Controller\\PanierController::getPanier'], null, ['GET' => 0], null, false, false, null]],
        '/finalize-payment' => [[['_route' => 'finalize_payment', '_controller' => 'App\\Controller\\PaymentController::finalizePayment'], null, ['POST' => 0], null, false, false, null]],
        '/email' => [[['_route' => 'email', '_controller' => 'App\\Controller\\PaymentController::testSendEmail'], null, ['GET' => 0], null, false, false, null]],
        '/api/produits' => [[['_route' => 'produit_index', '_controller' => 'App\\Controller\\ProduitController::index'], null, ['GET' => 0], null, true, false, null]],
        '/api/produits/new' => [[['_route' => 'produit_new', '_controller' => 'App\\Controller\\ProduitController::new'], null, ['POST' => 0], null, false, false, null]],
        '/api/profile' => [[['_route' => 'api_profile', '_controller' => 'App\\Controller\\ProfileController::index'], null, ['GET' => 0], null, false, false, null]],
        '/api/register' => [[['_route' => 'api_register', '_controller' => 'App\\Controller\\SecurityController::register'], null, ['POST' => 0], null, false, false, null]],
        '/_profiler' => [[['_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'], null, null, null, true, false, null]],
        '/_profiler/search' => [[['_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'], null, null, null, false, false, null]],
        '/_profiler/search_bar' => [[['_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'], null, null, null, false, false, null]],
        '/_profiler/phpinfo' => [[['_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'], null, null, null, false, false, null]],
        '/_profiler/open' => [[['_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'], null, null, null, false, false, null]],
        '/api/login_check' => [[['_route' => 'api_login_check'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api/(?'
                    .'|p(?'
                        .'|anier/remove/([^/]++)(*:40)'
                        .'|roduits(?'
                            .'|/(?'
                                .'|([^/]++)(?'
                                    .'|/edit(*:77)'
                                    .'|(*:84)'
                                .')'
                                .'|api/produits/category/([^/]++)(*:122)'
                            .')'
                            .'|delete/([^/]++)(*:146)'
                        .')'
                    .')'
                    .'|utilisateurs/(?'
                        .'|edit/([^/]++)(*:185)'
                        .'|delete/([^/]++)(*:208)'
                    .')'
                .')'
                .'|/_(?'
                    .'|error/(\\d+)(?:\\.([^/]++))?(*:249)'
                    .'|wdt/([^/]++)(*:269)'
                    .'|profiler/([^/]++)(?'
                        .'|/(?'
                            .'|search/results(*:315)'
                            .'|router(*:329)'
                            .'|exception(?'
                                .'|(*:349)'
                                .'|\\.css(*:362)'
                            .')'
                        .')'
                        .'|(*:372)'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        40 => [[['_route' => 'panier_remove', '_controller' => 'App\\Controller\\PanierController::removeFromCart'], ['produitId'], ['DELETE' => 0], null, false, true, null]],
        77 => [[['_route' => 'produit_edit', '_controller' => 'App\\Controller\\ProduitController::edit'], ['id'], ['PUT' => 0], null, false, false, null]],
        84 => [[['_route' => 'produit_show', '_controller' => 'App\\Controller\\ProduitController::show'], ['id'], ['GET' => 0], null, false, true, null]],
        122 => [[['_route' => 'produits_by_category', '_controller' => 'App\\Controller\\ProduitController::getProductsByCategory'], ['categoryId'], ['GET' => 0], null, false, true, null]],
        146 => [[['_route' => 'produit_delete', '_controller' => 'App\\Controller\\ProduitController::delete'], ['id'], ['DELETE' => 0], null, false, true, null]],
        185 => [[['_route' => 'edit_user', '_controller' => 'App\\Controller\\UserController::editUser'], ['id'], ['PUT' => 0], null, false, true, null]],
        208 => [[['_route' => 'delete_user', '_controller' => 'App\\Controller\\UserController::deleteUser'], ['id'], ['DELETE' => 0], null, false, true, null]],
        249 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        269 => [[['_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'], ['token'], null, null, false, true, null]],
        315 => [[['_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'], ['token'], null, null, false, false, null]],
        329 => [[['_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'], ['token'], null, null, false, false, null]],
        349 => [[['_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception_panel::body'], ['token'], null, null, false, false, null]],
        362 => [[['_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception_panel::stylesheet'], ['token'], null, null, false, false, null]],
        372 => [
            [['_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'], ['token'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
