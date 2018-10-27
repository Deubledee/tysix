/*
 * JavaScript for Members Submenu Page
 *
 */
jQuery( function($) {

    /**
     * Adds a spinner after the element
     */
    $.fn.pms_addSpinner = function( animation_speed ) {

        if( typeof animation_speed == 'undefined' )
            animation_speed = 100;

        $this = $(this);

        if( $this.siblings('.spinner').length == 0 )
            $this.after('<div class="spinner"></div>');

        $spinner = $this.siblings('.spinner');
        $spinner.css('visibility', 'visible').animate({opacity: 1}, animation_speed );

    };


    /**
     * Removes the spinners next to the element
     */
    $.fn.pms_removeSpinner = function( animation_speed ) {

        if( typeof animation_speed == 'undefined' )
            animation_speed = 100;

        if( $this.siblings('.spinner').length > 0 ) {

            $spinner = $this.siblings('.spinner');
            $spinner.animate({opacity: 0}, animation_speed );

            setTimeout( function() {
                $spinner.remove();
            }, animation_speed );

        }

    };


    if( $.fn.chosen != undefined ) {

        $('.pms-chosen').chosen();

    }


    /*
     * Function that checks to see if any field from a row is empty
     *
     */
    function checkEmptyRow( $field_wrapper ) {

        is_field_empty = false;

        $field_wrapper.find('.pms-subscription-field').each( function() {

            $field = $(this);

            if( typeof $field.attr('required') == 'undefined' )
                return true;

            var field_value = $field.val().trim();
            
            if( $field.is('select') && field_value == 0 )
                field_value = '';

            if( field_value == '' ) {
                $field.addClass('pms-field-error');
                is_field_empty = true;
            } else {
                $field.removeClass('pms-field-error');
            }

        });

        return is_field_empty;

    }


    var validation_errors = [];

    /**
     * Displays any errors as an admin notice under the page's title
     *
     */
    function displayErrors() {

        if( validation_errors.length == 0 )
            return false;

        errors_output = '';
        for( var i = 0; i < validation_errors.length; i++ ) {
            errors_output += '<p>' + validation_errors[i] + '</p>';
        }

        if( $('.wrap h2').first().siblings('.pms-admin-notice').length > 0 ) {

            $('.wrap h2').first().siblings('.pms-admin-notice').html( errors_output );

        } else {
            $('.wrap h2').first().after( '<div class="error pms-admin-notice">' + errors_output + '</div>' )
        }

    }


    /**
     * Initialize datepicker
     *
     */
    $(document).on( 'focus', '.datepicker', function() {
        $(this).datepicker({ dateFormat: 'yy-mm-dd'});
    });



    /**
     * Populate the expiration date field when changing the subscription plan field
     * with the expiration date calculated from the duration of the subscription plan selected
     */
    $(document).on( 'change', '#pms-form-add-member-subscription select[name=subscription_plan_id]', function() {

        $subscriptionPlanSelect = $(this);
        $expirationDateInput    = $subscriptionPlanSelect.closest('.pms-meta-box-field-wrapper').siblings('.pms-meta-box-field-wrapper').find('input[name=expiration_date]');

        // Exit if no subscription plan was selected
        if( $subscriptionPlanSelect.val() == 0 )
            return false;

        // De-focus the subscription plan select
        $subscriptionPlanSelect.blur();

        // Add the spinner
        $expirationDateInput.pms_addSpinner( 200 );

        $expirationDateSpinner = $expirationDateInput.siblings('.spinner');
        $expirationDateSpinner.animate({opacity: 1}, 200);

        // Disable the datepicker
        $expirationDateInput.attr( 'disabled', true );

        // Get the expiration date and set it the expiration date field
        $.post( ajaxurl, { action: 'populate_expiration_date', subscription_plan_id: $subscriptionPlanSelect.val() }, function( response ) {

            // Populate expiration date field
            $expirationDateInput.val( response );

            // Remove spinner and enable the expiration date field
            $expirationDateInput.pms_removeSpinner( 100 );
            $expirationDateInput.attr( 'disabled', false).trigger('change');

        });

    });

    
    /**
     * Shows / hides the payment gateway's extra fields when changing the payment gateway
     *
     */
    $(document).on( 'change', 'select[name=payment_gateway]', function() {

        $('#pms-meta-box-fields-wrapper-payment-gateways > div').hide();
        $('#pms-meta-box-fields-wrapper-payment-gateways > div[data-payment-gateway=' + $(this).val() + ']').show();

    });

    $('select[name=payment_gateway]').trigger('change');


    /**
     * Selecting the username
     *
     */
    $(document).on( 'change', '#pms-member-username', function() {

        $select = $(this);

        if( $select.val().trim() == '' )
            return false;

        var user_id = $select.val().trim();

        $('#pms-member-user-id').val( user_id );

    });


    /**
     * Validate empty fields
     *
     */
    $(document).on( 'click', '.pms-edit-subscription-details', function(e) {
        e.preventDefault();

        $button = $(this);

        if( !$button.hasClass('button-primary') )
            return false;

        $row = $button.parents('tr');

        is_field_empty = checkEmptyRow( $row );

        if( is_field_empty )
            $row.addClass('pms-field-error');
        else
            $row.removeClass('pms-field-error');

    });


    /*
     * Validate form before submitting
     *
     */
    $('.pms-form input[type=submit]').click( function(e) {

        var errors = false;
        validation_errors = [];

        // Check to see if the user id exists
        if( $('#pms-member-user-id').val().trim() == 0 ) {
            errors = true;
            validation_errors.push( 'Please select a user.' );
        }

        // If no subscription plan is to be found return
        if( $('#pms-member-subscription-details select[name=subscription_plan_id]').val() == 0 ) {
            errors = true;
            validation_errors.push( 'Please select a subscription plan.' );
        }


        // Check to see if any fields are left empty and return if so
        is_empty = false;
        $('#pms-member-subscription-details .pms-meta-box-field-wrapper').each( function() {
            if( checkEmptyRow( $(this) ) == true )
                is_empty = true;
        });

        if( is_empty ) {
            errors = true;
            validation_errors.push( 'Please fill all the required fields.' );
        }


        if( errors ) {
            displayErrors();
            return false;
        }

    });


    /**
     * When adding a new member subscription populate the member subscription data 
     * when an admin selects the subscription plan.
     *
     */
    $(document).on( 'change', '#pms-form-add-edit-member-subscription select[name=subscription_plan_id]', function() {

        if( $('input[name=action]').val() != 'add_subscription' )
            return false;

        if( $(this).val() == 0 )
            return false;

        // Cache form elements
        $this        = $(this);
        $form        = $this.closest( 'form' );
        $form_fields = $form.find( 'input, select, textarea' );
        $spinner     = $this.siblings( '.spinner' );

        // Disable all fields
        $form_fields.attr( 'disabled', true );
        $spinner.css( 'visibility', 'visible' );


        $.post( ajaxurl, { action: 'populate_member_subscription_fields', subscription_plan_id: $this.val() }, function( response ) {

            if( response != 0 ) {

                fields = JSON.parse( response );

                // Populate fields with returned values
                for( var key in fields ) {

                    $field = $form.find('[name=' + key + ']');

                    if( $field.is( 'select' ) ) {
                        $field.find( 'option[value=' + fields[key] + ']' ).attr( 'selected', true );
                    }

                    if( $field.is( 'input' ) ) {
                        $field.val( fields[key] );
                    }

                }

                // Re-enable all fields
                $form_fields.attr( 'disabled', false );
                $spinner.css( 'visibility', 'hidden' );

            }

        });

    });

});