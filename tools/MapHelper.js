/*
*	@filename	MapHelper.js
*	@author		theBGuy
*	@desc		MapHelper used in conjuction with MapThread.js
*	@credits 	kolton for orginal MapHelper
*/

include("json2.js");
include("NTItemParser.dbl");
include("OOG.js");
include("AutoMule.js");
include("Gambling.js");
include("TorchSystem.js");
include("MuleLogger.js");
include("common/Attack.js");
include("common/Cubing.js");
include("common/CollMap.js");
include("common/Config.js");
include("common/Loader.js");
include("common/misc.js");
include("common/util.js");
include("common/Pickit.js");
include("common/Pather.js");
include("common/Precast.js");
include("common/Prototypes.js");
include("common/Runewords.js");
include("common/Storage.js");
include("common/Town.js");

function main() {
	include("json2.js");

	var obj, action,
		mapThread = getScript("tools/mapthread.js");

	Config.init();
	Pickit.init();
	Storage.Init();
	addEventListener("scriptmsg", function (msg) {
		action = msg;
	});

	while (true) {
		if (getUIFlag(0x09)) {
			delay(100);

			if (mapThread.running) {
				print("pause mapthread");
				mapThread.pause();
			}
		} else {
			if (!mapThread.running) {
				print("resume mapthread");
				mapThread.resume();
			}
		}

		if (action) {
			try {
				obj = JSON.parse(action);

				if (obj) {
					switch (obj.type) {
					case "area":
						if (obj.dest === 120) {
							Pather.moveToExit(obj.dest, false);	
						} else {
							Pather.moveToExit(obj.dest, true);
						}

						break;
					case "unit":
						if (me.area === 39) { break; }
						if (me.area === 73) {
							let teleport = Pather.teleport;
							Pather.teleport = false;
							Pather.moveTo(22629, 15714);
							Pather.moveTo(22609, 15707);
							Pather.moveTo(22579, 15704);
							Pather.moveTo(22577, 15649, 10);
							Pather.moveTo(22577, 15609, 10);

							let tyrael = getUnit(1, NPC.Tyrael);

							if (!tyrael) {
								return false;
							}

							for (let talk = 0; talk < 3; talk += 1) {
								if (getDistance(me, tyrael) > 3) {
									Pather.moveToUnit(tyrael);
								}

								tyrael.interact();
								delay(1000 + me.ping);
								me.cancel();

								if (Pather.getPortal(null)) {
									me.cancel();
									break;
								}
							}

							Pather.teleport = teleport;
							break;
						}

						Pather.moveToUnit(obj.dest, true);

						if (me.area === 74) {
							let journal = getUnit(2, 357);

							if (journal) {
								while (!Pather.getPortal(46)) {
									Misc.openChest(journal);
									delay(1000 + me.ping);
									me.cancel();
								}
							}
						}

						if ([4, 38, 39, 54, 109, 111, 112, 117, 125, 126, 127, 133, 134, 135, 136].indexOf(me.area) > -1) {
							Pather.usePortal();
						}

						switch (me.area) {
						case 3: 	// Cold Plains -> Cave Level 1
							Pather.moveToExit(9, true);

							break;
						case 6: 	// Black Marsh -> Hole Level 1
							Pather.moveToExit(11, true);

							break;
						case 40: 	// Lut Gholein -> Sewers Level  1
							Pather.useUnit(5, 20, 47);

							break;
						case getRoom().correcttomb:
							for (let i = 0; i < 3; i++) {
								if (Pather.useUnit(2, 100, 73)) {
									break;
								}
							}
							
							break;
						case 80: 	// Kurast Bazaar -> A3 Sewers Level 1
							Pather.useUnit(5, 57, 92);

							break;
						}

						let chest;

						switch (me.area) {
						case 13: // Cave Level 2
						case 15: // Hole Level 2
						case 16: // Pit Level 2
						case 18: // Crypt
						case 19: // Mausoleum
						case 59: // Stony Tomb Level 2
						case 65: // Ancient Tunnels
						case 84: // Spider Cave
						case 90: // Swampy Pit Level 3
						case 95: // Disused Fane
						case 96: // Forgotten Reliquary
						case 97: // Forgotten Temple
						case 99: // Disused Reliquary
						case 116: // Drifter Cavern
						case 119: // Icy Cellar
						case 125: // Abadon
						case 126: // Pit of Acheron
						case 127: // Infernal Pit
							chest = getUnit(2, 397);

							break;
						case 115: // Glacial Trail
						case 122: // Halls of Anguish
						case 123: // Halls of Pain
							chest = getUnit(2, 455);

							break;
						case 60: // Halls of the Dead 3
							chest = getUnit(2, 354);

							break;
						case 61: // Claw Viper Temple 2
							chest = getUnit(2, 149);

							break;
						case 64: // Maggot Lair 3
							chest = getUnit(2, 356);

							break;
						case 85: // Spider Cavern
							chest = getUnit(2, 407);

							break;
						case 91: // Flayer Dungeon Level 3
							chest = getUnit(2, 406);

							break;
						case 93: // A3 Sewer's Level 2
							chest = getUnit(2, 405);

							break;
						case 94: // Ruined Temple
							chest = getUnit(2, 193);

							break;
						}

						if (chest) {
							Misc.openChest(chest);
						}

						break;
					case "wp":
						Pather.getWP(me.area);

						break;
					case "portal":
						if (obj.dest === 132 && getUnit(1, 543)) {
							me.overhead("Can't enter Worldstone Chamber yet. Baal still in area");
							break;
						} else if (obj.dest === 132 && !getUnit(1, 543)) {
							let portal = getUnit(2, 563);

							if (portal) {
								Pather.usePortal(null, null, portal);
							}

							break;
						}

						let redPortal;

						switch (obj.dest) {
						case 133:
							redPortal = Pather.getPortal(133);

							if (redPortal) {
								Pather.moveToUnit(redPortal);
								Pather.usePortal(null, null, redPortal);
							}

							break;
						case 134:
							redPortal = Pather.getPortal(134);
							
							if (redPortal) {
								Pather.moveToUnit(redPortal);
								Pather.usePortal(null, null, redPortal);
							}
							
							break;
						case 135:
							redPortal = Pather.getPortal(135);
							
							if (redPortal) {
								Pather.moveToUnit(redPortal);
								Pather.usePortal(null, null, redPortal);
							}
							
							break;
						case 136:
							redPortal = Pather.getPortal(136);
							
							if (redPortal) {
								Pather.moveToUnit(redPortal);
								Pather.usePortal(null, null, redPortal);
							}
							
							break;
						default:
							Pather.usePortal(obj.dest);
							break;
						}

						break;
					}
				}
			} catch (e) {

			}

			action = false;
		}

		delay(20);
	}
}