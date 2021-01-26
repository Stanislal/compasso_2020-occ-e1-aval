import "./styles.less";
import api from "./api/api.js";

console.log("hello world!");
api.getMyBooks().then((result) => {
  console.log(result);
});
