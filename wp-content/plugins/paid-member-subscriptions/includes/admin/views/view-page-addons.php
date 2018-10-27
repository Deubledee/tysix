<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/*
 * HTML Output for the Add-ons page
 */

$pms_add_ons = PMS_Submenu_Page_Addons::add_ons_get_remote_content();
$pms_get_all_plugins = get_plugins();
$pms_get_active_plugins = get_option('active_plugins');

$ajax_nonce = wp_create_nonce("pms-activate-addon");

?>
<div class="wrap pms-wrap pms-add-ons-wrap">

    <h2><?php _e( 'Recommended Plugins', 'paid-member-subscriptions' ) ?></h2>

    <div>

        <?php
        $trp_add_on_exists = 0;
        $trp_add_on_is_active = 0;
        $trp_add_on_is_network_active = 0;
        // Check to see if add-on is in the plugins folder
        foreach ($pms_get_all_plugins as $pms_plugin_key => $pms_plugin) {
            if( strtolower($pms_plugin['Name']) == strtolower( 'TranslatePress - Multilingual' ) && strpos(strtolower($pms_plugin['AuthorName']), strtolower('Cozmoslabs')) !== false) {
                $trp_add_on_exists = 1;
                if (in_array($pms_plugin_key, $pms_get_active_plugins)) {
                    $trp_add_on_is_active = 1;
                }
                // Consider the add-on active if it's network active
                if (is_plugin_active_for_network($pms_plugin_key)) {
                    $trp_add_on_is_network_active = 1;
                    $trp_add_on_is_active = 1;
                }
                $plugin_file = $pms_plugin_key;
            }
        }
        ?>
        <div class="plugin-card pms-recommended-plugin pms-add-on">
            <div class="plugin-card-top">
                <a target="_blank" href="https://wordpress.org/plugins/translatepress-multilingual/">
                    <img src="<?php echo PMS_PLUGIN_DIR_URL . 'assets/images/trp-recommended.png'; ?>" width="100%">
                </a>
                <h3 class="pms-add-on-title">
                    <a target="_blank" href="https://wordpress.org/plugins/translatepress-multilingual/">TranslatePress</a>
                </h3>
                <h3 class="pms-add-on-price"><?php  _e( 'Free', 'paid-member-subscriptions' ) ?></h3>
                <p class="pms-add-on-description">
                    <?php _e( 'Translate your Paid Member Subscriptions checkout with a WordPress translation plugin that anyone can use. It offers a simpler way to translate WordPress sites, with full support for WooCommerce and site builders.', 'paid-member-subscriptions' ) ?>
                    <a href="<?php admin_url();?>plugin-install.php?tab=plugin-information&plugin=translatepress-multilingual&TB_iframe=true&width=772&height=875" class="thickbox" aria-label="More information about TranslatePress - Multilingual" data-title="TranslatePress - Multilingual"><?php _e( 'More Details' ); ?></a>
                </p>
            </div>
            <div class="plugin-card-bottom pms-add-on-compatible">
                <?php
                if ($trp_add_on_exists) {

                    // Display activate/deactivate buttons
                    if (!$trp_add_on_is_active) {
                        echo '<a class="pms-add-on-activate right button button-secondary" href="' . $plugin_file . '" data-nonce="' . $ajax_nonce . '">' . __('Activate', 'paid-member-subscriptions') . '</a>';

                        // If add-on is network activated don't allow deactivation
                    } elseif (!$trp_add_on_is_network_active) {
                        echo '<a class="pms-add-on-deactivate right button button-secondary" href="' . $plugin_file . '" data-nonce="' . $ajax_nonce . '">' . __('Deactivate', 'paid-member-subscriptions') . '</a>';
                    }

                    // Display message to the user
                    if( !$trp_add_on_is_active ){
                        echo '<span class="dashicons dashicons-no-alt"></span><span class="pms-add-on-message">' . __('Plugin is <strong>inactive</strong>', 'paid-member-subscriptions') . '</span>';
                    } else {
                        echo '<span class="dashicons dashicons-yes"></span><span class="pms-add-on-message">' . __('Plugin is <strong>active</strong>', 'paid-member-subscriptions') . '</span>';
                    }

                } else {
                    // handles the in-page download
                    $pms_paid_link_class = 'button-secondary';
                    $pms_paid_link_text = __('Install Now', 'paid-member-subscriptions');

                    echo '<a class="right install-now button ' . $pms_paid_link_class . '" href="'. wp_nonce_url(self_admin_url('update.php?action=install-plugin&plugin=translatepress-multilingual'), 'install-plugin_translatepress-multilingual') .'" data-add-on-slug="translatepress-multilingual" data-add-on-name="TranslatePress - Multilingual" data-nonce="' . $ajax_nonce . '">' . $pms_paid_link_text . '</a>';
                    echo '<span class="dashicons dashicons-yes"></span><span class="pms-add-on-message">' . __('Compatible with Paid Member Subscriptions.', 'paid-member-subscriptions') . '</span>';

                }
                ?>
                <div class="spinner"></div>
                <span class="pms-add-on-user-messages pms-error-manual-install"><?php printf(__('Could not install plugin. Retry or <a href="%s" target="_blank">install manually</a>.', 'paid-member-subscriptions'), esc_url( 'https://www.wordpress.org/plugins/translatepress-multilingual' )) ?></a>.</span>
            </div>
        </div>


        <?php
        $pb_add_on_exists = 0;
        $pb_add_on_is_active = 0;
        $pb_add_on_is_network_active = 0;
        // Check to see if add-on is in the plugins folder
        foreach ($pms_get_all_plugins as $pms_plugin_key => $pms_plugin) {
            if( in_array( strtolower($pms_plugin['Name']), array( strtolower( 'Profile Builder' ), strtolower( 'Profile Builder Hobbyist' ), strtolower( 'Profile Builder Pro' ) ) ) && strpos(strtolower($pms_plugin['AuthorName']), strtolower('Cozmoslabs')) !== false) {
                $pb_add_on_exists = 1;
                if (in_array($pms_plugin_key, $pms_get_active_plugins)) {
                    $pb_add_on_is_active = 1;
                }
                // Consider the add-on active if it's network active
                if (is_plugin_active_for_network($pms_plugin_key)) {
                    $pb_add_on_is_network_active = 1;
                    $pb_add_on_is_active = 1;
                }
                $plugin_file = $pms_plugin_key;

                if( $pb_add_on_is_active )
                    break;
            }
        }
        ?>
        <div class="plugin-card pms-recommended-plugin pms-add-on">
            <div class="plugin-card-top">
                <a target="_blank" href="http://wordpress.org/plugins/profile-builder/">
                    <img src="<?php echo PMS_PLUGIN_DIR_URL . 'assets/images/pb-recommended.png'; ?>" width="100%">
                </a>
                <h3 class="pms-add-on-title">
                    <a target="_blank" href="http://wordpress.org/plugins/profile-builder/">Profile Builder</a>
                </h3>
                <h3 class="pms-add-on-price"><?php  _e( 'Free', 'paid-member-subscriptions' ) ?></h3>
                <p class="pms-add-on-description">
                    <?php _e( "Capture more user information on the register form with the help of Profile Builder's custom user profile fields.", 'paid-member-subscriptions' ) ?>
                    <a href="<?php admin_url();?>plugin-install.php?tab=plugin-information&plugin=profile-builder&TB_iframe=true&width=772&height=875" class="thickbox" aria-label="More information about Profile Builder" data-title="Profile Builder"><?php _e( 'More Details' ); ?></a>
                </p>
            </div>
            <div class="plugin-card-bottom pms-add-on-compatible">
                <?php
                if ($pb_add_on_exists) {

                    // Display activate/deactivate buttons
                    if (!$pb_add_on_is_active) {
                        echo '<a class="pms-add-on-activate right button button-secondary" href="' . $plugin_file . '" data-nonce="' . $ajax_nonce . '">' . __('Activate', 'paid-member-subscriptions') . '</a>';

                        // If add-on is network activated don't allow deactivation
                    } elseif (!$pb_add_on_is_network_active) {
                        echo '<a class="pms-add-on-deactivate right button button-secondary" href="' . $plugin_file . '" data-nonce="' . $ajax_nonce . '">' . __('Deactivate', 'paid-member-subscriptions') . '</a>';
                    }

                    // Display message to the user
                    if( !$pb_add_on_is_active ){
                        echo '<span class="dashicons dashicons-no-alt"></span><span class="pms-add-on-message">' . __('Plugin is <strong>inactive</strong>', 'paid-member-subscriptions') . '</span>';
                    } else {
                        echo '<span class="dashicons dashicons-yes"></span><span class="pms-add-on-message">' . __('Plugin is <strong>active</strong>', 'paid-member-subscriptions') . '</span>';
                    }

                } else {
                    // handles the in-page download
                    $pms_paid_link_class = 'button-secondary';
                    $pms_paid_link_text = __('Install Now', 'paid-member-subscriptions');

                    echo '<a class="right install-now button ' . $pms_paid_link_class . '" href="'. wp_nonce_url(self_admin_url('update.php?action=install-plugin&plugin=profile-builder'), 'install-plugin_profile-builder') .'" data-add-on-slug="profile-builder" data-add-on-name="Profile Builder" data-nonce="' . $ajax_nonce . '">' . $pms_paid_link_text . '</a>';
                    echo '<span class="dashicons dashicons-yes"></span><span class="pms-add-on-message">' . __('Compatible with Paid Member Subscriptions.', 'paid-member-subscriptions') . '</span>';

                }
                ?>
                <div class="spinner"></div>
                <span class="pms-add-on-user-messages pms-error-manual-install"><?php printf(__('Could not install plugin. Retry or <a href="%s" target="_blank">install manually</a>.', 'paid-member-subscriptions'), esc_url( 'http://www.wordpress.org/plugins/profile-builder' )) ?></a>.</span>
            </div>
        </div>

    </div>


    <div class="clear"></div>


    <h2 id="pms-addons-title"><?php echo $this->page_title; ?></h2>
    <?php
    //for now we only have the free version, maybe this will change in the future
    $version = 'Free';
    ?>

    <span id="pms-add-on-activate-button-text" class="pms-add-on-user-messages"><?php echo __( 'Activate', 'paid-member-subscriptions' ); ?></span>

    <span id="pms-add-on-downloading-message-text" class="pms-add-on-user-messages"><?php echo __( 'Downloading and installing...', 'paid-member-subscriptions' ); ?></span>
    <span id="pms-add-on-download-finished-message-text" class="pms-add-on-user-messages"><?php echo __( 'Installation complete', 'paid-member-subscriptions' ); ?></span>

    <span id="pms-add-on-activated-button-text" class="pms-add-on-user-messages"><?php echo __( 'Add-On is Active', 'paid-member-subscriptions' ); ?></span>
    <span id="pms-add-on-activated-message-text" class="pms-add-on-user-messages"><?php echo __( 'Add-On has been activated', 'paid-member-subscriptions' ) ?></span>
    <span id="pms-add-on-activated-error-button-text" class="pms-add-on-user-messages"><?php echo __( 'Retry Install', 'paid-member-subscriptions' ) ?></span>

    <span id="pms-add-on-is-active-message-text" class="pms-add-on-user-messages"><?php echo __( 'Add-On is <strong>active</strong>', 'paid-member-subscriptions' ); ?></span>
    <span id="pms-add-on-is-not-active-message-text" class="pms-add-on-user-messages"><?php echo __( 'Add-On is <strong>inactive</strong>', 'paid-member-subscriptions' ); ?></span>

    <span id="pms-add-on-deactivate-button-text" class="pms-add-on-user-messages"><?php echo __( 'Deactivate', 'paid-member-subscriptions' ) ?></span>
    <span id="pms-add-on-deactivated-message-text" class="pms-add-on-user-messages"><?php echo __( 'Add-On has been deactivated.', 'paid-member-subscriptions' ) ?></span>

    <div id="the-list">

        <?php /* ?>
        <div class="plugin-card pms-add-on pms-add-on-bundle">
            <div class="plugin-card-top">
                <a href="http://www.cozmoslabs.com/paid-member-subscriptions-add-ons/bundle/?utm_source=wpbackend&utm_medium=clientsite&utm_content=add-on-page-bundle-button&utm_campaign=PMS" target="_blank">
                    <img src="<?php echo PMS_PLUGIN_DIR_URL . 'assets/images/banner-add-on-bundle.png' ?>" />
                </a>

                <h3><?php _e( 'Add-Ons Bundle', 'paid-member-subscriptions' ) ?></h3>
                <p><?php _e( 'Get all existing & future add-ons for just 139$ ( save 70% OFF regular price )', 'paid-member-subscriptions' ) ?></p>
                <a href="http://www.cozmoslabs.com/paid-member-subscriptions-add-ons/bundle/?utm_source=wpbackend&utm_medium=clientsite&utm_content=add-on-page-bundle-button&utm_campaign=PMS" target="_blank" class="button button-primary"><?php _e( 'View Bundle', 'paid-member-subscriptions' ) ?></a>

            </div>
        </div>
        <?php */ ?>

        <?php
        
        if( $pms_add_ons === false ) {

            echo __('Something went wrong, we could not connect to the server. Please try again later.', 'paid-member-subscriptions');

        } else {

            foreach( $pms_add_ons as $key => $pms_add_on ) {

                $pms_add_on_exists = 0;
                $pms_add_on_is_active = 0;
                $pms_add_on_is_network_active = 0;

                // Check to see if add-on is in the plugins folder
                foreach ($pms_get_all_plugins as $pms_plugin_key => $pms_plugin) {
                    if (strpos(strtolower($pms_plugin['Name']), strtolower($pms_add_on['name'])) !== false && strpos(strtolower($pms_plugin['AuthorName']), strtolower('Cozmoslabs')) !== false) {
                        $pms_add_on_exists = 1;

                        if (in_array($pms_plugin_key, $pms_get_active_plugins)) {
                            $pms_add_on_is_active = 1;
                        }

                        // Consider the add-on active if it's network active
                        if (is_plugin_active_for_network($pms_plugin_key)) {
                            $pms_add_on_is_network_active = 1;
                            $pms_add_on_is_active = 1;
                        }

                        $pms_add_on['plugin_file'] = $pms_plugin_key;
                    }
                }

                echo '<div class="plugin-card pms-add-on">';
                echo '<div class="plugin-card-top">';

                if( ! empty( $pms_add_on['publish_date'] ) && strtotime( $pms_add_on['publish_date'] ) > time() - 2 * WEEK_IN_SECONDS )
                    echo '<div class="pms-add-on-corner-ribbon">' . __( 'New!', 'paid-member-subscriptions' ) . '</div>';

                echo '<a target="_blank" href="' . esc_attr( $pms_add_on['url'] ) . '?utm_source=wpbackend&utm_medium=clientsite&utm_content=add-on-page&utm_campaign=PMS' . $version . '">';
                    echo '<img src="' . esc_attr( $pms_add_on['thumbnail_url'] ) . '" />';
                echo '</a>';

                echo '<h3 class="pms-add-on-title">';
                    echo '<a target="_blank" href="' . esc_attr( $pms_add_on['url'] ) . '?utm_source=wpbackend&utm_medium=clientsite&utm_content=add-on-page&utm_campaign=PMS' . $version . '">';
                        echo esc_html( $pms_add_on['name'] );
                    echo '</a>';
                echo '</h3>';

                if( !( $pms_add_on['paid'] && $pms_add_on_exists ) ) {

                    if( $pms_add_on['paid'] )
                        $bundle_name = ( in_array( 'pro', $pms_add_on['product_version_type'] ) ? 'Pro' : 'Hobbyist' );
                    else
                        $bundle_name = 'Free';

                    echo '<h3 class="pms-add-on-price">' . __( 'Available in: ', 'paid-member-subscriptions' ) . $bundle_name . ' ' . __( 'version', 'paid-member-subscriptions' ) . '</h3>';

                } else {
                    $serial_number = get_option( $pms_add_on['slug'] . '_serial_number', '' );
                    $serial_status = get_option( 'pms_add_on_'. $pms_add_on['slug'] .'_serial_status', '');
                    $serial_status_class = '';
                    if( !empty( $serial_status ) ){
                        if( $serial_status == 'found' ){
                            $serial_status_class = ' pms-found';
                        }
                        else
                            $serial_status_class = ' pms-error';
                    }
                    echo '<div class="pms-add-on-serial-number-wrapper' . $serial_status_class . '"><input class="pms-add-on-serial-number'.$serial_status_class.'" type="password" value ="'. $serial_number .'" data-unique-name="'. $pms_add_on['unique_name'] .'" data-slug="'. $pms_add_on['slug'] .'" name="' . $pms_add_on['slug'] . '_serial_number" placeholder="' . __("Serial Number", 'paid-member-subscriptions') . '"/><span class="status-dot"></span><a href="#" class="button save-serial">' . __('Check', 'paid-member-subscriptions') . '</a></div>';
                }

                echo '<p class="pms-add-on-description">' . esc_html( $pms_add_on['description'] ) . '</p>';

                echo '</div>';

                $pms_version_validation = version_compare( PMS_VERSION, $pms_add_on['product_version']);

                ($pms_version_validation != -1) ? $pms_version_validation_class = 'pms-add-on-compatible' : $pms_version_validation_class = 'pms-add-on-not-compatible';

                echo '<div class="plugin-card-bottom ' . $pms_version_validation_class . '">';

                // PB minimum version number is all good
                if ($pms_version_validation != -1) {

                    // PB version type does match
                    if (in_array(strtolower($version), $pms_add_on['product_version_type'])) {

                        if ($pms_add_on_exists) {

                            // Display activate/deactivate buttons
                            if (!$pms_add_on_is_active) {
                                echo '<a class="pms-add-on-activate right button button-secondary" href="' . esc_attr( $pms_add_on['plugin_file'] ) . '" data-nonce="' . $ajax_nonce . '">' . __('Activate', 'paid-member-subscriptions') . '</a>';

                                // If add-on is network activated don't allow deactivation
                            } elseif (!$pms_add_on_is_network_active) {
                                echo '<a class="pms-add-on-deactivate right button button-secondary" href="' . esc_attr( $pms_add_on['plugin_file'] ) . '" data-nonce="' . $ajax_nonce . '">' . __('Deactivate', 'paid-member-subscriptions') . '</a>';
                            }

                            // Display message to the user
                            if (!$pms_add_on_is_active) {
                                echo '<span class="dashicons dashicons-no-alt"></span><span class="pms-add-on-message">' . __('Add-On is <strong>inactive</strong>', 'paid-member-subscriptions') . '</span>';
                            } else {
                                echo '<span class="dashicons dashicons-yes"></span><span class="pms-add-on-message">' . __('Add-On is <strong>active</strong>', 'paid-member-subscriptions') . '</span>';
                            }

                            echo '<div class="spinner"></div>';

                        } else {

                            $pms_paid_href_utm_text = '?utm_source=wpbackend&utm_medium=clientsite&utm_content=add-on-page-buy-button&utm_campaign=PMS' . $version;

                            echo '<a target="_blank" class="right button button-primary" href="' . esc_attr( $pms_add_on['url'] . $pms_paid_href_utm_text ) . '" data-add-on-slug="paid-member-subscriptions-' . esc_attr( $pms_add_on['slug'] ) . '" data-add-on-name="' . esc_attr( $pms_add_on['name'] ) . '" data-nonce="' . $ajax_nonce . '">' . __('Learn More', 'paid-member-subscriptions') . '</a>';
                            echo '<span class="dashicons dashicons-yes"></span><span class="pms-add-on-message">' . __('Compatible with your version of Paid Member Subscriptions.', 'paid-member-subscriptions') . '</span>';

                        }

                        // PB version type does not match
                    } else {

                        echo '<a target="_blank" class="button button-secondary right" href="http://www.cozmoslabs.com/paid-member-subscriptions/?utm_source=wpbackend&utm_medium=clientsite&utm_content=add-on-page-upgrade-button&utm_campaign=PMS' . $version . '">' . __('Upgrade Paid Member Subscriptions', 'paid-member-subscriptions') . '</a>';
                        echo '<span class="dashicons dashicons-no-alt"></span><span class="pms-add-on-message">' . __('Not compatible with Paid Member Subscriptions', 'paid-member-subscriptions') . ' ' . $version . '</span>';

                    }

                } else {

                    // If PMS version is older than the minimum required version of the add-on
                    echo ' ' . '<a class="button button-secondary right" href="' . admin_url('plugins.php') . '">' . __('Update', 'paid-member-subscriptions') . '</a>';
                    echo '<span class="pms-add-on-message">' . __('Not compatible with your version of Paid Member Subscriptions.', 'paid-member-subscriptions') . '</span><br />';
                    echo '<span class="pms-add-on-message">' . __('Minimum required Paid Member Subscriptions version:', 'paid-member-subscriptions') . '<strong> ' . $pms_add_on['product_version'] . '</strong></span>';

                }

                // We had to put this error here because we need the url of the add-on
                echo '<span class="pms-add-on-user-messages pms-error-manual-install">' . sprintf(__('Could not install add-on. Retry or <a href="%s" target="_blank">install manually</a>.', 'paid-member-subscriptions'), esc_url($pms_add_on['url'])) . '</span>';

                echo '</div>';
                echo '</div>';

            } /* end $pms_add_ons foreach */
        }

        ?>
    </div>

</div>

