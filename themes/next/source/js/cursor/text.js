var a_idx = 0;
jQuery(document).ready(function($) {
  $("body").click(function(e) {
    var a = new Array("蒸羊羔","蒸熊掌","蒸鹿尾儿","烧花鸭","烧雏鸡","烧子鹅","卤猪","卤鸭","酱鸡","腊肉"
    ,"松花","小肚儿","晾肉","香肠儿","什锦苏盘","熏鸡白肚儿","清蒸八宝猪","江米酿鸭子","罐儿野鸡",
    "罐儿鹌鹑","卤什锦","卤子鹅","山鸡","兔脯","菜蟒","银鱼","清蒸哈什蚂","烩鸭丝");
    var $i = $("<span/>").text(a[a_idx]);
    var x = e.pageX,
    y = e.pageY;
    $i.css({
      "z-index": 99999,
      "top": y - 28,
      "left": x - a[a_idx].length * 8,
      "position": "absolute",
      "color": "#ff7a45"
    });
    $("body").append($i);
    $i.animate({
      "top": y - 180,
      "opacity": 0
    }, 1500, function() {
      $i.remove();
    });
    a_idx = (a_idx + 1) % a.length;
  });
});

