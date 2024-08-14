## master-page-solution

This is where you include your WebPart documentation.

How was install this project:


Command: 
npm install @microsoft/generator-sharepoint@1.4.1
npx yo @microsoft/sharepoint

Selected option online and then Extension, because this version dont have extension to sharepoint lower than sharepoint online.


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
