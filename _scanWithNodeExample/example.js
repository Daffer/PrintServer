const {spawn} = require('child_process');
const fs = require('fs');
const {exec} = require('child_process');

const stream = fs.createWriteStream('/home/pavel/output4.jpeg');
//scanimage --format=jpeg --resolution=600 -d 'hpaio:/usb/Deskjet_F300_series?serial=CN6C7GZ11N04KH' > output.png
const scanimage = spawn("scanimage", ["--format=jpeg", "--resolution=1200"]);

scanimage.on('close', (code) => {
    console.log('Close with code: ' + code);
})

scanimage.stderr.on('data', (data) => {
    console.log("Err data: ");
    console.log(data.toString('utf8'));
});

scanimage.stdout.on('data', (data) => {
    stream.write(data);
});

scanimage.on('exit', (code) => {
	console.log('Exit with code is: ' + code);
});
