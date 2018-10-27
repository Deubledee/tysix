/**
 * Author: Hearken Media
 * License: GNU General Public License version 2 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 */
var hm_custom_code_editor, hm_custom_code_editor_has_changes = false, hm_custom_css_js_save_publish = false, hm_custom_css_js_rev = 0, hm_custom_css_js_published_rev = 0;
jQuery(document).ready(function($) {
	hm_custom_code_editor = CodeMirror(document.getElementById("hm_custom_code_editor"), {
		lineNumbers: true,
		mode: hm_custom_css_js_mode.toLowerCase(),
		matchBrackets: true
	});
	hm_custom_code_editor.on("change", function() {
		if (hm_custom_code_editor_has_changes)
			return;
		hm_custom_code_editor_has_changes = true;
		$(".hm-custom-css-js-save-btn").html("Save").prop("disabled", false);
		$(".hm-custom-css-js-publish-btn").html("Save &amp; Publish").prop("disabled", false);
	});
	$(".hm-custom-css-js-save-btn").click(function() {
		$(".hm-custom-css-js-save-btn").prop("disabled", true).html("Saving...");
		$.post(ajaxurl, {action: "hm_custom_css_js_save", mode: hm_custom_css_js_mode, code: hm_custom_code_editor.getValue()})
			.done(function(data) {
				if (data.success) {
					$(".hm-custom-css-js-save-btn").html("Saved");
					hm_custom_css_js_rev = data.data;
					hm_custom_code_editor_has_changes = false;
					if (hm_custom_css_js_save_publish)
						$(".hm-custom-css-js-publish-btn").click()
					else
						hm_custom_css_js_get_revisions();
				} else {
					alert("Error while saving. Please try again.");
					$(".hm-custom-css-js-save-btn").html("Save").prop("disabled", false);
					if (hm_custom_css_js_save_publish)
						$(".hm-custom-css-js-publish-btn").html("Save &amp; Publish").prop("disabled", true);
				}
			})
			.fail(function() {
				alert("Error while saving. Please try again.");
					$(".hm-custom-css-js-save-btn").html("Save").prop("disabled", false);
					if (hm_custom_css_js_save_publish)
						$(".hm-custom-css-js-publish-btn").html("Save &amp; Publish").prop("disabled", true);
			});
	});
	$(".hm-custom-css-js-publish-btn").click(function() {
		$(".hm-custom-css-js-publish-btn").prop("disabled", true).html("Publishing...");
		if (!$(".hm-custom-css-js-save-btn").prop("disabled")) {
			hm_custom_css_js_save_publish = true;
			$(".hm-custom-css-js-save-btn").click();
			return;
		}
		hm_custom_css_js_save_publish = false;
		
		$.post(ajaxurl, {action: "hm_custom_css_js_publish", mode: hm_custom_css_js_mode, minify: ($('.hm-custom-css-js-minify-cb').prop('checked') ? 1 : 0), rev: hm_custom_css_js_rev})
			.done(function(data) {
				if (data.success) {
					$(".hm-custom-css-js-publish-btn").html("Published");
					hm_custom_css_js_get_revisions();
				} else {
					alert("Error while publishing. Please try again.");
					$(".hm-custom-css-js-publish-btn").html("Save &amp; Publish").prop("disabled", false);
				}
			})
			.fail(function() {
				alert("Error while publishing. Please try again.");
				$(".hm-custom-css-js-publish-btn").html("Save &amp; Publish").prop("disabled", false);
			});
	});
	
	$(".hm-custom-css-js-delete-revisions-btn").click(function() {
		$(this).prop('disabled', true).html('Deleting...');
		
		$.post(ajaxurl, {action: "hm_custom_css_js_delete_revisions", mode: hm_custom_css_js_mode})
			.done(function(data) {
				if (data.success) {
					hm_custom_css_js_get_revisions();
					$(".hm-custom-css-js-delete-revisions-btn").html('Delete All').prop('disabled', false);	
				} else {
					alert("Error while deleting. Please try again.");
					$(".hm-custom-css-js-delete-revisions-btn").html('Delete All').prop('disabled', false);
				}
			})
			.fail(function() {
				alert("Error while deleting. Please try again.");
				$(".hm-custom-css-js-delete-revisions-btn").html('Delete All').prop('disabled', false);
			});
	});
	
	
	$(window).resize(function() {
		$("#hm_custom_code_editor, #hm_custom_code_editor .CodeMirror").height(Math.max(150,
														$(window).height()
														- $("#hm_custom_code_editor").offset().top
														- $(".hm-custom-css-js-save-btn").height()
														- 30));
		hm_custom_code_editor.refresh();
	});
	$(window).resize();
	$(window).on("beforeunload", function(ev) {
		if (hm_custom_code_editor_has_changes) {
			ev.returnValue = "You have unsaved changes that will be lost if you leave this page!";
			return ev.returnValue;
		}
	});
	
	$("#hm_custom_css_js_revisions").on("click", "li > a.view-rev", function(ev) {
		
		if (hm_custom_code_editor_has_changes &&
				!confirm("You have unsaved changes that will be lost if you view this revision!"))
			return;
		
		var revId = $(this).parent().attr("id").substring(20);
		
		$.post(ajaxurl, {action: "hm_custom_css_js_get_revision", mode: hm_custom_css_js_mode, rev: revId})
			.done(function(data) {
				if (data.success) {
					hm_custom_code_editor.doc.setValue(data.data.content);
					hm_custom_css_js_rev = data.data.id;
					$('#hm_custom_css_js_revisions .active').removeClass('active');
					$('#hm_custom_css_js_rev' + hm_custom_css_js_rev).addClass('active');
					$(".hm-custom-css-js-save-btn").html("Saved").prop("disabled", true);
					if (hm_custom_css_js_rev == hm_custom_css_js_published_rev)
						$(".hm-custom-css-js-publish-btn").html("Published").prop("disabled", true);
					hm_custom_code_editor_has_changes = false;
				} else {
					alert("Error while loading. Please try again.");
				}
			})
			.fail(function() {
				alert("Error while loading. Please try again.");
			});
	});
	
	$("#hm_custom_css_js_revisions").on("click", "li > a.del-rev", function(ev) {
		
		var revId = $(this).parent().attr("id").substring(20);
		
		$.post(ajaxurl, {action: "hm_custom_css_js_delete_revision", mode: hm_custom_css_js_mode, rev: revId})
			.done(function(data) {
				if (data.success) {
					hm_custom_css_js_get_revisions();
				} else {
					alert("Error while deleting. Please try again.");
				}
			})
			.fail(function() {
				alert("Error while deleting. Please try again.");
			});
	});
	
	function hm_custom_css_js_get_revisions() {
		$.post(ajaxurl, {action: "hm_custom_css_js_get_revisions", mode: hm_custom_css_js_mode, })
				.done(function(data) {
					if (data.success) {
						$("#hm_custom_css_js_revisions").empty();
						if (data.data.length == 0) {
							$("#hm_custom_css_js_revisions").append("<li>None</li>");
						} else {
							for (var i = 0; i < data.data.length; ++i) {
								$("#hm_custom_css_js_revisions").append("<li id=\"hm_custom_css_js_rev" + data.data[i].id + "\"><a class=\"view-rev\" href=\"javascript:void(0);\">" + data.data[i].rev_date + "</a>" + (data.data[i].published ? " [published]" : " <a class=\"del-rev\" href=\"javascript:void(0);\">[delete]</a>") + "</li>");
								if (data.data[i].published)
									hm_custom_css_js_published_rev = data.data[i].id;
							}
							if (hm_custom_css_js_rev == 0) {
								$("#hm_custom_css_js_revisions > li:first-child > a.view-rev").click();
							} else {
								$('#hm_custom_css_js_rev' + hm_custom_css_js_rev).addClass('active');
							}
						}
					}
				});
	}
	hm_custom_css_js_get_revisions();
	
});