
const imageInput = document.getElementById('imageInput');
const generateBtn = document.getElementById('generateBtn');
const memeCanvas = new fabric.Canvas('memeCanvas', { backgroundColor: 'lightgrey' });
const saveBtn = document.getElementById('downloadLink');

let topText = new fabric.IText('Top Text', {
    left: 100,
    top: 50,
    fill: 'white',
    fontSize: 30
});
let bottomText = new fabric.IText('Bottom Text', {
    left: 100,
    top: 350,
    fill: 'white',
    fontSize: 30
});

memeCanvas.add(topText);
memeCanvas.add(bottomText);

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const imageUrl = e.target.result;
        fabric.Image.fromURL(imageUrl, (img) => {
            memeCanvas.setBackgroundImage(img, memeCanvas.renderAll.bind(memeCanvas), {
                scaleX: memeCanvas.width / img.width,
                scaleY: memeCanvas.height / img.height
            });
        });
    };

    reader.readAsDataURL(file);
});

generateBtn.addEventListener('click', () => {
    updateMeme();
});

saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = memeCanvas.toDataURL({
        format: 'png',
        quality: 0.8
    });
    link.download = 'meme.png';
    link.click();
});

function updateMeme() {
    const selectedColor = document.getElementById('textColor').value;
    const fontSize = parseInt(document.getElementById('fontSize').value, 10);

    topText.set('text', document.getElementById('topText').value);
    topText.set('fill', selectedColor);
    topText.set('fontSize', fontSize);

    bottomText.set('text', document.getElementById('bottomText').value);
    bottomText.set('fill', selectedColor);
    bottomText.set('fontSize', fontSize);

    memeCanvas.renderAll();
}

memeCanvas.on('object:moving', function(e) {
    const activeObject = e.target;
    if (activeObject === topText) {
        document.getElementById('topText').value = activeObject.text;
    } else if (activeObject === bottomText) {
        document.getElementById('bottomText').value = activeObject.text;
    }
});


document.getElementById('downloadLink').addEventListener('click', function() {
    this.href = memeCanvas.toDataURL({
        format: 'png',
        quality: 0.8
    });
});

