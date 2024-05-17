const extractFilename = (extraArgs) => {
    const filename = extraArgs.split('&').find(key => key.startsWith('filename='));
    const filenameValue = filename ? filename.split('=')[1] : "";

    return filenameValue
};


export default extractFilename;