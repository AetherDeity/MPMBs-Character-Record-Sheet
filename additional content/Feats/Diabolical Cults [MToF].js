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

var iFileName = "Diabolical Cults [MToF].js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

FeatsList["ferocious surge"] = { //Object name; note the use of only lower case! The spelling here is used to identify the feat with. Also note the absence of the word "var" and the use of brackets []

	name : "Ferocious Surge", //Required

	source : ["MToF", 21], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	description : "When I hit with an attack that isn't a critical hit, I can turn the hit into a critical hit.", //Required; the description as it will appear in the form field on the sheet

	prerequisite : "Cult of Zariel", //Optional; adds a prerequisite to the feat (this line can be removed if not applicable)

	action : ["bonus action", ""], //optional; adds the name of this feat to the reaction list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field

	usages : 1, //optional; number of times it can be used. This can be only be one value, the feat doesn't support having an array for different things per level. It is recommended to use a numerical value, but you can use a string

	recovery : "short rest", //required if "usages" is defined; way of getting the limited feature recharged. Only if you define both the 'usages' and 'recovery' will the feature be added to the limited features

};
