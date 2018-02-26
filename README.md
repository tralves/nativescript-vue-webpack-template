# NativeScript Vue.js Template

This repo serves as the starting point for NativeScript + Vue.js projects, using [nativescript-vue](https://github.com/rigor789/nativescript-vue).

This template creates a project ready to use with Vue single file components\* (`.vue` files)!

## Usage

1. Install NativeScript tools (see http://docs.nativescript.org/start/quick-setup)

2. Create app from this template
```bash
tns create hello-ns-vue --template https://github.com/tralves/nativescript-vue-webpack-template
```

3. Watch for changes while developing

In two separate terminals run:
```bash
# terminal 1
webpack --watch --env.tns --env.android
# or
webpack --watch --env.tns --env.ios

# terminal 2
cd tns && tns debug android
# or
cd tns && tns debug ios
```

4. Bundle Android or iOS for deploy (see: [{NS} documentation on webpack bundling](https://docs.nativescript.org/tooling/bundling-with-webpack#bundling))
```bash
npm run start-android-bundle -- --clean
npm run start-ios-bundle -- --clean
```

5. Code!
You will find more sample code [here](https://github.com/tralves/nativescript-vue/tree/master/samples).
