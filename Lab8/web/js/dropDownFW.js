

function dropDownFW(params) {

    var dropHeaderStyle = params.dropHeaderStyle;
    var dropContentStyle = params.dropContentStyle;
    var showStyle = params.showStyle;
    var hideStyle = params.hideStyle;

    window.onclick = function (event) {

        var clickedEle = event.target;  // this is the DOM element (anywhere on page) that was clicked.
        // console.log("clickedEle on next line");
        // console.log(clickedEle);

        if (clickedEle.classList.contains(dropHeaderStyle)) {

            var nextEle = clickedEle.parentElement.getElementsByClassName(dropContentStyle)[0];
            // console.log("nextEle on next line");
            // console.log(nextEle);
            
            hideExcept(nextEle);

            if (nextEle.classList.contains(showStyle)) {
                hide(nextEle);
            } else {
                show(nextEle);
            }

        } else {
            
            hideExcept(null); // hide all drop contents when they click anywhere else on the page. 
        }

        // private function defined inside of another function
        function show(ele) {
            ele.classList.remove(hideStyle);
            ele.classList.add(showStyle);
        }

        // private function defined inside of another function
        function hideExcept(ele) {
            var dropContentList = document.getElementsByClassName(dropContentStyle);
            for (var dropContent of dropContentList) {
                if (dropContent !== ele) {
                    dropContent.classList.remove(showStyle);
                    dropContent.classList.add(hideStyle);
                }
            }
        }

    };  // window.onclick function 
}