=== Membership & Content Restriction - Paid Member Subscriptions ===
Contributors: cozmoslabs, iova.mihai, madalin.ungureanu, adispiac, sareiodata, reflectionmedia
Donate link: http://www.cozmoslabs.com/wordpress-paid-member-subscriptions/
Tags: membership, paid membership, membership plan, membership level, member, members, subscription plans, user payments, paying users, paid users, restrict content, restrict access, content protection, content restriction, recurring payments, woocommerce
Requires at least: 3.1
Tested up to: 4.9.8
Stable tag: 1.7.7
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Accept user payments, create subscription plans and restrict content on your membership website. Integrates with WooCommerce.

== Description ==

**Paid Member Subscriptions is membership made easy.**

**Like this plugin?** Consider leaving a [5 star review](https://wordpress.org/support/view/plugin-reviews/paid-member-subscriptions?filter=5).

It offers a complete membership solution, allowing you to accept member payments, manage members, create subscription plans and restrict access to premium content.

Integrates with WooCommerce, allowing you to restrict product viewing and purchasing to members-only as well as offer special discounted product price based on subscription plans.

To start simply create a new page and give it an intuitive name(e.g. Member Registration) and add the following shortcode: [pms-register].
Publish the page and you are done!

= Shortcodes for Member Registration, Login, Content Restriction and managing Membership Plans =
You can use one of the following shortcodes:

* **[pms-register]** - adds a front-end user registration form where members can sign-up for a membership level
* **[pms-login]** - create a front-end member login form
* **[pms-restrict subscription_plans="9,10"]** *Special content for members subscribed to the subscription plans that have the ID 9 and 10!* **[/pms-restrict]** - to restrict content based on subscription plans or logged in status
* **[pms-account]** - allows members to edit their account information and manage their subscription plan(s)
* **[pms-subscriptions]** - output subscription plans form and allow already registered users to subscribe to new membership plans (use <em>subscription_plans</em> shortcode parameter to display only certain plans)
* **[pms-payment-history]** - adds a front-end table with the member's payment history
* **[pms-recover-password]** - adds a recover password password form, that enables users to reset their password if needed

Please browse our [plugin description page](http://www.cozmoslabs.com/wordpress-paid-member-subscriptions/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) for more information regarding shortcode parameters and plugin modules.

https://www.youtube.com/watch?v=6AEIvvCOZHM&start=0&autoplay=1

= Membership Modules: =

= Content Restriction =
 You'll find it quite simple to restrict entire posts, pages or custom post types or just portions of them.

 Restrict Content offers you options to:

 * display content based on logged in status
 * show content to members only, based on their subscription plan(s)
 * partial content display by using [pms-restrict][/pms-restrict] shortcode
 * display another template for restricted posts

= Membership Payments =
Accept PayPal payments from your subscribers. You can keep track of all member payments, payment statuses and purchased subscription plans.

= Hierarchical Subscription Plans =
You can create an unlimited number of hierarchical subscription plans (eg: Free, Silver, Gold). Each new user can choose a membership plan (subscription) during the registration process.
Existing users can purchase a subscription plan from a page with the [pms-subscriptions] shortcode.

Members can upgrade their subscription plan from the [pms-account] page, the same page also allows the member to Renew, Cancel or Abandon his subscription.

Subscription plans can offer free and/or paid memberships on your website.

= Members Management =
Have an overview of all your members and their subscription plans. Easily add/remove members or edit their subscription details.

= Member Emails and Messages =
Customize default member emails and setup member messages sent/displayed on certain user actions.
Admin emails can also be customized.

= Free Trial and Sign-up Fees =
You can configure your subscription to have a free trial period and a sign-up fee, allowing you to have more control on your subscription setup. [Click to view which payment gateways support this feature](https://www.cozmoslabs.com/docs/paid-member-subscriptions/payment-gateways/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree).

= Reports and Exports =
Whether you prefer to maintain your own records of your members’ database, do custom reports , or you simply need to import records into another service or application, such as MailChimp or Excel, you can do that with Paid Member Subscriptions. Export all member records to a CSV at anytime.

Payment history can be exported to a CSV file, letting you then import the payment data into Excel, QuickBooks, or other accounting software that can process a CSV file.

= WooCommerce Integration =
Paid Member Subscriptions integrates beautifully with [WooCommerce](http://www.cozmoslabs.com/docs/paid-member-subscriptions/integration-with-other-plugins/woocommerce/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree), allowing you to do the following:

* **Create a Members-only Store** - restrict access to the Shop page to members-only
* **Restrict Product Viewing and Purchasing** - control who can see or purchase a WooCommerce product based on logged in status and subscription plan. Easily create members-only products.
* **Offer discounted product prices to members** - offer special product prices to members based on their active subscription. Set membership discounts per product or subscription plan.

= Powerful Add-ons =

Paid Member Subscriptions has a range of premium [Add-ons](http://www.cozmoslabs.com/paid-member-subscriptions-add-ons/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) that allow you to extend the power of the membership plugin:

**Basic Add-ons** (available in the [PRO or Hobbyist](http://www.cozmoslabs.com/wordpress-paid-member-subscriptions/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) version)

* [bbPress](http://www.cozmoslabs.com/add-ons/paid-member-subscriptions-bbpress/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - integrate Paid Member Subscriptions with the popular forums plugin, bbPress, to restrict your forums and topics.
* [Global Content Restriction](http://www.cozmoslabs.com/add-ons/global-content-restriction/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - add global content restriction rules to subscription plans, based on post type, taxonomy and terms
* [Discount Codes](http://www.cozmoslabs.com/add-ons/discount-codes/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - create an unlimited number of discount codes and offer percentage or flat rate based discounts
* [Email Reminders](http://www.cozmoslabs.com/add-ons/email-reminders/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - create multiple automated email reminders that are sent to members before or after certain events take place (subscription expires, subscription activated etc.)
* [Navigation Menu Filtering](http://www.cozmoslabs.com/add-ons/navigation-menu-filtering/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - dynamically display menu items based on logged-in status as well as selected subscription plans
* [Fixed Period Membership](https://www.cozmoslabs.com/add-ons/fixed-period-membership/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - create subscriptions plans that end at a specific date, no matter when a member subscribes to it.
* [Pay What You Want](https://www.cozmoslabs.com/add-ons/pay-what-you-want/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - accept donations and let subscribers pay what they want when purchasing a subscription plan
* [reCAPTCHA](https://www.cozmoslabs.com/add-ons/recaptcha/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - add Google reCaptcha verification inside the Paid Member Subscriptions forms or inside the default WordPress forms

**Pro Add-ons** (available in the [PRO version](http://www.cozmoslabs.com/wordpress-paid-member-subscriptions/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) only)

* [Recurring Payments for PayPal Standard](http://www.cozmoslabs.com/add-ons/recurring-payments-paypal-standard/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - accept recurring payments from your members through PayPal Standard
* [PayPal Pro & PayPal Express](http://www.cozmoslabs.com/add-ons/paypal-pro-paypal-express/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - accept one-time or recurring payments through PayPal Pro (credit card) and PayPal Express Checkout
* [Stripe Gateway](http://www.cozmoslabs.com/add-ons/stripe/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - accept credit card payments, both one-time and recurring, directly on your website via Stripe
* [Content Dripping](http://www.cozmoslabs.com/add-ons/content-dripping/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - create schedules for your content, making posts or categories available for your members only after a certain time has passed since they signed up for a subscription plan
* [Multiple Subscriptions per User](http://www.cozmoslabs.com/add-ons/multiple-subscriptions-per-user/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - setup multiple subscription level groups (e.g. Physics, Math) and allow members to sign up for more than one subscription plan, one per group (e.g. Physics Beginner and Math Advanced)
* [Invoices](https://www.cozmoslabs.com/add-ons/invoices/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) - both you and your members will be able to download PDF invoices for each payment that has been completed

= Paid Member Subscriptions in your Language =
We're focusing on translating Paid Member Subscriptions in as many languages as we can. So far, the translations for 10 languages are almost complete, but we still need help on a lot of other languages, so please join us at [translate.wordpress.org](https://translate.wordpress.org/projects/wp-plugins/paid-member-subscriptions)
You will be able to download all the [available language packs](https://translate.wordpress.org/projects/wp-plugins/paid-member-subscriptions) as well as help us translate Paid Member Subscriptions in your language.
For more information please visit our [documentation page](https://www.cozmoslabs.com/docs/paid-member-subscriptions/how-to-translate-paid-member-subscriptions/)

= Website =

[https://www.cozmoslabs.com/wordpress-paid-member-subscriptions/](https://www.cozmoslabs.com/wordpress-paid-member-subscriptions/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree)

= Documentation =

[https://www.cozmoslabs.com/docs/paid-member-subscriptions/](https://www.cozmoslabs.com/docs/paid-member-subscriptions/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree)

= Addons =

[https://www.cozmoslabs.com/paid-member-subscriptions-add-ons/](https://www.cozmoslabs.com/paid-member-subscriptions-add-ons/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree)

== Installation ==

1. Upload the paid-member-subscriptions folder to the '/wp-content/plugins/' directory
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Create a new page and use one of the shortcodes available. Publish the page and you're done!

== Frequently Asked Questions ==

= What type of membership sites can I create ? =

Here are some examples of what you could sell from your membership site: premium tutorials, newsletter, magazine, database, online community, software, apps, videos, ebooks, audio files, discount codes, fan clubs, consulting, coaching etc.

= Can my members pay using a credit card ? =

The subscription plan payments are handled via PayPal Standard. Your members will be able to pay for the membership via their credit card or their PayPal account. More payment gateways are supported via [Add-ons](http://www.cozmoslabs.com/paid-member-subscriptions/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree).

= Can I offer both free and paid memberships at the same time ? =

Yes, you can have both free and paid memberships on your site.

= Can I restrict access to premium content allowing only paying users to view it ? =

Yes, the plugin allows you to [restrict content](https://www.cozmoslabs.com/docs/paid-member-subscriptions/content-restriction/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree) and make it available to paid members only.

= Can I modify the registration form ? =

Yes, this is possible using [Profile Builder](https://wordpress.org/plugins/profile-builder/). For custom fields you will need a [paid version](https://www.cozmoslabs.com/wordpress-profile-builder/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree).
More information can be found on [this page](https://www.cozmoslabs.com/docs/paid-member-subscriptions/integration-with-other-plugins/profile-builder/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree).

= Where can I find out more information? =

For more information please check out [Paid Member Subscriptions documentation](https://www.cozmoslabs.com/docs/paid-member-subscriptions/?utm_source=wp.org&utm_medium=pms-description-page&utm_campaign=PMSFree).


== Screenshots ==
1. Basic Information page for Paid Member Subscriptions - membership plugin
2. Subscription Plans listing from Paid Member Subscriptions - membership plugin
3. Adding a New Membership Plan
4. Member Registration Page - front-end membership plans listing
5. Member Login Page - front-end user login form
6. Member Account Page
7. Member Lost Password Page
8. Restrict Content - posts, pages, custom post types
9. Members Management
10. Add New/Edit Member on your Membership site
11. Membership Payments
12. Settings - setup PayPal payment gateway used to accept payments
13. Settings - Content Restriction Messages
14. Settings - customize default member emails
15. Add-ons - Paid Member Subscriptions
16. WooCommerce integration general settings
17. Product discounts and restriction settings for individual product
18. WooCommerce shop page restricted on the front-end
19. Display of member discounted products in the front-end


== Changelog ==

= 1.7.7 =
* Fixed issue with YOAST SEO plugin that was executing the shortcodes from our messages on the wp_head hook so they weren't executing again in the content
* We now render HTML from plan descriptions for single plans.
* We now add a subscription time for manual payments.
* Corrected some typos from the Export page.
* We no longer show Upgrade, Renew or Cancel links if plan is inactive.
* Removed shipping details from the PayPal Standard Checkout page.
* 100% discount codes now work when only one gateway is active.
* Fixed: manually adding a pending payment over an existing active subscription, changes the subscription status to pending

= 1.7.6 =
* Added export functionality in PMS: you can now export payments and members to csv format
* You can now add payments manually from the admin area

= 1.7.5 =
* Refactored the login form to have greater compatibility with other plugins and wordpress.com
* Added i18n support for numbers.
* Hide Email Confirmation payment message on Profile Builder forms if no plan is selected
* Added a filter to stop all emails from being sent
* Added more actions and  filters to the codebase
* Fixed problem with Profile Builder conditional fields when the credit card info wasn't showing on stripe gateway
* Fixed Automatically Login Feature breaks PayPal Express gateway
* PMS Account actions are now replacing our shortcode instead of the_content.
* Don't process payment if user doesn't exist anymore.

= 1.7.4 =
* Added "Template" content restriction mode
* Added "Automatically login" new members after successful registration setting
* After confirming the email for a Free subscriber, do not make him subscribe again to get the Free subscription, simply register him as a member.
* Fixed: Issue with content restriction redirect url when it didn't contain http
* Fixed: Now content restriction with more tag restricts the whole post if there is no more tag
* Added a filter over the Profile Builder field subscription plans output.

= 1.7.3 =
* When changing a users subscription plan from the back-end we now change the billing amount as well
* Fixed: discount codes being applied twice for Stripe & PayPal Express in some cases
* Fixed: The rule to remove the list bullet points is more specific.
* Fixed: Don't send activation email on subscription renewal.
* Fixed: discount code box not loading if you have the Multiple Subscriptions Per User and define two individual plans, a free and paid one
* Added a filter over the redirect URL so we can change or add parameters to it.
* Added a filter for $payment_data when processing plugin scheduled payments using a cron job
* Added a filter so we can change the content restriction message.

= 1.7.2 =
* Fixed: the activation email is now sent when upgrading a subscription.
* Fixed: pms-restrict shortcode wasn't working when sub expiration date was empty.
* Fixed: problem with trial and non recurring subscriptions
* Fixed: compatibility issue with Profile Builder conditional logic on Edit Profile forms

= 1.7.1 =
* Small modifications required for the new addon that will be launched
* Added missing addons to Basic Info page and a notice for Fixed Period Memberships addon

= 1.7.0 =
* Added individualized classes on the field containers on register and profile forms
* Added hooks below each item in Subscription Plan Details metabox
* Added a filter on the pms_get_subscription_plans function output

= 1.6.9 =
* Fixed: a possible notice if there was no subscription plan selected on the Profile Builder form
* Fixed: issue with Woocommerce discounts that did not get applied to products that existed before we activated PMS
* Fixed: payments that were not showing in reports for the last day of the month.
* Added GMT offset to the date we display in the payment history shortcode.

= 1.6.8 =
* Fixed: Issue with Profile Builder registration forms, when multiple subscription fields were present the user got the same subscription multiple times
* Fixed: Issues with subscriptions not registering when registering from a Profile Builder form
* Fixed: Issues with Profile Builder register form and the Stripe gateway
* Fixed: Issue with post preview when there was a restrict shortcode in the post (it crashed bad)
* New: Added filter on the returned value of the pms_get_subscription_plans() function: pms_get_subscription_plans
* New: Added the filter pms_change_default_site_user_role which you can use to only have the subscription role and not the default site role
* Misc: If Payment Type is MANUAL allow manual adding of the TRANSACTION ID

= 1.6.7 =
* Fixed: Sorting subscription plans up/down would break hierarchy.
* Fixed: Subscribing to a free trial subscription plan would not go to the payment processor.
* Misc: Deleting a user directly from the admin Users interface will not cancel all member subscriptions for that user.

= 1.6.6 =
* Fixed: Registration failing on Profile Builder register forms when Email Confirmation feature is active.
* Fixed: Editing a member's subscription from the admin area without changing the status of the membership would send an email to the user that the status of the membership has changed even if it hadn't.
* Fixed: The dates from across the plugin were not translatable. Now they are.
* Fixed: PHP notices on the register forms, when deactivating a payment gateway without removing it first from the active payment gateways.
* Misc: Added WooCommerce compatibility tags.
* Misc: Updated translation files.

= 1.6.5 =
* Fixed: Validation issues for extra checkout form fields when using a Profile Builder custom form

= 1.6.4 =
* Fixed: Saving a subscription plan breaks subscription plans hierarchy

= 1.6.3 =
* New: Added support for YouTube video embeds into restriction messages.
* Fixed: Activation emails not being sent properly for some payment gateways.
* Fixed: Adding an upgrade / downgrade to subscription plans would mess the order of the subscription plans.
* Fixed: The styling of WooCommerce's messages would be applied to restriction messages, instead of the default styling.
* Fixed: Member payments history table pagination would break in some scenarios.
* Misc: Member payments history table status column are now translatable.

= 1.6.2 =
* New: Added new payment action hooks: pms_payment_insert, pms_payment_update, pms_payment_delete
* New: Added new member subscription action hooks: pms_member_subscription_insert, pms_member_subscription_update, pms_member_subscription_delete
* New: Added new payments list table filter for entry actions: pms_payments_list_table_entry_actions
* Fixed: PHP notice conflict when using Profile Builder Pro and Paid Member Subscriptions
* Fixed: [pms-restrict] shortcode not displaying restriction message when user is logged-in, but does not have a subscription attached
* Fixed: [pms-restrict] shortcode not displaying the custom message set for the current post
* Fixed: Sorting members in the admin area as it was not working
* Misc: Deprecated following payment action hooks: pms_payment_inserted, pms_payment_updated, pms_payment_deleted
* Misc: Deprecated following member subscription action hooks: pms_member_subscription_inserted, pms_member_subscription_updated, pms_member_subscription_deleted

= 1.6.1 =
* Fixed: "ip_address" database table column had a character count of 32, smaller than the needed for IPv6 addresses, resulting in payments not being added to the database
* Fixed: Recover password shortcode was being echoes instead of being returned

= 1.6.0 =
* New: Added action hook to payment history table so that developers can add extra columns
* New: Added action hook to member account for the member subscriptions so that developer can add extra member subscription actions
* Fixed: Removed trial end field from member subscription edit page if there aren't any payment gateways that support trials
* Fixed: Canceled member subscriptions can be renewed before the default 15 renewal period

= 1.5.9 =
* New: Modified the Checkout Extra Fields API naming to Form Extra Fields API
* New: Added support for "required" parameter for the Form Extra Fields API
* New: Added Form Extra Fields API support to the edit profile form
* Fixed: "pms_get_current_page_url" filter did not apply correctly

= 1.5.8 =
* Fixed: Email notifications were not being sent properly. Instead of sending the custom emails set in the settings page, the defaults were being sent.
* Misc: Small code clean up.

= 1.5.7 =
* New: Added administrator email notifications for member subscription status changes.
* Fixed: Issue with subscription plans not being displayed on Profile Builder register forms.
* Fixed: Compatibility issue with Paid Member Subscriptions restrict content meta-box and custom post types created by PODS plugin.

= 1.5.6 =
* Fixed: Fatal error that happens on registration when checking for an amount in payment data.

= 1.5.5 =
* New: Added supported for payment meta information and provided a basic API to get, add, update and delete payment meta data
* New: Extended member subscription meta information basic API to handle add and delete member subscription meta data
* New: Implemented the Checkout Extra Fields API, which permits developers to easily extend Paid Member Subscriptions checkout sections and fields
* Misc: Refactored the member admin interface to greatly improve performance

= 1.5.4 =
* Fixed: If the register automatic billing information fails, the member subscription is being added as active, which should not be the case, it should be added as pending.
* Fixed: Members subscribing for an unlimited plan do not have access to the restricted content
* Fixed: Canceled member subscriptions now expire on the proper expiration date

= 1.5.3 =
* Fixed: Unlimited time subscriptions and trial subscriptions that expired prematurely
* Fixed: Fixed PHP notice of undefined $payment variable when registering to a free subscription plan
* Fixed: Subscription Plan field from Profile Builder was not displaying in the edit profile custom forms
* Fixed: Abandoning a subscription removes the user role associated to the subscription plan tied to the subscription
* Fixed: "Something went wrong. Could not process your request." message being displayed in the admin screen after saving a post
* Misc: Improved pms_get_member_subscriptions() function to accept a better set of arguments
* Misc: Removed the subscription plan sorting tags added in Profile Builder plugin, due to the fact that they are not supported

= 1.5.2 =
* New: You can now add HTML into the description field of the subscription plans
* Fixed: PayPal Standard Payment Gateway issue when registering from a Profile Builder custom form
* Fixed: Issue with "Processing, please wait..." button text appearing before the button, not on the button
* Fixed: When a member's subscription expires, the user role of the subscription plan will now be removed
* Fixed: Upgrading to a subscription plan removes the user role that is attached to the old/downgrade subscription plan
* Misc: Small refactoring to move utility functions in their own separate file

= 1.5.1 =
* Fixed: Issue with subscription submit button on Chrome browser.
* Fixed: Issue with Profile Builder compatibility when Profile Builder's email confirmation option was active

= 1.5.0 =
* **Notice**: This is a **major update**! Please read and follow the [Update Procedure](https://www.cozmoslabs.com/docs/paid-member-subscriptions/upgrading-paid-member-subscriptions-version-1-5-0/) to maintain full functionality.
* New: Added support for subscription plan free trials.
* New: Added support for subscription plan sign-up fees.
* New: Added option to set the automatic renewal option for each subscription plan, if the active payment gateways support the renewal functionality.
* New: Added Abandon Subscription action to mimic the Cancel Subscription action.
* Fixed: The Cancel Subscription action will now only cancel the members subscription without removing it completely.
* Misc: The Member Account shortcode has been improved to display more information about the user’s subscription.
* Misc: The admin Edit Subscription screen has been improved, to offer more flexibility for setting up and editing the details of a subscription.

= 1.4.8 =
* New: Allow only logged-in users or members to view your WooCommerce products by restricting access to them, the same way as you restrict content
* New: Allow only logged-in users or members to purchase your WooCommerce products
* New: Add special automatic discounts to your WooCommerce products that only your members have access to

= 1.4.7 =
* Fixed: Major issue regarding content restriction for attachments

= 1.4.6 =
* Fixed: Issue regarding the from email address. The from email address set in the Settings page would be replaced for all emails sent, not only the ones sent by Paid Member Subscriptions.
* Fixed: Content restrictions for attachment pages did not work.
* Misc: Added “pms_get_subscription_plan_upgrades” filter on the return values of the function that gets the subscription plan upgrades available for a subscription plan.

= 1.4.5 =
* New: Added German, Italian and Portuguese translations
* Misc: Small refactor on the email system

= 1.4.4 =
* New: Added logout_redirect_url to the login shortcode
* Misc: Extended with 12 hours the cron job that verifies if a subscription should be set as expired

= 1.4.3 =
* Fixed: Currency is now being displayed properly on forms.

= 1.4.2 =
* Fixed: Issue with HTML elements not being saved in the e-mail and content restriction messages fields from the Settings page
* Misc: Payment dates are now displayed by taking into account the website's timezone
* Misc: Display correctly the currency symbol in the Payment History shortcode

= 1.4.1 =
* Fixed: Subscription activation e-mail was being sent instead of the expiration e-mail when a subscription would expire
* Fixed: Fixed security issues and performed a security audit

= 1.4.0 =
* New: Added option for members to cancel their pending subscriptions from the account page
* Fixed: Redirect to PayPal compatibility issue when registering from a Profile Builder form
* Fixed: Content Restriction shortcode now displays the default message set in the Settings page
* Misc: Removed the cancel subscription option if the website does not have HTTPS

= 1.3.9 =
* New: Added custom and general redirect as a method of restricting access to the protected content.
* New: Added [pms-logout] shortcode for easy placement of a logout link.
* Misc: Extended the ability to search for members by custom user meta in the admin Members page.

= 1.3.8 =
* Fixed: PHP fatal error on certain versions of PHP

= 1.3.7 =
* New: Custom restriction messages per individual post basis
* Fixed: PHP 7.1 warnings when using certain shortcodes without any parameters
* Fixed: Compatibility error with Profile Builder plugin when registering a new user while using the E-mail Confirmation feature and choosing an e-mail address as the username
* Fixed: Retry payment, renew subscription, upgrade subscription and cancel subscription did not work when using a page built with Page Builder by SiteOrigin plugin
* Misc: Restricted post preview now displays only text. Shortcodes are no longer processed due to security reasons.
* Misc: pms_member_check_expired_subscriptions() function has been rewritten for increased performance.

= 1.3.6 =
* New: Added conditional function pms_is_post_restricted() that verifies if the current post has access restriction for the current user viewing it. An $post_id can be provided as the first parameter to check if the current user is restricted from accessing the post with the id = $post_id.
* New: Added new insert() method for the PMS_Payment class. Deprecated add() method from PMS_Payment class.
* Fixed: Recover Password functionality works now for users that have multiple words as their username.
* Fixed: Changing tabs in plugin Settings page doesn't lead anymore to 404 error, when JavaScript isn't loaded.
* Fixed: Scheduled posts don't lose Content Restriction meta data anymore when automatically changing status from Scheduled to Published.

= 1.3.5 =
* New: Added ability to search users by typing their username in the Add Member Information page.
* Fixed: pms_member_payments table does not have a primary key. A column named 'id' is now the primary key for this table.
* Fixed: Retry Payment success messages were not being displayed to the member after the payment process.
* Misc: Restricted Posts Preview option now permits the use of shortcodes in the preview.

= 1.3.4 =
* Fixed: pms_get_payments() function did not return complete data for a payment.
* Misc: JavaScript refactoring for improved performance and readability.
* Misc: jQuery UI Smoothness is now served over https.
* Misc: Deprecated several methods of the PMS_Payment class.

= 1.3.3 =
* New: Subscription Plans compatibility with Profile Builder's conditional logic rules.
* Fixed: Undefined index PHP Notice for Default Payment Gateway when first installing the plugin.
* Misc: Refactored parts of the payments system to improve performance.

= 1.3.2 =
* Fixed: Payment Expiration date was not set properly in certain situations.
* Fixed: "Headers already sent" warning in certain conditions on Reports Page.
* Fixed: Bug where payment did not end up as Complete when using a 100% discount code.
* Fixed: Manual/Offline payment gateway error when registering through Profile Builder.
* Misc: Small code refactoring for integration with AffiliateWP.

= 1.3.1 =
* New: Changed PayPal's endpoint to the new and supported ones.
* Fixed: PHP warnings on first activation.
* Fixed: Single site activation of the plugin on a network installation would create custom database tables for all sites.
* Misc: Added various hooks in the Payments and Members list tables for extensibility reasons.

= 1.3.0 =
* New: Added new Reports page where the administrator cand view a summary of the total earnings and payments for a given period.
* New: Added ability to filter members by Subscription Plan in the admin Members page.
* Fixed: Upgrading a member's subscription plan from the admin interface would add the user role of the new plan to the member without removing the one of the old plan.
* Misc: Completing a Manual Payment from the admin interface will now activate the member's subscription automatically.

= 1.2.9 =
* New: Added option to display a preview of the restricted posts to users that are logged-out or that are not subscribed to a plan.
* Fixed: Plugin is no longer displayed in the admin menu for users that are not administrators.

= 1.2.8 =
* New: Paid Member Subscriptions and Profile Builder are now compatible when using Profile Builder's E-mail Confirmation feature

= 1.2.7 =
* New: Added manual payment gateway
* Misc: Small text formatting fixes

= 1.2.6 =
* New: Added an Uninstall tool that removes all custom data saved by the plugin in the database

= 1.2.5 =
* New: Added a WP Dashboard payments summary box, with a brief income report for the current month, current day and also a list of the latest completed payments
* Misc: Small refactoring to the redirect to success page from Profile Builder forms
* Misc: Small code clean-up and new comments added to certain class properties and methods

= 1.2.4 =
* Misc: Code clean-up and small refactoring

= 1.2.3 =
* Fixed: Password Reset security issue

= 1.2.2 =
* New: Added a Recent Payments table in the edit screen of the member for a quick view of the member's latest payments
* New: Added new developer hooks in the pms_get_payments(), pms_get_members() and pms_get_users_non_members() functions
* Fixed: WordPress database warning when using the search form the Payments admin screen
* Misc: Minor admin CSS improvements

= 1.2.1 =
* New: Added the "pms_payment_updated" developer hook after a payment was updated.
* New: Added the "pms_email_subject" and "pms_email_content" developer hooks to filter the subject and content of an e-mail before sending it.
* Misc: Refactored the code that manages the content filtering

= 1.2.0 =
* New: We now load the plugin translation from the current theme in the folder local_pms_lang if it exists otherwise normally from the plugin dir
* New: Added "refunded" status for payments
* Fixed: PHP warning that appeared in [pms-payment-history] shortcode
* Fixed: Content restriction bug that permited access to the post's excerpt on archive pages

= 1.1.9 =
* New: Admin option to select whether the currency appears before or after the subscription's price
* New: Added HTML "id" parameter to all forms outputted by the plugin

= 1.1.8 =
* New: Added new shortcode [pms-payment-history] to display the user's payment history
* Fixed: Subscription price and description show up once again on front end forms when only one subscription plan is present
* Fixed: Fixed issues with PMS_Email class that throw PHP notices

= 1.1.7 =
* New: Admins can now edit payments from the WordPress admin area
* New: The user's last login time is now saved in the 'last_login' user's meta, for usage by add-on developers
* Misc: Member Subscription start time is saved now as the current time, not the one at the ending of the day
* Misc: Extended the PMS_Email class with new functionality

= 1.1.6 =
* New: Added a new developer hook "pms_update_check" that executes when the plugin updates automatically
* New: Refactored display of the subscription plans when only one option is available from single input radio field to hidden field
* Misc: Discount Code code is now saved in the payments table and is displayed in the admin area for each payment that was made with a discount code
* Misc: Minor front-end CSS improvements

= 1.1.5 =
* New: Added a delete payment action in the admin Payments table
* New: Added two new hooks for the subscriptions plan table in account short code
* Fixed: Subscription Plan custom user role is now added only on plan activation
* Misc: Minor CSS fixes

= 1.1.4 =
* Added front-end JavaScript helper functions for add-on developers
* Small refactoring to better integrate future payment gateways

= 1.1.3 =
* Small refactoring to better integrate future payment gateways

= 1.1.2 =
* Added possibility to load translations
* Small refactoring to better integrate future payment gateways

= 1.1.1 =
* New PayPal IPN validation system
* Refactoring to better integrate future payment gateways

= 1.1.0 =
* Small refactoring to better integrate future payment gateways

= 1.0.9 =
* [pms-restrict] shortcode has new attribute "display_to" which can take the value "not_logged_in" to show content only to logged out users
* [pms-subscriptions] now redirects the user back from the payment gateway to the website
* Added new hooks for increased functionality options
* Minor CSS changes
* Minor bugs and improvements

= 1.0.8 =
* Fixed issue where PayPal IPN was not working on certain servers
* Fixed bug where the slug of any post could not be modified
* Added new hooks for increased functionality options
* Various minor bugs and refactoring

= 1.0.7 =
* Added plugin update checker method

= 1.0.6 =
* The IP address of the user registering a payment gets saved for each payment
* Fixed bug where post slug could not be changed
* Added new hooks for renew, upgrade and retry forms

= 1.0.5 =
* Added 'redirect_url' attribute to the [pms-recover-password] shortcode

= 1.0.4 =
* Fixed issues with payment gateways functions

= 1.0.3 =
* Refactored the general payment gateway processes to better integrate future payment gateways
* Fixed logout redirect issue that was interfering with Profile Builder
* Changed e-mails mime type to text/html

= 1.0.2 =
* Changed [pms-new-subscription] shortcode to [pms-subscriptions]
* Added Bulk Add New members feature

= 1.0.1 =
* Minor modifications in the readme file
* Minor bug fix for [pms-account] shortcode
* Updated functionality for the [pms-new-subscription] shortcode

= 1.0.0 =
* Initial release.
