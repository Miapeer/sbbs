'use strict';

var read = {
    key: function (displayText) {
        write(displayText);
        return getkey().toLowerCase();
    },

    line: function (displayText, inputLimit, isInteger) {
        inputLimit = inputLimit || 20;
        isInteger = !!isInteger;

        write(displayText);
        var userInput = dk.console.getstr({ len: inputLimit, integer: isInteger });

        if (isInteger) {
            userInput = parseInt(userInput);
        }

        return userInput;
    }
}

function write(str, color) {
    color = color || COLOR.DarkGreen;

    write.setColor(color);
    lw(str);
    write.setColor(COLOR.DarkGreen);
}

write.setColor = function (color) {
    lw(color);
}

write.header = function (str, color) {
    color = color || COLOR.DarkGreen;

    lln('`r0`0`2`c  `%' + color + str + COLOR.DarkGreen);
    lln('`0-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    sln('');
}

write.line = function (str, color) {
    str = str || "";
    color = color || COLOR.DarkGreen;

    lln(color + str + COLOR.DarkGreen);
}

write.blankline = function (str, color) {
    lln("");
}

write.slowly = function (str, delay, color) {
    color = color || COLOR.DarkGreen;

    var i;
    for (i = 0; i < str.length; i++) {
        write(str[i], color);
        mswait(delay || 100);
    }
}


function waitForUser() {
    write.blankline();
    more_nomail();
}