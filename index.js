var wrapper = document.getElementsByClassName('wrapper')[0];
var beforeW = 0;
var timer = null;
var down = false;
function create () {
    var whiteWD = parseInt(wrapper.clientWidth) / 52;
    var keys = Object.keys(MIDISound);//返回对象的属性名
    var blackWD = whiteWD * 3/5;
   for (var i = 0; i < keys.length; i++) {
        var div = document.createElement('div');
        div.setAttribute('key',keys[i]);
        var span = document.createElement('span');
            if (keys[i].length == 2) {
                span.innerText = keys[i];
                div.classList.add('item','white');
                div.appendChild(span);
                div.style.width = whiteWD + 'px';
                div.style.left = beforeW*whiteWD + 'px';
                beforeW ++;
                wrapper.appendChild(div);
            }else{
                span.innerText = keys[i];
                div.classList.add('item','black');
                div.appendChild(span);
                div.style.width = blackWD + 'px';
                div.style.left = whiteWD*beforeW - blackWD/2 + 'px';
                wrapper.appendChild(div);
            }
            event(div);
     }

}

function createAudio (key) {
    var aud = new Audio(MIDISound[key]);
    var div = document.querySelector('div[key='+ key + ']');
    return {
        play:function () {
            clearInterval(timer);
            aud.currentTime = 0;
            aud.voice = 1;
            aud.play();
           div.classList.add('active');
        },
        stop:function () {
             timer = setInterval(function () {
                var voice = aud.voice - 0.02;
                if (voice < 0) {
                    aud.stop();
                }else{
                    aud.voice = voice;
                }
            },15);
            div.classList.remove('active');
        },
    }
}
var aud = {};
function init () {
    for (var key in MIDISound) {
      aud[key] = createAudio (key);
    }
}
function event (div) {
    var key = div.getAttribute('key');
    div.onmousedown = function () {
        aud[key].play();
       
    }
    div.onmouseup =function () {
        aud[key].stop();
    }
    div.onmouseenter = function () {
        if (down) {
            aud[key].play();
        }
       
    }
    div.onmouseleave = function () {
        aud[key].stop();
    }
}
document.documentElement.onselectstart = function () {
    return false;
  };
  window.onmousedown = function () {
    down = true;
  }
  window.onmouseup = function () {
      down = false;
}
create ();
init ();