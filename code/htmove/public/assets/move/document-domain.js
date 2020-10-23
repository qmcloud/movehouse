;(function() {
	try {
		var hostArr = location.hostname.split('.');

		var hostDomain = hostArr.length === 2 ? hostArr.join('.') : hostArr.slice(1).join('.');

		document.domain = hostDomain;
	} catch(e) {
		console.log(e)
	}
})()
