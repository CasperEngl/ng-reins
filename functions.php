<?php

function minimal_scripts() {
  $time_format = 'ymd-Gis';

  $runtime_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/minimal/runtime.js'));
  $polyfills_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/minimal/polyfills.js'));
  $styles_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/minimal/styles.js'));
  $vendor_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/minimal/vendor.js'));
  $main_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/minimal/main.js'));

  wp_enqueue_script('minimal-runtime', get_stylesheet_directory_uri() . '/dist/minimal/runtime.js', array(), $runtime_version, true);
  wp_enqueue_script('minimal-polyfills', get_stylesheet_directory_uri() . '/dist/minimal/polyfills.js', array(), $polyfills_version, true);
  wp_enqueue_script('minimal-styles', get_stylesheet_directory_uri() . '/dist/minimal/styles.js', array(), $styles_version, true);
  wp_enqueue_script('minimal-vendor', get_stylesheet_directory_uri() . '/dist/minimal/vendor.js', array(), $vendor_version, true);
  wp_enqueue_script('minimal-main', get_stylesheet_directory_uri() . '/dist/minimal/main.js', array(), $main_version, true);

}
add_action('wp_enqueue_scripts', 'minimal_scripts');

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
add_filter("woocommerce_rest_prepare_product_object", "prepare_product_images", 10, 3);