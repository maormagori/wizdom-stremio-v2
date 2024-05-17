const extractCompoundID = (compoundID) => {
    const [id, season = 0, episode = 0] = compoundID.split(":");

    return [id, season, episode];
};


export default extractCompoundID;