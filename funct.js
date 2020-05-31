var array = [];

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var ctx = null;
var progress = null;
var progressBar = null;
var posX = null;
var importButton = document.getElementById('import');
var captureButton = document.getElementById('capture');
var progressDiv = document.getElementById('progressDiv');
var divCapture = document.getElementById('divCapture');
var everyDuration = document.getElementById('everyDuration');

var ratio = null;

function displayNone(node){
    node.style.display = "none"
}

function displayBlock(node){
    node.style.display = "block"
}



displayNone(video)
displayNone(canvas)
displayNone(progressDiv)
displayNone(divCapture)




function openFile() {
    document.getElementById('fileInput').click();
}

const addFile = event => {
	let file = event[0];
	let url = URL.createObjectURL(file);
	var src = video.getAttribute('src');
    video.setAttribute('src', url);

    displayNone(importButton)
    displayBlock(divCapture)

};

const capture = () => {
    displayBlock(progressDiv)
    displayNone(divCapture)
	canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    ratio = video.videoWidth / video.videoHeight;

	ctx = canvas.getContext('2d');

	video.style.display = 'none';

    progress = document.querySelector('#progress');
    progressBar = document.querySelector('#progressBar');

	video.addEventListener('ended', onend, false);
	video.addEventListener('timeupdate', drawFrame, false);
	video.play();
};

function drawFrame(e) {
	this.pause();
	ctx.drawImage(this, 0, 0);
    canvas.toBlob(saveFrame, 'image/jpeg');
    
    let res = (this.currentTime / this.duration * 100).toFixed(2);

    progress.innerHTML = res + ' %';
    
    progressBar.style.width = res+'%';

	if (this.currentTime < this.duration) {
        let nb = parseInt(everyDuration.value);
		this.currentTime += nb;
	}
}

function onend(e) {
    displayNone(canvas)
	var img;
	var sizeWidth = 100 / array.length;
	var divResult = document.getElementById('divResult');

	var divImgResult = document.getElementById('divImgResult');

	divResult.onmousemove = function(e) {
		var mousecoords = getMousePos(e);
		divImgResult.style.marginLeft = mousecoords.x - 100 * ratio + 'px';
	};

	for (var i = 0; i < array.length; i++) {
		img = new Image();
		img.onload = revokeURL;
		img.src = URL.createObjectURL(array[i]);
		img.style.width = sizeWidth + '%';
		img.style.height = '150px';
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

function getMousePos(e) {
	return { x: e.clientX, y: e.clientY };
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
		img.style.width = 200 * ratio + 'px';
        img.style.height = 200 + 'px';
		img.classList.add('img');
		divResult.appendChild(img);
	}else{
        
    }
};

document.getElementById('divImgResult');
