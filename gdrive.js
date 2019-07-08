const fs = require("fs");
const {google} = require('googleapis');
 
function dbUpload(fileName, filePath, callback){
	require("./gdrive-auth")((auth) => {
		const fileMetadata = {
			name: fileName
		};

		const media = {
			mimeType: "application/json",
			body: fs.createReadStream(filePath)
		}

		const drive = google.drive({version: 'v3', auth});


		drive.files.update({			
			fileId: '1M_643ESxJMwkZmefClRiOfdXkWeuQS1D', //Developmente
			// fileId: '1Vu1xt-Kq9q8rF1DJi4CYi36wkIeou5i6', //Production
			resource: fileMetadata,
			media: media,
			fields: 'id'
		}, function (err, file) {
			if (err) {
    // Handle error
    console.error(err);
} else {
	console.log('File Id: ', file.id);
} 
});


	});
}

module.exports = { dbUpload };