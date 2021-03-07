const http = require('http');
const hostname = "localhost";
const port = 3000;

const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    console.log("requesting " + req.url + " by " + req.method);

    if (req.method == 'GET') {
        let fileUrl;
        if (req.url == '/') {
            fileUrl = "/index.html";
        } else {
            fileUrl = req.url;
        }
        let filePath = path.resolve('./public' + fileUrl);
        let extname = path.extname(filePath);
        if (extname == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body>ERROR 404: ' + fileUrl + ' does not exist</body></html>');
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body>ERROR 404: ' + fileUrl + ' is not a HTML file.</body></html>');
        }
    } else {    
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');            
        res.end('<html><body>ERROR 404: '+fileUrl+' not supported.</body></html>');
    }

    // res.statusCode = 200;
    //  res.setHeader('Content-Type','text/html');
    //  res.end('<html><body>Server Connected</body></html>');
});

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})