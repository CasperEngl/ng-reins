<?php

function reins_scripts() {
  $time_format = 'ymd-Gis';

  $runtime_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/runtime.js'));
  $polyfills_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/polyfills.js'));
  $styles_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/styles.js'));
  $vendor_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/vendor.js'));
  $main_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/main.js'));

  wp_enqueue_script('reins-runtime', get_stylesheet_directory_uri() . '/dist/runtime.js', array(), $runtime_version, true);
  wp_enqueue_script('reins-polyfills', get_stylesheet_directory_uri() . '/dist/polyfills.js', array(), $polyfills_version, true);
  wp_enqueue_script('reins-styles', get_stylesheet_directory_uri() . '/dist/styles.js', array(), $styles_version, true);
  wp_enqueue_script('reins-vendor', get_stylesheet_directory_uri() . '/dist/vendor.js', array(), $vendor_version, true);
  wp_enqueue_script('reins-main', get_stylesheet_directory_uri() . '/dist/main.js', array(), $main_version, true);

}
add_action('wp_enqueue_scripts', 'reins_scripts');

// function reins_scripts() {
//   $time_format = 'ymd-Gis';

//   echo 'THE REALEST PATH: ' . realpath(dirname(__FILE__));
  
//   foreach (glob( dirname(__FILE__) . '/dist/*.js' ) as $file) {
//     $version = date($time_format, filemtime($file));
//     $name = array_shift(explode('.', basename($file)));
    
//     wp_enqueue_scripts('reins_' . $name, $file, $version, true);
//   }
// }
// add_action('wp_enqueue_scripts', 'reins_scripts'); 

function prepare_product_images($response, $post, $request) {
  global $_wp_additional_image_sizes;

  if (empty($response->data)) {
      return $response;
  }

  foreach ($response->data['images'] as $key => $image) {
      $image_urls = [];
      foreach ($_wp_additional_image_sizes as $size => $value) {
          $image_info = wp_get_attachment_image_src($image['id'], $size);
          $response->data['images'][$key][$size] = $image_info[0];
      }
  }
  return $response;

}
add_filter('woocommerce_rest_prepare_product_object', 'prepare_product_images', 10, 3);

function nt_cors_enable() {
  header('Access-Control-Allow-Origin: ' . get_http_origin());
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Headers: Authorization, Content-Type');
  header('Access-Control-Expose-Headers: x-wc-totalpages, x-wc-total', false);
  if ( 'OPTIONS' == $_SERVER['REQUEST_METHOD'] ) {
      status_header(200);
      exit();
    }
}
add_action( 'init', 'nt_cors_enable' );