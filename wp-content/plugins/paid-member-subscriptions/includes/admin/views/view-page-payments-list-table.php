<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/*
 * HTML output for the payments admin page
 */
?>

<div class="wrap">

    <h2>
        <?php echo $this->page_title; ?>
        <a href="<?php echo esc_url( add_query_arg( array( 'page' => $this->menu_slug, 'pms-action' => 'add_payment' ), admin_url( 'admin.php' ) ) ); ?>" class="add-new-h2"><?php echo __( 'Add New', 'paid-member-subscriptions' ); ?></a>
    </h2>

    <form method="get">
        <input type="hidden" name="page" value="pms-payments-page" />
    <?php

        $payments_list_table = new PMS_Payments_List_Table();
        $payments_list_table->prepare_items();
        $payments_list_table->views();
        $payments_list_table->search_box(__('Search Payments'),'pms_search_payments');
        $payments_list_table->display();

    ?>
    </form>

</div>