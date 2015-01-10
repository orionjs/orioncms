Template.adminLoading.rendered = function() {
	var options = {
		lines: 9, // The number of lines to draw
		length: 0, // The length of each line
		width: 3, // The line thickness
		radius: 11, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb or array of colors
		speed: 1.3, // Rounds per second
		trail: 100, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 0, // The z-index (defaults to 2000000000)
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	};
	this.spinner = new Spinner(options);
	this.spinner.spin(this.firstNode);
};

Template.adminLoading.destroyed = function() {
  this.spinner && this.spinner.stop();
};