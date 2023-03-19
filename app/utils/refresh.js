export default function refreshData (router,path) {
  if(router && path){
    router.refresh();
  }
}
