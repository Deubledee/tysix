<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// WP_List_Table is not loaded automatically in the plugins section
if( ! class_exists( 'WP_List_Table' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}


/*
 * Extent WP default list table for our custom members section
 *
 */
Class PMS_Members_List_Table extends WP_List_Table {

    /**
     * Members per page
     *
     * @access public
     * @var int
     */
    public $items_per_page;

    /**
     * Members table data
     *
     * @access public
     * @var array
     */
    public $data;

    /**
     * Members table views count
     *
     * @access public
     * @var array
     */
    public $views_count = array();

    /**
     * The total number of items
     *
     * @access private
     * @var int
     *
     */
    private $total_items;


    /*
     * Constructor function
     *
     */
    public function __construct() {

        parent::__construct( array(
            'singular'  => 'member',
            'plural'    => 'members',
            'ajax'      => false
        ));

        // Set items per page
        $items_per_page = get_user_meta( get_current_user_id(), 'pms_members_per_page', true );

        if( empty( $items_per_page ) ) {
            $screen     = get_current_screen();
            $per_page   = $screen->get_option('per_page');
            $items_per_page = $per_page['default'];
        }

        $this->items_per_page = $items_per_page;

        // Set data
        $this->set_table_data();

    }

    /*
     * Overwrites the parent class.
     * Define the columns for the members
     *
     * @return array
     *
     */
    public function get_columns() {

        $columns = array(
            'user_id'           => __( 'User ID', 'paid-member-subscriptions' ),
            'username'          => __( 'Username', 'paid-member-subscriptions' ),
            'email'             => __( 'E-mail', 'paid-member-subscriptions' ),
            'subscriptions'     => __( 'Subscribed to', 'paid-member-subscriptions' )
        );

        return apply_filters( 'pms_members_list_table_columns', $columns );

    }


    /*
     * Overwrites the parent class.
     * Define which columns to hide
     *
     * @return array
     *
     */
    public function get_hidden_columns() {

        return array();

    }


    /*
     * Overwrites the parent class.
     * Define which columns are sortable
     *
     * @return array
     *
     */
    public function get_sortable_columns() {

        return array(
            'user_id'           => array( 'user_id', false ),
            'username'          => array( 'username', false )
        );

    }


    /*
     * Returns the possible views for the members list table
     *
     */
    protected function get_views() {

        return apply_filters( 'pms_members_list_table_get_views', array(
            'all'       => '<a href="' . remove_query_arg( array( 'pms-view', 'paged' ) ) . '" ' . ( !isset( $_GET['pms-view'] ) ? 'class="current"' : '' ) . '>All <span class="count">(' . ( isset( $this->views_count['all'] ) ? $this->views_count['all'] : '' ) . ')</span></a>',
            'active'    => '<a href="' . add_query_arg( array( 'pms-view' => 'active', 'paged' => 1 ) ) . '" ' . ( isset( $_GET['pms-view'] ) &&$_GET['pms-view'] == 'active' ? 'class="current"' : '' ) . '>Active <span class="count">(' . ( isset( $this->views_count['active'] ) ? $this->views_count['active'] : '' ) . ')</span></a>',
            'expired'   => '<a href="' . add_query_arg( array( 'pms-view' => 'expired', 'paged' => 1 ) ) . '" ' . ( isset( $_GET['pms-view'] ) &&$_GET['pms-view'] == 'expired' ? 'class="current"' : '' ) . '>Expired <span class="count">(' . ( isset( $this->views_count['expired'] ) ? $this->views_count['expired'] : '' ) . ')</span></a>',
            'pending'   => '<a href="' . add_query_arg( array( 'pms-view' => 'pending', 'paged' => 1 ) ) . '" ' . ( isset( $_GET['pms-view'] ) &&$_GET['pms-view'] == 'pending' ? 'class="current"' : '' ) . '>Pending <span class="count">(' . ( isset( $this->views_count['pending'] ) ? $this->views_count['pending'] : '' ) . ')</span></a>'
        ));

    }


    /*
     * Overwrite parent display tablenav to avoid WP's default nonce for bulk actions
     *
     * @param string @which     - which side of the table ( top or bottom )
     *
     */
    protected function display_tablenav( $which ) {

        echo '<div class="tablenav ' . esc_attr( $which ) . '">';

            $this->extra_tablenav( $which );
            $this->pagination( $which );

            echo '<br class="clear" />';
        echo '</div>';

    }


    /*
     * Method to add extra actions before and after the table
     * Replaces parent method
     *
     * @param string @which     - which side of the table ( top or bottom )
     *
     */
    public function extra_tablenav( $which ) {

        if( $which == 'bottom' )
            return;

        echo '<div style="display: inline-block;">';

            /*
             * Add a custom select box to
             *
             */
            $subscription_plans = pms_get_subscription_plans( false );
            echo '<select name="pms-filter-subscription-plan">';
                echo '<option value="">' . __( 'Filter by Subscription Plan...', 'paid-member-subscriptions' ) . '</option>';

                foreach( $subscription_plans as $subscription_plan )
                    echo '<option value="' . $subscription_plan->id . '" ' . ( !empty( $_GET['pms-filter-subscription-plan'] ) ? selected( $subscription_plan->id, $_GET['pms-filter-subscription-plan'], false ) : '' ) . '>' . $subscription_plan->name . '</option>';
            echo '</select>';

            /*
             * Filter button
             *
             */
            echo '<input class="button button-secondary" type="submit" value="' . __( 'Filter', 'paid-member-subscriptions' ) . '" />';

        echo '</div>';

    }


    /*
     * Sets the table data
     *
     * @return array
     *
     */
    public function set_table_data() {

        $data = array();
        $args = array();

        $selected_view = ( isset( $_GET['pms-view'] ) ? sanitize_text_field( $_GET['pms-view'] ) : '' );
        $paged         = ( isset( $_GET['paged'] )    ? (int)$_GET['paged'] : 1 );


        /**
         * Set member arguments
         *
         */
        $args['number'] = $this->items_per_page;
        $args['offset'] = ( $paged - 1 ) * $this->items_per_page;
        $args['member_subscription_status'] = $selected_view;

        // Search query
        if ( ! empty($_REQUEST['s']) ) {
            $args['search'] = $_REQUEST['s'];
        }

        // Order by query
        if( ! empty( $_REQUEST['orderby'] ) && ! empty( $_REQUEST['order'] ) ) {

            if( $_REQUEST['orderby'] == 'user_id' )
                $args['orderby'] = 'ID';

            if( $_REQUEST['orderby'] == 'username' )
                $args['orderby'] = 'user_login';
            
            $args['order']   = sanitize_text_field( $_REQUEST['order'] );

        }

        // Set subscription plan if it exists
        if( ! empty( $_GET['pms-filter-subscription-plan'] ) ) {
            $args['subscription_plan_id'] = (int)$_GET['pms-filter-subscription-plan'];
        }


        // Get the members
        $members = pms_get_members( $args );

        // Set views count array to 0, we use this to display the count
        // next to the views links (all, active, expired, etc)
        $views = $this->get_views();

        foreach( $views as $view_slug => $view_link) {

            $args['member_subscription_status'] = ( $view_slug != 'all' ? $view_slug : '' );

            $this->views_count[$view_slug] = pms_get_members( $args, true );

        }

        // Get the current view to filter results
        $selected_view = ( isset( $_GET['pms-view'] ) ? sanitize_text_field( $_GET['pms-view'] ) : '' );

        foreach( $members as $member ) {

            $member_subscriptions = pms_get_member_subscriptions( array( 'user_id' => $member->user_id ) );

            $data[] = apply_filters( 'pms_members_list_table_entry_data', array(
                'user_id'           => $member->user_id,
                'username'          => '<strong><a href="' . add_query_arg( array( 'subpage' => 'edit_member', 'member_id' => $member->user_id ) ) . '">' . esc_attr( $member->username ) . '</a></strong>',
                'email'             => $member->email,
                'subscriptions'     => $member_subscriptions
            ), $member );

        }

        /**
         * Set all items
         *
         */
        $this->total_items = $this->views_count[ ( ! empty( $selected_view ) ? $selected_view : 'all' ) ];


        /**
         * Set table data
         *
         */
        $this->data = $data;

    }



    /**
     * Populates the items for the table
     *
     * @param array $item           - data for the current row
     *
     * @return string
     *
     */
    public function prepare_items() {

        $columns        = $this->get_columns();
        $hidden_columns = $this->get_hidden_columns();
        $sortable       = $this->get_sortable_columns();

        $this->_column_headers = array( $columns, $hidden_columns, $sortable );

        $this->set_pagination_args( array(
            'total_items' => $this->total_items,
            'per_page'    => $this->items_per_page
        ));

        $this->items = $this->data;

    }


    /*
     * Return data that will be displayed in each column
     *
     * @param array $item           - data for the current row
     * @param string $column_name   - name of the current column
     *
     * @return string
     *
     */
    public function column_default( $item, $column_name ) {

        return !empty( $item[ $column_name ] ) ? $item[ $column_name ] : '';

    }


    /*
     * Return data that will be displayed in the username column
     *
     * @param array $item   - row data
     *
     * @return string
     *
     */
    public function column_username( $item ) {

        $actions = array();

        // Add an edit user action for each member
        $actions['edit'] = '<a href="' . add_query_arg( array( 'subpage' => 'edit_member', 'member_id' => $item['user_id'] ) ) . '">' . __( 'Edit Member', 'paid-member-subscriptions' ) . '</a>';

        // Return value saved for username and also the row actions
        return $item['username'] . $this->row_actions( $actions );

    }


    /**
     * Return data that will be displayed in the subscriptions column
     *
     * @param array $item   - row data
     *
     * @return string
     *
     */
    public function column_subscriptions( $item ) {

        $output = '';

        foreach( $item['subscriptions'] as $member_subscription ) {

            //$member_subscription = $member_subscription->to_array();

            $subscription_plan = pms_get_subscription_plan( $member_subscription->subscription_plan_id );

            $output .= '<span class="pms-member-list-subscription pms-has-bubble">';

                $output .= apply_filters( 'pms_list_table_' . $this->_args['plural'] . '_show_status_dot', '<span class="pms-status-dot ' . esc_attr( $member_subscription->status ) . '"></span>' );

                $output .= ( !empty( $subscription_plan->id ) ? $subscription_plan->name : sprintf( __( 'Subscription Plan Not Found - ID: %s', 'paid-member-subscriptions' ), $member_subscription->subscription_plan_id ) );

                $output .= '<div class="pms-bubble">';

                    $statuses = pms_get_member_subscription_statuses();

                    $output .= '<div><span class="alignleft">' . __( 'Start date', 'paid-member-subscriptions' ) . '</span><span class="alignright">' . date( get_option( 'date_format' ), strtotime( pms_sanitize_date( $member_subscription->start_date ) ) ) . '</span></div>';
                    $output .= '<div><span class="alignleft">' . __( 'Expiration date', 'paid-member-subscriptions' ) . '</span><span class="alignright">' . ( ! empty( $member_subscription->expiration_date ) ? date( get_option( 'date_format' ), strtotime( pms_sanitize_date( $member_subscription->expiration_date ) ) ) : __( 'Unlimited', 'paid-member-subscriptions' ) ) . '</span></div>';
                    $output .= '<div><span class="alignleft">' . __( 'Status', 'paid-member-subscriptions' ) . '</span><span class="alignright">' . ( isset( $statuses[ $member_subscription->status ] ) ? $statuses[ $member_subscription->status ] : '' ) . '</span></div>';

                    if( pms_payment_gateways_support( pms_get_active_payment_gateways(), 'recurring_payments' ) )
                        $output .= '<div><span class="alignleft">' . __( 'Auto-renewing', 'paid-member-subscriptions' ) . '</span><span class="alignright">' . ( $member_subscription->is_auto_renewing() ? __( 'Yes', 'paid-member-subscriptions' ) : __( 'No', 'paid-member-subscriptions' ) ) . '</span></div>';

                $output .= '</div>';

            $output .= '</span>';

        }

        return $output;

    }


    /*
     * Display if no items are found
     *
     */
    public function no_items() {

        echo __( 'No members found', 'paid-member-subscriptions' );

    }

}