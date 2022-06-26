function toggle(...values) {
    if (values.length == 0) return undefined;

    let i = 0;

    return function () {
        console.log(values[i]);
        i++;
        if (i == values.length) i = 0;
    }
}

var no_args = toggle();
var hello = toggle("hello");
var onOff = toggle("on","off");
var speed = toggle("slow","medium","fast");

hello();      // "hello"
hello();      // "hello"

onOff();      // "on"
onOff();      // "off"
onOff();      // "on"

speed();      // "slow"
speed();      // "medium"
speed();      // "fast"
speed();      // "slow"

