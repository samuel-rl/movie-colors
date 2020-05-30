var array = [];

var video = null;
var canvas = null;
var ctx = null;
var pro = null;

function openFile() {
	document.getElementById('fileInput').click();
}

const addFile = event => {
    let file = event[0];
	let url = URL.createObjectURL(file);
    video = document.getElementById('video');
    var src = video.getAttribute('src'); 
    video.setAttribute("src", url)
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
        this.currentTime += 100;
    }
}

function onend(e) {
    var img;
    var sizeWidth = 100 / array.length;
    var divResult = document.getElementById('divResult');
    for (var i = 0; i < array.length; i++) {
        img = new Image();
        img.onload = revokeURL;
        img.src = URL.createObjectURL(array[i]);
        img.style.width = sizeWidth + '%';
        img.style.height = '60px';
        img.classList.add('img');
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

window.onmouseover = function(event) {
	event = event || window.event;
	const srcEl = event.srcElement || event.target;
	if (srcEl.classList.contains('img')) {
		this.console.log('ok');
	}
};