/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	All
	Effect:		This script replaces features that use short rest recovery.
	Code by:	RandoGuy
	Date:		2022-07-25 (sheet v13.1.0)
*/

var iFileName = "NoLongRest [by RandoGuy].js";
RequiredSheetVersion(13);

SourceList["HB"] = {
	name : "Homebrew",
	abbreviation : "HB",
	group : "Core Sources",
	date : "2022/07/25"
};

//--------------------------
//--------------------------
//-----Feats----------------
//--------------------------
//--------------------------

FeatsList["fade away"] = {
	name : "Fade Away",
	source : ["HB", 1],
	prerequisite : "Being a Gnome",
	prereqeval : function(v) { return CurrentRace.known.indexOf('gnome') !== -1; },
	descriptionFull : "Your people are clever, with a knack for illusion magic. You have learned a magical trick for fading away when you suffer harm. You gain the following benefits:\n \u2022 Increase your Dexterity or Intelligence score by 1, to a maximum of 20.\n \u2022 Immediately after you take damage, you can use a reaction to magically become invisible until the end of your next turn or until you attack, deal damage, or force someone to make a saving throw. You can do this once per combat.",
	description : "As a reaction when I take damage, I can magically become invisible until the end of my next turn or until I attack, deal damage, or force someone to make a saving throw. I can do this once per combat. [+1 Dexterity or Intelligence]",
	scorestxt : "+1 Dexterity or Intelligence",
	action : ["reaction", ""],
	usages : 1,
	recovery : "Combat"
};

FeatsList["fey teleportation"] = {
	name : "Fey Teleportation",
	source : ["HB", 1],
	prerequisite : "Being a High Elf",
	prereqeval : function(v) { return CurrentRace.known.indexOf('high elf') !== -1; },
	descriptionFull : "Your study of high elven lore has unlocked fey power that few other elves possess, except your eladrin cousins. Drawing on your fey ancestry, you can momentarily stride through the Feywild to shorten your path from one place to another. You gain the following benefits:\n \u2022 Increase your Intelligence or Charisma score by 1, to a maximum of 20.\n \u2022 You learn to speak, read, and write Sylvan.\n \u2022 You learn the Misty Step spell and can cast it PB times without expending a spell slot. You regain the ability to cast it in this way when you finish long rest. Intelligence is your spellcasting ability for this spell.",
	description : "I can cast Misty Step without using a spell slot. I can do so PB times per long rest. Intelligence is my spellcasting ability for this spell. I also learn to speak, read, and write Sylvan. [+1 Intelligence or Charisma]",
	scorestxt : "+1 Intelligence or Charisma",
	spellcastingBonus : {
		name : "PB per long rest",
		spellcastingAbility : 4,
		spells : ["misty step"],
		selection : ["misty step"],
		firstCol : 'pblr'
	},
	languageProfs : ["Sylvan"],
	usages : "Prof B. per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest",
};

FeatsList["healer"] = {
	name : "Healer",
	source : ["HB", 1],
	descriptionFull : "You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:\n \u2022 When you use a healer's kit to stabilize a dying creature, that creature also regains 1 hit point.\n \u2022 As an action, you can spend one use of a healer's kit to tend to a creature and restore 1d6+4+PB hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. You can do this PB times per long rest.",
	description : "Using a healer's kit to stabilize someone gives them 1 hit point as well. As an action, I can spend one use of a healer's kit to restore 1d6 + 4 + (your PB) + (#creature's HD) hit points. You can do this PB times per long rest.",
	action : ["action", " (1d6+4+PB+HD with healing kit)"],
	usages : "Prof B. per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest",
};

FeatsList["inspiring leader"] = {
	name : "Inspiring Leader",
	source : ["HB", 1],
	descriptionFull : "You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. You can do this PB times per long rest.",
	calculate : "event.value = 'I can spend 10 minutes inspiring up to 6 friendly creatures within 30 feet who can see or hear and can understand me. Each gains lvl (' + What('Character Level') + ') + Cha mod (' + What('Cha Mod') + \") temporary hit points. I can do this PB times per long rest.\";",
	prerequisite : "Charisma 13 or higher",
	prereqeval : function(v) { return What('Cha') >= 13; },
	usages : "Prof B. per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest"
};

FeatsList["martial adept"] = {
	name : "Martial Adept",
	source : ["HB", 1],
	descriptionFull : "You have martial training that allows you to perform special combat maneuvers. You gain the following benefits:\n \u2022 You learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).\n \u2022 You gain PB superiority dice, which is are d6 (this die is added to any superiority dice you have from another source). These dice are used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a long rest.",
	calculate : "event.value = 'I learn two maneuvers of my choice from those available to the Battle Master (2nd page \"Choose Feature\" button). The saving throw DC for this is ' + (8 + Number(What('Proficiency Bonus')) + Math.max(What('Str Mod'), What('Dex Mod'))) + ' (8 + proficiency bonus + Str/Dex mod). I gain PB superiority dice (d6), which I regain when I finish a long rest.';",
	bonusClassExtrachoices : [{
		"class" : "fighter",
		"subclass" : "fighter-battle master",
		"feature" : "subclassfeature3.1",
		"bonus" : 2
	}],
	extraLimitedFeatures : [{
		name : "Combat Superiority Feat",
		usages : "Prof B. per ",
		usagescalc : "event.value = How('Proficiency Bonus');",
		recovery : "long rest",
		additional : 'd6',
		recovery : "long rest",
		addToExisting : true
	}]
};

FeatsList["orcish fury"] = {
	name : "Orcish Fury",
	source : ["HB", 1],
	prerequisite : "Being a Half-Orc",
	prereqeval : function(v) { return (/^(?=.*half)(?=.*orc).*$/i).test(CurrentRace.known); },
	descriptionFull : "Your fury burns tirelessly. You gain the following benefits:\n \u2022 Increase your Strength or Constitution score by 1, to a maximum of 20.\n \u2022 When you hit with an attack using a simple or martial weapon, you can roll one of the weapon's damage dice an additional time and add it as extra damage of the weapon's damage type. You can do this PB times per long rest.\n \u2022 Immediately after you use your Relentless Endurance trait, you can use your reaction to make one weapon attack.",
	description : "Once per combat, I can roll an extra damage die for an attack with a simple or martial weapon. In addition, Immediately after I use my Relentless Endurance trait, I can use my reaction to make one weapon attack. [+1 Strength or Constitution]",
	scorestxt : "+1 Strength or Constitution",
	action : ["reaction", " (after Relentless Endurance)"],
	usages : 1,
	recovery : "Combat",
	additional : "extra damage"
};

FeatsList["second chance"] = {
	name : "Second Chance",
	source : ["HB", 1],
	prerequisite : "Being a Halfling",
	prereqeval : function(v) { return CurrentRace.known.indexOf('halfling') !== -1; },
	descriptionFull : "Fortune favors you when someone tries to strike you. You gain the following benefits:\n \u2022 Increase your Dexterity, Constitution, or Charisma score by 1, to a maximum of 20.\n \u2022 When a creature you can see hits you with an attack roll, you can use your reaction to force that creature to reroll. Once you use this ability, you can't use it again until you roll initiative at the start of combat or until you finish a long rest.",
	description : "When a creature I can see hits me with an attack roll, I can use my reaction to force that creature to reroll. Once I use this ability, I can't do so again until I roll initiative at the start of combat or I finish a long rest. [+1 Dexterity, Constitution, or Charisma]",
	scorestxt : "+1 Dexterity, Constitution, or Charisma",
	action : ["reaction", ""],
	usages : 1,
	recovery : "Combat"
};

/*
	usages : "Class B. per ",
	usagescalc : levels.map(function (n) {
		return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"
		}),
	recovery : "long rest",
*/
//--------------------------
//--------------------------
//-----Barbarian------------
//--------------------------
//--------------------------

ClassList.barbarian.features["relentless rage"] = {
	name : "Relentless Rage ",
	source : [["HB", 1]],
	description : " [DC 10 + 5 per try, per short rest]" + desc([
					"If I drop to 0 HP while raging, I can make a DC 10 Constitution save to stay at 1 HP",
					"The DC increases by 5 for every attempt until I finish a long rest or initiative is rolled"
	]),
	extraLimitedFeatures : [{
		name : "Relentless Rage",
		usages : 1,
		recovery : "Combat",
		usagescalc : "var FieldNmbr = parseFloat(event.target.name.slice(-2)); var usages = What('Limited Feature Used ' + FieldNmbr); var DCmod = Number(usages) * 5; event.value = (isNaN(Number(usages)) || usages === '') ? 'DC\u2003\u2003' : 'DC ' + Number(10 + DCmod);"
	}]
};

ClassSubList["barbarian-ancestral guardian"].features["subclassfeature10"].usages = "Prof B. per ";
ClassSubList["barbarian-ancestral guardian"].features["subclassfeature10"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["barbarian-ancestral guardian"].features["subclassfeature10"].recovery = "long rest";

//--------------------------
//--------------------------
//-----Bard-----------------
//--------------------------
//--------------------------

ClassList.bard.features["bardic inspiration"].usages = levels.map(function (n) {return n < 5 ? "Charisma modifier per " : "2*Charisma modifier per "});
ClassList.bard.features["bardic inspiration"].recovery = "long rest";
ClassList.bard.features["bardic inspiration"].usagescalc = levels.map(function (n) { 
		return n < 5 ? "event.value = Math.max(1, What('Cha Mod'));" : "event.value = Math.max(1, What('Cha Mod'))*2;"});

ClassSubList["bard-college of glamour"].features["subclassfeature3.1"].description = desc([
	"By performing for at least 1 minute, I can charm humanoids within 60 ft of me",
	"After the performance, my Cha mod (min 1) number of targets must make a Wis save",
	"On a fail, a target is charmed for 1 hour; If success, it doesn't knows I tried to charm it",
	"While charmed, the target idolizes me, hinders those opposing me, and avoids violence",
	"This lasts until a target takes damage, I attack it, or if it sees me attacking its allies",
	"After I used this feature I can use it again by expending a Bardic Inspiration die"]);
ClassSubList["bard-college of glamour"].features["subclassfeature3.1"].recovery = "long rest";
ClassSubList["bard-college of glamour"].features["subclassfeature3.1"].altResource = "BI";

ClassSubList["bard-college of glamour"].features["subclassfeature14"].description = desc([
	"As a bonus action, I gain a magically majestic presence for 1 min or until incapacitated",
	"During this, the first time a creature attacks me each turn they must make a Cha save",
	"If failed, it can't attack me this turn and must choose another target or lose its attack",
	"If successful, it can attack, but has disadv. on all saves against my spells on my next turn",
	"After I used this feature I can use it again by expending a Bardic Inspiration die"]);
ClassSubList["bard-college of glamour"].features["subclassfeature14"].recovery = "long rest";
ClassSubList["bard-college of glamour"].features["subclassfeature14"].altResource = "BI";

ClassSubList["bard-college of whispers"].features["subclassfeature3.1"].description = desc([
	"By speaking privately with a humanoid for at least 1 minute, I can try to inspire terror",
	"After the talk, it must make a Wis save or be frightened of me or someone of my choice",
	"If the save is successful, the target doesn't know I tried to frighten it",
	"This lasts for 1 hour, or until it sees its allies or itself being attacked or damaged",
	"After I used this feature I can use it again by expending a Bardic Inspiration die"]);
ClassSubList["bard-college of whispers"].features["subclassfeature3.1"].recovery = "long rest";
ClassSubList["bard-college of whispers"].features["subclassfeature3.1"].altResource = "BI";

ClassSubList["bard-college of whispers"].features["subclassfeature6"].description = desc([
	"As a reaction when a humanoid dies within 30 ft of me, I can capture its shadow",
	"As an action, I can use it to make me look just like the dead person did while it was alive",
	"While disguised, I know general information about it and its memories, but not its secrets",
	"Others can see through the disguise with a Wis (Insight) check vs. my Cha (Deception) +5",
	"A shadow lasts until used or next long rest; The disguise ends as a bonus action or 1 hour",
	"After I used this feature I can use it again by expending a Bardic Inspiration die"]);
ClassSubList["bard-college of whispers"].features["subclassfeature6"].recovery = "long rest";
ClassSubList["bard-college of whispers"].features["subclassfeature6"].altResource = "BI";

//--------------------------
//--------------------------
//-----Cleric---------------
//--------------------------
//--------------------------

ClassList.cleric.features["channel divinity"].usages = "Wisdom modifier per ";
ClassList.cleric.features["channel divinity"].usagescalc = levels.map(function (n) { 
	return n < 18 ? "event.value = Math.max(1, What('Wis Mod'));" : "event.value = Math.max(1, What('Wis Mod'))*2;"});
ClassList.cleric.features["channel divinity"].recovery = "long rest";
ClassList.cleric.features["channel divinity"].description = desc(["I can channel divine energy to cause an effect; the save for this is my cleric spell DC",
"After I use this, i must spend 1 minute in prayer. From Lv6 I can use this twice, from Lv 18 thrice before praying"]),
ClassSubList["cleric-knowledge domain"].features["subclassfeature17"].usages = "Prof B. per ";
ClassSubList["cleric-knowledge domain"].features["subclassfeature17"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["cleric-knowledge domain"].features["subclassfeature17"].recovery = "long rest";

//--------------------------
//--------------------------
//-----Druid----------------
//--------------------------
//--------------------------

ClassList.druid.features["subclassfeature2.wild shape"].usages = "Wisdom modifier per ";
ClassList.druid.features["subclassfeature2.wild shape"].usagescalc = "event.value = Math.max(1, What('Wis Mod'));";
ClassList.druid.features["subclassfeature2.wild shape"].recovery = "long rest";

ClassSubList["druid-circle of the moon"].features["subclassfeature2.wild shape"].usages = "Wisdom modifier per ";
ClassSubList["druid-circle of the moon"].features["subclassfeature2.wild shape"].usagescalc = "event.value = Math.max(1, What('Wis Mod'));";
ClassSubList["druid-circle of the moon"].features["subclassfeature2.wild shape"].recovery = "long rest";

ClassSubList["druid-circle of the shepherd"].features["subclassfeature2.1"].recovery = "long rest";
ClassSubList["druid-circle of the shepherd"].features["subclassfeature2.1"].description = desc([
	"As a bonus action, I can summon, or move, a spirit to a point I can see within 60 ft",
	"It is a spectral form of a Bear, Hawk, or Unicorn (my choice), with a 30-ft radius aura",
	"It is incorporeal, immobile, doesn't counts as a creature or object, and persists for 1 min",
	"The spirit persists for 1 minute or until I'm incapacitated",
	"I can expend a whild shape use to use this feature again",
	"\u2022 Bear: my allies and I, if in the aura, immediately gain 5 + my druid level in temp HP",
	"  While in the aura, my allies and I gain advantage on Strength checks and saves",
	"\u2022 Hawk: As a reaction, I can grant advantage on an attack vs. a target in the aura",
	"  While in the aura, my allies and I gain advantage on Wisdom (Perception) checks",
	"\u2022 Unicorn: my allies and I gain advantage on ability checks to detect targets in the aura",
	"  When I cast a healing spell with a spell slot, allies in the aura heal my druid level in HP"]);
ClassSubList["druid-circle of the shepherd"].features["subclassfeature2.1"].altResource = "WS";

//--------------------------
//--------------------------
//-----Fighterman-----------
//--------------------------
//--------------------------

ClassList.fighter.features["second wind"].usages = "Class B. per ";
ClassList.fighter.features["second wind"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.fighter.level-1)));"});
ClassList.fighter.features["second wind"].recovery = "long rest";
ClassList.fighter.features["second wind"].description = desc(["As a bonus action, I regain 1d10 + fighter level HP"]);

ClassList.fighter.features["action surge"].usages = 1;
ClassList.fighter.features["action surge"].recovery = "Combat";

ClassSubList["fighter-arcane archer"].features["subclassfeature3.1"].usages = [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];
ClassSubList["fighter-arcane archer"].features["subclassfeature3.1"].recovery = "Combat";
ClassSubList["fighter-arcane archer"].features["subclassfeature15"].description = "I gain an extra use of arcane shot";

ClassSubList["fighter-battle master"].features["subclassfeature3"].recovery = "Combat";
ClassSubList["fighter-battle master"].features["subclassfeature15"].description = "\n   " + "????";

ClassSubList["fighter-echo knight"].features["subclassfeature10"].recovery = "Combat";

ClassSubList["fighter-psi warrior"].features["subclassfeature3"] = {
	name : "Psionic Energy Dice",
	source : [["T", 43]],
	minlevel : 3,
	description : desc([
		"I gain 1+ twice my proficiency bonus of psionic energy dice (PsiD) that fuel my psionics",
		"I regain all expended psionic energy dice after a long rest",
		"As a bonus action PB times per long rest, I can regain one expended psionic energy die"
	]),
	additional : levels.map(function(n) {
		return n < 3 ? "" : n < 5 ? "d6" : n < 11 ? "d8" : n < 17 ? "d10" : "d12";
	}),
	action : [["bonus action", "Regain 1 Psionic Energy Die"]],
	usages : "Proficiency Bonus \xD7 2 per ",
	usagescalc : "event.value = 1+Number(How('Proficiency Bonus'))*2",
	recovery : "long rest",
	extraLimitedFeatures : [{
		name : "Regain 1 Psionic Energy die",
		usages : "Prof B. per ",
		usagescalc : "event.value = How('Proficiency Bonus');",
		recovery : "long rest"
	}]
};

ClassSubList["fighter-psi warrior"].features["subclassfeature3.3"] = {
	name : "Psionic Power: Telekinetic Movement",
	source : [["T", 43]],
	minlevel : 3,
	description : desc([
		"As an action, I can move a Large or smaller loose object or one willing creature in 30 ft",
		"I must be able to see the target and can move it up to 30 ft to an empty space I can see",
		"If it is a Tiny object, I can also move it to or from my hand; I can't move myself this way",
		"I must expend a psi die to do so."
	]),
	limfeaname : "Telekinetic Movement",
	action : [["action", ""]]
};

ClassSubList["fighter-psi warrior"].features["subclassfeature7.1"] = {
	name : "Telekinetic Adept: Psi-Powered Leap",
	source : [["T", 43]],
	minlevel : 7,
	description : desc([
		"As a bonus action, I gain a flying speed of twice my walking speed until the turn ends",
		"I must expend a psi die to do so."]),
	action : [["bonus action", ""]]
};
/*
AddSubClass("fighter", "psi warrior", {
	regExpSearch : /^(?=.*\bpsi(onic)?s?\b)(?=.*warrior).*$/i,
	subname : "Psi Warrior",
	source : [["T", 42]],
	fullname : "Psi Warrior",
	abilitySave : 4,
	features : {
		"subclassfeature3" : {
			name : "Psionic Energy Dice",
			source : [["T", 43]],
			minlevel : 3,
			description : desc([
				"I gain twice my proficiency bonus of psionic energy dice (PsiD) that fuel my psionics",
				"I regain all expended psionic energy dice after a long rest",
				"As a bonus action once per short rest, I can regain one expended psionic energy die"
			]),
			additional : levels.map(function(n) {
				return n < 3 ? "" : n < 5 ? "d6" : n < 11 ? "d8" : n < 17 ? "d10" : "d12";
			}),
			action : [["bonus action", "Regain 1 Psionic Energy Die"]],
			usages : "Proficiency Bonus \xD7 2 per ",
			usagescalc : "event.value = Number(How('Proficiency Bonus'))*2",
			recovery : "long rest",
			extraLimitedFeatures : [{
				name : "Regain 1 Psionic Energy die",
				usages : "Prof B. per ",
				usagescalc : "event.value = How('Proficiency Bonus');",
				recovery : "long rest"
			}]
		},
		"subclassfeature3.1" : {
			name : "Psionic Power: Protective Field",
			source : [["T", 43]],
			minlevel : 3,
			description : " [1 psionic energy die]" + desc([
				"As a reaction when I or a creature I can see within 30 ft takes damage, I can reduce it",
				"I reduce the damage by the roll of the one psionic energy die I expend + my Int mod"
			]),
			action : [["reaction", "Protective Field"]]
		},
		"subclassfeature3.2" : {
			name : "Psionic Power: Psionic Strike",
			source : [["T", 43]],
			minlevel : 3,
			description : " [1 psionic energy die]" + desc([
				"Once on each of my turns after I hit a target in 30 ft and damage it with a weapon,",
				"I can expend a psionic energy die to deal it the die roll + my Int mod in force damage"
			])
		},
		"subclassfeature3.3" : {
			name : "Psionic Power: Telekinetic Movement",
			source : [["T", 43]],
			minlevel : 3,
			description : desc([
				"As an action, I can move a Large or smaller loose object or one willing creature in 30 ft",
				"I must be able to see the target and can move it up to 30 ft to an empty space I can see",
				"If it is a Tiny object, I can also move it to or from my hand; I can't move myself this way",
				"I can do this once per short rest, or by expending a psionic energy die (PsiD)"
			]),
			limfeaname : "Telekinetic Movement",
			action : [["action", ""]],
			usages : 1,
			recovery : "short rest",
			altResource : "PsiD"
		},
		"subclassfeature7.1" : {
			name : "Telekinetic Adept: Psi-Powered Leap",
			source : [["T", 43]],
			minlevel : 7,
			description : desc([
				"As a bonus action, I gain a flying speed of twice my walking speed until the turn ends",
				"I can do this once per short rest, or by expending a psionic energy die (PsiD)"
			]),
			limfeaname : "Psi-Powered Leap",
			action : [["bonus action", ""]],
			usages : 1,
			recovery : "short rest",
			altResource : "PsiD"
		},
		"subclassfeature7.2" : {
			name : "Telekinetic Adept: Telekinetic Thrust",
			source : [["T", 43]],
			minlevel : 7,
			description : " [DC 8 + Prof B + Int mod]" + desc([
				"When I deal damage with my Psionic Strike, I can have the target make a Strength save",
				"If failed, I knock the target prone or move it up to 10 ft in any direction horizontally"
			]),
		},
		"subclassfeature10" : {
			name : "Guarded Mind",
			source : [["T", 43]],
			minlevel : 10,
			description : desc([
				"I can expend a psionic energy die to end all effects on me causing charmed or frightened",
				"I can do this if at the start of my turn; I also gain resistance to psychic damage"
			]),
			dmgres : ["Psychic"]
		},
		"subclassfeature15" : {
			name : "Bulwark of Force",
			source : [["T", 44]],
			minlevel : 15,
			description : desc([
				"As a bonus action, I can choose up to my Int mod of creatures (min 1) I can see in 30 ft",
				"This can include me; Each chosen gains half cover for 1 minute or until I'm incapacitated",
				"I can do this once per long rest, or by expending a psionic energy die (PsiD)"
			]),
			action : [["bonus action", ""]],
			usages : 1,
			recovery : "long rest",
			altResource : "PsiD"
		},
		"subclassfeature18" : {
			name : "Telekinetic Master",
			source : [["T", 44]],
			minlevel : 18,
			description : desc([
				"I can cast Telekinesis, requiring no spell slot or components, with Int spellcasting ability",
				"As a bonus action while concentrating on this spell, I can make one weapon attack",
				"I can cast Telekinesis once per long rest, or by expending a psionic energy die (PsiD)"
			]),
			spellcastingBonus : {
				name : "Telekinetic Master",
				spells : ["telekinesis"],
				selection : ["telekinesis"],
				firstCol : "Sp"
			},
			spellChanges : {
				"telekinesis" : {
					components : "",
					changes : "Using Telekinetic Master, I can cast Telekinesis without requiring components or spell slots."
				}
			},
			action : [["bonus action", "Weapon Attack while Telekinesis conc."]],
			usages : 1,
			recovery : "long rest",
			altResource : "PsiD"
		}
	}
});
*/
AddSubClass("fighter", "rune knight", {
	regExpSearch : /^(?=.*rune)(?=.*knight).*$/i,
	subname : "Rune Knight",
	source : [["HB", 1]],
	fullname : "Rune Knight",
	abilitySave : 3,
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : [["HB", 1]],
			minlevel : 3,
			description : "\n   I gain proficiency with smith's tools and I learn to speak, read, and write Giant",
			toolProfs : ["Smith's tools"],
			languageProfs : ["Giant"]
		},
		"subclassfeature3.1" : {
			name : "Rune Carver",
			source : [["HB", 1]],
			minlevel : 3,
			description : desc([
				"I learn how to use magic runes to enhance my gear that I can wear or hold in my hand",
				'Use the "Choose Feature" button above to select a rune and add it to the third page',
				"When I finish a long rest, I can inscribe each rune I know upon a different item I touch",
				"Each item can hold only one rune and remains there until I finish a long rest",
				"Runes inscribed on a carried object grant both a passive and a limited-use active effect",
				"Whenever I gain a fighter level, I can swap a rune I know for another",
				"The DC for a rune's abilities is 8 + my Proficiency bonus + my Constitution modifier"
			]),
			additional : levels.map(function (n){
				return n < 3 ? "" : (n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5) + " runes known"
			}),
			extraTimes : levels.map(function (n) {
				return n < 3 ? 0 : n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : 5;
			}),
			extraname : "Rune Knight 3",
			extrachoices : ["Cloud Rune", "Fire Rune", "Frost Rune", "Stone Rune", "Hill Rune (prereq: level 7 fighter)", "Storm Rune (prereq: level 7 fighter)"],
			"cloud rune" : {
				name : "Cloud Rune",
				source : [["HB", 1]],
				description : desc([
					"While I wear an object inscribed with this, I gain a deceptiveness reminiscent of cloud giants",
					"I always gain advantage on Dexterity (Sleight of Hand) and Charisma (Deception) checks",
					"As a reaction when I or another I can see within 30 ft is hit by an attack, I can invoke this",
					"I select another target for the attack within 30 ft of me, using the same roll (ignore range)"
				]),
				action : [["reaction", " (invoke)"]],
				additional : "invoke",
				usages : ["", "", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
				recovery : "Combat",
				advantages : [ ["Sleight of Hand", true], ["Deception", true] ]
			},
			"fire rune" : {
				name : "Fire Rune",
				source : [["HB", 1]],
				description : desc([
					"While I wear an object inscribed with this, I gain craftsmanship reminiscent of great smiths",
					"I always double my proficiency bonus when making an ability check with a tool",
					"When I hit a creature with a weapon attack, I can invoke it to summon fiery shackles",
					"It takes an extra 2d6 fire damage and must make a Str save or be restrained for 1 min",
					"While restrained, the creature takes 2d6 fire damage at the start of each of its turns",
					"It can repeat the save at the end of each of its turns, banishing the shackles on a success"
				]),
				additional : "invoke",
				usages : ["", "", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
				recovery : "Combat",
				skillstxt : "expertise with all tools I am proficient with",
				eval : function () { Checkbox('Too Exp', true); },
				removeeval : function () { Checkbox('Too Exp', false); }
			},
			"frost rune" : {
				name : "Frost Rune",
				source : [["HB", 1]],
				description : desc([
					"While I wear an object inscribed with this, I gain might of those surviving wintry wilderness",
					"I always gain advantage on Wisdom (Animal Handling) and Charisma (Intimidation) checks",
					"As a bonus action, I can invoke this to gain +2 on Str and Con checks and saves for 10 min"
				]),
				action : [["bonus action", " (invoke)"]],
				additional : "invoke",
				usages : ["", "", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
				recovery : "Combat",
				advantages : [ ["Animal Handling", true], ["Intimidation", true] ]
			},
			"stone rune" : {
				name : "Stone Rune",
				source : [["HB", 1]],
				description : desc([
					"While I wear an object inscribed with this, I gain judiciousness reminiscent of stone giants",
					"I always gain advantage on Wisdom (Insight) checks and I gain darkvision out to 120 ft",
					"As a reaction when a creature I can see ends it turn within 30 ft, I can invoke this rune",
					"This causes the creature to make a Wisdom save or be charmed by me for 1 minute",
					"While charmed, it descends into a dreamy stupor, becoming incapacitated and has speed 0",
					"It can repeat the save at the end of each of its turns, ending the effect on a success"
				]),
				action : [["reaction", " (invoke)"]],
				additional : "invoke",
				usages : ["", "", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
				recovery : "Combat",
				vision : [["Darkvision", 120]],
				advantages : [ ["Insight", true] ]
			},
			"hill rune (prereq: level 7 fighter)" : {
				name : "Hill Rune",
				source : [["HB", 1]],
				description : desc([
					"While I wear an object inscribed with this rune, I gain a resilience reminiscent of hill giants",
					"I always gain advantage on saves against being poisoned and resistance to poison damage",
					"As a bonus action, I can invoke it to gain resistance to bludg/slash/pierc damage for 1 min"
				]),
				prereqeval : function(v) { return classes.known.fighter.level >= 7; },
				action : [["bonus action", " (invoke)"]],
				additional : "invoke",
				usages : ["", "", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
				recovery : "Combat",
				dmgres : ["Poison"],
				savetxt : { adv_vs : ["poison"] }
			},
			"storm rune (prereq: level 7 fighter)" : {
				name : "Storm Rune",
				source : [["HB", 1]],
				description : desc([
					"While I wear an object inscribed with this rune, I can glimpse the future like storm giants",
					"I always gain adv. on Int (Arcana) checks and I can't be surprised while not incapacitated",
					"As a bonus action, I can invoke it to enter a prophetic state for 1 min or till incapacitated",
					"While in this state, I can use a reaction to cause a roll to gain advantage or disadvantage",
					"I can do this for attacks, saves, and checks of myself or others I can see within 60 ft of me"
				]),
				prereqeval : function(v) { return classes.known.fighter.level >= 7; },
				action : [["bonus action", " (invoke)"]],
				additional : "invoke",
				usages : ["", "", 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
				recovery : "Combat",
				advantages : [ ["Arcana", true] ],
				savetxt : { immune : ["surprised"] },
			}
		},
		"subclassfeature3.2" : {
			name : "Giant's Might",
			source : [["HB", 1]],
			minlevel : 3,
			description : desc([
				"As a bonus action, I can imbue myself with giant magic for 1 minute and gain benefits:",
				" \u2022 Space permitted, I grow to a larger size category along with everything I'm wearing",
				" \u2022 I have advantage on my Strength check and saves",
				" \u2022 My weapon and unarmed strike attacks deal extra damage"
			]),
			additional : levels.map(function (n) {
				return n < 3 ? "" : (n < 18 ? "Large" : "Huge") + ", +1d" + (n < 10 ? 6 : n < 18 ? 8 : 10) + " damage"
			}),
			action : [["bonus action", ""]],
			savetxt : { text : ["Adv. on Str saves in Giant's Might"] },
			usages : "Prof Bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "long rest",
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.fighter && classes.known.fighter.level >= 3 && v.isWeapon && (/giant('s)? might/i).test(v.WeaponTextName)) {
							var GMdmgDie = classes.known.fighter.level < 10 ? 'd6' : classes.known.fighter.level < 18 ? 'd8' : 'd10';
							var dmgDieRx = RegExp('(\\d+)' + GMdmgDie, 'i');
							if (dmgDieRx.test(fields.Damage_Die)) {
								var dmgDieMatch = fields.Damage_Die.match(dmgDieRx);
								fields.Damage_Die = fields.Damage_Die.replace(dmgDieRx, Number(dmgDieMatch[1]) + 1 + GMdmgDie);
								fields.Description = fields.Description.replace(/Versatile \((\d+d\d+)\)/i, 'Versatile ($1+1' + GMdmgDie + ')');
							} else if (!isNaN(fields.Damage_Die)) {
								fields.Damage_Die = 1 + GMdmgDie + "+" + fields.Damage_Die;
							} else {
								fields.Description += (fields.Description ? '; ' : '') + '+1' + GMdmgDie + ' damage';
							}
							if (classes.known.fighter.level >= 18 && v.isMeleeWeapon) fields.Description += (fields.Description ? '; ' : '') + '+5 ft reach';
						};
					},
					"If I include the words \"Giant Might\" in the name of a weapon or unarmed strike, it gets treated as a weapon that I use while imbued by my Giant's Might feature. It adds +1d6 weapon damage. From 10th-level onwards, this increases to +1d8 damage. From 18th-level onwards, this increases to +1d10 damage and my reach increases by 5 ft (for melee weapons).",
					8
				]
			}
		},
		"subclassfeature7" : {
			name : "Runic Shield",
			source : [["HB", 1]],
			minlevel : 7,
			description : desc([
				"As a reaction when I see a creature within 60 ft get hit by an attack, I can protect it",
				"The attacker must reroll its attack roll and use the new roll"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature10" : {
			name : "Great Stature",
			source : [["HB", 1]],
			minlevel : 10,
			description : desc([
				"My runes permanently make me grow; I add 3d4 inches to my length",
				"In addition, the extra weapon damage I deal with Giant Might increases to 1d8"
			])
		},
		"subclassfeature15" : {
			name : "Master of Runes",
			source : [["HB", 1]],
			minlevel : 15,
			description : "\n   I can now invoke each of my runes twice per short rest instead of once"
		},
		"subclassfeature18" : {
			name : "Runic Juggernaut",
			source : [["HB", 1]],
			minlevel : 18,
			description : desc([
				"Giant's Might now adds +1d10 weapon damage, and can make me grow up to Huge",
				"While I'm Huge, my reach increases by 5 ft"
			])
		}
	}
});

//--------------------------
//--------------------------
//-----Paladin--------------
//--------------------------
//--------------------------

ClassList.paladin.features["subclassfeature3.0-channel divinity"].recovery = "Combat";

//--------------------------
//--------------------------
//-----Ranger---------------
//--------------------------
//--------------------------

ClassSubList["ranger-horizon walker"].features["subclassfeature3"].usages = "Prof B. per ";
ClassSubList["ranger-horizon walker"].features["subclassfeature3"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["ranger-horizon walker"].features["subclassfeature3"].recovery = "long rest";

ClassSubList["ranger-horizon walker"].features["subclassfeature7"].usages = "Prof B. per ";
ClassSubList["ranger-horizon walker"].features["subclassfeature7"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["ranger-horizon walker"].features["subclassfeature7"].recovery = "long rest";

ClassSubList["ranger-monster slayer"].features["subclassfeature11"].usages = "Prof B. per ";
ClassSubList["ranger-monster slayer"].features["subclassfeature11"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["ranger-monster slayer"].features["subclassfeature11"].recovery = "long rest";

//--------------------------
//--------------------------
//-----Rogue----------------
//--------------------------
//--------------------------

ClassList.rogue.features["stroke of luck"].usages = "Prof B. per ";
ClassList.rogue.features["stroke of luck"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassList.rogue.features["stroke of luck"].recovery = "long rest";

ClassSubList["rogue-phantom"].features["subclassfeature3"].usages = "Prof B. per ";
ClassSubList["rogue-phantom"].features["subclassfeature3"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["rogue-phantom"].features["subclassfeature3"].recovery = "long rest";

ClassSubList["rogue-swashbuckler"].features["subclassfeature17"].usages = "Prof B. per ";
ClassSubList["rogue-swashbuckler"].features["subclassfeature17"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["rogue-swashbuckler"].features["subclassfeature17"].recovery = "long rest";

ClassSubList["rogue-soulknife"].features["subclassfeature3"] = {
name : "Psionic Energy Dice",
	source : [["HB", 1]],
	minlevel : 3,
	description : desc([
		"I gain 1+twice my proficiency bonus of psionic energy dice (PsiD) that fuel my psionics",
		"I regain all expended psionic energy dice after a long rest; See psionic powers on page 3",
		"As a bonus action PB times per long rest, I can regain one expended psionic energy die"
	]),
	additional : levels.map(function(n) {
		return n < 3 ? "" : n < 5 ? "d6" : n < 11 ? "d8" : n < 17 ? "d10" : "d12";
	}),
	action : [["bonus action", "Regain 1 Psionic Energy Die"]],
	usages : "Proficiency Bonus \xD7 2 per ",
	usagescalc : "event.value = 1+Number(How('Proficiency Bonus'))*2",
	recovery : "long rest",
	extraLimitedFeatures : [{
		name : "Regain 1 Psionic Energy die",
		usages : "Prof B. per ",
		usagescalc : "event.value = How('Proficiency Bonus');",
		recovery : "long rest"
	}],
	extraname : "Soulknife 3",
	"psi-bolstered knack" : {
		name : "Psionic Power: Psi-Bolstered Knack",
		source : [["HB", 1]],
		description : " [1 PsiD if successful]" + desc([
			"If I fail an check using a skill or tool I'm proficient with, I can add a psionic energy die to it",
			"The psionic energy die is only expended if this addition turns the failure into a success"
		])
	},
	"psychic whispers" : {
		name : "Psionic Power: Psychic Whispers",
		source : [["HB", 1]],
		description : desc([
			"As an action, I can select my Prof. Bonus of creatures I can see and roll a psionic energy die",
			"For the roll of hours, I can telepathically communicate with each and they with me",
			"To send or receive messages (no action), we must be within 1 mile of each other",
			"A creature must be able to speak a language to do this; It can end the link at any time",
			"I expend a psionic energy die to do so"
		]),
		limfeaname : "Psychic Whispers",
		action : [["action", ""]]
	},
	autoSelectExtrachoices : [{
		extrachoice : "psi-bolstered knack"
	}, {
		extrachoice : "psychic whispers"
}]};

ClassSubList["rogue-soulknife"].features["subclassfeature13"] = {
	name : "Psychic Veil",
	source : [["HB", 1]],
	minlevel : 13,
	description : desc([
		"As an action, I can become invisible along with what I'm wearing or carrying for 1 hour",
		"I can end it (no action); It also ends if I damage a creature or force one to make a save",
		"I expend a psionic energy die to do so"
	]),
	action : [["action", ""]]
};


//--------------------------
//--------------------------
//-----Sorcerer-------------
//--------------------------
//--------------------------

ClassList.sorcerer.features["sorcerous restoration"].usages = 1;
ClassList.sorcerer.features["sorcerous restoration"].recovery = "long rest";
ClassList.sorcerer.features["sorcerous restoration"].description = desc(["I regain 8 expended sorcery points over 1 minute"]);
ClassList.sorcerer.features["sorcerous restoration"].action = null;

ClassSubList["sorcerer-divine soul"].features["subclassfeature1.2"].usages = "Class B. per ";
ClassSubList["sorcerer-divine soul"].features["subclassfeature1.2"].usagescalc = levels.map(function (n) {
	return "event.value = Math.floor(2+(1/4*(classes.known.sorcerer.level-1)));"});
ClassSubList["sorcerer-divine soul"].features["subclassfeature1.2"].recovery = "long rest";

ClassSubList["sorcerer-storm sorcery"].features["subclassfeature18"].usages = "Prof B. per ";
ClassSubList["sorcerer-storm sorcery"].features["subclassfeature18"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["sorcerer-storm sorcery"].features["subclassfeature18"].recovery = "long rest";
ClassSubList["sorcerer-storm sorcery"].features["subclassfeature18"].description = desc([
	"I have immunity to lightning and thunder damage and gain magical 60 ft fly speed",
	"As an action, I reduce my fly speed to 30 ft and give allies 30 ft fly speed for 1 hour",
	"I can do this PB times per long rest for up to 3 + my Charisma modifier allies within 30 ft"]);

//--------------------------
//--------------------------
//-----Warlock--------------
//--------------------------
//--------------------------

ClassList.warlock.features["pact magic"] = {
	name : "Pact Magic",
	source : [["HB", 1]],
	minlevel : 1,
	description : desc([
		"I can cast warlock cantrips/spells that I know, using Charisma as my spellcasting ability",
		"I can use an arcane focus as a spellcasting focus for my warlock spells"]),
	additional : levels.map(function (n, idx) {
		var cantr = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx];
		var splls = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15][idx];
		var slots = n < 2 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4;
		var sllvl = n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : 5;
		return cantr + " cantrips \u0026 " + splls + " spells known; " + slots + "\xD7 " + Base_spellLevelList[sllvl] + " spell slot";
	})
};

ClassList.warlock.features["bargain"] = {
	name : "Bargain",
	source : [["HB", 1]],
	minlevel : 1,
	description : desc(["I can bargain with my patron to regain one spell slot PB times per long rest. This takes 1 minute"]),
	usages : "Prof B. per ",
	usagescalc : levels.map(function (n) { return n < 20 ? "event.value = How('Proficiency Bonus');" : "event.value = How('Proficiency Bonus')*2";}),
	recovery : "long rest"
};

ClassList.warlock.features["eldritch master"] = {
	name : "Eldritch Master",
	source : [["SRD", 48], ["P", 108]],
	minlevel : 20,
	description : desc(["I can bargain for spell slots with my patron twice as often"])
}

AddWarlockInvocation("Cloak of Flies (prereq: level 5 warlock)", {
	name : "Cloak of Flies",
	description : desc([
		"As a bonus action, I can surround myself with a 5-ft radius magical aura of buzzing flies",
		"It lasts until I'm incapacitated or dismiss it as a bonus action; Total cover block the aura",
		"The aura grants me adv. on Cha (Intimidation), but disadv. on all other Cha checks",
		"Creatures starting their turn in the aura take my Cha mod (min 0) in poison damage"
	]),
	source : ["HB" ,1],
	submenu : "[warlock level  5+]",
	prereqeval : function(v) { return classes.known.warlock.level >= 5; },
	usages : "Prof B. per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest",
	action : ["bonus action", " (start/stop)"]
});

AddWarlockInvocation("Ghostly Gaze (prereq: level 7 warlock)", {
	name : "Ghostly Gaze",
	description : desc([
		"As an action, I can gain darkvision, and the ability to see through solid objects, out to 30 ft",
		"Objects appear ghostly to me; This lasts up to 1 minute, while I'm concentrating on this"
	]),
	source : ["HB" ,1],
	submenu : "[warlock level  7+]",
	prereqeval : function(v) { return classes.known.warlock.level >= 7; },
	usages : "Prof B. per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest",
	action : ["action", ""]
});

AddWarlockInvocation("Tomb of Levistus (prereq: level 5 warlock)", {
	name : "Tomb of Levistus",
	description : desc([
		"As a reaction when I take damage, I can entomb myself in ice until the end of my turn",
		"During, I get 10 temp. HP per warlock level, which I use to absorb the triggering damage",
		"After, till the ice is gone, I also get vulnerability to fire, 0 speed, and am incapacitated"
	]),
	source : ["HB" ,1],
	submenu : "[warlock level  5+]",
	prereqeval : function(v) { return classes.known.warlock.level >= 5; },
	recovery : "Combat",
	usages : 1,
	action : ["reaction", ""],
	additional : levels.map( function(n) { return (n * 10) + " temp HP"; })
});

ClassSubList["warlock-the archfey"].features["subclassfeature1"].usages = "Class B. per ";
ClassSubList["warlock-the archfey"].features["subclassfeature1"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the archfey"].features["subclassfeature1"].recovery = "long rest";
ClassSubList["warlock-the archfey"].features["subclassfeature6"].usages = 1;
ClassSubList["warlock-the archfey"].features["subclassfeature6"].recovery = "Combat";
ClassSubList["warlock-the archfey"].features["subclassfeature14"].usages = "Class B. per ";
ClassSubList["warlock-the archfey"].features["subclassfeature14"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the archfey"].features["subclassfeature14"].recovery = "long rest";

ClassSubList["warlock-the great old one"].features["subclassfeature6"].usages = 1;
ClassSubList["warlock-the great old one"].features["subclassfeature6"].recovery = "Combat";

ClassSubList["warlock-the undying"].features["subclassfeature14"].usages = "Class B. per ";
ClassSubList["warlock-the undying"].features["subclassfeature14"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the undying"].features["subclassfeature14"].recovery = "long rest";

ClassSubList["warlock-the undead"].features["subclassfeature1"].usages = "Class B. per ";
ClassSubList["warlock-the undead"].features["subclassfeature1"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the undead"].features["subclassfeature1"].recovery = "long rest";

ClassSubList["warlock-the celestial"].features["subclassfeature10"].usages = "Class B. per ";
ClassSubList["warlock-the celestial"].features["subclassfeature10"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the celestial"].features["subclassfeature10"].recovery = "long rest";
ClassSubList["warlock-the celestial"].features["subclassfeature10"].description = desc([
	"Over 1 minute, I and up to five allies gain temporary hit points",
	"I get my warlock level + Cha mod, while my allies get half my warlock level + Cha mod"]);

ClassSubList["warlock-the hexblade"].features["subclassfeature1"].usages = "Class B. per ";
ClassSubList["warlock-the hexblade"].features["subclassfeature1"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the hexblade"].features["subclassfeature1"].recovery = "long rest";

ClassSubList["warlock-the fathomless"].features["subclassfeature14"].usages = "Class B. per ";
ClassSubList["warlock-the fathomless"].features["subclassfeature14"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the fathomless"].features["subclassfeature14"].recovery = "long rest";

ClassSubList["warlock-the genie"].features["subclassfeature6"].usages = "Class B. per ";
ClassSubList["warlock-the genie"].features["subclassfeature6"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the genie"].features["subclassfeature6"].recovery = "long rest";
ClassSubList["warlock-the genie"].features["subclassfeature6"].description = desc([
	"When I enter my vessel I can have up to 5 willing creatures I can see in 30 ft join me",
	"As a bonus action, I can eject any number of creatures from my genie's vessel",
	"Everyone is ejected when I leave it, I die, or if the vessel is destroyed",
	"Anyone in the vessel reduces the time for a short rest to 1/5th",
	"Also, HD spend as part of this short rest has my Proficiency Bonus added to the roll"]);

ClassSubList["warlock-the fiend"].features["subclassfeature6"].usages = "Class B. per ";
ClassSubList["warlock-the fiend"].features["subclassfeature6"].usagescalc = levels.map(function (n) {return "event.value = Math.floor(2+(1/4*(classes.known.warlock.level-1)));"});
ClassSubList["warlock-the fiend"].features["subclassfeature6"].recovery = "long rest";

//--------------------------
//--------------------------
//-----Wizard---------------
//--------------------------
//--------------------------

ClassList.wizard.features["signature spell"].description = desc([
	"Two 3rd-level spells of my choice in my spellbook will always count as prepared",
	"I can cast any at third level PB times per long rest without expending spell slots"]);
ClassList.wizard.features["signature spell"].usages = "Prof B. per ";
ClassList.wizard.features["signature spell"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassList.wizard.features["signature spell"].recovery = "long rest";

ClassSubList["wizard-chronurgy magic"].features["subclassfeature10"].usages = 1;
ClassSubList["wizard-chronurgy magic"].features["subclassfeature10"].recovery = "long rest";

ClassSubList["wizard-divination"].features["subclassfeature10"].usages = 1;
ClassSubList["wizard-divination"].features["subclassfeature10"].recovery = "long rest";

ClassSubList["wizard-illusion"].features["subclassfeature10"].usages = 1;
ClassSubList["wizard-illusion"].features["subclassfeature10"].recovery = "Combat";

ClassSubList["wizard-transmutation"].features["subclassfeature10"].usages = "Prof B. per ";
ClassSubList["wizard-transmutation"].features["subclassfeature10"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["wizard-transmutation"].features["subclassfeature10"].recovery = "long rest";

ClassSubList["wizard-war magic"].features["subclassfeature6"].description = desc([
	"I have a pool of stored power surges that I can use to empower my damaging spells",
	"I gain a power surge whenever I successfully end a spell with Dispel Magic or Counterspell",
	"This pool can store a number of power surges equal to my Intelligence modifier (min 1)",
	"It resets to 1 power surge after a long rest or when I have 0 surges left when rolling initiative",
	"When I deal damage with a wizard spell, I can spend a power surge to do extra damage",
	"One target takes half my wizard level in force damage; I can do this only once per turn"]);
ClassSubList["wizard-war magic"].features["subclassfeature6"].usages = "Resets to 1 at ";
ClassSubList["wizard-war magic"].features["subclassfeature6"].usagescalc = "event.value = !event.value || event.value == 'Resets to 1 after ' ? 1 : event.value;";
ClassSubList["wizard-war magic"].features["subclassfeature6"].recovery = "Combat";

//--------------------------
//--------------------------
//-----disable optional features (kinda)-----------
//--------------------------
//--------------------------

ClassList.monk.features.ki["dedicated weapon"]= {name : "Dedicated Weapon"};
ClassList.monk.features["unarmored movement"]["ki-fueled attack"] = {name : "Ki-Fueled Attack"};
ClassList.monk.features["deflect missiles"]["quickened healing"] = {name : "Quickened Healing"};
ClassList.monk.features["slow fall"]["focused aim"] = {name : "Focused Aim"};

//--------------------------
//--------------------------
//-----Base-Class-----------
//--------------------------
//--------------------------

ClassList.monk.features["martial arts"].description = desc([
	"Monk weapons: any simple melee (not two-handed/heavy), unarmed strike, shortsword",
	"With monk weapons, I can use Dex instead of Str and use the Martial Arts damage die",
	"When taking an Attack action with these, I get one unarmed strike as a bonus action",
	"I can also make this attack, if i take an action provided by a monk class/subclass-feature."]);
ClassList.monk.features["martial arts"].action = [["bonus action", "Unarmed Strike (with Monk action)"]];

ClassList.monk.features["ki"].description = null;
ClassList.monk.features["ki"].limfeaname = null;
ClassList.monk.features["ki"].usages = null;
ClassList.monk.features["ki"].recovery = null;

ClassList.monk.features["ki"]["flurry of blows"].description = desc(["After taking the Attack action, I can make 2 unarmed attacks as a bonus action", "I must make unarmed attacks or use a monk weapon and not wear medium or heavy armor to gain this benefit."]);
ClassList.monk.features["ki"]["flurry of blows"].extraname = null;

ClassList.monk.features["ki"]["patient defense"].description = desc(["As a bonus action, I can increase my AC and Dex saves by 2 until my next turn", "I cannot be wear medium or heavy armor or wield a shield to and gain this benefit"]);
ClassList.monk.features["ki"]["patient defense"].extraname = null;

ClassList.monk.features["ki"]["step of the wind"].description = desc(["As a bonus action, I can either Dash or Disengage; My jump distance doubles when I do so", "I cannot wear medium or heavy armor to gain this benefit"]);
ClassList.monk.features["ki"]["step of the wind"].extraname = null;

ClassList.monk.features["deflect missiles"].additional = levels.map(function (n) {
	return n < 3 ? "" : "1d10 + " + n + " + Dexterity modifier";});

ClassList.monk.features["slow fall"]["stunning strike"].description = desc([
	"After I hit a creature with a melee weapon attack that is part of the attack action, stun it",
	"It has to succeed on a Constitution save or be stunned until the end of my next turn"]);
ClassList.monk.features["slow fall"]["stunning strike"].usages = "Prof B. per ";
ClassList.monk.features["slow fall"]["stunning strike"].usagescalc = "event.value = Math.max(1, What('Wis Mod'));";
ClassList.monk.features["slow fall"]["stunning strike"].recovery = "long rest";

ClassList.monk.features["quickened healing"] = {
	name : "Quickened Healing",
	source : [["T", 49]],
	minlevel : 4,
	description : desc(["As an action I can expend a hit die.","I regain HP equal to the roll of my martial arts die or hit die (my choice) + Proficiency Bonus"]),
	action : [["action", ""]]
};

ClassList.monk.features["ki-empowered strikes"].description = desc(["My unarmed strikes count as magical for overcoming resistances and immunities"]);

ClassList.monk.features["stillness of mind"].description = desc(["As an action, I can end one effect on me that causes me to be charmed or frightened","Charmed and frightened don't prevent me from using this feature"]),
ClassList.monk.features["stillness of mind"].usages = "PB/2 per ";
ClassList.monk.features["stillness of mind"].usagescalc = "event.value = Math.floor(How('Proficiency Bonus')/2);";
ClassList.monk.features["stillness of mind"].recovery = "long rest";

ClassList.monk.features["diamond soul"].description = desc(["I am proficient with all saves; I can reroll PB/2 failed saves per LR"]);
ClassList.monk.features["diamond soul"].usages = "PB/2 per ";
ClassList.monk.features["diamond soul"].usagescalc = "event.value = Math.floor(How('Proficiency Bonus')/2);";
ClassList.monk.features["diamond soul"].recovery = "long rest";
ClassList.monk.features["diamond soul"].additional = null;

ClassList.monk.features["empty body"].description = desc(["Be invisible for 1 min (concentration) or cast Astral Projection on self"]);
ClassList.monk.features["empty body"].additional = "Invisible: PB per LR; Astral Projection: 1/LR";
ClassList.monk.features["empty body"].extraLimitedFeatures = [{
	name : "Astral Projection (self)",
	usages : 1,
	recovery : "long rest"
}, {
	name : "Invisible",
	usages : "Proficiency Bonus per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest"
}];

ClassList.monk.features["perfect self"].description = desc(["I add +4 to both my Dexterity and Wisdom scores and maximums"]);
ClassList.monk.features["perfect self"].scores = [0,4,0,0,4,0];
ClassList.monk.features["perfect self"].scoresMaximum = [0,24,0,0,24,0];

//--------------------------
//--------------------------
//-----open hand------------
//--------------------------
//--------------------------

ClassSubList["monk-way of the open hand"].features["subclassfeature11"]["quivering palm"].description = desc([
	"When I hit a creature with an unarmed strike, I can start imperceptible vibrations",
	"Within my monk level in days, I can use an action to have the creature make a Con save",
	"If it fails, it is reduced to 0 hit points; If it succeeds, it takes 10d10 necrotic damage"]);
ClassSubList["monk-way of the open hand"].features["subclassfeature11"]["quivering palm"].usages = "Prof. Bonus per ";
ClassSubList["monk-way of the open hand"].features["subclassfeature11"]["quivering palm"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of the open hand"].features["subclassfeature11"]["quivering palm"].recovery = "long rest";

//--------------------------
//--------------------------
//-----4 elements-----------
//--------------------------
//--------------------------

SpellsList["shape the flowing river"] = {
	name : "Shape the flowing river",
	classes : [],
	source : [["HB", 1]],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "120 ft",
	components : "-",
	duration : "Conc, 1 min",
	description : "1+1/SL min, reshape 30-ft cube of water or ice. Can turn ice to water and vice versa. Can't harm",
	descriptionFull : "For the duration, as an action and when you first cast this spell, you can choose an area of ice or water no larger than 30 feet on a side within range. You can change water to ice within the area and vice versa, and you can reshape ice in the area in any manner you choose. You can raise or lower the ice's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. For example, if you affect a 30-foot square, you can create a pillar up to 15 feet high. raise or lower the square's elevation by up to 15 feet, dig a trench up to 15 feet deep, and so on. You can't shape the ice to trap or injure a creature in the area." + AtHigherLevels + "The duration increases by 1 minute per spell level above 1st."
};

SpellsList["water whip"] = {
	name : "Water Whip",
	classes : [],
	source : [["HB", 1]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "30 ft",
	components : "-",
	duration : "instantaneous",
	description : "3d10+1d10/SL bludgeoning and prone or pulled 25-ft to me. Save halves and no move",
	descriptionFull : "A creature that you can see within range of you must make a Dexterity saving throw. On a failed save, the creature takes 3d10 bludgeoning damage and you can either knock it prone or pull it up to 25 feet closer to you. On a successful save, the creature takes half as much damage, and you don't pull it or knock it prone." + AtHigherLevels + "The damage increases by 1d10 for each slot level above 2nd."
};

SpellsList["fangs of the fire snake"] = {
	name : "Fangs of the Fire Snake",
	classes : [],
	source : [["HB", 1]],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "self",
	components : "-",
	duration : "Conc, 1 min",
	description : "1 min (10 at lv 5), unarmed strikes deal fire damage, are 10-ft range, +1d10 fire",
	descriptionFull : "Your reach with your unarmed strikes increases by 10 feet for the duration. A hit with such an attack deals fire damage instead of bludgeoning damage, and it deals an extra 1d10 fire damage." + AtHigherLevels + "The duration increases to 10 minutes at 5th-level"
};

SpellsList["unbroken air"] = {
	name : "Unbroken Air",
	classes : [],
	source : [["HB", 1]],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "30 ft",
	components : "-",
	duration : "instantaneous",
	description : "3d10+1d10/SL bludgeoning and prone and pushed 20 ft. Save halves and no move",
	descriptionFull : "The target must make a STR-Saving throw. On a failed save, the creature takes 3d10 bludgeoning damage and you can push the creature up to 20 feet away from you and knock it prone. On a successful save, the creature takes half as much damage, and you don't push it or knock it prone." + AtHigherLevels + "The damage increases by 1d10 for each slot level above 2."
};

ClassSubList["monk-way of the four elements"].abilitySave = 5;
ClassSubList["monk-way of the four elements"].spellcastingFactor = 2;
ClassSubList["monk-way of the four elements"].spellcastingKnown = {
	cantrips : [0, 0, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	spells : [0, 0, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]};
ClassSubList["monk-way of the four elements"].spellcastingExtra = ["gust", "shocking grasp", "zephyr strike", "blur", "unbroken air", "fly", "freedom of movement", "greater invisibility", "steel wind strike","control flames", "fire bolt", "burning hands", "faerie fire", "scorching ray", "fangs of the fire snake", "wall of fire", "immolation","mold earth", "sapping sting", "thunderwave", "entangle", "hold person", "erupting earth", "stoneskin", "wall of stone", "destructive wave","shape water", "ray of frost", "shape the flowing river", "ice knife", "water whip", "water breathing", "water walk", "watery sphere", "cone of cold"];

ClassSubList["monk-way of the four elements"].features["subclassfeature3"]= {
	name : "Disciple of the Elements",
	source : ["HB", 1],
	minlevel : 3,
	description : "\n   " + "I know Elemental Attunement and gain spells when i attune to an element",
	additional : levels.map(function (n) {
		return n < 3 ? "" : ((n < 6 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + " known; ");
	}),
	extraname : "Elemental Discipline",
	extraTimes : levels.map(function (n) {
		return n < 3 ? 0 : n < 6 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4;
	}),
	autoSelectExtrachoices : [{ extrachoice : "elemental attunement" }],
	"elemental attunement" : {
		name : "Elemental Attunement",
		source : ["P", 81],
		description : "\n   " + "As an action, I can briefly control elemental forces within 30 ft of me" + "\n   " + "I can make a harmless sensory effect, light/snuff light, chill/warm 1 lb for 1 hour," + "\n   " + "or I cause earth/fire/water/mist in a 1 ft cube to shape itself into a form for 1 minute",
		action : ["action", ""]
	}
};

//--------------------------
//--------------------------
//-----shadow---------------
//--------------------------
//--------------------------

ClassSubList["monk-way of shadow"].features["subclassfeature3"]["shadow spells"].description = desc(["As an action, I can cast Darkness, Darkvision, Pass Without Trace, or Silence","I don't require spell slots or material components to cast these spells like this","I can cast any of these spells PB times per long rest"]);
ClassSubList["monk-way of shadow"].features["subclassfeature3"]["shadow spells"].usages = "Prof B. per ";
ClassSubList["monk-way of shadow"].features["subclassfeature3"]["shadow spells"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of shadow"].features["subclassfeature3"]["shadow spells"].recovery = "long rest";

//--------------------------
//--------------------------
//-----long death-----------
//--------------------------
//--------------------------

ClassSubList["monk-way of the long death"].features["subclassfeature11"].additional = null;
ClassSubList["monk-way of the long death"].features["subclassfeature11"].usages = "Prof B. per ";
ClassSubList["monk-way of the long death"].features["subclassfeature11"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of the long death"].features["subclassfeature11"].recovery = "long rest";

ClassSubList["monk-way of the long death"].features["subclassfeature11"].usages = "Prof B. per ";
ClassSubList["monk-way of the long death"].features["subclassfeature11"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of the long death"].features["subclassfeature11"].recovery = "long rest";

ClassSubList["monk-way of the long death"].features["subclassfeature11"]["touch of the long death"].usages = "Prof B. per ";
ClassSubList["monk-way of the long death"].features["subclassfeature11"]["touch of the long death"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of the long death"].features["subclassfeature11"]["touch of the long death"].recovery = "long rest";
ClassSubList["monk-way of the long death"].features["subclassfeature11"]["touch of the long death"].description = desc(["A target i hit with an unarmed strike must make a Con save or take 20d10 necrotic damage (save halves)"]);
ClassSubList["monk-way of the long death"].features["subclassfeature11"]["touch of the long death"].action = null;

//--------------------------
//--------------------------
//-----sun soul-------------
//--------------------------
//--------------------------

ClassSubList["monk-way of the sun soul"].features["subclassfeature3"].weaponOptions.description = null;
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"].description = desc([
	"I gain a ranged spell attack that I can use instead of an unarmed strike","This is still a ranged attack"]);
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"].additional = null;
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"].action = null;

ClassSubList["monk-way of the sun soul"].features["subclassfeature3"]["searing arc strike"].description = desc([
	"After taking the Attack action, I can cast Burning Hands as a bonus action [PHB 220]",
	"I can cast it PB times per long rest at a level equal to my PB."]);
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"]["searing arc strike"].additional = null;
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"]["searing arc strike"].spellcastingBonus["firstCol"] = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"]["searing arc strike"].spellFirstColTitle = "PB";
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"]["searing arc strike"].spellChanges.description = "3d6+PBd6 Fire dmg; save halves; unattended flammable objects ignite";
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"]["searing arc strike"].spellChanges.changes = "After I use the Attack action, I can cast Burning Hands as a bonus action PB times per long rest";
ClassSubList["monk-way of the sun soul"].features["subclassfeature3"]["searing arc strike"].extraLimitedFeatures = [{
	name : "Searing Arc Strike",
	usages : "Proficiency Bonus per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest"
}];

ClassSubList["monk-way of the sun soul"].features["subclassfeature11"].description = desc([
	"As one attack of the attack action, anyone in a 20-ft radius light on a point within 150 ft makes a Con save",
	"If failed and not behind opaque total cover, take 2d6 radiant damage",
	"The damage increases by 1d6 at levels 14 and 17"]);
ClassSubList["monk-way of the sun soul"].features["subclassfeature11"].additional = null;
ClassSubList["monk-way of the sun soul"].features["subclassfeature11"].weaponOptions.description = desc(["All in 20-ft radius; Con save - success no damage; +2d6 damage extra use"]);

//--------------------------
//--------------------------
//-----drunken master-------
//--------------------------
//--------------------------

ClassSubList["monk-way of the drunken master"].features["subclassfeature6"].description = desc(["as a reaction if missed in melee, attacker instead hits other I see within 5 ft"]);
ClassSubList["monk-way of the drunken master"].features["subclassfeature6"].usages = "Prof. Bonus per ";
ClassSubList["monk-way of the drunken master"].features["subclassfeature6"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of the drunken master"].features["subclassfeature6"].recovery = "long rest";

ClassSubList["monk-way of the drunken master"].features["subclassfeature11"].description = desc(["I can remove disadv. from an ability check, attack roll, or save I make"]);
ClassSubList["monk-way of the drunken master"].features["subclassfeature11"].usages = "Prof. Bonus per ";
ClassSubList["monk-way of the drunken master"].features["subclassfeature11"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of the drunken master"].features["subclassfeature11"].recovery = "long rest";

//--------------------------
//--------------------------
//-----kensei---------------
//--------------------------
//--------------------------

RunFunctionAtEnd(function () {
	ClassSubList["monk-way of the kensei"].features["ki-empowered strikes"]["deft strike"].additional = null;
	ClassSubList["monk-way of the kensei"].features["ki-empowered strikes"]["deft strike"].usages = "Prof. Bonus per ";
	ClassSubList["monk-way of the kensei"].features["ki-empowered strikes"]["deft strike"].usagescalc = "event.value = How('Proficiency Bonus');";
	ClassSubList["monk-way of the kensei"].features["ki-empowered strikes"]["deft strike"].recovery = "long rest";
	ClassSubList["monk-way of the kensei"].features["ki-empowered strikes"]["sharpen the blade"].additional = null;
	ClassSubList["monk-way of the kensei"].features["ki-empowered strikes"]["sharpen the blade"].action = null;
	ClassSubList["monk-way of the kensei"].features["ki-empowered strikes"]["sharpen the blade"].description = desc([
		"One of my kensei weapons becomes magical with a bonus to attack and damage rolls",
		"This bonus is 1. It increases to 2 at Lv14 and 3 at Lv17",
		"I can change the affected weapon on a long rest"]);
});
//--------------------------
//--------------------------
//-----mercy----------------
//--------------------------
//--------------------------

ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of healing"].usages = "Prof. Bonus per ";
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of healing"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of healing"].recovery = "long rest";
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of healing"].description = levels.map(function (n) {
	var a = "As an action, I can spend touch a creature and restore a number of its HP";
	var b6 = "It also recovers from one disease or being blinded, deafened, paralyzed, poisoned or stunned";
	var c = "When I use Flurry of Blows, I can do this instead of one unarmed strike";
	return desc( n < 6 ? [a, c] :
		[a, b6, n < 11 ? c : c.replace("one", "each")]
	);
});
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of healing"].additional = levels.map(function (n) {
	return n < 3 ? "" : "heal 1d" + (n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10) + " + Wisdom modifier";});

ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of harm"].usages = "Prof. Bonus per ";
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of harm"].usagescalc = "event.value = How('Proficiency Bonus');";
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of harm"].recovery = "long rest";
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of harm"].description = levels.map(function (n) {
	var a = "When I hit a creature with an unarmed strike, I can deal extra damage";
	var b6 = "I can also subject the target to the poisoned condition until the end of my next turn";
	var c11 = "When I use Flurry of Blows, I can deal extra damage with both unarmed strikes (but only poison once)";
	var d = "I can use this feature only once per turn";
	return desc( n < 6 ? [a, d] :
		n < 11 ? [a, b6, d] :
		[a, b6, c11, d]
	);
});
ClassSubList["monk-way of mercy"].features["subclassfeature3"]["hands of harm"].additional = levels.map(function (n) {
return n < 3 ? "" : "1d" + (n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10) + " + Wis mod necrotic damage"});

ClassSubList["monk-way of mercy"].features["subclassfeature11"].description = desc([
	"I can use Hand of Healing instead of each Flurry of Blows unarmed strike for one use",
	"I can deal Hand of Harm's bonus damage on each Flurry of Blows unarmed strike without (but only poison once)"
]);

ClassSubList["monk-way of mercy"].features["subclassfeature11"]["hand of ultimate mercy"].description = desc([
	"As an action, I can touch a creature that died in the last 24 hours",
	"The creature returns to life and regains 4d10 + my Wisdom modifier in hit points",
	"It is also cured of all these conditions: blinded, deafened, paralyzed, poisoned, and stunned"
]);
ClassSubList["monk-way of mercy"].features["subclassfeature11"]["hand of ultimate mercy"].additional = null;
ClassSubList["monk-way of mercy"].features["subclassfeature11"]["hand of ultimate mercy"].usages = 1;
ClassSubList["monk-way of mercy"].features["subclassfeature11"]["hand of ultimate mercy"].recovery = "long rest";

//--------------------------
//--------------------------
//-----astral---------------
//--------------------------
//--------------------------

ClassSubList["monk-way of the astral self"].features["subclassfeature3"].description = desc(["As a bonus action, I can summon any number of parts of my astral self for 10 minutes","I can summon the arms of my astral self"]);
ClassSubList["monk-way of the astral self"].features["subclassfeature3"].extraLimitedFeatures = [{
	name : "Astral self",
	usages : "Proficiency Bonus per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest"
}];
ClassSubList["monk-way of the astral self"].features["subclassfeature3"]["astral arms"].description = desc([
	"As a bonus action, I can summon my astral arms to hover next to or over my own arms",
	"When I summon them, all creatures of my choice I can see in 10 ft must make a Dex save",
	"If failed, they take twice my martial arts die in force damage",
	"I can use the arms to make unarmed strikes, using Wisdom instead of Strength/Dexterity",
	"I have +5 ft reach on attacks made with my astral arms and they deal force damage",
	"They last for 10 minutes or until I'm incapacitated or die; I choose their appearance"
]);

ClassSubList["monk-way of the astral self"].features["subclassfeature6"].description = desc(["I can summon the visage of my astral self"]);
ClassSubList["monk-way of the astral self"].features["subclassfeature6"]["astral visage"].description = desc([
	"I can summon my astral visage",
	"It lasts for 10 minutes or until I'm incapacitated or die; I choose its appearance",
	"My astral visage covers my face like a helmet or mask and grants me the following benefits:",
	" \u2022 Astral Sight: I can see normally in normal and magical darkness to a distance of 120 ft",
	" \u2022 Wisdom of the Spirit: I have advantage on Wisdom (Insight) and Charisma (Intimidation)",
	" \u2022 Word of the Spirit: I can have only one target I can see in 60 ft hear me, or all in 300 ft"
]);

ClassSubList["monk-way of the astral self"].features["subclassfeature11"].description = desc(["I can summon the body of my astral self"]);
ClassSubList["monk-way of the astral self"].features["subclassfeature11"]["astral body"].description = desc([
	" \u2022 Deflect Energy: As a reaction when I take damage, I can reduce it by 1d10 + Wis mod",
	"   I can only do this if the damage I take is acid, cold, fire, force, lightning, or thunder",
	" \u2022 Empowered Arms: Once per my turn, I can add martial art die to astral arms damage"
]);


ClassSubList["monk-way of the astral self"].features["subclassfeature17"].description = desc(["I can summon astral arms and visage with benefits"]);
ClassSubList["monk-way of the astral self"].features["subclassfeature17"].action = null;

ClassSubList["monk-way of the astral self"].features["subclassfeature17"]["astral body"].description = desc([
	"I can summon my astral arms and astral visage, with extra benefits:",
	" \u2022 Armor of the Spirit: I gain a +2 bonus to my armor class",
	" \u2022 Astral Barrage: I can do three attacks with the Attack action, if all are with astral arms"
]);


//--------------------------
//--------------------------
//-----dragon---------------
//--------------------------
//--------------------------

ClassSubList["monk-ascendant dragon"].features["subclassfeature3"]["breath of the dragon"].description = levels.map(function (n) {
	var iMonkDie = n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10;;
	var aDesc = [
		"When I take the Attack action on my turn, I can replace one attack with a breath weapon",
		"This deals " + (n < 11 ? 2 : n<17 ? 3 : 4) + "d" + iMonkDie + " acid, cold, fire, lightning, or poison (my choice) damage to all in the area",
		"The area can be a " + (n<17? "20-ft":"60-ft")+" cone or a 5-ft wide, " + (n<17? "30-ft":"90-ft")+" line; Dex save to halve the damage",
		"I can do this my Proficiency Bonus times per long rest"
	];
	return aDesc;
});
ClassSubList["monk-ascendant dragon"].features["subclassfeature3"]["breath of the dragon"].altResource = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature3"]["breath of the dragon"].calcChanges.atkAdd = [
	function (fields, v) {
		if (classes.known.monk && classes.known.monk.level && v.theWea.WotAD_BreathWeapon) {
			var n = classes.known.monk.level;
			var aMonkDie = n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10;
			fields.Damage_Die = (n < 11 ? 2 : n < 17 ? 3 : 4) + "d" + aMonkDie;
			
			fields.range = (n < 17 ? "5-ft \xD7 30-ft line":"5-ft \xD7 90-ft line");
			fields.Description = (n < 17 ? "All in area; Dex save for half damage; Alt: 20-ft cone; Type: acid/cold/fire/lightning/poison":"All in area; Dex save for half damage; Alt: 60-ft cone; Type: acid/cold/fire/lightning/poison");
		};
	},
	"My Breath of the Dragon deals damage equal to two rolls of my Martials Arts die. At 11th level, this increases to three rolls of my Martial Arts die. At 17th level the breath's damage increases to four rolls of my Martial Arts die."
];

ClassSubList["monk-ascendant dragon"].features["subclassfeature3"]["breath of the dragon"].additional = levels.map(function (n) {
	return n < 3 ? "" : (n < 11 ? 2 : n < 17 ? 3 : 4) + "d" + (n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10);});

ClassSubList["monk-ascendant dragon"].features["subclassfeature6"].name = "Inner Dragon: Wings Unfurled";
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"].usages = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"].usagescalc = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"].recovery = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"].extraLimitedFeatures = [{
	name : "Inner Dragon",
	usages : "Proficiency Bonus per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest"
}];

ClassSubList["monk-ascendant dragon"].features["subclassfeature6"]["aspect of the wyrm"].name = "Inner Dragon: Aspect of the Wyrm";
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"]["aspect of the wyrm"].usages = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"]["aspect of the wyrm"].usagescalc = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"]["aspect of the wyrm"].recovery = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"]["aspect of the wyrm"].altResource = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature6"]["aspect of the wyrm"].description = levels.map(function (n) {
	var aDesc = [
		"As a bonus action, I can activate a 10 ft aura for 1 minute that grants me one benefit:",
		" \u2022 My allies in the aura and I gain resistance to acid, cold, fire, lightning, or poison damage",
		" \u2022 When I create this aura and as a bonus action while it is active, I can frighten a creature",
		"      One creature must make a Wisdom save or become frightened of me for 1 minute",
		"      It can repeat the save at the end of each of its turns, ending the effect on a success"
	];
	if (n < 17) return desc(aDesc);
	var aDesc17 = [
		"From 17th-level, when I active this, I can choose any creatures I can see in the aura",
		"Each must then make a Dex save or take 3d10 acid, cold, fire, lightning, or poison damage"
	];
	return desc(aDesc.concat(aDesc17));
});

ClassSubList["monk-ascendant dragon"].features["subclassfeature17"].weaponOptions = null;
ClassSubList["monk-ascendant dragon"].features["subclassfeature17"].weaponsAdd = null;
