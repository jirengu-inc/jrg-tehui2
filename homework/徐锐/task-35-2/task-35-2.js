function Tab(node) {

    this.tLi = document.getElementsByClassName("tab-list")[0];
    this.tLiItem = this.tLi.getElementsByTagName("li");
    this.ctBox = document.getElementsByClassName("content-box")[0];
    this.ctBoxItem = this.ctBox.getElementsByTagName("p");

    this.changeBox();
}
Tab.prototype = {
    changeBox: function () {

        var self = this,
            i;

        for (i = 0; i < this.tLiItem.length; i++) {
            this.tLiItem[i].addEventListener( "click", function() {

                var children = this.parentNode.children,
                    j,
                    index;

                for (j = 0; j < children.length; j++) {
                    self.removeClass(children[j], "active");
                    self.removeClass(self.ctBoxItem[j], "active");

                    if (children[j] === this){
                        index = j;
                    }
                }
                self.addClass(this, "active");
                self.addClass(self.ctBoxItem[index], "active");
            });
        }
    },

    addClass: function (el,cls) {

        var str = el.className;

        if (str.search(cls) !== -1) {
            return false;
        } else {
            if (str === "") {
                el.className = str.concat(cls);
            } else {
                var tmp = el.className.split(" ");
                tmp.push(cls);
                el.className = tmp.join(" ");
            }
        }
    },

    removeClass: function (el,cls) {

        var str = el.className;

        if (str.search(cls) === -1) {
            return false;
        } else {
            var tmp = el.className.split(" ");
            var location = find(tmp, cls);
            tmp.splice(location, 1);
            el.className = tmp.join(" ");
        }
    }
};

var node = document.getElementsByClassName('ct')[0];
var t1 = new Tab(node);

