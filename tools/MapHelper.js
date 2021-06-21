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

						if ([38, 125, 126, 127, 133, 134, 135, 136].indexOf(me.area) > -1) {
							if (!Pather.getPortal()) {
								me.overhead("Move closer to exit");
							}

							Pather.usePortal();
						}

						break;
					case "unit":
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

						if ([4, 54, 109, 111, 112, 117, 125, 126, 127].indexOf(me.area) > -1) {
							Pather.usePortal();
						}

						if (me.area === 40) {
							Pather.useUnit(5, 20, 47);
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

						Pather.usePortal(obj.dest);

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