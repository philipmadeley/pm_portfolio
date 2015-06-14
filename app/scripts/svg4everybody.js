// Customized version

(function(document, uses, requestAnimationFrame, CACHE) {
    function embed(svg, g) {
        if (g) {
            var
            viewBox = g.getAttribute('viewBox'),
            fragment = document.createDocumentFragment(),
            clone = g.cloneNode(true);

            if (viewBox) {
            	svg.setAttribute('viewBox', viewBox);
            }

            while (clone.childNodes.length) {
                fragment.appendChild(clone.childNodes[0]);
            }

            svg.appendChild(fragment);
        }
    }

    function onload() {
        var xhr = this, x = document.createElement('x'), s = xhr.s;

        x.innerHTML = xhr.responseText;

        xhr.onload = function() {
            s.splice(0).map(function(array) {
                embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
            });
        };

        xhr.onload();
    }

    function onframe() {
        var use;

        while ((use = uses[0])) {
            var
            svg = use.parentNode,
            url = use.getAttribute('xlink:href').split('#')[1],
            urlRoot = '../images/icons.svg';

            svg.removeChild(use);

            var xhr = CACHE[urlRoot] = CACHE[urlRoot] || new XMLHttpRequest();

            if (!xhr.s) {
                xhr.s = [];

                xhr.open('GET', urlRoot);

                xhr.onload = onload;

                xhr.send();
            }

            xhr.s.push([svg, url]);

            if (xhr.readyState === 4) {
            	xhr.onload();
            }

        }

        requestAnimationFrame(onframe);
    }

    onframe();

})(
	document,
	document.getElementsByTagName('use'),
	window.requestAnimationFrame || window.setTimeout,
	{}
);
