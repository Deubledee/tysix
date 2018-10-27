<?php
/**
 * Plugin Name: Custom CSS and Javascript
 * Description: Easily add custom CSS and Javascript code to your WordPress site.
 * Version: 2.0.9
 * Author: Potent Plugins
 * Author URI: http://potentplugins.com/?utm_source=custom-css-and-javascript&utm_medium=link&utm_campaign=wp-plugin-author-uri
 * License: GNU General Public License version 2 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 */

add_action('wp_enqueue_scripts', 'hm_custom_css_js_scripts', 999999);
function hm_custom_css_js_scripts() {
	if (current_user_can('edit_theme_options')) {
		wp_enqueue_script('hm_custom_js', get_site_url(null, '/index.php').'?hm_custom_js_draft=1', array(), time());
		wp_enqueue_style('hm_custom_css', get_site_url(null, '/index.php').'?hm_custom_css_draft=1', array(), time());
	} else {
		$uploadDir = wp_upload_dir();
		if (is_ssl()) {
			$uploadDir['baseurl'] = set_url_scheme($uploadDir['baseurl'], 'https');
		}
		if (file_exists($uploadDir['basedir'].'/hm_custom_css_js/custom.js'))
			wp_enqueue_script('hm_custom_js', $uploadDir['baseurl'].'/hm_custom_css_js/custom.js', array(), get_option('hm_custom_javascript_ver', 1));
		if (file_exists($uploadDir['basedir'].'/hm_custom_css_js/custom.css'))
			wp_enqueue_style('hm_custom_css', $uploadDir['baseurl'].'/hm_custom_css_js/custom.css', array(), get_option('hm_custom_css_ver', 1));
	}
}
add_action('admin_menu', 'hm_custom_css_admin_menu');
function hm_custom_css_admin_menu() {
	add_submenu_page('themes.php', 'Custom CSS', 'Custom CSS', 'edit_theme_options', 'hm_custom_css', 'hm_custom_css_page');
}
add_action('admin_menu', 'hm_custom_js_admin_menu');
function hm_custom_js_admin_menu() {
	add_submenu_page('themes.php', 'Custom Javascript', 'Custom Javascript', 'edit_theme_options', 'hm_custom_js', 'hm_custom_js_page');
}
add_action('admin_enqueue_scripts', 'hm_custom_css_js_admin_scripts');
function hm_custom_css_js_admin_scripts($hook) {
	if ($hook != 'appearance_page_hm_custom_css' && $hook != 'appearance_page_hm_custom_js')
		return;
	wp_enqueue_script('hm_custom_css_js_codemirror', plugins_url('codemirror/codemirror.js', __FILE__));
	if ($hook == 'appearance_page_hm_custom_css')
		wp_enqueue_script('hm_custom_css_js_codemirror_mode_css', plugins_url('codemirror/mode/css.js', __FILE__));
	else
		wp_enqueue_script('hm_custom_css_js_codemirror_mode_js', plugins_url('codemirror/mode/javascript.js', __FILE__));
	wp_enqueue_script('hm_custom_css_js_codemirror_dialog', plugins_url('codemirror/addon/dialog/dialog.js', __FILE__));
	wp_enqueue_script('hm_custom_css_js_codemirror_matchbrackets', plugins_url('codemirror/addon/edit/matchbrackets.js', __FILE__));
	wp_enqueue_script('hm_custom_css_js_codemirror_search', plugins_url('codemirror/addon/search/search.js', __FILE__));
	wp_enqueue_script('hm_custom_css_js_codemirror_searchcursor', plugins_url('codemirror/addon/search/searchcursor.js', __FILE__));
	wp_enqueue_script('hm_custom_css_js_codemirror_matchhighlighter', plugins_url('codemirror/addon/search/match-highlighter.js', __FILE__));
	wp_enqueue_script('hm_custom_css_js_codemirror_annotatescrollbar', plugins_url('codemirror/addon/scroll/annotatescrollbar.js', __FILE__));
	wp_enqueue_script('hm_custom_css_js_codemirror_matchesonscrollbar', plugins_url('codemirror/addon/search/matchesonscrollbar.js', __FILE__));
	
	wp_enqueue_style('hm_custom_css_js_codemirror', plugins_url('codemirror/codemirror.css', __FILE__));
	wp_enqueue_style('hm_custom_css_js_codemirror_dialog', plugins_url('codemirror/addon/dialog/dialog.css', __FILE__));
	wp_enqueue_style('hm_custom_css_js_codemirror_matchesonscrollbar', plugins_url('codemirror/addon/search/matchesonscrollbar.css', __FILE__));
	wp_enqueue_script('hm_custom_css_js', plugins_url('js/custom-css-and-javascript.js', __FILE__));
	wp_enqueue_style('hm_custom_css_js', plugins_url('css/custom-css-and-javascript.css', __FILE__));
}

add_action('wp_ajax_hm_custom_css_js_save', 'hm_custom_css_js_save');
function hm_custom_css_js_save() {
	if (!current_user_can('edit_theme_options') || empty($_POST['mode']) || !isset($_POST['code']))
		wp_send_json_error();
	$_POST['mode'] = strtolower($_POST['mode']);
	if ($_POST['mode'] != 'css' && $_POST['mode'] != 'javascript')
		wp_send_json_error();
	
	$_POST['code'] = (get_magic_quotes_gpc() ? stripslashes($_POST['code']) : $_POST['code']);
	
	$rev_id = wp_insert_post(array(
		'post_content' => $_POST['code'],
		'post_status' => 'draft',
		'post_type' => 'hm_custom_'.$_POST['mode'],
	));
	if ($rev_id === false)
		wp_send_json_error();
	
	wp_send_json_success($rev_id);
}

add_action('wp_ajax_hm_custom_css_js_publish', 'hm_custom_css_js_publish');
function hm_custom_css_js_publish() {
	if (!current_user_can('edit_theme_options') || empty($_POST['mode']) || !isset($_POST['rev']) || !is_numeric($_POST['rev']))
		wp_send_json_error();
	$_POST['mode'] = strtolower($_POST['mode']);
	if ($_POST['mode'] != 'css' && $_POST['mode'] != 'javascript')
		wp_send_json_error();
	
	$post = get_post($_POST['rev']);
	if ($post->post_type != 'hm_custom_'.$_POST['mode'])
		wp_send_json_error();
	
	$uploadDir = wp_upload_dir();
	if (!is_dir($uploadDir['basedir'].'/hm_custom_css_js'))
		mkdir($uploadDir['basedir'].'/hm_custom_css_js') or wp_send_json_error();
	$outputFile = $uploadDir['basedir'].'/hm_custom_css_js/custom.'.($_POST['mode'] == 'css' ? 'css' : 'js');
	if (file_put_contents($outputFile, $post->post_content) === false)
		wp_send_json_error();
	if (empty($_POST['minify'])) {
		update_option('hm_custom_'.$_POST['mode'].'_minify', false);
	} else {
		update_option('hm_custom_'.$_POST['mode'].'_minify', true);
		require_once(__DIR__.'/minify/src/Minify.php');
		require_once(__DIR__.'/minify/src/Exception.php');
		if ($_POST['mode'] == 'css') {
			require_once(__DIR__.'/minify/src/CSS.php');
			require_once(__DIR__.'/minify/src/Converter.php');
			$minifier = new MatthiasMullie\Minify\CSS;
		} else {
			require_once(__DIR__.'/minify/src/JS.php');
			$minifier = new MatthiasMullie\Minify\JS;
		}
		$minifier->add($outputFile);
		$minifier->minify($outputFile);
	}
	
	update_option('hm_custom_'.$_POST['mode'].'_ver', time());
	
	// Unpublish previous revisions
	$wp_query = new WP_Query(array(
		'post_type' => 'hm_custom_'.$_POST['mode'],
		'post_status' => 'publish',
		'fields' => 'ids',
		'nopaging' => true
	));
	$posts = $wp_query->get_posts();
	foreach ($posts as $postId) {
		if (!wp_update_post(array(
		'ID' => $postId,
		'post_status' => 'draft',
		)))
		wp_send_json_error();
	}
	
	if (!wp_update_post(array(
		'ID' => $_POST['rev'],
		'post_status' => 'publish',
		'post_date' => current_time('Y-m-d H:i:s'),
		)))
		wp_send_json_error();
	
	wp_send_json_success();
}

add_action('wp_ajax_hm_custom_css_js_delete_revision', 'hm_custom_css_js_delete_revision');
function hm_custom_css_js_delete_revision() {
	if (!current_user_can('edit_theme_options') || empty($_POST['mode']) || !isset($_POST['rev']) || !is_numeric($_POST['rev']))
		wp_send_json_error();
	$_POST['mode'] = strtolower($_POST['mode']);
	if ($_POST['mode'] != 'css' && $_POST['mode'] != 'javascript')
		wp_send_json_error();
	
	$post = get_post($_POST['rev']);
	if ($post->post_type != 'hm_custom_'.$_POST['mode'] || $post->post_status == 'publish')
		wp_send_json_error();
	
	
	if (!wp_delete_post($post->ID, true))
		wp_send_json_error();
	
	wp_send_json_success();
}

add_action('wp_ajax_hm_custom_css_js_delete_revisions', 'hm_custom_css_js_delete_revisions');
function hm_custom_css_js_delete_revisions() {
	if (!current_user_can('edit_theme_options') || empty($_POST['mode']))
		wp_send_json_error();
	$_POST['mode'] = strtolower($_POST['mode']);
	if ($_POST['mode'] != 'css' && $_POST['mode'] != 'javascript')
		wp_send_json_error();
	
	$wp_query = new WP_Query(array(
		'post_type' => 'hm_custom_'.$_POST['mode'],
		'post_status' => 'draft',
		'fields' => 'ids',
		'nopaging' => true
	));
	$posts = $wp_query->get_posts();
	foreach ($posts as $postId) {
		if (!wp_delete_post($postId, true))
			wp_send_json_error();
	}
	
	wp_send_json_success();
}


add_action('wp_ajax_hm_custom_css_js_get_revisions', 'hm_custom_css_js_get_revisions');
function hm_custom_css_js_get_revisions() {
	if (!current_user_can('edit_theme_options') || empty($_POST['mode']))
		wp_send_json_error();
	$_POST['mode'] = strtolower($_POST['mode']);
	if ($_POST['mode'] != 'css' && $_POST['mode'] != 'javascript')
		wp_send_json_error();

	$wp_query = new WP_Query();
	$posts = $wp_query->query(array(
		'post_type' => 'hm_custom_'.$_POST['mode'],
		'post_status' => 'any',
		'nopaging' => true
	));
	
	
	$revisions = array();
	if (empty($posts)) {
		$uploadDir = wp_upload_dir();
		$customFile = $uploadDir['basedir'].'/hm_custom_css_js/custom.'.($_POST['mode'] == 'css' ? 'css' : 'js');
		if (file_exists($customFile)) {
			$contents = file_get_contents($customFile);
			if ($contents === false)
				wp_send_json_error();
			$rev_id = wp_insert_post(array(
				'post_content' => $contents,
				'post_status' => 'publish',
				'post_type' => 'hm_custom_'.$_POST['mode'],
			));
			$revisions[] = array('id' => $rev_id, 'rev_date' => current_time('Y-m-d H:i:s'), 'published' => true);
		}
	} else {
		foreach ($posts as $post) {
			$revisions[] = array('id' => $post->ID, 'rev_date' => $post->post_date, 'published' => ($post->post_status == 'publish'));
		}
	}
	
	wp_send_json_success($revisions);
}

add_action('wp_ajax_hm_custom_css_js_get_revision', 'hm_custom_css_js_get_revision');
function hm_custom_css_js_get_revision() {
	if (!current_user_can('edit_theme_options') || empty($_POST['mode']) || !isset($_POST['rev']) || !is_numeric($_POST['rev']))
		wp_send_json_error();
	$_POST['mode'] = strtolower($_POST['mode']);
	if ($_POST['mode'] != 'css' && $_POST['mode'] != 'javascript')
		wp_send_json_error();
	
	$post = get_post($_POST['rev']);
	if ($post->post_type != 'hm_custom_'.$_POST['mode'])
		wp_send_json_error();
	
	wp_send_json_success(array(
		'id' => $post->ID,
		'content' => $post->post_content
	));
}

add_action('init', 'hm_custom_css_js_init');
function hm_custom_css_js_init() {
	register_post_type('hm_custom_css');
	register_post_type('hm_custom_javascript');
	
	if (!empty($_GET['hm_custom_css_draft'])) {
		$wp_query = new WP_Query(array(
			'post_type' => 'hm_custom_css',
			'post_status' => 'any',
			'posts_per_page' => 1
		));
		$posts = $wp_query->get_posts();
		header('Content-Type: text/css');
		if (isset($posts[0]))
			echo($posts[0]->post_content);
		exit;
	}
	if (!empty($_GET['hm_custom_js_draft'])) {
		$wp_query = new WP_Query(array(
			'post_type' => 'hm_custom_javascript',
			'post_status' => 'any',
			'posts_per_page' => 1
		));
		$posts = $wp_query->get_posts();
		header('Content-Type: text/javascript');
		if (isset($posts[0]))
			echo($posts[0]->post_content);
		exit;
	}
}

function hm_custom_css_page() {
	hm_custom_css_js_page('CSS');
}

function hm_custom_js_page() {
	hm_custom_css_js_page('Javascript');
}

function hm_custom_css_js_page($mode) {
	echo('
		<div class="wrap">
			<h2>Custom '.$mode.'</h2>
			<script>var hm_custom_css_js_mode = "'.$mode.'";</script>
			<div>
				<div id="hm_custom_code_editor" style="margin-top: 15px;">
					<div style="width: 200px; height: 100%; overflow: auto; float: right; padding: 0 20px;">
						<div id="pp_custom_css_js_dev_info">
							<a href="https://potentplugins.com/downloads/custom-css-javascript-developer-edition/?utm_source=custom-css-and-javascript&amp;utm_medium=link&amp;utm_campaign=wp-plugin-upgrade-link" target="_blank"><strong>Custom CSS and Javascript<br />Developer Edition</strong></a>
							<ul>
								<li>Divide your CSS and Javascript into multiple virtual files</li>
								<li>Supports <strong>Sassy CSS (SCSS)</strong>!</li>
								<li><strong>Live preview</strong> for CSS!</li>
								<li>Upload and download CSS and JS files</li>
								<li>No developer logo or review/donate links on the editor page</li>
							</ul>
							<a href="https://potentplugins.com/downloads/custom-css-javascript-developer-edition/?utm_source=custom-css-and-javascript&amp;utm_medium=link&amp;utm_campaign=wp-plugin-upgrade-link" target="_blank">Learn More &gt;</a>
						</div>
						<h4 style="margin: 0; margin-bottom: 5px;">Revisions:</h4>
						<button class="button-secondary hm-custom-css-js-delete-revisions-btn">Delete All</button>
						<ul id="hm_custom_css_js_revisions">
						</ul>
					</div>
				</div>
				<div style="float: right; padding-left: 10px; margin-top: 3px; white-space: nowrap; font-style: italic;">
					<a href="https://codemirror.net/" target="_blank">CodeMirror</a> code editor
				</div>
				<button type="button" class="button-primary hm-custom-css-js-save-btn" style="margin-top: 15px;" disabled="disabled">Saved</button>
				<button type="button" class="button-primary hm-custom-css-js-publish-btn" style="margin-top: 15px; margin-right: 10px;" disabled="disabled">Save &amp; Publish</button>
				<label style="margin-top: 15px; white-space: nowrap;">
					<input type="checkbox" class="hm-custom-css-js-minify-cb"'.(get_option('hm_custom_'.strtolower($mode).'_minify', true) ? ' checked="checked"' : '').' /> Minify output
				</label>
			</div>
			<div style="clear: both; margin-bottom: 20px;"></div>
	');
	$potent_slug = 'custom-css-and-javascript';
	include(__DIR__.'/plugin-credit.php');
	echo('
		</div>
	');
}

/* Review/donate notice */

register_activation_hook(__FILE__, 'hm_custom_css_js_first_activate');
function hm_custom_css_js_first_activate() {
	$pre = 'hm_custom_css_js';
	$firstActivate = get_option($pre.'_first_activate');
	if (empty($firstActivate)) {
		update_option($pre.'_first_activate', time());
	}
}
if (is_admin() && get_option('hm_custom_css_js_rd_notice_hidden') != 1 && time() - get_option('hm_custom_css_js_first_activate') >= (14*86400)) {
	add_action('admin_notices', 'hm_custom_css_js_rd_notice');
	add_action('wp_ajax_hm_custom_css_js_rd_notice_hide', 'hm_custom_css_js_rd_notice_hide');
}
function hm_custom_css_js_rd_notice() {
	$pre = 'hm_custom_css_js';
	$slug = 'custom-css-and-javascript';
	echo('
		<div id="'.$pre.'_rd_notice" class="updated notice is-dismissible"><p>Does the <strong>Custom CSS and Javascript</strong> plugin make your life easier?
		Please support our free plugin by <a href="https://wordpress.org/support/view/plugin-reviews/'.$slug.'" target="_blank">writing a review</a> and/or <a href="https://potentplugins.com/donate/?utm_source='.$slug.'&amp;utm_medium=link&amp;utm_campaign=wp-plugin-notice-donate-link" target="_blank">making a donation</a>!
		Thanks!</p></div>
		<script>jQuery(document).ready(function($){$(\'#'.$pre.'_rd_notice\').on(\'click\', \'.notice-dismiss\', function(){jQuery.post(ajaxurl, {action:\'hm_custom_css_js_rd_notice_hide\'})});});</script>
	');
}
function hm_custom_css_js_rd_notice_hide() {
	$pre = 'hm_custom_css_js';
	update_option($pre.'_rd_notice_hidden', 1);
}

?>