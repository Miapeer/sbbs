'use strict';

// Death's Door - by Jep

require("../jep/colors.js", 'COLOR');
require("../jep/attributes.js", 'Attribute');
require("../jep/screen.js", 'read');
require("../jep/screen.js", 'write');
require("../jep/screen.js", 'waitForUser');
require('../recorddefs.js', 'Player_Def');

// globals
var playerFile;
var dataFile;
var data;
// end globals

var deathsDoorSchema = [
    {
        prop: 'day',
        type: 'SignedInteger',
        def: -1
    },
    {
        prop: 'tries',
        type: 'Array:150:Integer',
        def: eval('var aret = []; while(aret.length < 150) aret.push(0); aret;')
    }
];

function run_maintenance(data) {
    var i;
    for (var i = 0; i < data.tries.length; i++) {
        data.tries[i] = 0;
    }
    data.day = state.days;
    data.put();
}

function gamedir(fname) {
    // Not sure how this works. Taken from lord.js

    var gpre;

    if (settings.game_prefix.length > 0) {
        if (settings.game_prefix[0] === '/' || settings.game_prefix[0] === '\\'
            || (settings.game_prefix[1] === ':' && (settings.game_prefix[2] === '\\' || settings.game_prefix[2] === '/'))) {
            gpre = settings.game_prefix;
        }
        else {
            gpre = js.exec_dir + settings.game_prefix;
        }
    }
    else {
        gpre = js.exec_dir;
    }
    if (file_isdir(gpre)) {
        gpre = backslash(gpre);
    }
    return (gpre + fname);
}

function good_bye() {
    write.slowly("With a snap of her fingers, you are removed from the plane of ", 25);
    write.slowly("Mephistopheles", 25, COLOR.DarkRed);
    write.line();
    waitForUser();
    exit(0);
}

var regularUser = {
    tryToEnter: function () {
        data.tries[player.Record] += 1;

        if (data.tries[player.Record] === 1) {
            write.line("You hear an ominous voice. It warns,");
            write.line("You do not belong here!", COLOR.DarkRed);
        }
        else if (data.tries[player.Record] === 2) {
            write("Seriously, if you do not pay proper respect, you will draw the attention of ");
            write.line("Mephistopheles", COLOR.DarkRed);
        }
        else if (data.tries[player.Record] === 3) {
            write("You have awakened ");
            write.line("Mephistopheles", COLOR.DarkRed);
            write.blankline();
            write.line('"This is my last warning! Now, here is a taste of my power!"', COLOR.DarkRed)
            write.blankline();
            write("You lose ");
            write("1", COLOR.White);
            write.line(" experience point");

            Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.experience, player[Attribute.ATTRIBUTE.experience.key] - 1);
        }
        else if (data.tries[player.Record] > 3) {
            var stats = [
                Attribute.ATTRIBUTE.charm,
                Attribute.ATTRIBUTE.children,
                Attribute.ATTRIBUTE.experience,
                Attribute.ATTRIBUTE.forestFights,
                Attribute.ATTRIBUTE.gems,
                Attribute.ATTRIBUTE.hitPoints,
            ]

            var attribute = stats[random(stats.length)];

            write("You have angered ");
            write.line("Mephistopheles", COLOR.DarkRed);
            write.blankline();
            write("You lose ");
            write("10%", COLOR.DarkRed);
            write(" of your ");
            write.line(attribute.text);

            Attribute.modifyPlayer(player, attribute, player[attribute.key] * 0.9);
        }

        data.put();
    }
}

var mephisto = {
    reset: function () {
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.sex, "F");
        player.clss = 1;
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.forestFights, 9999);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.maxHitPoints, Attribute.ATTRIBUTE.maxHitPoints.maxValue);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.hitPoints, player[Attribute.ATTRIBUTE.maxHitPoints.key]);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.level, 3);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.experience, 666);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.weaponName, "Scythe");
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.strength, Attribute.ATTRIBUTE.strength.maxValue);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.armorName, "Cloak");
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.defense, Attribute.ATTRIBUTE.defense.maxValue);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.goldInHand, 0);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.goldInBank, 0);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.playerFights, 0);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.charm, 666);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.gems, 13);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.hasHorse, true);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.hasFairy, true);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.hasAmulet, true);
        Attribute.modifyPlayer(player, Attribute.ATTRIBUTE.isDead, false);

        data.put();
    },

    selectPlayer: function () {
        var players = [];
        var p;

        var i;
        for (i = 0; i < playerFile.length; i += 1) {
            p = playerFile.get(i);
            players.push(p);

            write((i + 1) + ": ");
            write.line(p.name);
        }

        write.blankline();
        var selectedValue = read.line("Which soul would you like to claim? (0 to exit): ", 2, true);

        if (selectedValue === 0) {
            return null;
        }

        return players[selectedValue - 1];
    },

    modifyPlayer: function (selectedPlayer) {
        var done = false;
        while (!done) {
            write.header(selectedPlayer.name);

            for (var i = 0; i < Object.keys(Attribute.ATTRIBUTE).length; i++) {
                var key = Object.keys(Attribute.ATTRIBUTE)[i];
                write.line((i + 1) + ") " + Attribute.ATTRIBUTE[key].text + ": " + selectedPlayer[Attribute.ATTRIBUTE[key].key]);
            };

            write.blankline();
            var choice = read.line("Which attribute would serve your means? (0 to exit): ", 2, true);

            var chosenAttribute = null;
            if (choice > 0 && choice <= Object.keys(Attribute.ATTRIBUTE).length) {
                chosenAttribute = Attribute.ATTRIBUTE[Object.keys(Attribute.ATTRIBUTE)[choice - 1]];
            }

            if (chosenAttribute) {
                write.blankline();
                var newValue = read.line("What do you have in mind for " + selectedPlayer.name + "'s " + chosenAttribute.text + "?: ");
                mephisto.modifyPlayerAttribute(selectedPlayer, chosenAttribute, newValue);
            }
            else {
                done = true;
            }
        }
    },
    
    modifyPlayerAttribute: function (selectedPlayer, attribute, value) {
        var newValue = attribute.validate(value, selectedPlayer[attribute.key]);

        if (newValue === selectedPlayer[attribute.key]) {
            write("Leaving " + selectedPlayer.name + "'s " + attribute.text);
            write.line(" unaltered", COLOR.White);
        }
        else {
            Attribute.modifyPlayer(selectedPlayer, attribute, newValue);
            write.line(selectedPlayer.name + "'s " + attribute.text + " has been changed to " + newValue);
            selectedPlayer.put();
        }

        waitForUser();
    }
};

function main() {
    foreground(2);
    background(0);

    write.header("`4 Death's Door");

    dataFile = new RecordFile(js.exec_dir + 'death_dr.dat', deathsDoorSchema);
    js.on_exit('dataFile.locks.forEach(function(x) {dataFile.unLock(x); dataFile.file.close()});');

    if (dataFile.length < 1) {
        data = dataFile.new();
    }
    else {
        data = dataFile.get(0);
    }

    if (data.day != state.days) {
        run_maintenance(data);
    }

    if (user.is_sysop) {
        write.line('Mephistopheles enters the realm!');
        mephisto.reset(data);
        waitForUser();
    }
    else {
        regularUser.tryToEnter(data);
        good_bye();
    }

    playerFile = new RecordFile(gamedir('..\\player.bin'), Player_Def);

    var done = false;
    while (!done) {
        write.header("Death's Door", COLOR.DarkRed);

        var selectedPlayer;
        selectedPlayer = mephisto.selectPlayer();

        write.blankline();
        if (selectedPlayer) {
            mephisto.modifyPlayer(selectedPlayer);
        }
        else {
            write.line('  You leave the Realm in peace...for now.')
            waitForUser();
            done = true;
            good_bye();
        }
    }
}

if (argc == 1 && argv[0] == 'INSTALL') {
    var install = {
        desc: "`4Death's Door`2",
    }
    exit(0);
}
else {
    main();
    exit(0);
}

