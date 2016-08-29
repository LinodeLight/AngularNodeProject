var path 		= require('path');
var rootPath 	= path.normalize(__dirname + '/../../');

module.exports 	= {
    local: {
        baseUrl: 'http://localhost:3030',
        db: 'mongodb://localhost/test_local',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    }
};
