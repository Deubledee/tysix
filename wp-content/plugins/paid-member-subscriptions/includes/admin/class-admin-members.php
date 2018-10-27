<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Extends core PMS_Submenu_Page base class to create and add custom functionality
 * for the members section in the admin section
 *
 */
Class PMS_Submenu_Page_Members extends PMS_Submenu_Page {

    /**
     * Request data
     *
     * @access public
     * @var array
     */
    public $request_data = array();


    /*
     * Method that initializes the class
     *
     */
    public function init() {

        $this->request_data = $_REQUEST;

        // Enqueue admin scripts
        add_action( 'pms_submenu_page_enqueue_admin_scripts_' . $this->menu_slug, array( $this, 'admin_scripts' ) );

        // Hook the validation of the data on the init.
        add_action( 'init', array( $this, 'process_data' ), 20 );

        // Hook the output method to the parent's class action for output instead of overwriting the
        // output method
        add_action( 'pms_output_content_submenu_page_' . $this->menu_slug, array( $this, 'output' ) );

        // Add ajax hooks
        add_action( 'wp_ajax_populate_expiration_date', array( $this, 'ajax_populate_expiration_date' ) );

        add_action( 'wp_ajax_populate_member_subscription_fields', array( $this, 'ajax_populate_member_subscription_fields' ) );

    }



    /*
     * Method to enqueue admin scripts
     *
     */
    public function admin_scripts() {

        wp_enqueue_script( 'jquery-ui-datepicker' );
        wp_enqueue_style('jquery-style', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/smoothness/jquery-ui.css');

        global $wp_scripts;

        // Try to detect if chosen has already been loaded
        $found_chosen = false;

        foreach( $wp_scripts as $wp_script ) {
            if( !empty( $wp_script['src'] ) && strpos($wp_script['src'], 'chosen') !== false )
                $found_chosen = true;
        }

        if( !$found_chosen ) {
            wp_enqueue_script( 'pms-chosen', PMS_PLUGIN_DIR_URL . 'assets/libs/chosen/chosen.jquery.min.js', array( 'jquery' ), PMS_VERSION );
            wp_enqueue_style( 'pms-chosen', PMS_PLUGIN_DIR_URL . 'assets/libs/chosen/chosen.css', array(), PMS_VERSION );
        }

    }


    /**
     * Returns a custom message by the provided code
     *
     * @param int $code
     *
     * @return string
     *
     */
    protected function get_message_by_code( $code = 0 ) {

        $messages = array(
            1 => __( 'Something went wrong. Could not process your request.', 'paid-member-subscriptions' ),
            2 => __( 'Member Subscription added successfully.', 'paid-member-subscriptions' ),
            3 => __( 'Member Subscription updated successfully.', 'paid-member-subscriptions' ),
            4 => __( 'Member Subscription deleted successfully.', 'paid-member-subscriptions' )
        );

        return ( ! empty( $messages[$code] ) ? $messages[$code] : '' );

    }


    /*
     * Method that processes data on members admin pages
     *
     */
    public function process_data() {

        // These processes should be handled only by an admin
        if( ! current_user_can( 'manage_options' ) )
            return;

        /**
         * Handle add new subscription
         *
         */
        if( ! empty( $_POST['_wpnonce'] ) && wp_verify_nonce( $_POST['_wpnonce'], 'pms_add_subscription_nonce' ) ) {

            if( ! $this->validate_subscription_data( $_POST ) )
                return;

            $member_subscription = new PMS_Member_Subscription();
            $subscription_id     = $member_subscription->insert( $_POST );
            
            // If the subscription was added redirect to the subscription's edit screen
            if( $subscription_id ) {

                wp_redirect( add_query_arg( array( 'page' => $this->menu_slug, 'subpage' => 'edit_subscription', 'subscription_id' => (int)$subscription_id, 'message' => '2', 'updated' => '1' ), admin_url( 'admin.php' ) ) );
                exit;

            }

        }


        /**
         * Handle edit subscription
         *
         */
        if( ! empty( $_POST['_wpnonce'] ) && wp_verify_nonce( $_POST['_wpnonce'], 'pms_edit_subscription_nonce' ) ) {

            if( ! $this->validate_subscription_data( $_POST ) )
                return;

            if( ! $this->validate_subscription_data_edit_subscription() )
                return;

            $member_subscription = pms_get_member_subscription( (int)$_GET['subscription_id'] );

            /* when changing a users subscription plan from the back-end change the billing amount as well */
            if( apply_filters( 'pms_update_billing_amount_from_backend_on_sub_change', true ) ) {
                if ($member_subscription->subscription_plan_id != $_POST['subscription_plan_id']) {
                    $new_subscription_plan = pms_get_subscription_plan($_POST['subscription_plan_id']);
                    if (isset($new_subscription_plan->price)) {
                        $_POST['billing_amount'] = $new_subscription_plan->price;
                    }
                }
            }

            $updated = $member_subscription->update( $_POST );

            if( $updated ) {

                wp_redirect( add_query_arg( array( 'message' => '3', 'updated' => '1' ), pms_get_current_page_url() ) );
                exit;

            }

        }


        /**
         * Handle delete subscription
         *
         */
        if( ! empty( $_GET['_wpnonce'] ) && wp_verify_nonce( $_GET['_wpnonce'], 'pms_delete_subscription_nonce' ) ) {

            if( empty( $_GET['subscription_id'] ) )
                return;

            $member_subscription = pms_get_member_subscription( (int)$_GET['subscription_id'] );

            if( is_null( $member_subscription ) )
                return;

            $member_id = $member_subscription->user_id;
            $deleted   = $member_subscription->remove();

            if( $deleted ) {

                $member_subscriptions = pms_get_member_subscriptions( array( 'user_id' => $member_id ) );

                if( ! empty( $member_subscriptions ) )
                    wp_redirect( add_query_arg( array( 'page' => $this->menu_slug, 'subpage' => 'edit_member', 'member_id' => $member_id, 'message' => '4', 'updated' => '1' ), admin_url( 'admin.php' ) ) );
                else
                    wp_redirect( add_query_arg( array( 'page' => $this->menu_slug, 'message' => '4', 'updated' => '1' ), admin_url( 'admin.php' ) ) );

                exit;

            }

        }


        /**
         * Bulk add subscription plan to users
         *
         */
        if( ! empty( $_POST['_wpnonce'] ) && wp_verify_nonce( $_POST['_wpnonce'], 'pms_add_new_members_bulk_nonce' ) ) {

            if( !empty( $this->request_data['subscription_plan_id'] ) && trim( $this->request_data['subscription_plan_id'] ) != -1 && !empty( $this->request_data['users'] ) ) {

                // Get subscription plan object
                $subscription_plan = pms_get_subscription_plan( trim( $this->request_data['subscription_plan_id'] ) );

                $added_members_count = 0;

                // Loop through every user id from the request
                foreach( $this->request_data['users'] as $user_id ) {

                    $member_subscriptions = pms_get_member_subscriptions( array( 'user_id' => $user_id ) );

                    if( ! empty( $member_subscriptions ) )
                        continue;

                    $data = array(
                        'user_id'              => $user_id,
                        'subscription_plan_id' => $subscription_plan->id,
                        'start_date'           => date( 'Y-m-d H:i:s' ),
                        'expiration_date'      => $subscription_plan->get_expiration_date(),
                        'status'               => 'active'
                    );

                    $member_subscription = new PMS_Member_Subscription();
                    $inserted            = $member_subscription->insert( $data );

                    if( $inserted )
                        $added_members_count++;

                }

                if( $added_members_count != 0 )
                    $this->add_admin_notice( sprintf( __( '%d members successfully added.', 'paid-member-subscriptions' ), $added_members_count ), 'updated' );

            }

        }

    }


    /**
     * Method that validates general subscription data 
     *
     * @return bool
     *
     */
    protected function validate_subscription_data() {

        /*
         * User validations
         */
        $request_data = $_REQUEST;

        // Check to see if the username field is empty
        if( empty( $request_data['user_id'] ) )
            $this->add_admin_notice( __( 'Please select a user.', 'paid-member-subscriptions' ), 'error' );

        else {

            $user_id = sanitize_text_field( $request_data['user_id'] );

            // Check to see if the username exists
            $user = get_user_by( 'id', $user_id );

            if( !$user )
                $this->add_admin_notice( __( 'It seems this user does not exist.', 'paid-member-subscriptions' ), 'error' );
        
        }

        /**
         * Check to see if a subscription plan was selected
         */
        if( empty( $request_data['subscription_plan_id'] ) )
            $this->add_admin_notice( __( 'Please select a subscription plan.', 'paid-member-subscriptions' ), 'error' );

        /**
         * Check to see if a start date was selected
         */
        if( empty( $request_data['start_date'] ) )
            $this->add_admin_notice( __( 'Please add a start date for the subscription.', 'paid-member-subscriptions' ), 'error' );


        /**
         * If expiration date is provided it should be bigger than the start date and also the trial date
         */
        if( ! empty( $request_data['expiration_date'] ) ) {

            if( ! empty( $request_data['start_date'] ) && ( strtotime( $request_data['expiration_date'] ) < strtotime( $request_data['start_date'] ) ) )
                $this->add_admin_notice( __( 'The expiration date needs to be greater than the start date.', 'paid-member-subscriptions' ), 'error' );

            if( ! empty( $request_data['trial_end'] ) && ( strtotime( $request_data['expiration_date'] ) < strtotime( $request_data['trial_end'] ) ) )
                $this->add_admin_notice( __( 'The expiration date needs to be greater than the trial end date.', 'paid-member-subscriptions' ), 'error' );

        }


        /**
         * Other validations from outside
         *
         * Returned array for the filter must contain arrays in the form of 'notice_type' => 'Notice message',
         * thus the returned array should be array( array('notice_type' => 'Notice message 1' ), array( 'notice_type' => 'Notice message 2' ) )
         *
         */
        $this->add_admin_notices( apply_filters( 'pms_submenu_page_members_validate_subscription_data', array(), $request_data ) );

        
        if( $this->has_admin_notice( 'error' ) )
            return false;
        else
            return true;

    }


    /**
     * Method that validates subscription data on edit subscription
     *
     * @return bool
     *
     */
    protected function validate_subscription_data_edit_subscription() {

        // Check to see if we have a subscription id for the subscription we want to edit
        if( empty( $_GET['subscription_id'] ) )
            $this->add_admin_notice( __( 'Something went wrong. Could not complete your request.', 'paid-member-subscriptions' ), 'error' );


        if( ! empty( $_GET['subscription_id'] ) ) {

            $member_subscription = pms_get_member_subscription( (int)$_GET['subscription_id'] );

            // Check to see if there's a subscription with the provided id
            if( is_null( $member_subscription ) )
                $this->add_admin_notice( __( 'Something went wrong. Could not complete your request.', 'paid-member-subscriptions' ), 'error' );

            // Check to see if the subscription's attached user_id is the same with the provided user_id
            elseif( $member_subscription->user_id != (int)$_POST['user_id'] )
                $this->add_admin_notice( __( 'Something went wrong. Could not complete your request.', 'paid-member-subscriptions' ), 'error' );

        }


        if( $this->has_admin_notice( 'error' ) )
            return false;
        else
            return true;

    }


    /*
     * Method to output content in the custom page
     *
     */
    public function output() {

        ob_start();

        // Display the add new member form
        if( isset( $_GET['subpage'] ) && $_GET['subpage'] == 'add_subscription' ) {

            // Check to see if member is provided if he is already subscribed
            if( ! empty( $_GET['member_id'] ) ) {

                $member_subscriptions = pms_get_member_subscriptions( array( 'user_id' => (int)$_GET['member_id'] ) );

                if( empty( $member_subscriptions ) )
                    include_once 'views/view-page-members-add-new-edit-subscription.php';
                else
                    include_once 'views/view-page-members-edit.php';

            } else {

                include_once 'views/view-page-members-add-new-edit-subscription.php';

            }

        }

        // Display the add new bulk table
        elseif( isset( $_GET['subpage'] ) && $_GET['subpage'] == 'add_new_members_bulk' )

            include_once 'views/view-page-members-add-new-bulk.php';

        // Display the edit member form
        elseif( isset( $_GET['subpage'] ) && $_GET['subpage'] == 'edit_member' && isset( $_REQUEST['member_id'] ) && !empty( $_REQUEST['member_id'] ) )

            include_once 'views/view-page-members-edit.php';

        elseif( isset( $_GET['subpage'] ) && $_GET['subpage'] == 'edit_subscription' && isset( $_REQUEST['subscription_id'] ) && !empty( $_REQUEST['subscription_id'] ) )

            include_once 'views/view-page-members-add-new-edit-subscription.php';

        // Display a list with all the members
        else
            include_once 'views/view-page-members-list-table.php';

        $subpage_content = ob_get_contents();

        ob_clean();

        echo apply_filters( 'pms_submenu_page_members_output', $subpage_content );

    }


    /**
     * Method that returns the formatted expiration date of a subscription plan
     *
     */
    public function ajax_populate_expiration_date() {

        $subscription_plan_id = (int)trim( $_POST['subscription_plan_id'] );

        if( ! empty( $subscription_plan_id ) ) {

            $subscription_plan = pms_get_subscription_plan( $subscription_plan_id );

            echo pms_sanitize_date( $subscription_plan->get_expiration_date() );

        } else
            echo '';

        wp_die();

    }


    /**
     * 
     *
     */
    public function ajax_populate_member_subscription_fields() {

        if( empty( $_POST['action'] ) || $_POST['action'] != 'populate_member_subscription_fields' ) {
            echo 0;
            wp_die();
        }

        if( empty( $_POST['subscription_plan_id'] ) ) {
            echo 0;
            wp_die();
        }

        $subscription_plan_id = (int)$_POST['subscription_plan_id'];
        $subscription_plan    = pms_get_subscription_plan( $subscription_plan_id );

        $subscription_data = array(
            'billing_duration'      => $subscription_plan->duration,
            'billing_duration_unit' => $subscription_plan->duration_unit,
            'start_date'            => date( 'Y-m-d' ),
            'expiration_date'       => pms_sanitize_date( $subscription_plan->get_expiration_date() ),
            'trial_end'             => pms_sanitize_date( $subscription_plan->get_trial_expiration_date() )
        );

        echo json_encode( $subscription_data );

        wp_die();

    }


	/*
     * Method that adds Screen Options to Members page
     *
     */
	public function add_screen_options() {

        if( isset( $_REQUEST['pms-action'] ) && $_REQUEST['pms-action'] == 'add_new_members_bulk' ) {

            $args = array(
                'label' => 'Users per page',
                'default' => 10,
                'option' => 'pms_users_per_page'
            );

        } else {

            $args = array(
                'label' => 'Members per page',
                'default' => 10,
                'option' => 'pms_members_per_page'
            );

        }

		add_screen_option( 'per_page', $args );

	}

}

$pms_submenu_page_members = new PMS_Submenu_Page_Members( 'paid-member-subscriptions', __( 'Members', 'paid-member-subscriptions' ), __( 'Members', 'paid-member-subscriptions' ), 'manage_options', 'pms-members-page' );
$pms_submenu_page_members->init();