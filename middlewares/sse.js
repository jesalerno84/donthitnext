module.exports = (req, res, next) => {
    res.sseSetup = () => {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })
    }
    
    res.sseSend = (data, ev) => {
        if (ev) {
            res.write(`event: ${ev}\n`);
        }
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
    
    next();
}