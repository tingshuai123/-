
require.config({
  paths: {
      jquery:'jquery-2.2.2.min',
      login:'module/login.js?t=' + GLOBAL.versions,
      dialog:'module/dialog.js?t=' + GLOBAL.versions,
      form:'module/form.js?t=' + GLOBAL.versions,
      pan:'module/pan.js?t='+GLOBAL.versions,
      jiekou:'module/jiekou.js?t='+GLOBAL.versions,
      jiekou2:'module/jiekou2.js?t='+GLOBAL.versions,
      upload:'webuploader.min.js?t='+GLOBAL.versions,
      tree:'jquery.tree.js?t='+GLOBAL.versions,
      treedemo:'module/treeDemo.js?t='+GLOBAL.versions,
      gjpy:'module/gjpy.js?t='+GLOBAL.versions,
  },
  shim: {
      // 'cookie':['jquery']
  }

});
if(GLOBAL.load) {
  require(['jquery','gjpy']);
}


