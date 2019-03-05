/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.

	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Feat
	Effect:		This is the syntax for adding a new feat
	Sheet:		v13.00.00 (2018-??-??) [identical to v12.999 syntax, except v12.999 uses 'borrow' for the burrow speed]
*/

var iFileName = "Curse of Lycanthropy.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

// Define the source
SourceList["T:WP"] = {
	name : "Werewolf Prestige",
	abbreviation : "T:WP",
	group : "Homebrew",
	url : "https://www.tribality.com/2015/11/13/werewolf-prestige-class-for-dd-5e/",
	date : "2015/11/13"
};

FeatsList["curse of lycanthropy"] = { //Object name; note the use of only lower case! The spelling here is used to identify the feat with. Also note the absence of the word "var" and the use of brackets []

	name : "Curse of Lycanthropy", //Required

	source : ["T:WP", 1], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	description : "The curse of lycanthrophy provides me with supernatural strengths and weaknesses that come coupled with my condition.", //Required; the description as it will appear in the form field on the sheet

	// action : ["reaction", " (Enraged Transformation)"], //optional; adds the name of this feat to the reaction list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field

	dmgres : [["Bludgeoning", "Bludg. (in hybrid)"], ["Piercing", "Pierc. (in hybrid)"], ["Slashing", "Slash. (in hybrid)"]],

	vision : [["Darkvision", 60]], //optional; An array of arrays that each have a length of 2; This adds the first value of each array to the Senses field. The second value is the range in feet. If no range is needed, put a 0 there. You can also add a modifier like "+30" or "*2" to have the appropriate calculation done with the range of sense

    savetxt : { // Optional; this attribute defines entries to add to the field for "Saving Throw Advantages / Disadvantages"

		text : ["Vulnerability to Silver"]

    },

	// usages : 1, //optional; number of times it can be used. This can be only be one value, the feat doesn't support having an array for different things per level. It is recommended to use a numerical value, but you can use a string

	// recovery : "1 hour", //required if "usages" is defined; way of getting the limited feature recharged. Only if you define both the 'usages' and 'recovery' will the feature be added to the limited features

    eval : "UpdateCurseDesc(1);",
    removeeval : "UpdateCurseDesc(0);"
};

WeaponsList["bite attack"] = {
	regExpSearch : /(?=.*bite)(?=.*attack).*$/i,
	name : "Bite Attack",
	source : ["T:WP", 1],
	ability : 1,
	type : "Natural",
	damage : [1, 6, "piercing"],
	range : "Melee 5 ft",
	description : "Wolf or hybrid, one attack with Attack action.",
	abilitytodamage : true,
};

WeaponsList["claw attack"] = {
	regExpSearch : /^(?=.*claw)(?=.*attack).*$/i,
	name : "Claw Attack",
	source : ["T:WP", 1],
	ability : 1,
	type : "Natural",
	damage : [1, 6, "slashing"],
	range : "Melee 5 ft",
	description : "Hybrid only, one attack as free action with Bite Attack action.",
	abilitytodamage : true,
};

//a function to update the notes page with the Hybrid form
UpdateCurseDesc = function(status) {
	var NotesPrefix = isTemplVis("ASnotes", true);
	if (!NotesPrefix) {
		NotesPrefix = DoTemplate("ASnotes", "Add");
	} else {
		NotesPrefix = NotesPrefix[1];
	};

	var WPlevelNew = classes.known["werewolf prestige"] ? classes.known["werewolf prestige"].level : 0;

    if (WPlevelNew > 0 && status == 0) {
        app.alert({
            cTitle : "Warning: Invalid State",
            cMsg : "You have removed 'Curse of Lycanthropy'; a requirement for the Werewolf Prestige class, which you have " + WPlevelNew + " levels in.",
            nIcon : 3
        });
    }

	//a funtion to create the full text for the hybrid feature
	var makeHybridText = function() {
        var theText = desc([
            "Curse of Lycanthropy (Prereq. for Werewolf Prestige) Feat",
            "\u25C6 Strenth of the Moon (Curse of Lycanthropy, T:WP 1)",
            "   While in hybrid form I gain a minimum strength of 15.",
            "   While in wolf or hybrid form, I gain a +1 bonus to AC.",
            "\u25C6 Eye of the Wolf (Curse of Lycanthropy, T:WP 1)",
            "   While in humanoid, wolf, or hybrid form, I can see in dim light within",
            "   60 feet as if it were bright light, and in darkness as if it were",
            "   dim light. I can't discern color in darkness.",
            "\u25C6 Unarmed Attacks (Curse of Lycanthropy, T:WP 1)",
            "   I have the following unarmed attacks that are based on Strength:",
            "   \u25C7 Bite (Wolf or Hybrid Form). Melee attack: reach 5 ft, one creature.",
            "       Hit: 1d6 piercing damage.",
            "   \u25C7 Claws (Hybrid Form Only). Melee attack: reach 5 ft, one creature.",
            "       Hit: 1d6 slashing damage.",
            "   \u25C7 On successful bite attack, human targets must succeed on a",
            "       DC [8 + Constitution Mod + Proficiency Bonus] Consitution saving",
            "       throw or be cursed with Werewolf lycanthropy.",
            "\u25C6 Curse of the Moon (Curse of Lycanthropy, T:WP 1)",
            "   A humanoid made unconscious by my Bite attack instantly fails their",
            "   Constitution saving throw.",
            "\u25C6 Full Moon Transformation (Curse of Lycanthropy, T:WP 1)",
            "   I transform each of the three nights of the full moon into my hybrid form.",
            "   I remain in this form until sunrise or I am rendered unconscious. While",
            "   in this form, the DM can take control of my character at any time.",
            "   When I transform back into my normal form, I gain one level of exhaustion",
            "   and may experience memory loss of any events at DM's discretion.",
            "   \u25C7 While in hybrid form, I can't cast spells, speak, or take any",
            "       action that is limited by my physiology.",
            "   \u25C7 While in wolf form, I can't take actions that are not directly related to",
            "       stalking, hunting, fighting, tracking, feeding, or other wolf-like activities.",
            "   If 'Remove Curse' is cast at the beginning of the transformation, I may",
            "   make a DC15 Wisdom save to avoid the transformation for the night. If the",
            "   spell is cast using a 4th-level slot, the transformation is suppressed for",
            "   two nights.",
            "\u25C6 Enraged Transformation (Curse of Lycanthropy, T:WP 1)",
            "   When I fail a death save, take 25% max HP of damage in a single round, or",
            "   witness severe harm come to something/someone I care about, I must make",
            "   a Wisdom save or immediately transform into my hybrid form. The DC is",
            "   determined by the DM and depends on the severity of injury or insult.",
            "   Enrage lasts for 1 hour, after which I transform back to my normal form",
            "   and gain one level of exhaustion. I may choose to enrage and continue my",
            "   rampage for an additional hour at the DM's discretion.",
            "\u25C6 Lone Wolf (Homebrew - based on Curse of Lycanthropy: Friends, T:WP 1)",
            "   As a reaction to being attacked by me, a close friend or family member",
            "   may make a DC20 Wisdom (Animal Handling) check to convince me it is",
            "   friendly, and should not be the target of my aggression. On success, I",
            "   attempt to flee the area if there are no other targets for me to attack."
        ]);
		return theText;
	};

    if (status == 0) {
        RemoveWeapon('Bite Attack');
        RemoveWeapon('Claw Attack');
        RemoveAction('action', 'Hybrid Attack (Bite + Claw)', 'Curse of Lycanthropy')
        ReplaceString(NotesPrefix + "Notes.Left", "", false,  makeHybridText());
    }

	if (status == 1) {
        AddWeapon('Bite Attack');
        AddWeapon('Claw Attack');
        ActionInsert("action", 1);
        AddAction('action', 'Hybrid Attack (Bite + Claw)', 'Curse of Lycanthropy')
        AddString(NotesPrefix + "Notes.Left", makeHybridText(), false)

		app.alert({
			cTitle : "Curse of Lycanthropy Hybrid Form is on the Notes page",
			cMsg : "You can find the rules for the Hybrid Form on the first \"Notes\" page, (page no. " + (tDoc.getField(NotesPrefix + "Notes.Left").page + 1) + ").\n\nThe Hybrid Form you gain with the Curse of Lycanthropy has a lot of rules attached to it. Because of this, it is not possible to put them in the \"Class Features\".",
			nIcon : 3
		});
	};
};
