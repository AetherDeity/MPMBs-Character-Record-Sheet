/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This is the syntax for adding a new class to the sheet
				Note that you will need the syntax for adding a subclass as well if you want the class to have any choices for subclasses
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "Werewolf Presige.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

// Define the source
SourceList["T:WP"] = {
	name : "Werewolf Prestige",
	abbreviation : "T:WP",
	group : "Homebrew",
	url : "https://www.tribality.com/2015/11/13/werewolf-prestige-class-for-dd-5e/",
	date : "2015/11/13"
};

ClassList["werewolf prestige"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*werewolf)(?=.*prestige).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "my" and "class" in it, disregarding capitalization). If this looks too complicated, just write: /myclass/i

	name : "Werewolf Prestige", //required; the name to use for the class

	source : ["T:WP", 1], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	primaryAbility : "\n \u2022 Werewolf Prestige: Strength;", //required; the text to display when citing the primary ability of the class

	prereqs : "\n \u2022 Werewolf Prestige:\n   - Level 7;\n   - Curse of Lycanthropy", //required; the text to display when citing the prerequisite for the class when multiclassing

	die : 12, //required; the type of hit die the class has (i.e. 10 means d10)

	improvements : levels.map(function (n) {return 0}), //required; the amount of ability score improvements (or feats) at each level. Note that there are 20 entries, one for each level. This example uses the Fighter's progression

	saves : ["", ""], //required; the two save proficiencies.

	skills : ["", "\n\n" + toUni("Werewolf Prestige") + ": Choose one from Survival and Perception."], //required; the text to display for skill proficiencies. Note the \n\n at the start, they are important! The first entry is for when the class is the primary class, the second entry is for when the class is taken later as part of a multiclass

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : { // optional; this is an object with arrays with the tool proficiencies gained. Each entry in an array can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated
	},

	armor : [ //required; the 4 entries are for: ["light", "medium", "heavy", "shields"]
		[false, false, false, false] //required; the armor proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	weapons : [ //required; the 3 entries are for: ["simple", "martial", "other"]
		[false, false, []] //required; the weapon proficiencies if this class is multiclassed with (so not taken at level 1, but later)
	],

	equipment : "", //required; the text to display when citing the starting equipment

	subclasses : ["", []], //required; the names of the subclasses. The first entry is the overall name that is given to the subclasses, the second entry is a list of the subclass, using the exact names of the entry of the subclasses in the ClassSubList. //Note that if one of the entries in the array of subclasses doesn't exist in the ClassSubList, the sheet will throw an error as soon as you make a character with levels in this class
	//IMPORTANT: for any subclass you add using the AddSubClass() function, don't list them here! The AddSubClass() function makes its own entry in this array! If you have entries here that don't exist (because you didn't add any ClassSubList entry, or added it using the AddSubClass() function, then the sheet will throw strange errors)!

	prestigeClassPrereq : 6, //optional; if you include this attribute, the sheet will consider the class a prestige class // You can make this attribute a number, which represents the levels the character must have before being able to gain the prestige class. Alternatively, you can make this attribute a string, which can be evaluated with eval() and returns either true (prereqs met) or false (prereqs not met).

	attacks : levels.map(function (n) {return 1}), //required; the amount of attacks at each level. Note that there are 20 entries, one for each level.

	features : { //required;  the class features. Each works the same way, so only a couple of example are given. You can add as many as you want

		"lycanthropic channeling" : { //note the use of lower case characters
			name : "Lycanthropic Channeling", //required; the name of the class feature
			source : ["T:WP", 1], //required; the source of the class feature
			minlevel : 1, //required; the level at which the feature is gained
			description : desc([
                "I can use Moon Points to resist my curse and empower my lycanthropic abilities.",
            ]),
            usages : [5, 5, 10, 10, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
            recovery : "long rest",
            additional : "Moon Points",
            changeeval : "UpdateWerewolfPrestige();",
            // eval : "UpdateWerewolfPrestige();",
            // removeeval : "UpdateWerewolfPrestige();",
		},

        "lunar embrace" : {
            name : "Lunar Embrace",
            source : ["T:WP", 1],
            minlevel : 5,
            description : desc([
                "I am immune from Enraged Transformation.",
                "I add one to either my Strength or my Constitution.",
                "My base walking speed is increased by 5.",
                "The extra damage on my Bite and Claw attacks increases to 3d8."
            ]),
            speed : {
                walk : { spd : "+5", enc : 0}
            }
        },

        // "shapechanger" : {
        //     name : "Shapechanger",
        //     source : ['T:WP', 1],
        //     minlevel : 5,
        //     description : desc([
        //         "I can tranform into a wolf or hybrid as a bonus action for 1 hour.",
        //         "While in hybrid form, I can cast spells, speak, and take any action",
        //         "that requires hands but is not limited by my physiology.",
        //         "While in wolf form, I can perform non-wolf-like activities.",
        //         "My armor is not transformed and I do not take exhaustion when I revert."
        //     ]),
        //     action : ["bonus action", ""]
        // }

        // "improved unarmed attack" : {
        //     name : "Improved Unarmed Attack",
        //     source : ["T:WP", 1],
        //     minlevel : 4,
        //     description : desc([
        //         "My Bite and Claw attacks increase from 1d8 to 2d8 damage.",
        //     ]),
        //     calcChanges : {
        //         atkCalc : ["if ((/bite attack/i).test(WeaponName) || (/claw attack/i).test(WeaponName)) { fields.Damage_Die = '1d8'; };", "My unarmed lycanthopic attacks have increased damage."],
        //     }
        // }

        // "curse of lycanthropy" : {
        //     name : "Curse of Lycanthropy",
        //     source : ["T:WP", 1],
        //     minlevel : 1,
        //     description : desc([
        //         "At 1st level the curse of lycanthropy provides me with supernatural strengths and",
        //         "weaknesses that come coupled with my condition.",
        //         "I gain the following benefits:",
        //         "- Strenth of the Moon: While in hybrid form you gain a minimum strength of 15, and",
        //         "   +1 bonus to AC while in wolf or hybrid form (from natural armor). Attack and damage",
        //         "   rolls for the natural weapons are based on Strength.",
        //         "- Eye of the Wolf: While in humanoid, wolf, or hybrid form, I have superior vision in",
        //         "   dark and dim conditions. I can see in dim light within 60 feet of me as if it were",
        //         "   bright light, and in darkness as if it were dim light. I can’t discern color in",
        //         "   darkness, only shades of gray."
        //     ])
        // },

        // "enraged transformation" : {
        //     name : "Enraged Transformation",
        //     source : ["T:WP", 1],
        //     minlevel : 1,
        //     description : desc([
        //         "Beginning at 1st level, when I fail a death save or lose 12+ hit points in a",
        //         "single round, or witness harm come to somethine or someone I care about, I",
        //         "must make a Wisdom save or immediately transform into a Werewolf (hybrid).",
        //     ])
        // }

        // "transformation resistance" : {
        //     name : "Transformation Resistance",
        //     source : ["T:WP", 1],
        //     minlevel : 1,
        //     description : desc([
        //         "test",
        //         "classes.known[\"werewolf prestige\"].level"
        //     ])
        // },

        // "regeneration" : {
        //     name : "Regeneration",
        //     source : ["T:WP": 1],
        //     minlevel : 1,
        //     description : desc([
        //         "As a bonus action I can",
        //         "\u25C6 Spend 1 Moon Point to regain 1d4 (or 2d4 at lvl 3) + Con HP",
        //         "\u25C6 Spend 5 Moon Points to regain 1d4 (or 2d4 at lvl 3) + Con HP",
        //         "   each turn for 1 min",
        //         "I do not gain this benefit if I have 0 HP or have been hit by a silvered",
        //         "weapon since my last turn."
        //     ]),
        //     action : ["bonus action", "lycanthropy"],
        //     additional : ["1d4+Con", "1d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con", "2d4+Con"],
        // }
	},
};

WeaponsList["improved bite attack"] = {
	regExpSearch : /(?=.*improved)(?=.*bite)(?=.*attack).*$/i,
	name : "Improved Bite Attack",
	source : ["T:WP", 1],
	ability : 1,
	type : "Natural",
	damage : [1, 8, "piercing"],
	range : "Melee 5 ft",
	description : "Wolf or hybrid, one attack with Attack action.",
	abilitytodamage : true,
};

WeaponsList["improved claw attack"] = {
	regExpSearch : /^(?=.*improved)(?=.*claw)(?=.*attack).*$/i,
	name : "Improved Claw Attack",
	source : ["T:WP", 1],
	ability : 1,
	type : "Natural",
	damage : [1, 8, "slashing"],
	range : "Melee 5 ft",
	description : "Hybrid only, one attack as free action with Bite Attack action.",
	abilitytodamage : true,
};

//a function to update the notes page with the Hybrid form
UpdateWerewolfPrestige = function() {
	var NotesPrefix = isTemplVis("ASnotes", true);
	if (!NotesPrefix) {
		NotesPrefix = DoTemplate("ASnotes", "Add");
	} else {
		NotesPrefix = NotesPrefix[1];
	};

	var levelOld = classes.old["werewolf prestige"] ? classes.old["werewolf prestige"].classlevel : 0;
	var levelNew = classes.known["werewolf prestige"] ? classes.known["werewolf prestige"].level : 0;

    if (levelOld == 1 || levelOld == 2) RemoveAction('bonus action', 'Regeneration', 'Werewolf Prestige (Adept of the New Moon)');
    if (levelOld == 2 || levelOld == 3) RemoveAction('action', "Voluntary Transformation", "Werewolf Prestige (Adept of the Waxing Moon)");
    if (levelOld >= 3) {
        RemoveAction('bonus action', 'Greater Regeneration', 'Werewolf Prestige (Adept of the Waning Moon)');
        if (levelNew <= 2) {
            RemoveWeapon('Improved Bite Attack');
            RemoveWeapon('Improved Claw Attack');
            AddWeapon('Bite Attack');
            AddWeapon('Claw Attack');
        }
    }
    if (levelOld == 4) RemoveAction('action', "Voluntary Transformation", "Werewolf Prestige (Adept of the Full Moon)");


    if (levelNew == 1 || levelNew == 2) AddAction('bonus action', 'Regeneration', 'Werewolf Prestige (Adept of the New Moon)');
    if (levelNew == 2 || levelNew == 3) AddAction('action', "Voluntary Transformation", "Werewolf Prestige (Adept of the Waxing Moon)");
    if (levelNew >= 3) {
        AddAction('bonus action', 'Greater Regeneration', 'Werewolf Prestige (Adept of the Waning Moon)');
        if (levelOld <= 2) {
            RemoveWeapon('Bite Attack');
            RemoveWeapon('Claw Attack');
            AddWeapon('Improved Bite Attack');
            AddWeapon('Improved Claw Attack');
        }
    }
    if (levelNew == 4) AddAction('action', "Voluntary Transformation", "Werewolf Prestige (Adept of the Full Moon)");
    // if (levelNew == 5) AddAction('bonus action', "Shapechanger", "Werewolf Prestige (Lunar Embrace)")

	//a funtion to create the full text for the hybrid feature
	var makeHybridText = function(lvl) {
        switch (lvl) {
            case 1:
                return desc([
                    "Werewolf Prestige level 1",
                    "\u25C6 Unarmed Attack (Adept of the New Moon, T:WP 1)",
                    "   When I hit a creature with a Bite or Claw attack, I can spend 2 Moon",
                    "   Points to deal an extra 1d6 damage.",
                    "\u25C6 Regeneration (Adept of the New Moon, T:WP 1)",
                    "   As a bonus action I can",
                    "   \u25C7 Spend 1 Moon Point to regain 1d4 + Constitution Modifier HP",
                    "   \u25C7 Spend 5 Moon Points to regain 1d4 + Constitution Modifier HP",
                    "       each turn for 1 min",
                    "   I do not gain this benefit if I have 0 HP or have been hit by a silvered",
                    "   weapon since my last turn.",
                    "\u25C6 Transformation Resistance (Adept of the New Moon, T:WP 1)",
                    "   I can now resist Full Moon Transformation with a DC12 Wisdom saving",
                    "   throw. If I fail my saving throw, I may spend 5 Moon Points to prevent",
                    "   the transformation. Additionally, the damage threshold for an Enraged",
                    "   Transformation increases to 33% of my max HP.",
                    "\u25C6 Friends (Adept of the New Moon, T:WP 1)",
                    "   A well-known friend or associate may make a DC15 Wisdom (Animal",
                    "   Handling) check as a reaction to being attacked by me to convince me it",
                    "   is friendly, and should not be the target of my aggression. On success,",
                    "   I attempt to flee the area if there are no other targets for me to attack.",
                ]);
            case 2:
                return desc([
                    "Werewolf Prestige level 2",
                    "\u25C6 Unarmed Attack (Adept of the New Moon, T:WP 1)",
                    "   When I hit a creature with a Bite or Claw attack, I can spend 2 Moon",
                    "   Points to deal an extra 1d6 damage.",
                    "\u25C6 Regeneration (Adept of the New Moon, T:WP 1)",
                    "   As a bonus action I can",
                    "   \u25C7 Spend 1 Moon Point to regain 1d4 + Constitution Modifier HP",
                    "   \u25C7 Spend 5 Moon Points to regain 1d4 + Constitution Modifier HP",
                    "       each turn for 1 min",
                    "   I do not gain this benefit if I have 0 HP or have been hit by a silvered",
                    "   weapon since my last turn.",
                    "\u25C6 Voluntary Transformation (Adept of the Waxing Moon, T:WP 1)",
                    "   I can attempt to transform as an action by spending 5 Moon Points or by",
                    "   making a DC15 Wisdom check, on failure I become Enraged. A successful",
                    "   transformation lasts one hour. Additionally, the damage threshold for",
                    "   an Enraged Transformation increases to 50% of my max HP.",
                    "\u25C6 Good Friends (Adept of the Waxing Moon, T:WP 1)",
                    "   My beast form gains some level of awareness, making me less likely to",
                    "   attack known friends and associates, unless they directly threaten me.",
                    "   They may make a DC10 Wisdom (Animal Handling) check as a reaction to",
                    "   being attacked by me, which will stop further attacks from me.",
                    "\u25C6 Keen Senses (Adept of the Waxing Moon, T:WP 1)",
                    "   I have advantage on Wisdom (Perception) checks that involve hearing or",
                    "   smell.",
                ]);
            case 3:
                return desc([
                    "Werewolf Prestige level 3",
                    "\u25C6 Improved Unarmed Attack (Adept of the Waning Moon, T:WP 1)",
                    "   The (extra) damage of my unarmed attacks increases from 1d6 to 1d8.",
                    "   \u25C7 Bite (Wolf or Hybrid Form). Melee attack: reach 5 ft, one creature.",
                    "       Hit: 1d8 piercing damage.",
                    "   \u25C7 Claws (Hybrid Form Only). Melee attack: reach 5 ft, one creature.",
                    "       Hit: 1d8 slashing damage.",
                    "   \u25C7 On successful bite attack, human targets must succeed on a",
                    "       DC [8 + Constitution Mod + Proficiency Bonus] Consitution saving",
                    "       throw or be cursed with Werewolf lycanthropy.",
                    "   \u25C7 When I hit a creature with a Bite or Claw attack, I can spend",
                    "       2 Moon Points to deal an extra 1d8 damage.",
                    "\u25C6 Greater Regeneration (Adept of the Waning Moon, T:WP 1)",
                    "   As a bonus action I can",
                    "   \u25C7 Spend 1 Moon Point to regain 2d4 + Constitution Modifier HP",
                    "   \u25C7 Spend 5 Moon Points to regain 2d4 + Constitution Modifier HP",
                    "       each turn for 1 min",
                    "   I do not gain this benefit if I have 0 HP or have been hit by a silvered",
                    "   weapon since my last turn.",
                    "\u25C6 Greater Transformation Control (Adept of the Waning Moon, T:WP 1)",
                    "   I have advantage on rolls to resist any transformation and can spend 4",
                    "   Moon Points to resist transformation on failed save. I can resist Full Moon",
                    "   Transformation on a successful DC10 Wisdom save. The damage threshold",
                    "   for Enraged Transformation increases to 67% of my max HP.",
                    "\u25C6 Voluntary Transformation (Adept of the Waxing Moon, T:WP 1)",
                    "   I can attempt to transform as an action by spending 5 Moon Points or by",
                    "   making a DC15 Wisdom check, on failure I become Enraged. A successful",
                    "   transformation lasts one hour, after which I gain one level of exhaustion.",
                    "\u25C6 Best Friends (Adept of the Waning Moon, T:WP 1)",
                    "   I will not attack known friends or associates while transformed, even if",
                    "   enraged.",
                    "\u25C6 Keen Senses (Adept of the Waxing Moon, T:WP 1)",
                    "   I have advantage on Wisdom (Perception) checks that involve hearing or",
                    "   smell.",
                ]);
            case 4:
                return desc([
                    "Werewolf Prestige level 4",
                    "\u25C6 Superior Unarmed Attack (Adept of the Full Moon, T:WP 1)",
                    "   The extra damage of my unarmed attacks increases from 1d8 to 2d8.",
                    "   \u25C7 Bite (Wolf or Hybrid Form). Melee attack: reach 5 ft, one creature.",
                    "       Hit: 1d8 piercing damage.",
                    "   \u25C7 Claws (Hybrid Form Only). Melee attack: reach 5 ft, one creature.",
                    "       Hit: 1d8 slashing damage.",
                    "   \u25C7 On successful bite attack, human targets must succeed on a",
                    "       DC [8 + Constitution Mod + Proficiency Bonus] Consitution saving",
                    "       throw or be cursed with Werewolf lycanthropy.",
                    "   \u25C7 When I hit a creature with a Bite or Claw attack, I can spend",
                    "       2 Moon Points to deal an extra 2d8 damage.",
                    "\u25C6 Greater Regeneration (Adept of the Waning Moon, T:WP 1)",
                    "   As a bonus action I can",
                    "   \u25C7 Spend 1 Moon Point to regain 2d4 + Constitution Modifier HP",
                    "   \u25C7 Spend 5 Moon Points to regain 2d4 + Constitution Modifier HP",
                    "       each turn for 1 min",
                    "   I do not gain this benefit if I have 0 HP or have been hit by a silvered",
                    "   weapon since my last turn.",
                    "\u25C6 Superior Transformation Control (Adept of the Full Moon, T:WP 1)",
                    "   I have advantage on rolls to resist any transformation and can spend 3",
                    "   Moon Points to resist transformation on failed save. I can resist Full Moon",
                    "   Transformation on a successful DC8 Wisdom save. The damage threshold",
                    "   for Enraged Transformation increases to 75% of my max HP.",
                    "\u25C6 Voluntary Transformation (Adept of the Full Moon, T:WP 1)",
                    "   I can attempt to transform as an action by spending 1 Moon Points or by",
                    "   making a DC10 Wisdom check, on failure I become Enraged. A successful",
                    "   transformation lasts one hour, but can be extended with another Moon Point.",
                    "   At the end of my transformation, I gain one level of exhaustion.",
                    "   While transformed I have more control:",
                    "   \u25C7 I may make use of class features if my form is physically capable",
                    "   \u25C7 Performing non-wolf-like activities may require a DC15 Wisdom save.",
                    "       On failed save I lose control, acting as if enraged.",
                    "\u25C6 Best Friends (Adept of the Waning Moon, T:WP 1)",
                    "   I will not attack known friends or associates while transformed, even if",
                    "   enraged.",
                    "\u25C6 Super Senses (Adept of the Full Moon, T:WP 1)",
                    "   I have proficiency and advantage on Wisdom (Perception) checks that",
                    "   involve hearing or smell. If I already have proficiency in Perception, I",
                    "   have expertise for checks that involve hearing or smell.",
                ]);
            case 5:
                return desc([
                    "Werewolf Prestige level 5",
                    "\u25C6 Superior Unarmed Attack (Adept of the Full Moon, T:WP 1)",
                    "   The bonus damage of my unarmed attacks increases from 1d8 to 2d8.",
                    "   \u25C7 Bite (Wolf or Hybrid Form). Melee attack: reach 5 ft, one creature.",
                    "       Hit: 1d8 piercing damage.",
                    "   \u25C7 Claws (Hybrid Form Only). Melee attack: reach 5 ft, one creature.",
                    "       Hit: 1d8 slashing damage.",
                    "   \u25C7 On successful bite attack, human targets must succeed on a",
                    "       DC [8 + Constitution Mod + Proficiency Bonus] Consitution saving",
                    "       throw or be cursed with Werewolf lycanthropy.",
                    "   \u25C7 When I hit a creature with a Bite or Claw attack, I can spend",
                    "       2 Moon Points to deal an extra 3d8 damage.",
                    "\u25C6 Greater Regeneration (Adept of the Waning Moon, T:WP 1)",
                    "   As a bonus action I can",
                    "   \u25C7 Spend 1 Moon Point to regain 2d4 + Constitution Modifier HP",
                    "   \u25C7 Spend 5 Moon Points to regain 2d4 + Constitution Modifier HP",
                    "       each turn for 1 min",
                    "   I do not gain this benefit if I have 0 HP or have been hit by a silvered",
                    "   weapon since my last turn.",
                    "\u25C6 Superior Transformation Control (Adept of the Full Moon, T:WP 1)",
                    "   I have advantage on rolls to resist any transformation and can spend 3 Moon",
                    "   Points to resist transformation on failed save. I can resist Full Moon",
                    "   Transformation on a successful DC8 Wisdom save.",
                    "\u25C6 Shapechanger (Lunar Embrace, T:WP 1)",
                    "   I can tranform into a wolf or hybrid as a bonus action for 1 hour.",
                    "   While in hybrid form, I can cast spells, speak, and take any action that",
                    "   requires hands but is not limited by my physiology.",
                    "   While in wolf form, I can perform non-wolf-like activities.",
                    "   My armor is not transformed and transforming does not cause exhaustion.",
                    "\u25C6 Best Friends (Adept of the Waning Moon, T:WP 1)",
                    "   I will not attack known friends or associates while transformed, even if",
                    "   enraged.",
                    "\u25C6 Super Senses (Adept of the Full Moon, T:WP 1)",
                    "   I have proficiency and advantage on Wisdom (Perception) checks that",
                    "   involve hearing or smell. If I already have proficiency in Perception, I",
                    "   have expertise for checks that involve hearing or smell.",
                ]);
            default:
                return "";
        }
	};

	//update the hybrid feature on the notes page
	var stringOld = makeHybridText(levelOld);
	var stringNew = makeHybridText(levelNew);
	ReplaceString(NotesPrefix + "Notes.Right", stringNew, false, stringOld);

	//give an alert about what is going on
	if (levelOld == 0 && levelNew > 0) {
		app.alert({
            cTitle : "Curse of Lycanthropy Hybrid Form is on the Notes page",
			cMsg : "You can find the rules for the Werewolf Prestige class on the first \"Notes\" page, (page no. " + (tDoc.getField(NotesPrefix + "Notes.Right").page + 1) + ").\n\nThe Werewolf Prestige class has a lot of rules attached to it. Because of this, it is not possible to put them in the \"Class Features\".",
			nIcon : 3
		});
	};
};
