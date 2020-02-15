var DynamoBackup = require('../');

var backup = new DynamoBackup({
    includedTables: ['backup', 'PassIdentifier'],
    readPercentage: .5,
    bucket: 'shopface-dynamodb-backup',
    stopOnFailure: true,
    base64Binary: true,
    awsRegion: 'us-east-1'
});

backup.on('error', function(data) {
    console.log('Error backing up ' + data.table);
    console.log(data.err);
});

backup.on('start-backup', function(tableName, startTime) {
    console.log('Starting to copy table ' + tableName);
});

backup.on('end-backup', function(tableName, backupDuration) {
    console.log('Done copying table ' + tableName);
});

backup.backupAllTables(function() {
    console.log('Finished backing up DynamoDB');
});
