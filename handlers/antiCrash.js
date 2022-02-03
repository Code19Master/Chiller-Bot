module.exports = client => {
   process.on('unhandledRejection', (reason, p) => {
 console.log('888455701788258363')(' [antiCrash] :: Unhandled Rejection/Catch');
 console.log('888455701788258363')(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
 console.log('888455701788258363')(' [antiCrash] :: Uncaught Exception/Catch');
 console.log('888455701788258363')(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
 console.log('888455701788258363')(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
 console.log('888455701788258363')(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log('888455701788258363')(' [antiCrash] :: Multiple Resolves');
        console.log('888455701788258363')(type, promise, reason);
    });
}
