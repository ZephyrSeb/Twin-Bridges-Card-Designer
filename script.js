var img0 = new Image();
var img1 = new Image();
var img2 = new Image();
var img3 = new Image();
var img4 = new Image();
var img5 = new Image();
var img6 = new Image();
var imgPicture = new Image();

function updatecard() {
    var cardtype = document.getElementById('cardtype').selectedIndex;
    var name = document.getElementById('name').value;
    var effect = document.getElementById('card_effect').value;
    var bw = document.getElementById('blackwhite').selectedIndex;
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 384;
    context.clearRect(0, 0, canvas.width, canvas.height);
    img1.src = 'Assets/cardtype_movement_2.png';
    img2.src = 'Assets/cardtype_spell_2.png';
    img3.src = 'Assets/cardtype_object_2.png';
    img4.src = 'Assets/cardtype_counter_2.png';
    img5.src = 'Assets/cardtype_boost_2.png';
    imgPicture = document.getElementById('file');
    var fileReader = new FileReader();

    //Reads the image uploaded by the user to be able to display it
    imgPicture.addEventListener("change", (e) => {
        var file = e.target.files[0];
        fileReader.readAsDataURL(file);
    })

    fileReader.addEventListener("load", (e) => {
        img6.src = e.target.result;
    })

    //Determines the card background
	if (bw == 1) {img0.src = 'Assets/cardback_bw.png';}
	if (cardtype == 0 && bw == 0) {img0.src = 'Assets/cardback_movement_2.png';}
	if (cardtype == 1 && bw == 0) {img0.src = 'Assets/cardback_spell_2.png';}
	if (cardtype == 2 && bw == 0) {img0.src = 'Assets/cardback_object_2.png';}
	if (cardtype == 3 && bw == 0) {img0.src = 'Assets/cardback_counter_2.png';}
	if (cardtype == 4 && bw == 0) {img0.src = 'Assets/cardback_boost_2.png';}

    //Draws the card and displays it to the user
	img0.onload = function() {
		context.drawImage(img0,0,0,256,384);
		context.font="20pt Berlin Sans FB";
		context.fillText(name,16,32,224,32);
		context.font="12pt Berlin Sans FB";
		wrapText(context,effect,24,208,216,16);
        context.drawImage(img6,16,48,224,128);
	}
}

//Draws text that automatically wraps, and replaces any special characters with the corresponding symbols
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    const specialcharacters = ["\\n", "{M}", "{S}", "{O}", "{C}", "{B}"];

    for(var n = 0; n < words.length; n++) {
        if (specialcharacters.includes(words[n])) {
            if (words[n] == "\\n") {
                context.fillText(line, x, y);
                line = '';
                y += lineHeight;
            }
            else {
                var testLine = line + '--';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width + 16;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    y += lineHeight;
                    if (words[n] == "{M}") {context.drawImage(img1, x, y - 14, 18, 18);}
                    if (words[n] == "{S}") {context.drawImage(img2, x, y - 14, 18, 18);}
                    if (words[n] == "{O}") {context.drawImage(img3, x, y - 14, 18, 18);}
                    if (words[n] == "{C}") {context.drawImage(img4, x, y - 14, 18, 18);}
                    if (words[n] == "{B}") {context.drawImage(img5, x, y - 14, 18, 18);}
                    line = '    ';
                }
                else {
                    if (words[n] == "{M}") {context.drawImage(img1, x + context.measureText(line).width, y - 14, 18, 18);}
                    if (words[n] == "{S}") {context.drawImage(img2, x + context.measureText(line).width, y - 14, 18, 18);}
                    if (words[n] == "{O}") {context.drawImage(img3, x + context.measureText(line).width, y - 14, 18, 18);}
                    if (words[n] == "{C}") {context.drawImage(img4, x + context.measureText(line).width, y - 14, 18, 18);}
                    if (words[n] == "{B}") {context.drawImage(img5, x + context.measureText(line).width, y - 14, 18, 18);}
                    line = line + '      ';
                }
            }
        }
        else {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
    }
    context.fillText(line, x, y);
}