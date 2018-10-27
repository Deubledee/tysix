<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;


/**
 * Verifies whether the current page communicates through HTTPS
 *
 * @return bool
 *
 */
function pms_is_https() {

    $is_secure = false;

    if ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] == 'on' ) {

        $is_secure = true;

    } elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' || ! empty( $_SERVER['HTTP_X_FORWARDED_SSL'] ) && $_SERVER['HTTP_X_FORWARDED_SSL'] == 'on' ) {

        $is_secure = true;

    }

    return $is_secure;

}


/**
 * Function that returns only the date part of a date-time format
 *
 * @param string $date
 *
 * @return string
 *
 */
function pms_sanitize_date( $date ) {

    if( !isset( $date ) )
        return;

    $date_time = explode( ' ', $date );

    return $date_time[0];

}


/**
 * Returns the url of the current page
 *
 * @param bool $strip_query_args - whether to eliminate query arguments from the url or not
 *
 * @return string
 *
 */
function pms_get_current_page_url( $strip_query_args = false ) {

    $page_url = 'http';

    if ((isset($_SERVER["HTTPS"])) && ($_SERVER["HTTPS"] == "on"))
        $page_url .= "s";

    $page_url .= "://";

    if ($_SERVER["SERVER_PORT"] != "80")
        $page_url .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
    else
        $page_url .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];


    // Remove query arguments
    if( $strip_query_args ) {
        $page_url_parts = explode( '?', $page_url );

        $page_url = $page_url_parts[0];

        // Keep query args "p" and "page_id" for non-beautified permalinks
        if( isset( $page_url_parts[1] ) ) {
            $page_url_query_args = explode( '&', $page_url_parts[1] );

            if( !empty( $page_url_query_args ) ) {
                foreach( $page_url_query_args as $key => $query_arg ) {

                    if( strpos( $query_arg, 'p=' ) === 0 ) {
                        $query_arg_parts = explode( '=', $query_arg );
                        $query_arg       = $query_arg_parts[0];
                        $query_arg_val   = $query_arg_parts[1];

                        $page_url = add_query_arg( array( $query_arg => $query_arg_val ), $page_url );
                    }

                    if( strpos( $query_arg, 'page_id=' ) === 0 ) {
                        $query_arg_parts = explode( '=', $query_arg );
                        $query_arg       = $query_arg_parts[0];
                        $query_arg_val   = $query_arg_parts[1];

                        $page_url = add_query_arg( array( $query_arg => $query_arg_val ), $page_url );
                    }

                }
            }
        }

    }

    /**
     * Filter the page url just before returning
     *
     * @param string $page_url
     *
     */
    $page_url = apply_filters( 'pms_get_current_page_url', $page_url );

    return $page_url;

}


/**
 * Checks if there is a need to add the http:// prefix to a link and adds it. Returns the correct link.
 *
 * @param string $link
 *
 * @return string
 *
 */
function pms_add_missing_http( $link = '' ) {

    $http = '';

    if ( preg_match( '#^(?:[a-z\d]+(?:-+[a-z\d]+)*\.)+[a-z]+(?::\d+)?(?:/|$)#i', $link ) ) { //if missing http(s)

        $http = 'http';
        if ((isset($_SERVER["HTTPS"])) && ($_SERVER["HTTPS"] == "on"))
            $http .= "s";
        $http .= "://";
    }

    return $http . $link;

}


/**
 * Function that return the IP address of the user. Checks for IPs (in order) in: 'HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR'
 *
 * @return string
 *
 */
function pms_get_user_ip_address() {

    $ip_address = '';

    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
        if (array_key_exists($key, $_SERVER) === true) {
            foreach ( array_map('trim', explode( ',', $_SERVER[$key]) ) as $ip ) {
                if ( filter_var($ip, FILTER_VALIDATE_IP) !== false ) {
                    return $ip;
                }
            }
        }
    }

    return $ip_address;
    
}


/**
 * Sanitizes the values of an array recursivelly
 *
 * @param array $array
 *
 * @return array
 *
 */
function pms_array_sanitize_text_field( $array = array() ) {

    if( empty( $array ) || ! is_array( $array ) )
        return array();

    foreach( $array as $key => $value ) {

        if( is_array( $value ) )
            $array[$key] = pms_array_sanitize_text_field( $value );

        else
            $array[$key] = sanitize_text_field( $value );

    }

    return $array;

}


/**
 * Removes the script tags from the values of an array recursivelly
 *
 * @param array $array
 *
 * @return array
 *
 */
function pms_array_strip_script_tags( $array = array() ) {

    if( empty( $array ) || ! is_array( $array ) )
        return array();

    foreach( $array as $key => $value ) {

        if( is_array( $value ) )
            $array[$key] = pms_array_strip_script_tags( $value );

        else
            $array[$key] = preg_replace( '@<(script)[^>]*?>.*?</\\1>@si', '', $value );

    }

    return $array;

}


/**
 * Callback for the "wp_kses_allowed_html" filter to add iframes to the allowed tags
 *
 * @param array  $tags
 * @param strint $context
 *
 * @return array
 *
 */
function pms_wp_kses_allowed_html_iframe( $tags = array(), $context = '' ) {
    
    if ( 'post' === $context ) {

        $tags['iframe'] = array(
            'src'             => true,
            'height'          => true,
            'width'           => true,
            'frameborder'     => true,
            'allowfullscreen' => true,
        );

    }

    return $tags;

}


/**
 * Copy of WordPress's default _deprecated_function() function, which is marked as private 
 *
 */
function _pms_deprecated_function( $function, $version, $replacement = null ) {
 
    /**
     * Filters whether to trigger an error for deprecated functions.
     *
     * @param bool $trigger Whether to trigger the error for deprecated functions. Default true.
     *
     */
    if ( WP_DEBUG && apply_filters( 'pms_deprecated_function_trigger_error', true ) ) {
        if ( function_exists( '__' ) ) {
            if ( ! is_null( $replacement ) ) {
                /* translators: 1: PHP function name, 2: version number, 3: alternative function name */
                trigger_error( sprintf( __('%1$s is <strong>deprecated</strong> since version %2$s! Use %3$s instead.'), $function, $version, $replacement ) );
            } else {
                /* translators: 1: PHP function name, 2: version number */
                trigger_error( sprintf( __('%1$s is <strong>deprecated</strong> since version %2$s with no alternative available.'), $function, $version ) );
            }
        } else {
            if ( ! is_null( $replacement ) ) {
                trigger_error( sprintf( '%1$s is <strong>deprecated</strong> since version %2$s! Use %3$s instead.', $function, $version, $replacement ) );
            } else {
                trigger_error( sprintf( '%1$s is <strong>deprecated</strong> since version %2$s with no alternative available.', $function, $version ) );
            }
        }
    }
}