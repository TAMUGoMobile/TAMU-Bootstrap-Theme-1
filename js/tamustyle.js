/**
 * StuAct Online jQuery classes.
 */
 
(function ($) {
	$(function() {
		// Clean up display of certain areas 
		$('div.messages').removeClass('messages').addClass('alert alert-info');
		$('div.alert.error').removeClass('error').addClass('alert-error');
		$('div#secondary > ul').removeClass().addClass('nav nav-list');
		
		$('input[type="submit"]').addClass('btn');
		$('form input#edit-submit').addClass('btn-primary');
		$('form input#edit-delete').addClass('btn-danger');
		
		$('div.breadcrumb').removeClass('breadcrumb');
		
		$('ul.tabs.primary').removeClass().addClass('nav nav-tabs');
		$('ul.tabs.secondary').removeClass().addClass('nav nav-pills');
		
		// Fix search bar.
		$('#block-search-form input[name="search_block_form"]').addClass('input-small search-query');
		$('#block-search-form form div.form-actions').removeClass('form-actions').find('input').removeClass('btn-primary');
		
		// Highlight the current active page and its subpages.
		$('div#sidebar a.active').siblings().addClass("active-submenu");
		$('div#messages div.messages').removeClass().addClass('content_top_inner blue').wrap('<div class="content_top" />');
		
		// Auto-format tables.
		$('div.region-content table').addClass('table');
		
		// Clean up header nav.
		$('div.navbar a.here').closest('li').addClass('active');
		$('div.navbar a.active-trail').addClass('active');
		
		$('div.navbar ul').removeClass();
		$('div.navbar div > ul').addClass('nav');
		$('div.navbar ul li ul li ul').remove();
		
		$('div.navbar ul li > ul').each(function() {
			$(this).closest('li').addClass('dropdown');
			$(this).prev('a').attr('data-target', '#').attr('data-toggle', 'dropdown').addClass('dropdown-toggle').append(' <b class="caret"></b>');
			$(this).addClass('dropdown-menu');
		});
		
		$('div.navbar li.expanded').removeClass('expanded');
		$('div.navbar li.collapsed').removeClass('collapsed');
		$('div.navbar li.leaf').removeClass('leaf');
		$('div.navbar li.active-trail').removeClass('active-trail');
		
		$('li.dropdown > a').click(function(e) {
			e.preventDefault();
			
			var currently_shown = $(this).siblings().filter(':visible');
			var currently_hidden = $(this).siblings().filter(':hidden');

			$('ul.dropdown-menu').hide();
			currently_shown.hide();
			currently_hidden.show();
		});
		$('li.dropdown > a').dblclick(function(e) {
			window.location.href = $(this).attr('href');
		});
		
		// Clean up navigation.
		$('div#sidebar div.content > ul.menu > li').addClass('first-level');
		
		$('div#sidebar div.content > ul.menu > li').not('.active-trail').each(function() {
			$(this).removeClass('expanded collapsed').addClass('leaf');
			$(this).find('ul').hide();
		});
		
		var immediate_nav = $('div#sidebar #block-user-1 a.active').closest('ul').closest('li').closest('ul');
		if (immediate_nav.length != 0)
		{
			var nav_html = immediate_nav.html();
			$('div#sidebar #block-user-1 ul.menu').empty().html(nav_html);
		}
		
		// Header image rotation.
		$('div.homepage_rotator:first').show();
		startRotation();
	});
})(jQuery);

function startRotation() {
	resetRotatorTimer();
}
function homepageRotate() {
	rotateNext();
}

function rotateNext() {
	visible_rotator = jQuery('div.homepage_rotator:visible');
	
	if (visible_rotator.next().length)
		next_rotator = visible_rotator.next();
	else
		next_rotator = jQuery('div.homepage_rotator:first');
	
	visible_rotator.fadeOut('slow', function() {
		next_rotator.fadeIn('slow');
	});
	
	resetRotatorTimer();
}
function rotatePrevious() {
	visible_rotator = jQuery('div.homepage_rotator:visible');
	
	if (visible_rotator.prev().length)
		prev_rotator = visible_rotator.prev();
	else
		prev_rotator = jQuery('div.homepage_rotator:last');
	
	visible_rotator.fadeOut('slow', function() {
		prev_rotator.fadeIn('slow');
	});
	
	resetRotatorTimer();
}

var rotator_int;
function resetRotatorTimer() {
	clearTimeout(rotator_int);
	rotator_int = setTimeout('homepageRotate()', 6000);
}