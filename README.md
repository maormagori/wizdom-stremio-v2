# wizdom-stremio-v2
An unofficial Stremio addon for Hebrew subtitles from wizdom.xyz. Developed by Maor Development.

## Installation
### Online
Currently you can get this addon in:

https://4b139a4b7f94-wizdom-stremio-v2.baby-beamup.club/

I've published this addon and you can now find it in the addon catalog!

### Local
Download and install Node.js on your computer, then install and launch the addon from Powershell:

```
git clone https://github.com/maormagori/wizdom-stremio-v2.git
cd wizdom-stremio-v2
npm install
npm start
```

Add the addon to stremio from browser:
stremio://127.0.0.1:7000/manifest.json

or from the addon search menu:
```
http://127.0.0.1:7000/manifest.json
```
## TODO
Features I would like to implement and stuff needed to be done:
- [x] Documentation
- [x] Cache system (No need since we're not buffering the srts anymore)
- [x] Maybe a landing page.
- [ ] Auto switch to wizdom's backup domain

## contributions

These repos really helped me develop this addon:

* [Addic7ed stremio Addon](https://github.com/phoborsh/addic7ed-stremio-addon/blob/master/README.md)
* [subtitles-grouping](https://github.com/Ivshti/node-subtitles-grouping)
