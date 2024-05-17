const wrapTryCatch = (fn) => async (req, res) => {
    try { await fn(req, res); }
    catch (error) { console.error(error.message); res.send({ subtitles: [] }); }
};


export default wrapTryCatch;