module.exports = client => {
   process.on('unhandledRejection', (reason, p) => {
 client.channels.cache.get('888455701788258363')(' [antiCrash] :: Unhandled Rejection/Catch');
 client.channels.cache.get('888455701788258363')(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
 client.channels.cache.get('888455701788258363')(' [antiCrash] :: Uncaught Exception/Catch');
 client.channels.cache.get('888455701788258363')(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
 client.channels.cache.get('888455701788258363')(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
 client.channels.cache.get('888455701788258363')(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        client.channels.cache.get('888455701788258363')(' [antiCrash] :: Multiple Resolves');
        client.channels.cache.get('888455701788258363')(type, promise, reason);
    });
}
