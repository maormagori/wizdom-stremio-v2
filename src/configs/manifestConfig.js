const manifestConfig = {
    id: "xyz.stremio.wizdom",
    contactEmail: "maor@magori.online",
    version: process.env.npm_package_version,
    catalogs: [],
    resources: ["subtitles"],
    types: ["movie", "series"],
    name: "Wizdom Subtitles",
    description:
        "An unofficial Stremio addon for Hebrew subtitles from wizdom.xyz. Developed by Maor Development",
    logo: "https://i.ibb.co/KLYK0TH/wizdon256.png",
};


export default manifestConfig;