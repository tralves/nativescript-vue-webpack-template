# NativeScript Vue.js Template

This repo serves as the starting point for NativeScript + Vue.js projects, using [nativescript-vue](https://github.com/rigor789/nativescript-vue).

# Usage

1. Install NativeScript tools (see http://docs.nativescript.org/start/quick-setup)

2. Create app from this template
```bash
tns create hello-ns-vue --template https://github.com/tralves/nativescript-vue-webpack-template
```

3. Install dependencies
```bash
cd hello-ns-vue
npm install
```
> Note: do not use `yarn`.

4. Run in Android or iOS (see: [{NS} documentation on webpack bundling](https://docs.nativescript.org/tooling/bundling-with-webpack#bundling))
```
npm run start-android-bundle -- --clean
npm run start-ios-bundle -- --clean
```

5. Code!
You will find more sample code [here](https://github.com/tralves/nativescript-vue/tree/master/samples).