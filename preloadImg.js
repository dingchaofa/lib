// JavaScript Document
/**
 * 图片预加载
 * @version	0.8
 * @Date    2016-03-11
 * @author	sket
 * @see		http://www.jdou.org/
 * @param	{Array}	    要预加载的图片数组
 * @param	{Function}	加载过程
 * @param	{Function}	加载完毕

 * @example
 var loader=new ImagesLoader();
 loader.loadImages([
 '38.png',
 'again.png',
 'bg.jpg'
 ],'http://www.h5-share.com/wxactivities/forgirls/images/');
 loader.complete(function(){
             console.log('completed');
         });
 loader.process(function(){
             console.log('process'+this.processNum);
         });
 loader.start();
 */
(function(b) {
  function a() {
    this.urlList = null;
    this.urlListOriginalLength = null;
    this.completeFunction = null;
    this.processNum = 0;
    this.processFunction = null;
    this.urlHeader = ""
  }
  a.prototype.loadImages = function(c, d) {
    var e = this;
    this.urlList = c;
    this.urlListOriginalLength = c.length;
    this.urlHeader = d || ""
  }
  ;
  a.prototype.complete = function(c) {
    var d = this;
    this.completeFunction = c || null
  }
  ;
  a.prototype.process = function(c) {
    var d = this;
    this.processFunction = c || null
  }
  ;
  a.prototype.start = function() {
    this.calprocessNum();
    this.loadOneImage()
  }
  ;
  a.prototype.loadOneImage = function() {
    var e = this;
    if (e.urlList == null) {
      return
    }
    var d = e.urlList.shift();
    if (typeof d == "undefined") {
      if (e.completeFunction != null) {
        setTimeout(function() {
          e.completeFunction()
        }, 800)
      }
      return
    }
    var c = new Image();
    c.src = e.urlHeader + d;
    c.style.cssText = "visibility: hidden; width: 1px; height: 1px; position: absolute;";
    document.body.appendChild(c);
    if (c.complete) {
      e.calprocessNum();
      return e.loadOneImage()
    } else {
      c.onload = function() {
        e.calprocessNum();
        c.onload = null;
        return e.loadOneImage()
      }
      ;
      c.onerror = function() {
        c.onerror = null;
        return e.loadOneImage()
      }
    }
  }
  ;
  a.prototype.calprocessNum = function() {
    var d = this;
    var c = (d.urlListOriginalLength - d.urlList.length) / d.urlListOriginalLength;
    d.processNum = Math.floor(c * 100) >= 100 ? 100 : Math.floor(c * 100);
    if (d.processFunction != null) {
      d.processFunction.call(d)
    }
  }
  ;
  b.ImagesLoader = a
}
  )(window);