
var input = document.getElementById("acss-input");
var box = document.getElementById("acss-box");
var form = document.getElementById("acss-form");
var statement = "<br>";

form.onsubmit = function () {
  if (input.value.trim()) {
    var classes = input.value.trim().split(/\s+/);

    classes.forEach(function (eachClass) {
      var result = AliasCSS.compile(eachClass);
      if (result) {
        var styledResult = result;

        styledResult = styledResult.replace(
          /{(.+)}/g,
          "<span style='color:orange'>{</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:blue'>$1</span><br><span style='color:orange'>}</span><br>"
        );

        // statement+= '<span style="color:#f4433c" >.'+"</span><span style='color:olive'>"+"</span>"+ "<span style='color:blue'>{</span><br>"
        // +"&nbsp;&nbsp;&nbsp;&nbsp;"+styleresult + ";</sapn><br>" +"<span style='color:blue'>}</span><br>";
        statement += styledResult;
      } else {
        statement +=
          '<br><em><span class="c-warning"><i class="fas fa-warning"></i></span><span style="color:#f4433c" > ' +
          eachClass +
          "</span>" +
          " is Not a Valid ACSS Classname</em><br><br>";
      }
    });

    //box.innerHTML=statement;
    box.innerHTML = statement;

    statement = "<br>";
  }
  return false;
};
// demo-----------------------------------------------------------------------
// var demobox = document.getElementById("demo-wrapper");
// var demoremove = document.getElementById("demo-close");
// var demolink = document.getElementById("demo-link");
// demoremove.onclick = function () {
//   demobox.style.top = "-200%";
// };

// demolink.onclick = function () {
//   demobox.style.top = "0px";
// };

//for demo ccp--------------only
// var htmlTagHolder = document.getElementById("inputElement");
// var classToBeAppliedHolder = document.getElementById("inputClass");
// var viewPort = document.getElementById("demo-port");
// var textContent = "";

// //evnt trigger for element input
// htmlTagHolder.addEventListener("keydown", function (e) {
//   var src = null;
//   if (!htmlTagHolder.value.trim()) {
//     return true;
//   }
//   var code = e.keyCode ? e.keyCode : e.which;
//   {
//     if (code == 32 || code == 13) {
//       if (htmlTagHolder.value) {
//         if (htmlTagHolder.value.match(/img\[/)) {
//           var input = "img";
//           src = htmlTagHolder.value.match(/\[(.+)\]/)[1];
//         } else {
//           if (htmlTagHolder.value.match(":")) {
//             var i = htmlTagHolder.value.indexOf(":");
//             console.log(i);
//             var input = htmlTagHolder.value.split(/:/)[0];
//             textContent = htmlTagHolder.value.slice(i).replace(/:/, "");
//             console.log(textContent);
//           } else {
//             var input = htmlTagHolder.value.trim();
//           }
//         }
//         //var input=htmlTagHolder.value.trim();
//         (function perform(input) {
//           try {
//             var createElement = document.createElement(input);
//             if (src) {
//               createElement.setAttribute("src", src);
//             }
//             var removeElement = document.getElementById("demoEle");
//             viewPort.removeChild(removeElement);
//             createElement.id = "demoEle";
//             createElement.className = classToBeAppliedHolder.value;
//             createElement.innerHTML = textContent;
//             viewPort.appendChild(createElement);
//             var butt = document.getElementById("eleBut");
//             butt.innerHTML = "Working Element : " + input;
//             if (createElement.childElementCount) {
//               allChildElement = createElement.getElementsByTagName("*");
//               Array.prototype.forEach.call(allChildElement, function (element) {
//                 AliasCSS.classPrinter.main(element);
//               });
//             }
//           } catch (e) {
//             /*var newInput=prompt("Please Input Valid Tag: Valid Html or XML Tag are allowed");
// 					htmlTagHolder.value=newInput;
// 					perform(newInput);
// 					return true;*/
//           }
//         })(input);
//       }
//     }
//   }
// });
// var getClassList = "";
//event trigger for class input;
// classToBeAppliedHolder.addEventListener("keydown", function (e) {
//   var code = e.keyCode ? e.keyCode : e.which;
//   if (code == 8) {
//     getClassList = "";
//   }
//   if (code == 32 || code == 13 || code == 8) {
//     if (!classToBeAppliedHolder.value.trim()) {
//       return true;
//     }
//     var demoElement = document.getElementById("demoEle");
//     demoElement.setAttribute("class", classToBeAppliedHolder.value.trim());

//     //var customClass=classToBeAppliedHolder.value.trim();
//     //customClass=customClass.replace(getClassList,"");
//     ///getClassList=getClassList.trim()+" "+customClass;
//     //var classArray=customClass.split(" ");
//     //resultHolderObject={};
//     //processor(classArray);
//     //finalEnvoke();
//     AliasCSS.classPrinter.main(demoElement);
//   }
// });
// //event triger for reset
// var resetbutt = document.getElementById("classBut");
// resetbutt.addEventListener("click", function () {
//   getClassList = "";
//   classToBeAppliedHolder.value = "";
// });

//endof demo----------------------------------------------------------------------