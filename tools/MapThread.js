/*
*	@filename	MapThread.js
*	@author		theBGuy
*	@desc		MapThread used with D2BotMap.dbj
*	@credits 	kolton for orginal MapThread, isidOre for the box/frame style
*/

var Hooks = {
	dashboardX: 400,
	dashboardY: 490,
	portalX: 12,
	portalY: 432,
	statBoxAX: 151,
	statBoxAY: 520,
	statBoxBX: 645,
	statBoxBY: 520,
	resfixX: me.screensize ? 0 : -85,
	resfixY: me.screensize ? 0 : -120,
	upperRightResfixX: me.screensize ? 0 : -160,
	lowerRightResfixX: me.screensize ? 0 : -85,
	lowerLeftResfixX: me.screensize ? 0 : -85,
	dashboardWidthResfixX: me.screensize ? 0 : -5,

	items: {
		hooks: [],
		enabled: true,

		check: function () {
			if (!this.enabled) {
				this.flush();

				return;
			}

			var i, item;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (!copyUnit(this.hooks[i].item).x) {
					for (let j = 0; j < this.hooks[i].hook.length; j++) {
						this.hooks[i].hook[j].remove();
					}

					this.hooks[i].name[0].remove();
					this.hooks[i].vector[0].remove();
					this.hooks.splice(i, 1);
					i -= 1;
				}
			}

			item = getUnit(4);

			if (item) {
				do {
					if ((item.mode === 3 || item.mode === 5) && (item.quality >= 5 || (item.quality === 4 && [58, 82].indexOf(item.itemType) > -1) || [39, 74].indexOf(item.itemType) > -1)) {
						if (!this.getHook(item)) {
							this.add(item);
						}

						this.update(); 
					} else {
						this.remove(item);
					}
				} while (item.getNext());
			}
		},

		update: function () {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				this.hooks[i].vector[0].x = me.x;
				this.hooks[i].vector[0].y = me.y;
			}
		},

		newHook: function (item) {
			var color, code, arr = [], name = [], vector = [];
			// White: ÿc0, Red: ÿc1, Light Green: ÿc2, Blue: ÿc3, Gold: ÿc4, Gray: ÿc5, Black: ÿc6, Lighter Gold?: ÿc7, Orange: ÿc8, Tan?: ÿc9, Dark Green: ÿc:, Purple: ÿc;, Green: ÿc<"

			switch (item.quality) {
			case 2:
				switch (item.itemType) {
				case 39:
					switch (item.classid) {
					case 644:
					case 645:
					case 646:
					case 647:
					case 648:
					case 649:
					case 650:
					case 651:
					case 652:
						color = 0x9A;
						code = "ÿc8" + item.fname;

						break;
					case 653:
						color = 0x9A;
						code = "ÿc8Token";
						break;
					case 654:
						color = 0x9A;
						code = "ÿc3Ess-Of-Suffering";
						break;
					case 655:
						color = 0x9A;
						code = "ÿc7Ess-Of-Hatred";
						break;
					case 656:
						color = 0x9A;
						code = "ÿc1Ess-Of-Terror";
						break;
					case 657:
						color = 0x9A;
						code = "ÿc3Ess-Of-Destruction";
						break;
					}

					name.push(new Text(code, 675 + Hooks.upperRightResfixX, 104 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)) + (this.hooks.length * 14), color, 0, 0));

					break;
				case 74:
					if (item.classid >= 635) {
						color = 0x9B;
						code = "ÿc;";
					} else if (item.classid >= 626) {
						color = 0x9A;
						code = "ÿc8";
					} else {
						color = 0xA1;
						code = "";
					}

					name.push(new Text(code + item.fname, 675 + Hooks.upperRightResfixX, 104 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)) + (this.hooks.length * 14), color, 0, 0));

					break	
				}

				break;
			case 4: 	// Magic
				color = 0x97;
				code = "ÿc3" + item.name + "(" + item.ilvl + ")";

				name.push(new Text(code, 675 + Hooks.upperRightResfixX, 104 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)) + (this.hooks.length * 14), color, 0, 0));
				break;
			case 5: 	// Set
			case 7: 	// Unique
				if (item.quality === 5) {
					color = 0x84;
					code = "ÿc2";	
				}
				
				if (item.quality === 7) {
					color = 0xA8;
					code = "ÿc4";	
				}

				switch (item.classid) {
				//Uniques
				case 603:
					code += item.quality === 5 ? "" : "Annihilus";
					break;
				case 604:
					code += item.quality === 5 ? "" : "Hellfire Torch";
					break;
				case 605:
					code += item.quality === 5 ? "" : "Gheed's";
					break;
				case 643:
					code += item.quality === 5 ? "" : "Facet";
					break;
				case 522: 	// Amulet's
				case 520: 	// Ring's
					code += item.name + "(" + item.ilvl + ")";
					
					break;
				case 432:
					code += item.quality === 5 ? "" : "Gladiator's Bane";
					break;
				case 300:
					code += item.quality === 5 ? "" : "Death's Fathom";
					break;
				case 297:
					code += item.quality === 5 ? "" : "Eschuta's";
					break;
				case 477:
					code += item.quality === 5 ? "" : "Arreat's Face";
					break;
				case 495:
					code += item.quality === 5 ? "" : "Demonhorn's";
					break;
				case 496:
					code += item.quality === 5 ? "" : "Halaberd's";
					break;
				case 494:
					code += item.quality === 5 ? "" : "Wolfhowl";
					break;
				case 472:
					code += item.quality === 5 ? "" : "Jalal's";
					break;
				case 488:
					code += item.quality === 5 ? "" : "Cerebus";
					break;
				case 490:
					code += item.quality === 5 ? "" : "Spirit Keeper";
					break;
				case 481:
					code += item.quality === 5 ? "" : "HoZ";
					break;
				case 499:
					code += item.quality === 5 ? "" : "Alma Negra";
					break;
				case 501:
					code += item.quality === 5 ? "" : "Dragonscale";
					break;
				case 292:
					code += item.quality === 5 ? "" : "Lycander's Aim";
					break;
				case 295:
					code += item.quality === 5 ? "" : "Titan's Revenge";
					break;
				case 294:
					code += item.quality === 5 ? "" : "Lycander's Pike";
					break;
				case 301:
					code += item.quality === 5 ? "" : "Bloodraven's";
					break;
				case 305:
					code += item.quality === 5 ? "" : "T-Stroke";
					break;
				case 303:
					code += item.quality === 5 ? "" : "Stoneraven";
					break;
				case 187:
					code += item.quality === 5 ? "" : "Bartuc's";
					break;
				case 193:
					code += item.quality === 5 ? "" : "Firelizard's";
					break;
				case 190:
					code += item.quality === 5 ? "" : "Jade Talon";
					break;
				case 192:
					code += item.quality === 5 ? "" : "Shadow Killer";
					break;
				case 487:
					code += item.quality === 5 ? "" : "Homunculus";
					break;
				case 506:
					code += item.quality === 5 ? "" : "Boneflame";
					break;
				case 507:
					code += item.quality === 5 ? "" : "Darkforce";
					break;
				case 417:
					code += item.quality === 5 ? "" : "Andariel's";
					break;
				case 426:
					code += item.quality === 5 ? "" : "Nightwing's";
					break;
				case 507:
					code += item.quality === 5 ? "" : "Darkforce";
					break;
				case 422:
					code += item.quality === 5 ? "" : "Shako";
					break;
				case 353:
					code += item.quality === 5 ? "" : "Rockstopper";
					break;
				case 352:
					code += item.quality === 5 ? "" : "Peasant Crown";
					break;
				case 258:
					code += item.quality === 5 ? "" : "Stormspire";
					break;
				case 256:
					code += item.quality === 5 ? "" : "Tomb Reaver";
					break;
				case 255:
					code += item.quality === 5 ? "" : "Reaper's Toll";
					break;
				case 198:
					code += item.quality === 5 ? "" : "Rune Master";
					break;
				case 271:
					code += item.quality === 5 ? "" : "Windforce";
					break;
				case 270:
					code += item.quality === 5 ? "" : "Ward Bow";
					break;
				case 269:
					code += item.quality === 5 ? "" : "Eaglehorn";
					break;
				case 263:
					code += item.quality === 5 ? "" : "Mang Song's";
					break;
				case 420:
					code += item.quality === 5 ? "" : "Kira's";
					break;
				case 457:
					code += item.quality === 5 ? "" : "Marrowwalk";
					break;
				case 459:
					code += item.quality === 5 ? "" : "Shadow Dancer";
					break;
				case 456:
					code += item.quality === 5 ? "" : "Sandstorm Trek's";
					break;
				case 386:
					code += item.quality === 5 ? "" : "Waterwalk";
					break;
				case 342:
					code += item.quality === 5 ? "" : "Goblin Toe";
					break;
				case 373:
					code += item.quality === 5 ? "" : "Que-Hegan's";
					break;
				case 367:
					code += item.quality === 5 ? "" : "Skullder's";
					break;
				case 365:
					code += item.quality === 5 ? "" : "Shaftstop";
					break;
				case 366:
					code += item.quality === 5 ? "" : "Duriel's Shell";
					break;
				case 360:
					code += item.quality === 5 ? "" : "Vipermagi's";
					break;
				case 359:
					code += item.quality === 5 ? "" : "Spirit Shroud";
					break;
				//Set Items/Uniques
				case 290:
					code += item.quality === 5 ? "Tal Orb" : "Occulus";
					break;
				case 490:
					code += item.quality === 5 ? "Tal Armor" : "";
					break;
				case 358:
					code += item.quality === 5 ? "Tal Helm" : "Blackhorn's";
					break;
				case 392:
					code += item.quality === 5 ? "Tal Belt" : "Gloom's Trap";
					break;
				case 465:
					code += item.quality === 5 ? "Trang Helm" : "Giant Skull";
					break;
				case 371:
					code += item.quality === 5 ? "Trang Armor" : "Black Hades";
					break;
				case 463:
					code += item.quality === 5 ? "Trang Belt" : "";
					break;
				case 382:
					code += item.quality === 5 ? "Trang Gloves" : "Ghoulhide";
					break;
				case 486:
					code += item.quality === 5 ? "Trang Shield" : "";
					break;
				case 219:
					code += item.quality === 5 ? "IK Maul" : "Windhammer";
					break;
				case 407:
					code += item.quality === 5 ? "IK Helm" : "";
					break;
				case 442:
					code += item.quality === 5 ? "IK Armor" : item.ilvl === 87 ? "Tyrael's Might" : "Templar's Might";
					break;
				case 384:
					code += item.quality === 5 ? "IK Gloves" : "HellMouth";
					break;
				case 389:
					code += item.quality === 5 ? "IK Boots" : "Gore Rider";
					break;
				case 113:
					code += item.quality === 5 ? "Aldur's Wep" : "Moonfall";
					break;
				case 470:
					code += item.quality === 5 ? "Aldur's Helm" : "";
					break;
				case 441:
					code += item.quality === 5 ? "Aldur's Armor" : "Steel Carapace";
					break;
				case 113:
					code += item.quality === 5 ? "Aldur's Boots" : "War Trav's";
					break;
				case 213:
					code += item.quality === 5 ? "Griswold's Wep" : "Moonfall";
					break;
				case 427:
					code += item.quality === 5 ? "Griswold's Helm" : "CoA";
					break;
				case 372:
					code += item.quality === 5 ? "Griswold's Armor" : "Corpsemourn";
					break;
				case 502:
					code += item.quality === 5 ? "Griswold's Shield" : "";
					break;
				case 429:
					code += item.quality === 5 ? "Disciple's Armor" : "Ormus Robe's";
					break;
				case 462:
					code += item.quality === 5 ? "Disciple's Belt" : "Verdungo's";
					break;
				case 450:
					code += item.quality === 5 ? "Disciple's Gloves" : "";
					break;
				case 385:
					code += item.quality === 5 ? "Disciple's Boots" : "Infernostride";
					break;
				case 418:
					code += item.quality === 5 ? "Naj's Helm" : "";
					break;
				case 438:
					code += item.quality === 5 ? "Naj's Armor" : "";
					break;
				case 261:
					code += item.quality === 5 ? "Naj's Staff" : "Ondal's";
					break;
				case 418:
					code += item.quality === 5 ? "Naj's Helm" : "Moonfall";
					break;
				case 418:
					code += item.quality === 5 ? "Mavina's Bow" : "";
					break;
				case 439:
					code += item.quality === 5 ? "Mavina's Armor" : "Leviathan";
					break;
				case 421:
					code += item.quality === 5 ? "Mavina's Helm" : "Griffon's Eye";
					break;
				case 391:
					code += item.quality === 5 ? "Mavina's Belt" : "Razortail";
					break;
				case 383:
					code += item.quality === 5 ? "Mavina's Gloves" : "Lava Gout";
					break;
				case 329:
					code += item.quality === 5 ? "Orphan's Shield" : "Umbral Disk";
					break;
				case 356:
					code += item.quality === 5 ? "G-Face" : "Valk Wing";
					break;
				case 347:
					code += item.quality === 5 ? "Orphan's Belt" : "Snowclash";
					break;
				case 335:
					code += item.quality === 5 ? "Orphan's Gloves" : "Bloodfist";
					break;
				case 181:
					code += item.quality === 5 ? "Natalya's Wep" : "";
					break;
				case 434:
					code += item.quality === 5 ? "Natalya's Armor" : "";
					break;
				case 395:
					code += item.quality === 5 ? "Natalya's Helm" : "Vamp Gaze";
					break;
				case 387:
					code += item.quality === 5 ? "Natalya's Boots" : "Silkweave";
					break;
				case 227:
					code += item.quality === 5 ? "Sazabi's Wep" : "Frostwind";
					break;
				case 437:
					code += item.quality === 5 ? "Sazabi's Armor" : "Arkaine's";
					break;
				case 19:
					code += item.quality === 5 ? "Heavens's Wep" : "Crushflange";
					break;
				case 320:
					code += item.quality === 5 ? item.name : "Venom Ward";
					break;
				case 333:
					code += item.quality === 5 ? "Heavens's Shield" : "The Ward";
					break;
				case 310:
					code += item.quality === 5 ? "Heavens's Helm" : "Howltusk";
					break;
				case 317:
					code += item.quality === 5 ? "Angelic's Armor" : "Darkglow";
					break;
				case 27:
					code += item.quality === 5 ? "Angelic's Wep" : "Krintiz";
					break;
				case 307:
					code += item.quality === 5 ? "Arcanna's Helm" : "Tarnhelm";
					break;
				case 327:
					code += item.quality === 5 ? "Arcanna's Armor" : "Heavenly Garb";
					break;
				case 67:
					code += item.quality === 5 ? "Arcanna's Staff" : "Iron Jang Bong";
					break;
				case 337:
					code += item.quality === 5 ? "Artic's Gloves" : "Magefist";
					break;
				case 345:
					code += item.quality === 5 ? "Artic's Belt" : "Snakecord";
					break;
				case 313:
					code += item.quality === 5 ? "Artic's Armor" : "Greyform";
					break;
				case 74:
					code += item.quality === 5 ? "Artic's Bow" : "Hellclap";
					break;
				case 2:
					code += item.quality === 5 ? "Beserker's Wep" : "Bladebone";
					break;
				case 321:
					code += item.quality === 5 ? "Beserker's Armor" : "Iceblink";
					break;
				case 308:
					code += item.quality === 5 ? "Beserker's Helm" : "Coif of Glory";
					break;
				case 234:
					code += item.quality === 5 ? "Bul-Kathos' Blade" : "Grandfather";
					break;
				case 228:
					code += item.quality === 5 ? "Bul-Kathos' Sword" : "";
					break;
				case 151:
					code += item.quality === 5 ? "Hwanin's Bill" : "Blackleach";
					break;
				case 364:
					code += item.quality === 5 ? "Hwanin's Armor" : "Crow Caw";
					break;
				case 357:
					code += item.quality === 5 ? "Hwanin's Helm" : "Crown of Thieves";
					break;
				case 346:
					code += item.quality === 5 ? item.name : "Nightsmoke";
					break;
				default:
					code += item.name;
					break;
				}

				name.push(new Text(code, 675 + Hooks.upperRightResfixX, 104 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)) + (this.hooks.length * 14), color, 0, 0));
	
				break;
			case 6: 	// Rare
				color = 0x6F;
				code = "ÿc9" + item.name + "(" + item.ilvl + ")";

				name.push(new Text(code, 675 + Hooks.upperRightResfixX, 104 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)) + (this.hooks.length * 14), color, 0, 0));

				break;
			}

			vector.push(new Line(me.x, me.y, item.x, item.y, color, true));

			arr.push(new Line(item.x - 3, item.y, item.x + 3, item.y, color, true));
			arr.push(new Line(item.x, item.y - 3, item.x, item.y + 3, color, true));

			return {
				itemLoc: arr,
				itemName: name,
				vector: vector,
			};
		},

		add: function (item) {
			let temp = this.newHook(item);

			this.hooks.push({
				item: copyUnit(item),
				hook: temp.itemLoc,
				name: temp.itemName,
				vector: temp.vector,
			});
		},

		getHook: function (item) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].item.gid === item.gid) {
					return this.hooks[i].hook;
				}
			}

			return false;
		},

		remove: function (item) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].item.gid === item.gid) {
					for (let j = 0; j < this.hooks[i].hook.length; j++) {
						this.hooks[i].hook[j].remove();
					}
					
					this.hooks[i].name[0].remove();
					this.hooks[i].vector[0].remove();
					this.hooks.splice(i, 1);

					return true;
				}
			}

			return false;
		},

		flush: function () {
			while (this.hooks.length) {
				for (let j = 0; j < this.hooks[0].hook.length; j++) {
					this.hooks[0].hook[j].remove();
				}

				this.hooks[0].name[0].remove();
				this.hooks[0].vector[0].remove();
				this.hooks.shift();
			}

		}
	},

	monsters: {
		hooks: [],
		enabled: true,

		check: function () {
			if (!this.enabled) {
				this.flush();

				return;
			}

			var i, unit;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (!copyUnit(this.hooks[i].unit).x) {
					this.hooks[i].hook[0].remove();
					this.hooks[i].hook[1].remove();
					this.hooks.splice(i, 1);

					i -= 1;
				}
			}

			unit = getUnit(1);

			if (unit) {
				do {
					if (Attack.checkMonster(unit)) {
						if (!this.getHook(unit)) {
							this.add(unit);
						} else {
							this.updateCoords(unit);
						}
					} else {
						this.remove(unit);
					}
				} while (unit.getNext());
			}
		},

		newHook: function (unit) {
			var arr = [];

			arr.push(new Line(unit.x - 5, unit.y, unit.x + 5, unit.y, (unit.spectype & 0xF) ? 0x68 : 0x62, true));
			arr.push(new Line(unit.x, unit.y - 5, unit.x, unit.y + 5, (unit.spectype & 0xF) ? 0x68 : 0x62, true));

			return arr;
		},

		add: function (unit) {
			this.hooks.push({
				unit: copyUnit(unit),
				hook: this.newHook(unit)
			});
		},

		updateCoords: function (unit) {
			var hook = this.getHook(unit);

			if (!hook) {
				return false;
			}

			hook[0].x = unit.x - 5;
			hook[0].x2 = unit.x + 5;
			hook[0].y = unit.y;
			hook[0].y2 = unit.y;
			hook[1].x = unit.x;
			hook[1].x2 = unit.x;
			hook[1].y = unit.y - 5;
			hook[1].y2 = unit.y + 5;

			return true;
		},

		getHook: function (unit) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].unit.gid === unit.gid) {
					return this.hooks[i].hook;
				}
			}

			return false;
		},

		remove: function (unit) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].unit.gid === unit.gid) {
					this.hooks[i].hook[0].remove();
					this.hooks[i].hook[1].remove();
					this.hooks.splice(i, 1);

					return true;
				}
			}

			return false;
		},

		flush: function () {
			while (this.hooks.length) {
				this.hooks[0].hook[0].remove();
				this.hooks[0].hook[1].remove();
				this.hooks.shift();
			}
		}
	},

	shrines: {
		hooks: [],
		enabled: true,

		check: function () {
			if (!this.enabled) {
				this.flush();

				return;
			}

			var i, shrine;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (!copyUnit(this.hooks[i].shrine).x) {
					this.hooks[i].hook[0].remove();
					this.hooks.splice(i, 1);

					i -= 1;
				}
			}

			shrine = getUnit(2, "shrine");

			if (shrine) {
				do {
					if (shrine.mode === 0) {
						if (!this.getHook(shrine)) {
							this.add(shrine);
						} 
					} else {
						this.remove(shrine);
					}
				} while (shrine.getNext());
			}
		},

		newHook: function (shrine) {
			var arr = [];

			switch (shrine.objtype) {
				case 1:
					arr.push(new Text("Refilling", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 2:
					arr.push(new Text("Health", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 3:
					arr.push(new Text("Mana", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 4:
					arr.push(new Text("Health Exchange", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 5:
					arr.push(new Text("Mana Exchange", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 6:
					arr.push(new Text("Armor", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 7:
					arr.push(new Text("Combat", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 8:
					arr.push(new Text("Resist Fire", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 9:
					arr.push(new Text("Resist Cold", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 10:
					arr.push(new Text("Resist Lightning", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 11:
					arr.push(new Text("Resist Poison", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 12:
					arr.push(new Text("Skill", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 13:
					arr.push(new Text("Mana Recharge", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 14:
					arr.push(new Text("Stamina", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 15:
					arr.push(new Text("Experience", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 16:
					arr.push(new Text("Enirhs", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 17:
					arr.push(new Text("Portal", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 18:
					arr.push(new Text("Gem", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 19:
					arr.push(new Text("Fire", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 20:
					arr.push(new Text("Monster", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 21:
					arr.push(new Text("Exploding", shrine.x, shrine.y, 4, 6, 2, true));
					break;
				case 22:
					arr.push(new Text("Poison", shrine.x, shrine.y, 4, 6, 2, true));
					break;
			}

			return arr;
		},

		add: function (shrine) {
			this.hooks.push({
				shrine: copyUnit(shrine),
				hook: this.newHook(shrine)
			});
		},

		getHook: function (shrine) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].shrine.gid === shrine.gid) {
					return this.hooks[i].hook;
				}
			}

			return false;
		},

		remove: function (shrine) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].shrine.gid === shrine.gid) {
					this.hooks[i].hook[0].remove();
					this.hooks.splice(i, 1);

					return true;
				}
			}

			return false;
		},

		flush: function () {
			while (this.hooks.length) {
				this.hooks[0].hook[0].remove();
				this.hooks.shift();
			}
		}
	},

	text: {
		hooks: [],
		enabled: true,
		frameYSizeScale: 0,
		frameYLocScale: 0,

		getScale: function () {
			switch (me.area) {
			case 1:
			case 75:
			case 103:
			case 8:
			case 9:
			case 12:
			case 13:
			case 14:
			case 16:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 30:
			case 31:
			case 33:
			case 34:
			case 36:
			case 37:
			case 38:
			case 45:
			case 46:
			case 48:
			case 49:
			case 50:
			case 51:
			case 53:
			case 54:
			case 55:
			case 56:
			case 58:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 82:
			case 84:
			case 85:
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
			case 91:
			case 94:
			case 95:
			case 96:
			case 97:
			case 98:
			case 99:
			case 100:
			case 102:
			case 104:
			case 114:
			case 116:
			case 119:
			case 120:
			case 121:
			case 122:
			case 124:
			case 125:
			case 126:
			case 127:
			case 128:
			case 130:
			case 132:
			case 133:
			case 134:
			case 135:
			case 136:
				this.frameYSizeScale = -30;
				this.frameYLocScale = 30;
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 40:
			case 42:
			case 43:
			case 44:
			case 76:
			case 78:
			case 80:
			case 81:
			case 83:
			case 107:
			case 111:
			case 112:
			case 113:
			case 117:
			case 118:
				this.frameYSizeScale = -10;
				this.frameYLocScale = 10;
				break;
			case 2:
			case 7:
			case 10:
			case 18:
			case 27:
			case 28:
			case 29:
			case 32:
			case 35:
			case 41:
			case 47:
			case 52:
			case 57:
			case 59:
			case 77:
			case 79:
			case 92:
			case 93:
			case 101:
			case 105:
			case 106:
			case 109:
			case 110:
			case 123:
			case 129:
			case 131:
				this.frameYSizeScale = -20;
				this.frameYLocScale = 20;
				break;
			default:
				this.frameYSizeScale = 0;
				this.frameYLocScale = 0;
			}
		},

		check: function () {
			if (!this.enabled) {
				this.flush();

				return;
			}

			this.getScale();

			if (!this.getHook("dashboard")) {
				this.add("dashboard");
			}

			if (!this.getHook("dashboardframe")) {
				this.add("dashboardframe");
			}

			if (!this.getHook("statBoxA")) {
				this.add("statBoxA");
			}

			if (!this.getHook("statFrameA")) {
				this.add("statFrameA");
			}

			if (!this.getHook("statBoxB")) {
				this.add("statBoxB");
			}

			if (!this.getHook("statFrameB")) {
				this.add("statFrameB");
			}

			if (!this.getHook("statlineA")) {
				this.add("statlineA");
			}

			if (!this.getHook("statlineB")) {
				this.add("statlineB");
			}

			if (!this.getHook("statlineC")) {
				this.add("statlineC");
			}

			if (!this.getHook("statlineD")) {
				this.add("statlineD");
			}

			if (!this.getHook("monsterStatus")) {
				this.add("monsterStatus");
			}

			if (!this.getHook("vectorStatus")) {
				this.add("vectorStatus");
			}

			if (!this.getHook("ping")) {
				this.add("ping");
			} else {
				this.getHook("ping").hook.text = "Ping: " + me.ping;
			}

			if (!this.getHook("time")) {
				this.add("time");
			} else {
				this.getHook("time").hook.text = this.timer();
			}

			if (!this.getHook("ip")) {
				this.add("ip");
			}

		},

		update: function () {
			this.getScale();

			this.hooks.push({
				name: "dashboard",
				hook: new Box(Hooks.dashboardX + Hooks.resfixX, Hooks.dashboardY + Hooks.resfixY + this.frameYLocScale, 415 + Hooks.dashboardWidthResfixX, 60 + this.frameYSizeScale, 0x0, 1, 2)
			});

			this.hooks.push({
				name: "dashboardframe",
				hook: new Frame(Hooks.dashboardX + Hooks.resfixX, Hooks.dashboardY + Hooks.resfixY + this.frameYLocScale, 415 + Hooks.dashboardWidthResfixX, 60 + this.frameYSizeScale, 2)
			});
		},

		getBlock: function () {
			var shield = false,
			item = me.getItem(-1, 1);

			// make sure character has shield equipped
			if (item) {
				do {
					if ([4, 5].indexOf(item.bodylocation) > -1 && [2, 51, 69, 70].indexOf(item.itemType) > -1) {
						shield = true;
					}
				} while (item.getNext());
			}

			if (!shield) {
				return 0;
			}

			if (me.gametype === 0) { // classic
				return Math.floor(me.getStat(20) + getBaseStat(15, me.classid, 23));
			}

			return Math.min(75, Math.floor((me.getStat(20) + getBaseStat(15, me.classid, 23)) * (me.getStat(2) - 15) / (me.charlvl * 2)));
		},

		add: function (name) {
			switch (name) {
			case "ping":
				this.hooks.push({
					name: "ping",
					hook: new Text("Ping: " + me.ping, 785 + Hooks.upperRightResfixX, 56 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)), 4, 1, 1)
				});

				break;
			case "time":
				this.hooks.push({
					name: "time",
					hook: new Text(this.timer(), 785 + Hooks.upperRightResfixX, 72 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)), 4, 1, 1)
				});

				break;
			case "ip":
				this.hooks.push({
					name: "ip",
					hook: new Text("IP: " + (me.gameserverip.length > 0 ? me.gameserverip.split(".")[3] : "0"), 785 + Hooks.upperRightResfixX, 88 + 16 * (Number(!!me.diff) + Number(!!me.gamepassword) + Number(!!me.gametype) + Number(!!me.gamename)), 4, 1, 1)
				});

				break;
			case "monsterStatus":
				this.hooks.push({
					name: "monsterStatus",
					hook: new Text("Num 7: Disable Monsters", 445 + Hooks.lowerRightResfixX, 535 + Hooks.resfixY)
				});

				break;
			case "vectorStatus":
				this.hooks.push({
					name: "vectorStatus",
					hook: new Text("Num 8: Disable Vectors", 445 + Hooks.lowerRightResfixX, 545 + Hooks.resfixY)
				});

				break;
			case "dashboard":
				this.hooks.push({
					name: "dashboard",
					hook: new Box(Hooks.dashboardX + Hooks.resfixX, Hooks.dashboardY + Hooks.resfixY + this.frameYLocScale, 415 + Hooks.dashboardWidthResfixX, 60 + this.frameYSizeScale, 0x0, 1, 2)
				});

				break;
			case "dashboardframe":
				this.hooks.push({
					name: "dashboardframe",
					hook: new Frame(Hooks.dashboardX + Hooks.resfixX, Hooks.dashboardY + Hooks.resfixY + this.frameYLocScale, 415 + Hooks.dashboardWidthResfixX, 60 + this.frameYSizeScale, 2)
				});

				break;
			case "statBoxA":
				this.hooks.push({
					name: "statBoxA",
					hook: new Box(Hooks.statBoxAX + Hooks.resfixX, Hooks.statBoxAY + Hooks.resfixY, 80, 30, 0x0, 1, 2)
				});

				break;
			case "statFrameA":
				this.hooks.push({
					name: "statFrameA",
					hook: new Frame(Hooks.statBoxAX + Hooks.resfixX, Hooks.statBoxAY + Hooks.resfixY, 80, 30, 2)
				});

				break;
			case "statBoxB":
				this.hooks.push({
					name: "statBoxB",
					hook: new Box(Hooks.statBoxBX + Hooks.resfixX, Hooks.statBoxBY + Hooks.resfixY, 70, 30, 0x0, 1, 2)
				});

				break;
			case "statFrameB":
				this.hooks.push({
					name: "statFrameB",
					hook: new Frame(Hooks.statBoxBX + Hooks.resfixX, Hooks.statBoxBY + Hooks.resfixY, 70, 30, 2)
				});

				break;
			case "statlineA":
				this.hooks.push({
					name: "statlineA",
					hook: new Text("ÿc4Block%: ÿc0" + this.getBlock(), 117 + Hooks.lowerRightResfixX, 535 + Hooks.resfixY)
				});

				break;
			case "statlineB":
				this.hooks.push({
					name: "statlineB",
					hook: new Text("ÿc4MF: ÿc0" + me.getStat(80), 117 + Hooks.lowerRightResfixX, 545 + Hooks.resfixY)
				});

				break;
			case "statlineC":
				this.hooks.push({
					name: "statlineC",
					hook: new Text("ÿc4FCR: ÿc0" + me.getStat(105), 617 + Hooks.lowerRightResfixX, 535 + Hooks.resfixY)
				});

				break;
			case "statlineD":
				this.hooks.push({
					name: "statlineD",
					hook: new Text("ÿc4FHR: ÿc0" + me.getStat(99), 617 + Hooks.lowerRightResfixX, 545 + Hooks.resfixY)
				});

				break;
			}
		},

		getHook: function (name) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].name === name) {
					return this.hooks[i];
				}
			}

			return false;
		},

		timer: function () {
			var min, sec;

			min = Math.floor((getTickCount() - me.gamestarttime) / 60000).toString();

			if (min <= 9) {
				min = "0" + min;
			}

			sec = (Math.floor((getTickCount() - me.gamestarttime) / 1000) % 60).toString();

			if (sec <= 9) {
				sec = "0" + sec;
			}

			return min + ":" + sec;
		},

		flush: function () {
			if (getUIFlag(0x0D)) {
				return;
			}

			while (this.hooks.length) {
				this.hooks.shift().hook.remove();
			}
		}
	},

	vector: {
		hooks: [],
		names: [],
		currArea: 0,
		enabled: true,

		check: function () {
			if (!this.enabled) {
				this.flush();

				return;
			}

			if (me.area !== this.currArea) {
				this.flush();

				var i, exits, wp, poi,
					nextAreas = [];

				// Specific area override
				nextAreas[7] = 26;
				nextAreas[76] = 78;
				nextAreas[77] = 78;
				nextAreas[113] = 115;
				nextAreas[115] = 117;
				nextAreas[118] = 120;
				nextAreas[131] = 132;

				this.currArea = me.area;
				exits = getArea().exits;

				if (exits) {
					for (i = 0; i < exits.length; i += 1) {
						if (me.area === 46) {
							this.add(exits[i].x, exits[i].y, exits[i].target === getRoom().correcttomb ? 0x69 : 0x99);
						} else if (exits[i].target === nextAreas[me.area] && nextAreas[me.area]) {
							this.add(exits[i].x, exits[i].y, 0x1F);
						} else if (exits[i].target === Hooks.tele.prevAreas.indexOf(me.area) && nextAreas[me.area]) {
							this.add(exits[i].x, exits[i].y, 0x99);
						} else if (exits[i].target === Hooks.tele.prevAreas.indexOf(me.area)) {
							this.add(exits[i].x, exits[i].y, 0x1F);
						} else if (exits[i].target === Hooks.tele.prevAreas[me.area]) {
							this.add(exits[i].x, exits[i].y, 0x0A);
						} else {
							this.add(exits[i].x, exits[i].y, 0x99);
						}

						this.addNames(exits[i]);
					}
				}

				wp = this.getWP();

				if (wp) {
					this.add(wp.x, wp.y, 0xA8);
				}

				poi = this.getPOI();

				if (poi) {
					this.add(poi.x, poi.y, 0x7D);
				}
			} else {
				this.update();
			}
		},

		add: function (x, y, color) {
			this.hooks.push(new Line(me.x, me.y, x, y, color, true));
		},

		addNames: function (area) {
			this.names.push(new Text(Pather.getAreaName(area.target), area.x, area.y, 0, 6, 2, true));
		},

		update: function () {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				this.hooks[i].x = me.x;
				this.hooks[i].y = me.y;
			}
		},

		flush: function () {
			while (this.hooks.length) {
				this.hooks.shift().remove();
			}

			while (this.names.length) {
				this.names.shift().remove();
			}

			this.currArea = 0;
		},

		getWP: function () {
			if (Pather.wpAreas.indexOf(me.area) === -1) {
				return false;
			}

			var i, preset,
				wpIDs = [119, 145, 156, 157, 237, 238, 288, 323, 324, 398, 402, 429, 494, 496, 511, 539];

			for (i = 0; i < wpIDs.length; i += 1) {
				preset = getPresetUnit(me.area, 2, wpIDs[i]);

				if (preset) {
					return {
						x: preset.roomx * 5 + preset.x,
						y: preset.roomy * 5 + preset.y
					};
				}
			}

			return false;
		},

		getPOI: function () {
			var unit, name;

			switch (me.area) {
			case 15: // Hole Level 2
			case 16: // Pit Level 2
			case 18: // Crypt
			case 19: // Mausoleum
			case 59: // Stony Tomb Level 2
			case 65: // Ancient Tunnels
			case 84: // Spider Cave
			case 90: // Swampy Pit Level 3
			case 94: // Ruined Temple
			case 95: // Disused Fane
			case 96: // Forgotten Reliquary
			case 97: // Forgotten Temple
			case 99: // Disused Reliquary
			case 116: // Drifter Cavern
			case 119: // Icy Cellar
			case 125: // Abadon
			case 126: // Pit of Acheron
			case 127: // Infernal Pit
				unit = getPresetUnit(me.area, 2, 397);
				name = "SuperChest";

				break;
			case 115: // Glacial Trail
				unit = getPresetUnit(me.area, 2, 455);
				name = "SuperChest";

				break;
			case 4: // Stony Field
				unit = getPresetUnit(me.area, 1, 737);
				name = "Cairn Stones";

				break;
			case 5: // Dark Wood
				unit = getPresetUnit(me.area, 2, 30);
				name = "Tree";

				break;
			case 8: // Den of Evil
				unit = getPresetUnit(me.area, 1, 774);
				name = "Corpsefire";

				break;
			case 25: // Countess
				unit = getPresetUnit(me.area, 2, 580);
				name = "Countess";

				break;
			case 28: // Smith
				unit = getPresetUnit(me.area, 2, 108);
				name = "Smith";

				break;
			case 37: // Andariel
				unit = {x: 22549, y: 9520};
				name = "Andariel";

				break;
			case 38: // Griswold
				unit = getPresetUnit(me.area, 2, 26);
				name = "Griswold";

				break;
			case 40: // Lut Gholein
				unit = getPresetUnit(me.area, 5, 20);
				name = "Sewer's Level 1";

				break;	
			case 49: // Sewers 3
				unit = getPresetUnit(me.area, 2, 355);
				name = "Radament";

				break;
			case 54: // Arcane Sanctuary
				unit = {x: 10073, y: 8670};
				name = "Arcane Sanctuary";

				break;
			case 60: // Halls of the Dead 3
				unit = getPresetUnit(me.area, 2, 354);
				name = "Cube";

				break;
			case 61: // Claw Viper Temple 2
				unit = getPresetUnit(me.area, 2, 149);
				name = "Amulet";

				break;
			case 74: // Arcane Sanctuary
				unit = getPresetUnit(me.area, 2, 357);
				name = "Summoner";

				break;
			case 64: // Maggot Lair 3
				unit = getPresetUnit(me.area, 1, 749);
				name = "Fat Worm";

				break;
			case 66: // Tal Rasha's Tombs
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
				unit = getPresetUnit(me.area, 2, 152);
				name = "Orifice";

				if (!unit) {
					unit = getPresetUnit(me.area, 2, 397);
					name = "SuperChest";
				}

				break;
			case 78: // Flayer Jungle
				unit = getPresetUnit(me.area, 2, 252);
				name = "Gidbinn";

				break;
			case 85: // Spider Cavern
				unit = getPresetUnit(me.area, 2, 755);
				name = "Eye";

				break;
			case 91: // Flayer Dungeon Level 3
				unit = getPresetUnit(me.area, 2, 506);
				name = "Brain";

				break;
			case 93: // A3 Sewer's Level 2
				unit = getPresetUnit(me.area, 2, 405);
				name = "Heart";

				break;
			case 102: // Durance of Hate 3
				unit = {x: 17588, y: 8069};
				name = "Mephisto";

				break;
			case 105: // Plains of Despair
				unit = getPresetUnit(me.area, 1, 256);
				name = "Izual";

				break;
			case 107: // River of Flame
				unit = getPresetUnit(me.area, 2, 376);
				name = "Hephasto";

				break;
			case 108: // Chaos Sanctuary
				unit = getPresetUnit(me.area, 2, 255);
				name = "Star";

				break;
			case 109: // Anya Portal
				unit = {x: 5112, y: 5120};
				name = "Anya Portal";

				break;
			case 110: // Bloody Foothills
				unit = {x: 3899, y: 5113};
				name = "Shenk";

				break;
			case 111: // Frigid Highlands
			case 112: // Arreat Plateau
			case 117: // Frozen Tundra
				unit = getPresetUnit(me.area, 2, 60);
				name = "Hell Entrance";

				break;
			case 114: // Frozen River
				unit = getPresetUnit(me.area, 2, 460);
				name = "Frozen Anya";

				break;
			case 121: // Nihlathaks Temple
				unit = {x: 10058, y: 13234};
				name = "Pindle";

				break;
			case 124: // Halls of Vaught
				unit = getPresetUnit(me.area, 2, 462);
				name = "Nihlathak";

				break;
			case 131: // Throne of Destruction
				unit = {x: 15095, y: 5029};
				name = "Throne Room";

				break;
			case 133: // Matron's Den
				unit = getPresetUnit(me.area, 2, 397);
				name = "Lilith";

				break;
			case 134: // Forgotten Sands
				unit = getUnit(1, 708);
				name = "Duriel";

				break;
			case 135: // Furnace of Pain
				unit = getPresetUnit(me.area, 2, 397);
				name = "Izual";

				break;
			}

			if (unit) {
				if (unit instanceof PresetUnit) {
					return {
						x: unit.roomx * 5 + unit.x,
						y: unit.roomy * 5 + unit.y,
						name: name
					};
				}

				return {
					x: unit.x,
					y: unit.y,
					name: name
				};
			}

			return false;
		}
	},

	tele: {
		hooks: [],
		portals: [],
		frame: [],
		action: null,
		currArea: 0,
		enabled: true,
		prevAreas: [0, 0, 1, 2, 3, 10, 5, 6, 2, 3, 4, 6, 7, 9, 10, 11, 12, 3, 17, 17, 6, 20, 21, 22, 23, 24, 7, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
					36, 4, 1, 1, 40, 41, 42, 43, 44, 74, 40, 47, 48, 40, 50, 51, 52, 53, 41, 42, 56, 45, 55, 57, 58, 43, 62, 63, 44, 46, 46, 46, 46, 46,
					46, 46, 1, 54, 1, 75, 76, 76, 78, 79, 80, 81, 82, 76, 76, 78, 86, 78, 88, 87, 89, 81, 92, 80, 80, 81, 81, 82, 82, 83, 100, 101, 102,
					103, 104, 105, 106, 107, 103, 109, 110, 111, 112, 113, 113, 115, 115, 117, 118, 118, 109, 121, 122, 123, 111, 112, 117, 120, 128, 129,
					130, 131, 109, 109, 109, 109],

		event: function (keycode) {
			Hooks.tele.action = keycode;
		},

		check: function () {
			if (!this.enabled) {
				return;
			}

			var hook,
				obj = {
					type: false,
					dest: false
				};

			if (this.action) {
				switch (this.action) {
				case 96: // Numpad 0

					if (me.area === 131) {
						hook = this.getHook("Worldstone Chamber");
						obj.type = "portal";
					} else {
						hook = this.getHook("Next Area");
						obj.type = "area";
					}

					break;
				case 97: // Numpad 1
					hook = this.getHook("Previous Area");
					obj.type = "area";

					break;
				case 98: // Numpad 2
					hook = this.getHook("Waypoint");
					obj.type = "wp";

					break;
				case 99: // Numpad 3
					if (me.area )
					hook = this.getHook("POI");
					obj.type = "unit";

					break;
				case 100: // Numpad 4
					hook = this.getHook("Side Area");
					obj.type = "area";

					break;
				case 54: // 6
					if (me.area === 109) {
						hook = this.getHook("Matron's Den");
						obj.type = "portal";
					}

					if (me.area === 108) {
						hook = this.getHook("Viz Seal");
						obj.type = "unit";
					}

					break;
				case 55: // 7
					if (me.area === 109) {
						hook = this.getHook("Sands");
						obj.type = "portal";	
					}
					
					if (me.area === 108) {
						hook = this.getHook("Seis Seal");
						obj.type = "unit";
					}

					break;
				case 56: // 8
					if (me.area === 109) {
						hook = this.getHook("Furnace");
						obj.type = "portal";	
					}
					
					if (me.area === 108) {
						hook = this.getHook("Infector Seal");
						obj.type = "unit";
					}

					break;
				case 57: // 9
					hook = this.getHook("Uber Tristam");
					obj.type = "portal";

					break;
				}

				if (hook) {
					obj.dest = hook.destination;

					scriptBroadcast(JSON.stringify(obj));
				}

				this.action = null;
			}

			if (me.area !== this.currArea) {
				this.flush();
				Hooks.text.update();
				this.add(me.area);
				addEventListener("keyup", this.event);

				this.currArea = me.area;
			}
		},

		add: function (area) {
			var i, exits, wp, poi, nextCheck,
				nextAreas = [];

			// Specific area override
			nextAreas[7] = 26;
			nextAreas[76] = 78;
			nextAreas[77] = 78;
			nextAreas[113] = 115;
			nextAreas[115] = 117;
			nextAreas[118] = 120;

			if (me.area === 46) {
				nextAreas[46] = getRoom().correcttomb;
			}

			if (me.area === 108) {
				let infSeal = this.getDiabloSeals(392);

				if (infSeal) {
					this.hooks.push({
						name: "Infector Seal",
						destination: {x: infSeal.x, y: infSeal.y},
						hook: new Text("ÿc<NumKey 8: Infector Seal", 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});
				}

				let seisSeal = this.getDiabloSeals(394);

				if (seisSeal) {
					this.hooks.push({
						name: "Seis Seal",
						destination: {x: seisSeal.x, y: seisSeal.y},
						hook: new Text("ÿc<NumKey 7: Seis Seal", 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});
				}

				let vizSeal = this.getDiabloSeals(396);

				if (vizSeal) {
					this.hooks.push({
						name: "Viz Seal",
						destination: {x: vizSeal.x, y: vizSeal.y},
						hook: new Text("ÿc<NumKey 6: Viz Seal", 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});
				}
			}

			switch (me.area) {
			case 2: // Blood Moor
				this.hooks.push({
					name: "Side Area",
					destination: 8, // Den of Evil
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(8), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 3: // Cold Plains
				this.hooks.push({
					name: "Side Area",
					destination: 17, // Burial Grounds
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(17), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 6: // Black Marsh
				this.hooks.push({
					name: "Side Area",
					destination: 20, // Forgotten Tower
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(20), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 7: // Tamoe Highlands
				this.hooks.push({
					name: "Side Area",
					destination: 12, // Pit Level 1
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(12), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 10: // Underground Passage Level 1
				this.hooks.push({
					name: "Side Area",
					destination: 14, // Underground Passage Level 2
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(14), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 17: // Burial Grounds
				this.hooks.push({
					name: "Side Area",
					destination: 19, // Mausoleum
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(19), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 40: // Lut Gholein
				this.hooks.push({
					name: "Side Area",
					destination: 50, // Harem Level 1
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(50), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 41: // Rocky Waste
				this.hooks.push({
					name: "Side Area",
					destination: 55, // Stony Tomb Level 1
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(55), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 42: // Dry Hills
				this.hooks.push({
					name: "Side Area",
					destination: 56, // Halls of the Dead Level 1
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(56), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 43: // Far Oasis
				this.hooks.push({
					name: "Side Area",
					destination: 62, // Maggot Lair Level 1
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(62), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 44: // Lost City
				this.hooks.push({
					name: "Side Area",
					destination: 65, // Ancient Tunnels
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(65), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 76: // Spider Forest
				this.hooks.push({
					name: "Side Area",
					destination: 85, // Spider Cavern
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(85), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 78: // Flayer Jungle
				this.hooks.push({
					name: "Side Area",
					destination: 88, // Flayer Dungeon Level 1
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(88), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 80: // Kurast Bazaar
				this.hooks.push({
					name: "Side Area",
					destination: 94, // Ruined Temple
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(94), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 81: // Upper Kurast
				this.hooks.push({
					name: "Side Area",
					destination: 92, // Sewers Level 1
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(92), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 92: // Sewers Level 1
				this.hooks.push({
					name: "Side Area",
					destination: 80, // Kurast Bazaar
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(80), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 113: // Crystalline Passage
				this.hooks.push({
					name: "Side Area",
					destination: 114, // Frozen River
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(114), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 115: // Glacial Trail
				this.hooks.push({
					name: "Side Area",
					destination: 116, // Drifter Cavern
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(116), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			case 118: // Ancient's Way
				this.hooks.push({
					name: "Side Area",
					destination: 119, // Icy Cellar
					hook: new Text("ÿc3Num 4: " + Pather.getAreaName(119), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});

				break;
			}

			poi = Hooks.vector.getPOI();

			if (poi) {
				this.hooks.push({
					name: "POI",
					destination: {x: poi.x, y: poi.y},
					hook: new Text("ÿc<Num 3: " + poi.name, 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});
			}

			wp = Hooks.vector.getWP();

			if (wp) {
				this.hooks.push({
					name: "Waypoint",
					destination: {x: wp.x, y: wp.y},
					hook: new Text("ÿc9Num 2: WP", 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});
			}

			let uberPortals = me.area === 109 && me.diff === 2 ? getUnit(2, "portal") : false;

			if (uberPortals && [133, 134, 135, 136].indexOf(uberPortals.objtype) > -1) {
				this.frame.push({
					name: "portalbox",
					hook: new Box (Hooks.portalX - 8, Hooks.portalY + Hooks.resfixY - 17, 190, 70, 0x0, 1, 0)
				});

				this.frame.push({
					name: "portalframe",
					hook: new Frame(Hooks.portalX - 8, Hooks.portalY + Hooks.resfixY - 17, 190, 70 , 0)
				});

				if ([133, 134, 135, 136].indexOf(uberPortals.objtype) > -1) {
					switch (uberPortals.objtype) {
					case 133:
						this.portals.push({
							name: "Matron's Den",
							destination: 133,
							hook: new Text("ÿc1NumKey 6: Matron's Den", Hooks.portalX, Hooks.portalY + Hooks.resfixY)
						});

						break;
					case 134:
						this.portals.push({
							name: "Sands",
							destination: 134,
							hook: new Text("ÿc1NumKey 7: Forgotten Sands", Hooks.portalX, Hooks.portalY + Hooks.resfixY + 15)
						});

						break;
					case 135:
						this.portals.push({
							name: "Furnace",
							destination: 135,
							hook: new Text("ÿc1NumKey 8: Furnace of Pain", Hooks.portalX, Hooks.portalY + Hooks.resfixY + 30)
						});

						break;
					case 136:
						this.portals.push({
							name: "Uber Tristam",
							destination: 136,
							hook: new Text("ÿc1NumKey 9: Furnace of Pain", Hooks.portalX, Hooks.portalY + Hooks.resfixY + 45)
						});

						break;
					}
				}

			}

			exits = getArea(area).exits;

			if (exits) {
				for (i = 0; i < exits.length; i += 1) {
					if (exits[i].target === this.prevAreas[me.area]) {
						this.hooks.push({
							name: "Previous Area",
							destination: this.prevAreas[me.area],
							hook: new Text("ÿc1Num 1: " + Pather.getAreaName(this.prevAreas[me.area]), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
						});

						break;
					}
				}

				// Check nextAreas first
				for (i = 0; i < exits.length; i += 1) {
					if (exits[i].target === nextAreas[me.area]) {
						this.hooks.push({
							name: "Next Area",
							destination: nextAreas[me.area],
							hook: new Text("ÿc3Num 0: " + Pather.getAreaName(nextAreas[me.area]), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
						});

						nextCheck = true;

						break;
					}
				}

				// In case the area isn't in nextAreas array, use this.prevAreas array
				if (!nextCheck) {
					for (i = 0; i < exits.length; i += 1) {
						if (exits[i].target === this.prevAreas.indexOf(me.area)) {
							this.hooks.push({
								name: "Next Area",
								destination: this.prevAreas.indexOf(me.area),
								hook: new Text("Num 0: " + Pather.getAreaName(this.prevAreas.indexOf(me.area)), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
							});

							break;
						}
					}
				}
			}

			if ([38, 125, 126, 127, 133, 134, 135, 136].indexOf(me.area) > -1) {
				switch (me.area) {
				case 38:
					this.hooks.push({
						name: "Previous Area",
						destination: 4,
						hook: new Text("ÿc1Num 1: " + Pather.getAreaName(4), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});

					break;
				case 125:
					this.hooks.push({
						name: "Previous Area",
						destination: 111,
						hook: new Text("ÿc1Num 1: " + Pather.getAreaName(111), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});

					break;
				case 126:
					this.hooks.push({
						name: "Previous Area",
						destination: 112,
						hook: new Text("ÿc1Num 1: " + Pather.getAreaName(112), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});

					break;
				case 127:
					this.hooks.push({
						name: "Previous Area",
						destination: 117,
						hook: new Text("ÿc1Num 1: " + Pather.getAreaName(117), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});

					break;
				case 133:
				case 134:
				case 135:
				case 136:
					this.hooks.push({
						name: "Previous Area",
						destination: 109,
						hook: new Text("ÿc1Num 1: " + Pather.getAreaName(109), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
					});

					break;
				}

			}

			let worldStonePortal = me.area === 131;

			if (worldStonePortal) {
				this.hooks.push({
					name: "Worldstone Chamber",
					destination: 132,
					hook: new Text("ÿc3Num 0: " + Pather.getAreaName(132), 200 + Hooks.lowerLeftResfixX, 545 - (this.hooks.length * 10) + Hooks.resfixY)
				});
			}

		},

		getDiabloSeals: function (seal) {
			let unit = getPresetUnit(108, 2, seal);
			if (unit) {print("found seal");}
			else {print("Didn't find seal");}

			if (unit) {
				if (unit instanceof PresetUnit) {
					return {
						x: unit.roomx * 5 + unit.x,
						y: unit.roomy * 5 + unit.y,
					};
				}
				
				return {
					x: unit.x,
					y: unit.y,
				};	
			}

			return false;
		},

		getHook: function (name) {
			var i;

			for (i = 0; i < this.hooks.length; i += 1) {
				if (this.hooks[i].name === name) {
					return this.hooks[i];
				}
			}

			return false;
		},

		flush: function () {
			while (this.hooks.length) {
				this.hooks.shift().hook.remove();
			}

			while (this.portals.length) {
				this.portals.shift().hook.remove();
			}

			while (this.frame.length) {
				this.frame.shift().hook.remove();
			}

			Hooks.text.flush();

			removeEventListener("keyup", this.event);

			this.currArea = 0;
		}
	},

	update: function () {
		while (!me.gameReady) {
			delay(100);
		}

		this.monsters.check();
		this.shrines.check();
		this.text.check();
		this.vector.check();
		this.tele.check();
		this.items.check();
	},

	flush: function () {
		this.monsters.flush();
		this.shrines.flush();
		this.text.flush();
		this.vector.flush();
		this.tele.flush();
		this.items.flush();

		return true;
	}
};

function main() {
	include("json2.js");
	include("common/attack.js");
	include("common/pather.js");
	load("tools/maphelper.js");
	print("ÿc9Map Thread Loaded.");

	this.revealArea = function (area) {
		if (!this.revealedAreas) {
			this.revealedAreas = [];
		}

		if (this.revealedAreas.indexOf(area) === -1) {
			delay(500);
			revealLevel(true);
			this.revealedAreas.push(area);
		}
	};

	this.keyEvent = function (key) {
		switch (key) {
		case 103: // Numpad 7
			if (Hooks.monsters.enabled) {
				Hooks.monsters.enabled = false;
				Hooks.text.getHook("monsterStatus").hook.text = "Num 7: Enable Monsters";
			} else {
				Hooks.monsters.enabled = true;
				Hooks.text.getHook("monsterStatus").hook.text = "Num 7: Disable Monsters";
			}

			break;
		case 104: // Numpad 8
			if (Hooks.vector.enabled) {
				Hooks.vector.enabled = false;
				Hooks.text.getHook("vectorStatus").hook.text = "Num 8: Enable Vectors";
			} else {
				Hooks.vector.enabled = true;
				Hooks.text.getHook("vectorStatus").hook.text = "Num 8: Disable Vectors";
			}

			break;
		}
	};

	var i,
		hideFlags = [0x09, 0x0C, 0x0D, 0x01, 0x02, 0x0F, 0x18, 0x19, 0x1A, 0x21, 0x05, 0x14, 0x24];

	addEventListener("keyup", this.keyEvent);

	while (true) {
		while (!me.area || !me.gameReady) {
			delay(100);
		}

		this.revealArea(me.area);

		if (getUIFlag(0x0A)) {
			Hooks.update();
		} else {
			Hooks.flush();
		}

		delay(20);

		for (i = 0; i < hideFlags.length; i += 1) {
			while (getUIFlag(hideFlags[i])) {
				Hooks.flush();
				delay(100);
			}
		}
	}
}