/**
 * Created by xjy on 8/3/16.
 */
let RouteResponse = require("./commands/route-response");
let MainPage = require('./commands/goto-main-page');
let getMenu = new MainPage();
const defaultMapping = {"*": getMenu.action};
class Route {
  constructor(){
    this.mapping=defaultMapping;
  }
  action(input) {
    let command = this.mapping[input] || this.mapping["*"];
    let response = command(input);
    if (response.error) {
      return new RouteResponse({
        text: response.error});
    }
    if (response.reset) {
      this.mapping = defaultMapping;
      return new RouteResponse({text:response.text,rerun:true});
    }
    if (response.newMapping) {
      this.mapping = response.newMapping;
      return new RouteResponse({text:response.text});
    }
    return new RouteResponse({
      text: response.text
    });
  }
}
module.exports = Route;
