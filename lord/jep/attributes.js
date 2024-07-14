'use strict';

const Attribute = {
    ATTRIBUTE: {
        sex: {
            key: 'sex',
            text: 'Gender',
            choices: ['F', 'M'],
            validate: function (value, defaultValue) {
                defaultValue = defaultValue.toUpperCase();
                defaultValue = this.choices.indexOf(defaultValue) >= 0 ? defaultValue : this.choices[0];
                
                value = value.toUpperCase();
                
                return this.choices.indexOf(value) >= 0 ? value : defaultValue;
            },
        },
        forestFights: {
            key: 'forest_fights',
            text: 'Forest Fights',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        maxHitPoints: {
            key: 'hp_max',
            text: 'Maximum HP',
            minValue: 1,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        hitPoints: {
            key: 'hp',
            text: 'HP',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        level: {
            key: 'level',
            text: 'Level',
            minValue: 1,
            maxValue: 12,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        experience: {
            key: 'exp',
            text: 'Experience',
            minValue: 0,
            maxValue: 2000000000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        weaponName: {
            key: 'weapon',
            text: 'Weapon Name',
            validate: function (value, defaultValue) { return value || defaultValue; },
        },
        strength: {
            key: 'str',
            text: 'Strength',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        armorName: {
            key: 'arm',
            text: 'Armor Name',
            validate: function (value, defaultValue) { return value || defaultValue; },
        },
        defense: {
            key: 'def',
            text: 'Defense',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        goldInHand: {
            key: 'gold',
            text: 'Gold In-Hand',
            minValue: 0,
            maxValue: 2000000000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        goldInBank: {
            key: 'bank',
            text: 'Gold In Bank',
            minValue: 0,
            maxValue: 2000000000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        charm: {
            key: 'cha',
            text: 'Charm',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        laidCount: {
            key: 'laid',
            text: 'Times Laid',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        gems: {
            key: 'gem',
            text: 'Gems',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        children: {
            key: 'kids',
            text: 'Children',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        playerFights: {
            key: 'pvp_fights',
            text: 'Player Fights',
            minValue: 0,
            maxValue: 32000,
            validate: function (value, defaultValue) {
                defaultValue = parseInt(defaultValue || this.maxValue);
                defaultValue = Math.min(Math.max(defaultValue, this.minValue), this.maxValue);

                value = parseInt(value);

                return value >= this.minValue && value <= this.maxValue ? value : defaultValue;
            },
        },
        hasHorse: {
            key: 'horse',
            text: 'Has Horse',
            validate: function (choice) {
                choice = !!choice;
                return choice
            },
        },
        hasFairy: {
            key: 'has_fairy',
            text: 'Has Fairy',
            validate: function (choice) {
                choice = !!choice;
                return choice
            },
        },
        hasAmulet: {
            key: 'amulet',
            text: 'Has Amulet',
            validate: function (choice) {
                choice = !!choice;
                return choice
            },
        },
        isDead: {
            key: 'dead',
            text: 'Is Dead',
            validate: function (choice) {
                choice = !!choice;
                return choice
            },
        },
    },

    modifyPlayer: function (selectedPlayer, attribute, value) {
        var newValue = attribute.validate(value, selectedPlayer[attribute.key]);

        if (newValue === selectedPlayer[attribute.key]) {
            // Value didn't change, do nothing
        }
        else {
            selectedPlayer[attribute.key] = newValue;
        }
    },
}