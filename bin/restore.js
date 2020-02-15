var DynamoRestore = require('../').Restore;


var restore = new DynamoRestore({
    source: 's3://shopface-dynamodb-backup/DynamoDB-backup-2020-02-15-22-32-15/PassIdentifier.json',
    table: 'PassIdentifierV2',
    overwrite: true,
    concurrency: 200, // for large restores use 1 unit per MB as a rule of thumb (ie 1000 for 1GB restore)
    awsRegion: 'us-east-1'
});

restore.on('error', function(message) {
    console.log(message);
    process.exit(-1);
});

restore.on('warning', function(message) {
    console.log(message);
});

restore.on('send-batch', function(batches, requests, streamMeta) {
    console.log('Batch sent. %d in flight. %d Mb remaining to download...', requests, streamMeta.RemainingLength / (1024 * 1024));
});

restore.run(function() {
    console.log('Finished restoring DynamoDB table');
});
