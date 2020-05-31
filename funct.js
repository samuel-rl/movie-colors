var array = [];

var video = null;
var canvas = null;
var ctx = null;
var pro = null;

var posX = null;

function openFile() {
	document.getElementById('fileInput').click();
}

const addFile = event => {
	let file = event[0];
	let url = URL.createObjectURL(file);
	video = document.getElementById('video');
	var src = video.getAttribute('src');
	video.setAttribute('src', url);
};

const capture = () => {
	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx = canvas.getContext('2d');

	video.style.display = 'none';

	pro = document.querySelector('#progress');

	video.addEventListener('ended', onend, false);
	video.addEventListener('timeupdate', drawFrame, false);
	video.play();
};

function drawFrame(e) {
	this.pause();
	ctx.drawImage(this, 0, 0);
	canvas.toBlob(saveFrame, 'image/jpeg');

	pro.innerHTML = (this.currentTime / this.duration * 100).toFixed(2) + ' %';
	if (this.currentTime < this.duration) {
		this.currentTime += 200;
	}
}

function onend(e) {
	var img;
	var sizeWidth = 100 / array.length;
	var divResult = document.getElementById('divResult');

	var divImgResult = document.getElementById('divImgResult');

	divResult.onmousemove = function(e) {
		var mousecoords = getMousePos(e);
		divImgResult.style.marginLeft = mousecoords.x - 130 + 'px';
	};

	for (var i = 0; i < array.length; i++) {
		img = new Image();
		img.onload = revokeURL;
		img.src = URL.createObjectURL(array[i]);
		img.style.width = sizeWidth + '%';
		img.style.height = '60px';
        img.classList.add('img');
        img.setAttribute("nb", i);
		divResult.appendChild(img);
	}
	URL.revokeObjectURL(this.src);
}

function saveFrame(blob) {
	array.push(blob);
}

function revokeURL(e) {
	URL.revokeObjectURL(this.src);
}

document.body.onmouseover = function(event) {
	var divResult = document.getElementById('divImgResult');
	event = event || window.event;
    const srcEl = event.srcElement || event.target;
    while (divResult.hasChildNodes()) {
        divResult.removeChild(divResult.lastChild);
    }
	if (srcEl.classList.contains('img')) {
        
        
          
        var i = srcEl.getAttribute("nb")
		img = new Image();
		img.onload = revokeURL;
		img.src = URL.createObjectURL(array[i]);
		img.style.width = '200px';
		img.style.height = '125px';
		img.classList.add('img');
		divResult.appendChild(img);
	}else{
        
    }
};

function getMousePos(e) {
	return { x: e.clientX, y: e.clientY };
}
