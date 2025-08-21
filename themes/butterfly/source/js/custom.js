function scrollToTop() {
    btf.scrollToDest(0, 500);
}


// 修改搜索图标
document.getElementsByClassName("fas fa-search fa-fw")[0].className = "iconfont icon-search"  
// 修改展开图标
document.getElementsByClassName("fas fa-chevron-down").className = "iconfont icon-zhankai"
// 修改返回顶部图标
document.querySelectorAll(".fa-chevron-up")[0].className = "iconfont icon-34rocket"

// 修改所有对象：创建时间，分类与标签，更新时间，字数统计，阅读时常，访问数等图标
var PostCreate = document.querySelectorAll(".fa-calendar-alt");
var Category_Tag = document.querySelectorAll(".fa-inbox");
var Updatatime = document.getElementsByClassName("fas fa-history fa-fw post-meta-icon");
var Fontnumber = document.getElementsByClassName("far fa-file-word fa-fw post-meta-icon");
var Readtime = document.getElementsByClassName("far fa-clock fa-fw post-meta-icon");
var Viewnumber = document.getElementsByClassName("far fa-eye fa-fw post-meta-icon");
var Indexcomment = document.querySelectorAll(".fa-comments");
var Menulist = document.querySelectorAll(".fa-bars");
var Setting = document.querySelector("fas fa-cog fa-spin");
GetAllObject(PostCreate, 'iconfont icon-xigua')
GetAllObject(Category_Tag, 'iconfont icon-bingqilin')
GetAllObject(Updatatime, 'iconfont icon-shijian')
GetAllObject(Fontnumber, 'iconfont icon-guanjianzishu')
GetAllObject(Readtime, 'iconfont icon-gengxinshijian')
GetAllObject(Viewnumber, 'iconfont icon-liulanliang1')
GetAllObject(Indexcomment, 'iconfont icon-tubiaozhizuomoban-')
GetAllObject(Menulist, 'iconfont icon-menu1')
GetAllObject(Setting, 'iconfont icon-settings')
// GetAllObject(Indexcomment, 'iconfont icon-tubiaozhizuomoban-')
// GetAllObject(Indexcomment, 'iconfont icon-tubiaozhizuomoban-')
// GetAllObject(Indexcomment, 'iconfont icon-tubiaozhizuomoban-')
// GetAllObject(Indexcomment, 'iconfont icon-tubiaozhizuomoban-')

function GetAllObject(elements, afterions)
{
    for (var i = 0; i < elements.length; i++) {
        // 修改类名
        elements[i].className = afterions;
    }
}


