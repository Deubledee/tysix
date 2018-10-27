<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * HTML output for the member subscription details
 *
 */
$member_subscription   = pms_get_member_subscription( (int)$_GET['subscription_id'] );
$show_subscription	   = true;

if( is_null( $member_subscription ) )
	$show_subscription = false;

elseif( $user_id != $member_subscription->user_id )
	$show_subscription = false;

?>

<?php if( $show_subscription == false ): ?>

	<p><?php printf( __( 'This is not a valid subscription. %1$sBack to account%2$s', 'paid-member-subscriptions' ), '<a href="' . pms_get_current_page_url( true ) . '">', '</a>' ); ?></p>

<?php else: ?>

	<?php
		$subscription_statuses = pms_get_member_subscription_statuses();
		$subscription_plan	   = pms_get_subscription_plan( $member_subscription->subscription_plan_id );
	?>

	<table class="pms-account-subscription-details-table">
		<tbody>

			<!-- Subscription plan -->
			<tr>
				<td><?php echo __( 'Subscription Plan', 'paid-member-subscriptions' ); ?></td>
				<td><?php echo ( ! empty( $subscription_plan->name ) ? $subscription_plan->name : '' ); ?></td>
			</tr>

			<!-- Subscription status -->
			<tr>
				<td><?php echo __( 'Status', 'paid-member-subscriptions' ); ?></td>
				<td>
                    <?php echo ( ! empty( $subscription_statuses[$member_subscription->status] ) ? $subscription_statuses[$member_subscription->status] : '' ); ?>
                    <?php echo ( $member_subscription->is_trial_period() ? ' (' . __( 'Trial', 'paid-member-subscriptions' ) . ')' : '' ); ?>
                </td>
			</tr>

            <!-- Subscription start date -->
            <tr>
                <td><?php echo __( 'Start Date', 'paid-member-subscriptions' ); ?></td>
                <td><?php echo ( ! empty( $member_subscription->start_date ) ? ucfirst( date_i18n( get_option('date_format'), strtotime( $member_subscription->start_date ) ) ) : '' ); ?></td>
            </tr>

            <!-- Subscription expiration date -->
            <tr>
                <td><?php echo __( 'Expiration Date', 'paid-member-subscriptions' ); ?></td>
                <td><?php echo ( ! empty( $member_subscription->expiration_date ) ? ucfirst( date_i18n( get_option('date_format'), strtotime( $member_subscription->expiration_date ) ) ) : __( 'Unlimited', 'paid-member-subscriptions' ) ); ?></td>
            </tr>

            <!-- Subscription next payment -->
            <?php if( $member_subscription->is_trial_period() ): ?>
                <tr>
                    <td><?php echo __( 'Trial End Date', 'paid-member-subscriptions' ); ?></td>
                    <td><?php echo ucfirst( date_i18n( get_option('date_format'), strtotime( $member_subscription->trial_end ) ) ); ?></td>
                </tr>
            <?php endif; ?>

            <!-- Subscription next payment -->
            <?php if( ! empty( $member_subscription->billing_next_payment ) ): ?>
            <tr>
                <td><?php echo __( 'Next Payment', 'paid-member-subscriptions' ); ?></td>
                <td><?php echo ucfirst( date_i18n( get_option('date_format'), strtotime( $member_subscription->billing_next_payment ) ) ); ?></td>
            </tr>
            <?php endif; ?>

            <!-- Subscription actions -->
            <tr>
                <td><?php echo __( 'Actions', 'paid-member-subscriptions' ); ?></td>
                <td>
                    <?php

                    if( $member_subscription->status != 'pending' && $subscription_plan->status != 'inactive' ) {

                        // Get plan upgrades
                        $plan_upgrades = pms_get_subscription_plan_upgrades( $subscription_plan->id );

                        if( !empty( $plan_upgrades ) )
                            echo apply_filters( 'pms_output_subscription_plan_action_upgrade', '<a class="pms-account-subscription-action-link" href="' . esc_url( wp_nonce_url( add_query_arg( array( 'pms-action' => 'upgrade_subscription', 'subscription_id' => $member_subscription->id, 'subscription_plan' => $subscription_plan->id ), pms_get_current_page_url( true ) ), 'pms_member_nonce', 'pmstkn' ) ) . '">' . __( 'Upgrade', 'paid-member-subscriptions' ) . '</a>', $subscription_plan, $member_subscription->to_array(), $member->user_id );

                        // Number of days before expiration to show the renewal action
                        $renewal_display_time = apply_filters( 'pms_output_subscription_plan_action_renewal_time', 15 );

                        if( ( ! $member_subscription->is_auto_renewing() && strtotime( $member_subscription->expiration_date ) - time() < $renewal_display_time * DAY_IN_SECONDS ) || $member_subscription->status == 'canceled' )
                            echo apply_filters( 'pms_output_subscription_plan_action_renewal', '<a class="pms-account-subscription-action-link" href="' . esc_url( wp_nonce_url( add_query_arg( array( 'pms-action' => 'renew_subscription', 'subscription_id' => $member_subscription->id, 'subscription_plan' => $subscription_plan->id ), pms_get_current_page_url( true ) ), 'pms_member_nonce', 'pmstkn' ) ) . '">' . __( 'Renew', 'paid-member-subscriptions' ) . '</a>', $subscription_plan, $member_subscription->to_array(), $member->user_id );

                        if( $member_subscription->status == 'active' && ( ( $member_subscription->is_auto_renewing() && pms_is_https() ) || ! $member_subscription->is_auto_renewing() ) )
                            echo apply_filters( 'pms_output_subscription_plan_action_cancel', '<a class="pms-account-subscription-action-link" href="' . esc_url( wp_nonce_url( add_query_arg( array( 'pms-action' => 'cancel_subscription', 'subscription_id' => $member_subscription->id  ), pms_get_current_page_url( true ) ), 'pms_member_nonce', 'pmstkn' ) ) . '">' . __( 'Cancel', 'paid-member-subscriptions' ) . '</a>', $subscription_plan, $member_subscription->to_array(), $member->user_id );


                    } else {

                        if( $subscription_plan->price > 0 )
                            echo apply_filters( 'pms_output_subscription_plan_pending_retry_payment', '<a class="pms-account-subscription-action-link" href="' . esc_url( wp_nonce_url( add_query_arg( array( 'pms-action' => 'retry_payment_subscription', 'subscription_plan' => $subscription_plan->id  ) ), 'pms_member_nonce', 'pmstkn' ) ) . '">' . __( 'Retry payment', 'paid-member-subscriptions' ) . '</a>', $subscription_plan, $member_subscription->to_array() );

                    }

                    if( ( $member_subscription->is_auto_renewing() && pms_is_https() ) || ! $member_subscription->is_auto_renewing() )
                        echo apply_filters( 'pms_output_subscription_plan_action_abandon', '<a class="pms-account-subscription-action-link" href="' . esc_url( wp_nonce_url( add_query_arg( array( 'pms-action' => 'abandon_subscription', 'subscription_id' => $member_subscription->id  ), pms_get_current_page_url( true ) ), 'pms_member_nonce', 'pmstkn' ) ) . '">' . __( 'Abandon', 'paid-member-subscriptions' ) . '</a>', $subscription_plan, $member_subscription->to_array(), $member->user_id );

                    ?>
                </td>
            </tr>
		</tbody>
	</table>

    <div>
        <?php echo apply_filters( 'pms_output_subscription_details_return_to_account', '<a href="' . pms_get_current_page_url( true ) . '">' . __( 'Go back to account', 'paid-member-subscriptions' ) . '</a>' ); ?>
    </div>
<?php endif; ?>
