<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

Class PMS_Payment_Gateway_Manual extends PMS_Payment_Gateway {

    /*
     * The payment type for this gateway
     *
     * @access private
     * @var string
     *
     */
    private $payment_type = 'manual_payment';


    /**
     * The features supported by the payment gateway
     *
     * @access public
     * @var array
     *
     */
    public $supports;


    public function init() {

        $this->supports = array(
            'change_subscription_payment_method_admin'
        );

        // Add custom user messages for this gateway
        add_filter( 'pms_message_gateway_payment_action', array( $this, 'success_messages' ), 10, 4 );

        // Automatically activate the member's subscription when completing the payment
        add_action( 'pms_payment_update', array( $this, 'activate_member_subscription' ), 10, 3 );

    }


    /*
     * Process payment
     *
     */
    public function process_sign_up() {

        // Get payment
        $payment = pms_get_payment( $this->payment_id );

        // Update the type
        $payment->update( array( 'type' => $this->payment_type ) );

        // Success Redirect
        if( isset( $_POST['pmstkn'] ) ) {
            $redirect_url = add_query_arg(array('pms_gateway_payment_id' => base64_encode($this->payment_id), 'pmsscscd' => base64_encode('subscription_plans')), $this->redirect_url);
            wp_redirect($redirect_url);
            exit;
        }

    }


    /*
     * Change the default success message for the different payment actions
     * 
     * @param string $message
     * @param string $payment_status
     * @param string $payment_action
     * @param obj $payment
     *
     * @return string
     *
     */
    public function success_messages( $message, $payment_status, $payment_action, $payment ) {

        if( $payment->type !== $this->payment_type )
            return $message;

        // We're interested in changing only the success messages for paid subscriptions
        // which will all have the "pending" status
        if( $payment_status != 'pending' )
            return $message;

        switch( $payment_action ) {

            case 'upgrade_subscription':
                $message = __( 'Thank you for upgrading. The changes will take effect after the payment is received.', 'paid-member-subscriptions' );
                break;

            case 'renew_subscription':
                $message = __( 'Thank you for renewing. The changes will take effect after the payment is received.', 'paid-member-subscriptions' );
                break;

            case 'new_subscription':
                $message = __( 'Thank you for subscribing. The subscription will be activated after the payment is received.', 'paid-member-subscriptions' );
                break;

            case 'retry_payment':
                $message = __( 'The subscription will be activated after the payment is received.', 'paid-member-subscriptions' );
                break;

            default:
                break;
                
        }

        return $message;

    }


    /**
     * Activates the member's account when the payment is marked as complete. 
     * If the subscription is already active, add the extra time to the subscription expiration date
     *
     * @param int   $payment_id
     * @param array $data         - an array with modifications made when saving the payment in the back-end
     * @param array $old_data     - the array of values representing the payment before the update
     *
     * @return void
     *
     */
    public function activate_member_subscription( $payment_id, $data, $old_data ) {

        if( empty( $data['status'] ) || $data['status'] != 'completed' )
            return;

        $payment = pms_get_payment( $payment_id );

        if( $payment->type !== 'manual_payment' )
            return;

        $member_subscriptions = pms_get_member_subscriptions( array( 'user_id' => $payment->user_id, 'subscription_plan_id' => $payment->subscription_id ) );

        if( empty( $member_subscriptions ) )
            return;

        $member_subscription = $member_subscriptions[0];

        if( ! empty( $member_subscription ) ) {
            if ( $member_subscription->status == 'active' ) {
                $subscription_plan = pms_get_subscription_plan( $payment->subscription_id );
                
                $member_subscription->update( array( 'expiration_date' => date( 'Y-m-d H:i:s', strtotime( pms_sanitize_date($member_subscription->expiration_date) . '+' . $subscription_plan->duration . ' ' . $subscription_plan->duration_unit ) ) ) );
            } else
                $member_subscription->update( array( 'status' => 'active' ) );
        }

    }

}
