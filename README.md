# reins Theme for WordPress
Bootstrapped with [angular-cli](https://cli.angular.io/)

Use `ng build` from inside the theme to build into the dist folder.
Add __--watch__ to the build command to watch for changes.

In `functions.php`, make sure scripts are enqueued in the footer.

Example:
```php
function reins_scripts() {
  $time_format = 'ymd-Gis';

  $runtime_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/reins/runtime.js'));
  $polyfills_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/reins/polyfills.js'));
  $styles_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/reins/styles.js'));
  $vendor_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/reins/vendor.js'));
  $main_version  = date($time_format, filemtime(realpath(dirname(__FILE__)) . '/dist/reins/main.js'));

  wp_enqueue_script('reins-runtime', get_stylesheet_directory_uri() . '/dist/reins/runtime.js', array(), $runtime_version, true);
  wp_enqueue_script('reins-polyfills', get_stylesheet_directory_uri() . '/dist/reins/polyfills.js', array(), $polyfills_version, true);
  wp_enqueue_script('reins-styles', get_stylesheet_directory_uri() . '/dist/reins/styles.js', array(), $styles_version, true);
  wp_enqueue_script('reins-vendor', get_stylesheet_directory_uri() . '/dist/reins/vendor.js', array(), $vendor_version, true);
  wp_enqueue_script('reins-main', get_stylesheet_directory_uri() . '/dist/reins/main.js', array(), $main_version, true);

}
add_action('wp_enqueue_scripts', 'reins_scripts');
```