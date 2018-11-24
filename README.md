# Minimal Theme for WordPress
Bootstrapped with [angular-cli](https://cli.angular.io/)

Use `ng build` from inside the theme to build into the dist folder.
Add __--watch__ to the build command to watch for changes.

In `functions.php`, make sure scripts are enqueued in the footer.

Example:
```php
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
```