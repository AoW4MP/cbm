var searchParams = new URLSearchParams(window.location.search);
var sorting = searchParams.get('sort');
var currentView = "";



var highCultureUnits = ["lightseeker", "dawn_defender", "dusk_hunter", "sun_priest", "daylight_spear", "awakener"];
var barbarianCultureUnits = ["pathfinder", "sunderer", "warrior", "war_shaman", "fury", "berserker"];
var darkCultureUnits = ["outrider", "pursuer", "dark_warrior", "warlock", "night_guard", "dark_knight"];
var feudalCultureUnits = ["scout", "peasant_pikeman", "archer", "bannerman", "defender", "knight"];
var industriousCultureUnits = ["pioneer", "anvil_guard", "arbalest", "steelshaper", "halberdier", "bastion"];
var mysticCultureUnits = ["mystic_projection", "arcane_guard", "arcanist", "soother", "spellshield", "spellbreaker"];


var MountedSpecialList = ["pioneer", "pathfinder", "scout", "lightseeker", "bastion", "knight", "outrider", "dark_knight", "tyrant_knight", "wildspeaker", "houndmaster", "spellbreaker"];

var DLCDragonDawn = ["tome_of_evolution", "tome_of_dragons", "slither_hatchling", "slither", "young_fire_dragon", "young_frost_dragon", "young_obsidian_dragon", "young_golden_dragon", "golden_dragon", "obsidian_dragon", "gold_wyvern", "obsidian_wyvern", "wyvern_fledgling", "dragon_lord", "shadow_transformation", "order_transformation", "nature_transformation", "materium_transformation", "astral_transformation", "chaos_transformation", "shadow_aspect", "order_aspect", "nature_aspect", "materium_aspect", "astral_aspect", "chaos_aspect"];

function GetUnitTierAndName(id) {
    for (i in jsonUnits.units) {
        if (id === jsonUnits.units[i].id) {
            var name = jsonUnits.units[i].name;
            if (MountedSpecialList.includes(id) || CheckIfOptionalCavalry(id)) {


                name = jsonUnits.units[i].name + " <mountSpecial></mountSpecial>";
                //imag.setAttribute("style", "position:relative; float:right");
            }
            return "<p style=\"width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-transform: none;\">" + getUnitTypeTag(jsonUnits.units[i].secondary_passives) + " " + name + "</p>" + "<p style=\"text-align:right; color:white;top:-16px; position:relative; \">" + romanize(jsonUnits.units[i].tier) + "</p>";
        }
    }

}




function GetUnitTierAndNameTome(id) {
    for (i in jsonTomes.tomes) {
        if (id === jsonTomes.tomes[i].id) {
            return romanize(jsonTomes.tomes[i].tier) + " - " + jsonTomes.tomes[i].name;
        }
    }

}

function GetSpellTierAndName(id) {
    for (i in jsonSpells.spells) {
        if (id === jsonSpells.spells[i].id) {
            return jsonSpells.spells[i].name;
        }
    }

}



function ShowUnitFromLink() {
    var unitID = searchParams.get('unit');
    document.title = "Age of Wonders 4 Database - " + GetUnitTierAndName(unitID).split(">")[2];
    showUnitFromString(unitID, "dataHolder");
}

function ShowSpellFromLink() {
    var spellID = searchParams.get('spell');
    if (spellID != undefined) {
        document.title = "Age of Wonders 4 Database - " + GetSpellTierAndName(spellID).split(">")[2];
        showSpellFromString(spellID, "dataHolder");
    }

    var SiegeID = searchParams.get('siege');
    if (SiegeID != undefined) {
        document.title = "Age of Wonders 4 Database - " + "Siege Project";
        showSiegeProjectFromString(SiegeID, "dataHolder");
    }

    var WonderID = searchParams.get('wonder');
    if (WonderID != undefined) {
        document.title = "Age of Wonders 4 Database - " + "Wonder";
        showWorldStructureFromString(WonderID, "dataHolder");
    }

    var TomeID = searchParams.get('tome');
    if (TomeID != undefined) {
        document.title = "Age of Wonders 4 Database - " + "Tome";
        showTomeFromString(TomeID, "dataHolder");
    }

    var StrucID = searchParams.get('structure');
    if (StrucID != undefined) {
        document.title = "Age of Wonders 4 Database - " + "Structure";
        showStructureFromString(StrucID, "dataHolder");
    }

    var SkillID = searchParams.get('skill');
    if (SkillID != undefined) {
        document.title = "Age of Wonders 4 Database - " + "Hero Skill";
        showHeroSkillFromString(SkillID, "dataHolder");
    }

}

function getUnitTypeTag(passivesList) {
    var i = "";
    for (i in passivesList) {
        if (passivesList[i].slug === "fighter_unit") {
            return "<unitFighter></unitFighter>";
        }
        if (passivesList[i].slug === "shock_unit") {
            return "<unitShock></unitShock>";
        }

        if (passivesList[i].slug === "skirmisher_unit") {
            return "<unitSkirmisher></unitSkirmisher>";
        }
        if (passivesList[i].slug === "support_unit") {
            return "<unitSupport></unitSupport>";
        }
        if (passivesList[i].slug === "scout_unit") {
            return "<unitScout></unitScout>";
        }
        if (passivesList[i].slug === "ranged_unit") {
            return "<unitRanged></unitRanged>";
        }
        if (passivesList[i].slug === "battle_mage_unit") {
            return "<unitBattlemage></unitBattlemage>";
        }
        if (passivesList[i].slug === "polearm_unit") {
            return "<unitPolearm></unitPolearm>";
        }
        if (passivesList[i].slug === "shield_unit") {
            return "<unitShield></unitShield>";
        }
        if (passivesList[i].slug === "tower") {
            return "<unitTower></unitTower>";
        }
        if (passivesList[i].slug === "siegecraft") {
            return "<unitSiegecraft></unitSiegecraft>";
        }
        if (passivesList[i].slug === "mythic_unit") {
            return "<unitMythic></unitMythic>";
        }
        if (passivesList[i].slug === "civilian") {
            return "<unitCivilian></unitCivilian>";
        }
    }
}

function SetButtonsAndDivs(list, parent, cardType) {
    var modName, description, cost, type, tier, i, nameString, found = "";


    for (i in list) {


        if (parent === undefined) {
            var buttonHolder = document.getElementById("buttonHolder");
        } else {
            var buttonHolder = document.getElementById(parent);
        }

        var dataHolder = document.getElementById("dataHolder");

        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        if (cardType === "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            div.setAttribute("id", splitIcon[0]);
        } else {
            div.setAttribute("id", list[i]);
        }



        dataHolder.appendChild(div);

        var divChild = document.createElement("DIV");
        if (cardType === "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            divChild.setAttribute("id", splitIcon[0] + "_card");



        } else {
            divChild.setAttribute("id", list[i] + "_card");
        }



        div.appendChild(divChild);



        if (cardType === "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            showUnitFromString(splitIcon[0], splitIcon[0]);
        }

        if (cardType === "unit") {
            showUnitFromString(list[i], list[i]);
        }

        if (cardType === "tome") {
            showTomeFromList2(list[i], list[i]);
        }


        if (cardType === "searchUnit") {
            showUnitFromString(list[i], list[i]);
        }

        if (cardType === "searchSpell") {
            showSpellFromString(list[i], list[i]);
            console.log("spawning card");
        }




        var btn = document.createElement("BUTTON");
        /// tooltipName.style.fontSize = "20px";

        btn.className = "w3-bar-item w3-button tablink";
        btn.type = "button";


        if (cardType === "unitTomeIcon") {
            var splitIcon = list[i].split(":");
            btn.setAttribute("id", splitIcon[0] + "-button");



        } else {
            btn.setAttribute("id", list[i] + "-button");
        }

        buttonHolder.appendChild(btn);

        if (cardType === "tome") {
            btn.innerHTML = GetUnitTierAndNameTome(list[i]);
        } else if (cardType === "unitTomeIcon") {
            btn.innerHTML = "<img style=\"float:left;\" src=\"/aow4db/Icons/TomeIcons/" + splitIcon[1] + ".png\" width='25px'\">" + GetUnitTierAndName(splitIcon[0]);
            if (DLCDragonDawn.indexOf(splitIcon[0]) != -1) {
                // DLC Dragon Dawn Tome
                var triangle = document.createElement("DIV");
                triangle.className = "triangle";
                triangle.setAttribute("style", "top: -65px;right: -214px;");

                btn.appendChild(triangle);
            }



        } else if (cardType === "searchSpell") {
            btn.innerHTML = GetSpellTierAndName(list[i]);
        } else {
            btn.innerHTML = GetUnitTierAndName(list[i]);
        }




        if (cardType === "unitTomeIcon") {
            btn.setAttribute("onclick", 'openCity(event,\'' + splitIcon[0] + '\')');
        } else if (cardType.indexOf("search") === -1) {
            btn.setAttribute("onclick", 'openCity(event,\'' + list[i] + '\')');
        } else {
            btn.setAttribute("onclick", 'openCity(event,\'' + list[i] + '\',true)');
        }

        if (DLCDragonDawn.indexOf(list[i]) != -1) {
            // DLC Dragon Dawn Tome
            var triangle = document.createElement("DIV");
            triangle.className = "triangle";

            if (cardType === "tome") {
                triangle.setAttribute("style", "top: -44px;right: -174px;");
            }
            btn.appendChild(triangle);
        }


        if (cardType != "searchUnit") {
            var holderHeight = buttonHolder.offsetHeight + 0;
        } else {
            var holderHeight = buttonHolder.offsetHeight;
        }



        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px; margin-left:200px");


    }

}

function SetCollapsibleButtonsAndDivs(overwrite, list, cardType) {
    var modName, description, cost, type, tier, i, nameString = "";

    var buttonHolder = document.getElementById("buttonHolder");


    var btn = document.createElement("BUTTON");
    /// tooltipName.style.fontSize = "20px";


    btn.type = "button";



    btn.innerHTML = overwrite + " (" + list.length + ")";
    if (cardType != "unit" && cardType.indexOf("search") === -1) {
        btn.setAttribute("onclick", 'openCity(event,\'' + overwrite + '\')');
        btn.setAttribute("id", overwrite + "-button");
    } else if (cardType.indexOf("search") != -1) {
        btn.setAttribute("onclick", 'openCity(event,\'' + overwrite + '\',true)');
        btn.setAttribute("id", overwrite + "-button");
    }



    buttonHolder.appendChild(btn);


    if (cardType === "spell") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight + 50;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {
        showSpellFromList(list, overwrite);

        // }





    }
    if (cardType === "skill") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight + 50;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showSkillFromList(list, overwrite);

        // }

    }

    if (cardType === "item") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight + 50;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showItemFromList(list, overwrite);

        // }

    }

    if (cardType === "trait") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight + 50;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showTraitFromList(list, overwrite);

        // }

    }

    if (cardType === "searchSkill") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showSkillFromList(list, overwrite);

    }

    if (cardType === "searchItem") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showItemFromList(list, overwrite);

    }

    if (cardType === "searchSiege") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showSiegeProjects(list, overwrite);
    }

    if (cardType === "searchEmpire") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showEmpireTrees(list, overwrite);
    }

    if (cardType === "searchTraits") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showTraitFromList(list, overwrite);
    }
    if (cardType === "searchDestiny") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showDestinyTraitsFromList(list, overwrite);
    }

    if (cardType === "searchStruct") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showStructures(list, overwrite);
    }

    if (cardType === "searchWorldStruct") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {

        showWorldStructures(list, overwrite);
    }



    if (cardType === "unit") {
        btn.className = "collapsibleUnits";
        var content = document.createElement("DIV");
        content.setAttribute("id", overwrite + "-button");
        content.className = "contentUnits";
        buttonHolder.append(content);
        // showSpellFromList(list, overwrite);

    }

    if (cardType === "searchSpell") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {
        showSpellFromList(list, overwrite);

        // }
    }

    if (cardType === "tome") {
        btn.className = "w3-bar-item w3-button tablink";
        var dataHolder = document.getElementById("dataHolder");
        var holderHeight = buttonHolder.offsetHeight;
        dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;");
        var div = document.createElement("DIV");

        div.className = "w3-container w3-border city";
        div.setAttribute("id", overwrite);


        dataHolder.appendChild(div);
        // for (i in list) {
        showTomeFromList2(list, overwrite);

        // }
    }
}

async function openCity(evt, cityName, search) {

    if (cityName != undefined) {
        currentView = cityName;
    }


    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    closeTabLinks(cityName);

    var currentEl = document.getElementById(cityName);
    if (currentEl != null) {
        currentEl.style.display = "block";
    }
    if (evt != null) {
        evt.currentTarget.className += " w3-red";
    }
    var currenturl = window.location.href.split('?')[0];
    var currentadditive = currenturl.split('&')[1];
    if (currentadditive === undefined) {
        currentadditive = "";
    }
    if (search === undefined) {
        window.history.replaceState({}, 'foo', currenturl + "?type=" + cityName + "&" + currentadditive);
    }


    if (sorting != undefined) {
        var splits = sorting.split(":");
        setTimeout(function () {
            sortDivs(splits[0], splits[1]);
        }, 50);
        // console.log(cityName);
    }

}

function closeTabLinks(cityName) {
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id != cityName + "-button") {
            tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }

    }
}

function CheckIfOptionalCavalry(name) {
    var optional = false;
    var i = "";
    var j = "";
    for (i in jsonUnits.units) {
        if (name === jsonUnits.units[i].id) {
            for (j in jsonUnits.units[i].secondary_passives) {
                if (jsonUnits.units[i].secondary_passives[j].slug === ("optional_cavalry")) {
                    optional = true;
                }
            }

        }
    }
    return optional;
}


function addUnitTypeIcon(a, b) {
    var icontext, iconsrc, iconName, j, btn, imag, spa = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {
            icontext = (jsonUnitAbilities.abilities[j].description);

            iconsrc = a;
            iconName = jsonUnitAbilities.abilities[j].name;


            iconName = iconName.toUpperCase();
            btn = document.createElement("DIV");
            btn.className = "unittype_icon";
            imag = document.createElement("IMG");
            spa = document.createElement("SPAN");
            spa.className = "tooltiptext";
            imag.setAttribute("src", "/aow4db/Icons/Abilities/" + iconsrc + ".png");
            imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");


            spa.innerHTML = "<img style=\"float:left; height:30px; width:30px\" src=\"/aow4db/Icons/Abilities/" + iconsrc + ".png\"><p style=\"color: #d7c297;>" + "<span style=\"font-size=20px;\">" + iconName + "</p>" +
                "</br>" + icontext;
            iconName = jsonUnitAbilities.abilities[j].name;
            if (iconName === "Shock Unit" || iconName === "Shield Unit" ||
                iconName === "Fighter Unit" || iconName === "Support Unit" ||
                iconName === "Battle Mage Unit" || iconName === "Skirmisher Unit" || iconName === "Scout Unit" || iconName === "Polearm Unit" || iconName === "Ranged Unit" || iconName === "Mythic Unit" || iconName === "Tower" || iconName === "Siegecraft" || iconName === "Civilian") {
                unitRole = document.getElementById("unit_role");

                unitRole.setAttribute("src", "/aow4db/Icons/Text/" + iconsrc + ".png");
            }
            document.getElementById("unitstat").appendChild(btn);

            btn.appendChild(imag);
            btn.append(spa);
        }
    }
}

function addAbilityslot(a, b) {
    var abilityName, abilityIcon, abilityDescr, abilityDam, abilityAcc, abilityRange, abilityType, abilityNote, j, splitDamageString, abilityDamType, abilityReq, abilityMod = "";

    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {
            abilityDam = "";
            if ('damage' in jsonUnitAbilities.abilities[j]) {
                abilityDam = jsonUnitAbilities.abilities[j].damage;
            }

            abilityType = jsonUnitAbilities.abilities[j].actionPoints;



            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].icon;

            abilityReq = "";
            if ('requisites' in jsonUnitAbilities.abilities[j]) {
                abilityReq = jsonUnitAbilities.abilities[j].requisites;

            }

            abilityMod = "";
            if ('modifiers' in jsonUnitAbilities.abilities[j]) {

                for (l in jsonUnitAbilities.abilities[j].modifiers) {
                    abilityName += "&#11049";
                    abilityMod += "<bullet>" + jsonUnitAbilities.abilities[j].modifiers[l].name + "<br>";
                    abilityMod += (jsonUnitAbilities.abilities[j].modifiers[l].description) + "</bullet><br>";
                }
            }


            // add notes


            abilityNote = "";
            for (l in jsonUnitAbilities.abilities[j].notes) {
                if (jsonUnitAbilities.abilities[j].notes[l] === undefined) {

                } else {
                    abilityNote += "<bullet>" + jsonUnitAbilities.abilities[j].notes[l].note + "</bullet>";

                }

            }




            abilityDam = jsonUnitAbilities.abilities[j].damage;
            abilityRange = jsonUnitAbilities.abilities[j].range + "<range></range>";
            abilityAcc = jsonUnitAbilities.abilities[j].accuracy + "<accuracy></accuracy>";

            var tooltipName = document.createElement("SPAN");
            var btn = document.createElement("DIV");
            /// tooltipName.style.fontSize = "20px";
            tooltipName.innerHTML = "test";
            btn.className = "unit_abilityslot";
            // if (n === true) {
            //   btn.style.backgroundColor = "rgb(73, 0, 80)";
            //} 
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            //  var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            tex.innerHTML = abilityName;
            tex.setAttribute("style", "color:white");
            // tex.setAttribute('onclick', '');
            var dam = document.createElement("DIV");
            dam.className = "ability_damage";
            dam.innerHTML = abilityDam;

            abilityDescr = (jsonUnitAbilities.abilities[j].description);

            var abilityIconType = "";
            imag.setAttribute("src", "/aow4db/Icons/Abilities/" + abilityIcon + ".png");

            var abilityIconType = GetAbilityBackground(abilityDam);

            imag.setAttribute("style", "background-image: url(\"/aow4db/Icons/Interface/" + abilityIconType + ".png\");background-repeat: no-repeat;background-size: 40px 40px");

            imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");



            var spa = GetAbilityToolTip(jsonUnitAbilities.abilities[j], abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq);

            spa.className = "tooltiptext";

            if (abilityName.indexOf("Defense Mode") > -1) {
                spa.innerHTML = "<div class=\"leftAbility\" style=\"color:#d7c297;\">" + abilityName.toUpperCase();
                spa.innerHTML += "<div style=\"clear:both\"> </div>" + "<br>";
                spa.innerHTML += jsonUnitAbilities.abilities[j].description;
                dam.innerHTML = "";
            }





            document.getElementById("unitabholder").append(btn);
            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);
            btn.append(dam);

        }
    }

}

function GetAbilityBackground(abilityDam) {
    if (abilityDam != undefined) {
        splitDamageString = abilityDam.split(">");
        if (splitDamageString[0].indexOf("phys") != -1) {
            var abilityIconType = "ability_icon_phys";
        } else if (splitDamageString[0].indexOf("frost") != -1) {
            var abilityIconType = "ability_icon_frost";
        } else if (splitDamageString[0].indexOf("blight") != -1) {
            var abilityIconType = "ability_icon_blight";
        } else if (splitDamageString[0].indexOf("spirit") != -1) {
            var abilityIconType = "ability_icon_spirit";
        } else if (splitDamageString[0].indexOf("fire") != -1) {
            var abilityIconType = "ability_icon_fire";
        } else {
            var abilityIconType = "ability_icon";
        }

    } else {
        var abilityIconType = "ability_icon"
    }
    return abilityIconType;
}

function GetAbilityToolTip(ability, abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq) {
    var abilityDam = "";
    if (ability.damage === undefined) {
        abilityDam = "";
    } else {
        abilityDam = ability.damage;
    }
    // block one, header
    // image
    var spa = document.createElement("SPAN");
    spa.innerHTML = "<div style\"display:block\"><img style=\"float:left; height:50px; width:50px; background-image:url(\'/aow4db/Icons/Interface/" + abilityIconType + ".png');background-repeat: no-repeat;background-size: 50px\" src=\"/aow4db/Icons/Abilities/" + ability.icon + ".png\">";

    // name and damage

    var line1 = document.createElement("DIV");
    line1.setAttribute("style", "display: flex;justify-content: space-between;");
    var nameHolder = document.createElement("DIV");
    nameHolder.className = "abilityLineSlot";
    nameHolder.setAttribute("style", "color:#d7c297;");
    nameHolder.innerHTML = abilityName.toUpperCase();

    var damageHolder = document.createElement("DIV");
    damageHolder.className = "abilityLineSlot";
    damageHolder.innerHTML = ability.damage;

    line1.appendChild(nameHolder);
    line1.appendChild(damageHolder);
    spa.append(line1);

    //   spa.innerHTML += "<div class=\"leftAbility\" style=\"color:#d7c297;\">" + abilityName.toUpperCase() + "</div>" + "<div class=\"rightAbility\">" + ability.damage + "</div><br>";

    //  spa.innerHTML += "<div style=\"clear:right\"> </div>";

    // block accuracy range abilitytype
    var line2 = document.createElement("DIV");
    line2.setAttribute("style", "display: flex;justify-content: space-between;");
    var accrangeHolder = document.createElement("DIV");

    var accuracy = document.createElement("DIV");
    accuracy.innerHTML = abilityAcc;
    accuracy.className = "abilityLineSlot";

    var range = document.createElement("DIV");
    range.innerHTML = abilityRange;
    range.className = "abilityLineSlot";

    var actionPoint = document.createElement("DIV");
    actionPoint.innerHTML = ability.actionPoints;
    actionPoint.className = "abilityLineSlot";
    accrangeHolder.appendChild(accuracy);
    accrangeHolder.appendChild(range);
    ////spa.append(accrangeHolder);

    var typeHolder = document.createElement("DIV");
    typeHolder.appendChild(actionPoint);
    line2.appendChild(accrangeHolder)
    line2.appendChild(typeHolder)
    spa.append(line2);


    // block 2, descrp
    spa.innerHTML += "<br>" + ability.description;

    // modifiers
    if (abilityMod != "") {
        spa.innerHTML += "<p style=\"color:#addd9e;font-size: 13px\">" + abilityMod + "</p>";
    }


    // block 3, req
    //notes

    spa.innerHTML += "<p style=\"color:#a4a4a6; font-size: 12px\">" + abilityNote + "</p>";




    if (abilityReq != "") {
        var reqs = document.createElement("DIV");
        var i = "";
        for (i in abilityReq) {

            var newReq = document.createElement("DIV");
            newReq.innerHTML = abilityReq[i].requisite;
            if (abilityReq[i].requisite == "Support") {
                newReq.setAttribute("style", "background-color:#263b38");
            }
            if (abilityReq[i].requisite == "Melee") {
                newReq.setAttribute("style", "background-color:#3b2826");
            }
            if (abilityReq[i].requisite == "Physical Ranged") {
                newReq.setAttribute("style", "background-color:#383125");
            }
            if (abilityReq[i].requisite == "Magic") {
                newReq.setAttribute("style", "background-color:#262f42");
            }
            if (abilityReq[i].requisite == "Debuff") {
                newReq.setAttribute("style", "background-color:#3c2642");
            }
            if (abilityReq[i].requisite == "Summoning") {
                newReq.setAttribute("style", "background-color:#422631");
            }
            newReq.className = "requisiteSlot";
            reqs.appendChild(newReq);
        }

        spa.append(reqs);
    }

    return spa;
}

function addPassiveslot(a) {
    var abilityName, abilityIcon, abilityDescr, j = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].slug;
            abilityDescr = jsonUnitAbilities.abilities[j].description;

            var btn = document.createElement("DIV");
            btn.className = "unit_passiveslot";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";

            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            tex.setAttribute('onclick', '');
            tex.innerHTML = abilityName;





            imag.setAttribute("src", "/aow4db/Icons/Abilities/" + abilityIcon + ".png");
            imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");




            var spa = CreatePassiveSlotToolTip(abilityIcon, abilityName, abilityDescr);
            spa.className = "tooltiptext";
            document.getElementById("unitabholder").appendChild(btn);

            btn.appendChild(imag);




            tex.appendChild(spa);


            btn.append(tex);

        }
    }

}

function CreatePassiveSlotToolTip(abilityIcon, abilityName, abilityDescr) {
    var spa = document.createElement("SPAN");

    spa.innerHTML = "<img style=\"float:left; height:30px; width:30px\" src=\"/aow4db/Icons/Abilities/" + abilityIcon + ".png\"><p style=\"color: #d7c297;>" + "<span style=\"font-size=20px;\">" + abilityName.toUpperCase() + "</p>" +
        "</br>" + abilityDescr;

    return spa;
}

function addResistanceSlot(a, resistance) {
    var abilityName, abilityIcon, abilityDescr, abilityDam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {

            abilityName = jsonUnitAbilities.abilities[j].name;
            if (abilityName.indexOf("Immu") != -1) {
                var firstPart = abilityName.split(" ")[0];

            } else {
                var nameclean = abilityName.split(">")[1];
                var firstPart = nameclean.split(" ")[0];
            }

            abilityIcon = jsonUnitAbilities.abilities[j].icon;
            abilityDescr = jsonUnitAbilities.abilities[j].description;
            abilityDam = jsonUnitAbilities.abilities[j].damage;
            var btn = document.createElement("DIV");
            btn.className = "resistance_icon";
            btn.setAttribute("id", abilityName);
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";


            spa = document.createElement("SPAN");
            spa.className = "tooltiptext";

            spa.innerHTML = "<p>" + "<span style=\"font-size=20px; text-transform:uppercase; color:#deb887 ;\">" + abilityName + "</p>" + "Added to Resistance <resistance></resistance> to calculate damage sustained from " + firstPart + ".";

            var num = "";
            if (a.indexOf("weakness") !== -1) {
                var split = a.split("weakness_");
                num = "-" + split[1];
            }
            if (a.indexOf("resistance") !== -1) {
                var split = a.split("resistance_");
                num = split[1];
            }

            if (a.indexOf("immun") !== -1) {
                var split = a.split("resistance_");
                num = "x";
            }

            spa.innerHTML += "<br><br>Damage Reduction: <br> " + firstPart + " <span style=\"color:white;\">" + GetDamageReductionPercentage(resistance, num) + "</span> ( From <span style=\"color:white;\">" + resistance + "</span> <resistance> </resistance>";
            if (num != undefined) {
                if (num > 0) {
                    spa.innerHTML += "+";
                }
                spa.innerHTML += num;
            }



            imag.setAttribute("width", "25");
            imag.setAttribute("height", "25");

            if (a.indexOf("frost") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/frost_resistance.png");
                spa.innerHTML += "<defensefrost></defensefrost>";
            }
            if (a.indexOf("blight") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/blight_resistance.png");
                spa.innerHTML += "<defenseblight></defenseblight>";
            }
            if (a.indexOf("fire") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/fire_resistance.png");
                spa.innerHTML += "<defensefire></defensefire>";
            }
            if (a.indexOf("spirit") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/spirit_resistance.png");
                spa.innerHTML += "<defensespirit></defensespirit>";
            }
            if (a.indexOf("lightning") !== -1) {
                imag.setAttribute("src", "/aow4db/Icons/Text/lightning_resistance.png");
                spa.innerHTML += "<defenselightning></defenselightning>";
            }

            if (a.indexOf("weakness") !== -1) {
                var split = a.split("weakness_");
                abilityDam = "<p class=\"resistanceNumber\" style=\"color:red;\">-" + split[1];
            }
            if (a.indexOf("resistance") !== -1) {
                var split = a.split("resistance_");
                abilityDam = "<p class=\"resistanceNumber\" style=\"color:lawngreen;\">" + split[1];
            }

            if (a.indexOf("immun") !== -1) {
                var split = a.split("resistance_");
                abilityDam = "<p class=\"resistanceNumber\">IMM";
            }

            spa.innerHTML += ")";

            document.getElementById("resistanceholder").appendChild(btn);
            btn.innerHTML = abilityDam;

            btn.appendChild(imag);

            btn.append(spa);




        }
    }

}

function addstatusResistanceSlot(a) {
    var abilityName, abilityIcon, abilityDescr, abilityDam = "";



    var btn = document.createElement("DIV");
    btn.className = "resistance_icon";
    btn.id = "statusResistance";
    var imag = document.createElement("IMG");
    imag.className = "unit_ability_icon";


    spa = document.createElement("SPAN");
    spa.className = "tooltiptext";

    spa.innerHTML = "<p>" + "<span style=\"color: #deb887 ;text-transform: uppercase\">Status Resistance</span></p>";

    spa.innerHTML += "Reduces the chance that the unit will be affeted by negative status effects. <br><br>Current Chance Reduction :  <span style=\"color:white;\">" + GetDamageReductionPercentage(a, undefined) + "</span> ";


    imag.setAttribute("width", "25");
    imag.setAttribute("height", "25");


    imag.setAttribute("src", "/aow4db/Icons/Text/status_resistance.png");

    abilityDam = a;

    document.getElementById("resistanceholder").appendChild(btn);
    btn.innerHTML = "<p class=\"resistanceNumber\">" + abilityDam;

    btn.appendChild(imag);

    btn.append(spa);






}

function EliteSkill(a) {
    var nam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {
            nam = jsonUnitAbilities.abilities[j].name;
        }

    }
    return nam;
}

function addEliteSkill(a) {
    var abilityName, abilityIcon, abilityDescr = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {
            abilityName = jsonUnitAbilities.abilities[j].name;
            abilityIcon = jsonUnitAbilities.abilities[j].slug;
            abilityDescr = jsonUnitAbilities.abilities[j].description;

            var btn = document.createElement("DIV");
            btn.className = "unit_elite_skill";
            var imag = document.createElement("IMG");
            imag.className = "unit_ability_icon";
            var spa = document.createElement("SPAN");
            var tex = document.createElement("DIV");
            tex.className = "tooltip";
            tex.setAttribute('onclick', '');
            tex.innerHTML = abilityName;
            spa.className = "tooltiptext";
            spa.innerHTML = "<p>" + "<span style=\"font-size=20px\">" + abilityName + "</p>" + "<hr>" + abilityDescr;
            imag.setAttribute("src", "/aowp/UI/elite_rank.png");
            imag.setAttribute("width", "40");
            imag.setAttribute("height", "40");

            document.getElementById("unitabholder").appendChild(btn);
            // document.getElementById("unitabholder").setAttribute("id", "unitabholder" + b);

            tex.appendChild(spa);

            btn.appendChild(imag);
            btn.append(tex);

        }
    }

}
async function spawnCards(list, divID) {
    if (divID === undefined) {
        divID = "units";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {

        var iDiv = unit_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}





async function showUnitsFromList(list, overwritetext) {

    SetCollapsibleButtonsAndDivs(overwritetext, list, "unit");
    SetButtonsAndDivs(list, overwritetext + "-button", "unit");


}

async function showUnitsWithIcon(list) {


    SetButtonsAndDivs(list, "buttonHolder", "unitTomeIcon");
}



async function spawnCard(string, divID) {
    if (divID === undefined) {
        divID = "units";
    }
    var doc = document.getElementById(divID);

    var iDiv = unit_card_template.content.cloneNode(true);
    doc.appendChild(iDiv);


}

async function showUnitFromString(string, divID) {
    await spawnCard(string, divID);
    showUnit(string, divID);
}


var ascendingOrder = false;

function sortDivs(sortType, savedOrder) {
    var i = "";

    // 2 - Detemine the selector
    if (savedOrder != null) {
        ascendingOrder = savedOrder;
    } else {
        ascendingOrder = !ascendingOrder;
    }

    var buttontargets = document.getElementsByClassName("sortingButton");

    for (i in buttontargets) {
        buttontargets[i].className = "sortingButton";
    }
    var currentbutton = document.getElementById(sortType + "-button");

    if (ascendingOrder) {
        currentbutton.className += " activeDown";
    } else {
        currentbutton.className += " activeUp";
    }




    // 3 - Choose the wanted order
    //  ascendingOrder = !ascendingOrder;
    const isNumeric = true;

    // 4 - Select all elements
    if (currentView === "") {
        var container = document.getElementById("dataHolder");
    } else {
        var container = document.getElementById(currentView);
    }


    var element = elements = [...container.querySelectorAll('.mod_card')]



    var selector = element => element.querySelector('.mod_name').innerHTML;
    if (sortType === "tier") {
        selector = element => element.querySelector('.spell_tier').innerHTML;

    }
    if (sortType === "cost") {
        selector = element => element.querySelector('.spell_cost').innerHTML;
    }


    // 5 - Find their parent
    const parentElement = container;

    // 6 - Sort the elements
    const collator = new Intl.Collator(undefined, {
        numeric: isNumeric,
        sensitivity: 'base'
    });


    elements
        .sort((elementA, elementB) => {
            const [firstElement, secondElement] = ascendingOrder ? [elementA, elementB] : [elementB, elementA];

            var textOfFirstElement = selector(firstElement);

            var textOfSecondElement = selector(secondElement);
            if (sortType === "tier") {
                var fields = textOfFirstElement.split('Tier ', 3);
                textOfFirstElement = deromanize(fields[1]);
                var fields2 = textOfSecondElement.split('Tier ', 3);
                textOfSecondElement = deromanize(fields2[1]);

            }

            return collator.compare(textOfFirstElement, textOfSecondElement)
        })
        .forEach(element => parentElement.appendChild(element));


    var currenturl = window.location.href.split('&')[0];

    window.history.replaceState({}, 'foo', currenturl + "&sort=" + sortType + ":" + ascendingOrder);
    sorting = sortType + ":" + ascendingOrder;
}

async function SetCollapsibleStuff() {
    var coll = document.getElementsByClassName("collapsibleUnits");

    var i = "";

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            var contents = document.getElementsByClassName("contentUnits");
            var content = this.nextElementSibling;

            for (j = 0; j < contents.length; j++) {


                if (contents[j].style != null) {
                    if (contents[j].style.display === "grid") {
                        if (contents[j].id === content.id) {

                        } else {

                            coll[j].classList.toggle("active");
                            contents[j].style.display = "none";
                        }

                    }
                }

            }
            this.classList.toggle("active");

            if (content.style.display === "grid") {
                content.style.display = "none";
            } else {
                content.style.display = "grid";
            }




            var buttonHolder = document.getElementById("buttonHolder");
            var holderHeight = buttonHolder.offsetHeight;
            var dataHolder = document.getElementById("dataHolder");
            dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px; margin-left:200px");
        });


    }

    var buttonHolder = document.getElementById("buttonHolder");
    var holderHeight = buttonHolder.offsetHeight;
    var dataHolder = document.getElementById("dataHolder");
    dataHolder.setAttribute("style", "margin-top:-" + holderHeight + "px;; margin-left:200px");
}



async function SetLevelUpStuff() {
    var coll = document.getElementsByClassName("collapsibleLevelup");
    var content = document.getElementsByClassName("contentLevelup");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            //this.classList.toggle("active");
            for (j in content) {
                coll[j].classList.toggle("active");
                //  var content = this.nextElementSibling;
                if (content[j].style.display === "block") {
                    content[j].style.display = "none";
                } else {
                    content[j].style.display = "block";

                }
            }

        });
    }


    const urlParams = new URLSearchParams(window.location.search);
    const product = searchParams.get('type');


    if (product != undefined) {
        var splits = product.split("&");
        closeTabLinks(product);

        document.getElementById(splits[0] + "-button").className += " w3-red";


        await openCity(event, splits[0]);


    }




}


function SetUpSpawnTable() {


    var coll = document.getElementsByClassName("collapsible");
    var content = document.getElementsByClassName("content");
    var j = "";
    for (j in content) {
        coll[j].classList.toggle("active");
        //  var content = this.nextElementSibling;
        if (content[j].style.display === "grid") {
            content[j].style.display = "none";
        } else {
            content[j].style.display = "grid";

        }
    }

}

function SetUpCombatEnc() {


    var coll = document.getElementsByClassName("collapsible");
    var content = document.getElementsByClassName("combatEnchantment");
    var j = "";
    for (j in content) {
        coll[j].classList.toggle("active");
        //  var content = this.nextElementSibling;
        if (content[j].style.display === "grid") {
            content[j].style.display = "none";
        } else {
            content[j].style.display = "grid";

        }
    }

}





async function spawnEquipCards(list, divID) {
    if (divID === undefined) {
        divID = "equip";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {
        var iDiv = item_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}


async function showEquipmentFromList(list, divID) {


    await spawnEquipCards(list, divID);

    /* for (var i = 0; i < list.length; i++) {

         showEquipment(list[i], divID);

     };*/




}

async function showSiegeProjects(list) {





    if (list === undefined) {
        await spawnSpellCards(jsonSiegeProjects.projects, "dataHolder");
        for (var i = 0; i < jsonSiegeProjects.projects.length; i++) {
            showSiegeProject(jsonSiegeProjects.projects[i].name, true);
        }
    } else {
        await spawnSpellCards(list, "Siege Projects");
        for (i in list) {


            showSiegeProject(list[i], true);
        }
    }






}

async function showStructures(list) {

    await spawnSpellCards(list, "Structures");
    for (i in list) {
        showStructure(list[i], true);
    }

}

async function showEmpireTrees(list) {

    await spawnSpellCards(list, "Empire Tree");
    for (i in list) {
        showEmpireTree(list[i]);
    }

}

async function showWorldStructures(list) {






    await spawnStructureCards(list, "World Structures");
    for (i in list) {


        showWorldStructure(list[i]);
    }







}



async function spawnTomeCards(list, divID) {
    if (divID === undefined) {
        divID = "tome";
    }
    var doc = document.getElementById(divID);

    var iDiv = tome_card_template.content.cloneNode(true);
    doc.appendChild(iDiv);


}


async function showTomeFromList2(string, divID) {



    await spawnTomeCards(string, divID);



    showTome(string, divID);






}

async function showTomeFromList(list, divID, overwritetext) {


    /* await spawnTomeCards(list, divID);

     for (var i = 0; i < list.length; i++) {

         showTome(list[i], divID);

     };*/
    // SetCollapsibleButtonsAndDivs(overwritetext, list, "tome");
    SetButtonsAndDivs(list, undefined, "tome");
    //  SetCollapsibleButtonsAndDivs(overwritetext, list, "tome");




}

async function spawnSpellCards(list, divID) {
    if (divID === undefined) {
        divID = "spell";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {
        var iDiv = spell_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}

async function spawnSpellCardSingle(list, divID) {
    if (divID === undefined) {
        divID = "spell";
    }
    var doc = document.getElementById(divID);

    var iDiv = spell_card_template.content.cloneNode(true);
    doc.appendChild(iDiv);


}


async function spawnTomeCardSingle(list, divID) {
    if (divID === undefined) {
        divID = "tome";
    }
    var doc = document.getElementById(divID);

    var iDiv = tome_card_template.content.cloneNode(true);
    doc.appendChild(iDiv);


}
async function spawnStructureCardSingle(list, divID) {
    if (divID === undefined) {
        divID = "spell";
    }
    var doc = document.getElementById(divID);

    var iDiv = structure_card_template.content.cloneNode(true);
    doc.appendChild(iDiv);


}

async function spawnStructureCards(list, divID) {
    if (divID === undefined) {
        divID = "spell";
    }
    var doc = document.getElementById(divID);
    for (var i = 0; i < list.length; i++) {
        var iDiv = structure_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);
    }

}

async function showSpellFromList(list, divID) {


    await spawnSpellCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        showSpell(list[i], true);

    };




}

async function showSkillFromList(list, divID) {


    await spawnSpellCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        // check if has description
        if ('description' in list[i]) {
            showSkill(list[i], "", list[i].icon, list[i].category_name, list[i].level_name, list[i].group_name);
        } else {
            showSkill(list[i], "true", list[i].icon, list[i].category_name, list[i].level_name, list[i].group_name);
        }


    };




}

async function showTraitFromList(list, divID) {
    await spawnSpellCards(list, divID);

    for (var i = 0; i < list.length; i++) {


        showTrait(list[i]);



    };
}

async function showDestinyTraitsFromList(list, divID) {
    await spawnSpellCards(list, divID);

    for (var i = 0; i < list.length; i++) {


        showDestinyTrait(list[i]);



    };
}


async function showItemFromList(list, divID) {
    await spawnSpellCards(list, divID);

    for (var i = 0; i < list.length; i++) {


        showItem(list[i]);



    };
}

async function showWorldStructuresWithArgument(overwrite, argumentType, list, divID) {


    await spawnStructureCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        showWorldStructure(list[i]);

    };




}
async function showStructuresWithArgument(argument, divID, argumentType, includeProvince) {

    var list = new Array();
    list = findStructuresWithArgument(argument, argumentType, includeProvince);

    await spawnStructureCards(list, divID);

    for (var i = 0; i < list.length; i++) {

        showStructure(list[i], true);

    };




}

async function showItemsWithArgument(argumentType, overwritetext) {

    var list = new Array();
    list = findItemsWithArgument(argumentType);


    SetCollapsibleButtonsAndDivs(overwritetext, list, "item");




}


async function showSkillsWithArgument(signature, argumentType, overwritetext) {

    var list = new Array();
    list = findSkillsWithArgument(signature, argumentType);


    SetCollapsibleButtonsAndDivs(overwritetext, list, "skill");




}

async function showSpellsWithArgument(argument, argumentType, overwritetext) {

    var list = new Array();
    list = findSpellsWithArgument(argument, argumentType);

    if (overwritetext.indexOf(">") != -1) {
        overwritetext = overwritetext.split("/")[1];
        overwritetext = overwritetext.split(">")[1];
    }

    SetCollapsibleButtonsAndDivs(overwritetext, list, "spell");




}

async function showTraitsWithArgument(argument, overwritetext, affinity) {

    var list = new Array();
    list = findTraitsWithArgument(argument, affinity);



    SetCollapsibleButtonsAndDivs(overwritetext, list, "trait");




}

async function showSpellFromString(string, divID) {
    await spawnSpellCardSingle(string, divID);
    showSpell(string, true);

}

async function showSiegeProjectFromString(string, divID) {
    await spawnSpellCardSingle(string, divID);
    showSiegeProject(string, true);

}

async function showWorldStructureFromString(string, divID) {
    await spawnStructureCardSingle(string, divID);
    showWorldStructure(string);

}

async function showTomeFromString(string, divID) {
    await spawnTomeCardSingle(string, divID);
    showTome(string);

}

async function showStructureFromString(string, divID) {
    await spawnStructureCardSingle(string, divID);
    showStructure(string);

}


async function showHeroSkillFromString(string, divID) {
    await spawnSpellCardSingle(string, divID);

    var skill = findHeroSkill(string);
    // check if has description
    if ('description' in skill) {
        showSkill(skill, "", skill.icon, skill.category_name, skill.level_name, skill.group_name);
    } else {
        showSkill(skill, "true", skill.icon, skill.category_name, skill.level_name, skill.group_name);
    }



}

function findHeroSkill(skillID) {

    for (i in jsonHeroSkills.skills) {
        if (jsonHeroSkills.skills[i].id === skillID) {
            return jsonHeroSkills.skills[i];
        }
    }
}



function findItemsWithArgument(argumentType) {
    var j = "";

    var finalCheckedList = new Array();

    for (j in jsonHeroItems.items) {

        if (jsonHeroItems.items[j].slot.indexOf(argumentType) !== -1) {

            finalCheckedList.push(jsonHeroItems.items[j]);
        }
    }







    return finalCheckedList;
}

function findSkillsWithArgument(signature, argumentType) {
    var j = "";

    var finalCheckedList = new Array();
    if (signature === "") {
        for (j in jsonHeroSkills.skills) {
            if ('category_name' in jsonHeroSkills.skills[j]) {
                if (jsonHeroSkills.skills[j].category_name.indexOf(argumentType) !== -1) {
                    if (!isInArray(finalCheckedList, jsonHeroSkills.skills[j])) {
                        finalCheckedList.push(jsonHeroSkills.skills[j]);
                    }

                }
            }





        }
    } else {

        for (j in jsonHeroSkills.skills) {
            if ('type' in jsonHeroSkills.skills[j]) {
                if (jsonHeroSkills.skills[j].type === 'signature') {
                    if (!isInArray(finalCheckedList, jsonHeroSkills.skills[j])) {
                        finalCheckedList.push(jsonHeroSkills.skills[j]);
                    }
                }

            }
        }
    }

    // Remove duplicate objects from the array
    const uniqueArray = finalCheckedList.filter((item, index) => {
        return index === finalCheckedList.findIndex(obj => obj.id === item.id && obj.name === item.name);
    });
    return uniqueArray;
}

function findSpellsWithArgument(argumentaffinity, argumentType) {
    var i, output, affinity, textvalue, j, l, k, x, result = "";

    var finalCheckedList = new Array();
    if (argumentaffinity === "") {
        for (j in jsonSpells.spells) {

            if (jsonSpells.spells[j].spellType.indexOf(argumentType) !== -1) {

                finalCheckedList.push(jsonSpells.spells[j].id);
            }



        }
    } else {
        var listMod = new Array();
        for (i in jsonTomes.tomes) {
            affinity = jsonTomes.tomes[i].affinities;

            if (affinity != undefined) {
                if (affinity.toUpperCase().indexOf(argumentaffinity.toUpperCase()) !== -1) {
                    for (k in jsonTomes.tomes[i].skills) {
                        listMod.push(jsonTomes.tomes[i].skills[k].spell_slug);

                    }

                }
            } else {
                if (argumentaffinity === "General Research") {
                    if (jsonTomes.tomes[i].name.toUpperCase().indexOf("General Research".toUpperCase()) !== -1) {
                        for (k in jsonTomes.tomes[i].skills) {
                            listMod.push(jsonTomes.tomes[i].skills[k].spell_slug);

                        }

                    }
                }

                if (argumentaffinity === "Culture") {
                    if (jsonTomes.tomes[i].name.toUpperCase().indexOf("Mystic".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Feudal".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Barbarian".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Dark".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("High".toUpperCase()) !== -1 || jsonTomes.tomes[i].name.toUpperCase().indexOf("Industrious".toUpperCase()) !== -1) {
                        for (k in jsonTomes.tomes[i].skills) {
                            listMod.push(jsonTomes.tomes[i].skills[k].spell_slug);

                        }

                    }
                }
            }




        }


        for (j in jsonSpells.spells) {
            for (x in listMod) {
                if (listMod[x] === jsonSpells.spells[j].id) {
                    if (jsonSpells.spells[j].spellType.toUpperCase().indexOf(argumentType.toUpperCase()) !== -1) {

                        finalCheckedList.push(jsonSpells.spells[j].id);
                    }
                }
            }

        }
    }

    return finalCheckedList;
}


function findTraitsWithArgument(argumentType, affinity) {
    var i, output, affinity, textvalue, j, l, k, x, result = "";

    var finalCheckedList = new Array();
    if (argumentType != "") {
        for (j in jsonFactionCreation.traits) {

            if (jsonFactionCreation.traits[j].type.toUpperCase().indexOf(argumentType.toUpperCase()) !== -1) {
                if (affinity != "") {
                    if (jsonFactionCreation.traits[j].affinity.toUpperCase().indexOf(affinity.toUpperCase()) != -1) {
                        finalCheckedList.push(jsonFactionCreation.traits[j].id);
                    }
                } else {
                    finalCheckedList.push(jsonFactionCreation.traits[j].id);
                }






            }
        }
    }




    return finalCheckedList;
}

function findStructuresWithArgument(income, argumentType, includeprovince) {
    var i, output, affinity, textvalue, j, l, k, x, result = "";

    var finalCheckedList = new Array();
    if (argumentType != "") {
        for (j in jsonStructureUpgrades.structures) {

            if (jsonStructureUpgrades.structures[j].name.toUpperCase().indexOf(argumentType.toUpperCase()) !== -1) {
                if (includeprovince === jsonStructureUpgrades.structures[j].is_sector_upgrade) {
                    finalCheckedList.push(jsonStructureUpgrades.structures[j].id);
                }




            }
        }
    }
    if (income != "") {
        for (k in jsonStructureUpgrades.structures) {

            if (jsonStructureUpgrades.structures[k].id.toUpperCase().indexOf(income.toUpperCase()) !== -1) {
                if (includeprovince === jsonStructureUpgrades.structures[k].is_sector_upgrade) {

                    finalCheckedList.push(jsonStructureUpgrades.structures[k].id);
                }



            }



        }
    }




    return finalCheckedList;
}





function checkModRequirements(unit) {
    var j, check, checksplit, checknot, checknotsplit = "";
    for (j in jsonSpells.spells) {
        checksplit = jsonSpells.spells[j].check.split(" ");
        checknotsplit = jsonSpells.spells[j].checknot.split(" ");
        for (k in checksplit) {
            if (divs[i].innerHTML.indexOf(checksplit[k]) !== -1) {
                // something
            }
        }
    }
}






function showModsFromList(list, divId) {
    for (let i = 0; i < list.length; i++) {
        var iDiv = mod_card_template.content.cloneNode(true);
        if (divId === undefined) {
            document.getElementById("mods").appendChild(iDiv);
        } else {
            document.getElementById(divId).appendChild(iDiv);
        }
        showMod(list[i]);

    };
}

function showUnit(a, divID) {
    var hp, mp, shield, armor, descr, j, k, x, y, z, unitName, unitRole, icon, imagelink, prodcost, tier, research, building, reward, evolveTarget, name = "";
    var found = false;
    for (i in jsonUnits.units) {
        if (a === jsonUnits.units[i].id) {

            unitName = document.getElementById("unitstring");
            unitName.setAttribute("id", "unitstring" + a);
            name = jsonUnits.units[i].name;
            unitName.innerHTML += jsonUnits.units[i].name.toUpperCase();



            if (DLCDragonDawn.indexOf(a) != -1) {
                var newDivForMount = document.createElement("DIV");
                newDivForMount.className = "mountToolTip";

                imag = document.createElement("IMG");
                imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
                imag.setAttribute("height", "30px");

                spa = document.createElement("SPAN");
                spa.className = "tooltiptext";

                spa.innerHTML = "Part of the Dragon Dawn DLC";

                newDivForMount.appendChild(imag);
                newDivForMount.appendChild(spa);
                newDivForMount.setAttribute("style", "    text-transform: none;width: 1px;margin-left: 30px;height: 20px;float: left;");
                // get position of button



                unitName.append(newDivForMount);
            }

            // if in the list of mounted, add tooltip
            if (MountedSpecialList.includes(a) || CheckIfOptionalCavalry(a)) {
                var newDivForMount = document.createElement("DIV");
                newDivForMount.className = "mountToolTip";

                imag = document.createElement("IMG");
                imag.setAttribute("src", "/aow4db/Icons/Text/MountInteraction.png");
                imag.setAttribute("height", "35px");

                spa = document.createElement("SPAN");
                spa.className = "tooltiptext";

                spa.innerHTML = "If a Mount <hyperlink>Body Trait</hyperlink> is chosen, this unit gains that mount, even if it was not mounted before";

                newDivForMount.appendChild(imag);
                newDivForMount.appendChild(spa);
                newDivForMount.setAttribute("style", "    text-transform: none;width: 1px;margin-left: 30px;height: 20px;float: left;");
                // get position of button



                unitName.append(newDivForMount);


            }


            imagelink = document.getElementById("vid");
            imagelink.setAttribute("id", "vid" + a);
            imagelink.setAttribute('src', "/aow4db/Previews/" + jsonUnits.units[i].id + ".mp4");
            if (imagelink.getAttribute('src') === "/aow4db/Previews/undefined") {
                imagelink.setAttribute('src', "/aow4db/Previews/placeholder.mp4");
            }

            hp = document.getElementById("hp")
            hp.setAttribute("id", "hp" + a);
            hp.innerHTML = jsonUnits.units[i].hp;
            armor = document.getElementById("armor");
            armor.setAttribute("id", "armor" + a);
            armor.innerHTML = jsonUnits.units[i].armor;
            shield = document.getElementById("resistence");
            shield.setAttribute("id", "shield" + a);
            shield.innerHTML = jsonUnits.units[i].resistance;
            mp = document.getElementById("mp");
            mp.setAttribute("id", "mp" + a);
            mp.innerHTML = jsonUnits.units[i].mp;
            tier = document.getElementById("tier");



            //


            var defenseDiv = document.getElementById("damageReduction");

            defenseDiv.innerHTML = "Physical :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].armor) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].armor + "</span> <defense> </defense>)";
            defenseDiv.setAttribute("id", "damageReduction" + a);









            prodcost = document.getElementById("productioncost");
            prodcost.setAttribute("id", "productioncost" + a);
            prodcost.innerHTML = "Cost: " + jsonUnits.units[i].cost;


            var additionalBlight, additionalShock, additionalFire, additionalSpirit, additionalFrost;

            var movementDiv = document.getElementById("movement");



            for (j in jsonUnits.units[i].secondary_passives) {
                addUnitTypeIcon(jsonUnits.units[i].secondary_passives[j].slug, a);

                if (jsonUnits.units[i].secondary_passives[j].slug.indexOf("floating") != -1) {
                    movementDiv.innerHTML = "Movement Abilities :  <span style=\"color:white;\"> <bullet>Floating</bullet></span><br>";
                }

                if (jsonUnits.units[i].secondary_passives[j].slug.indexOf("flying") != -1) {
                    movementDiv.innerHTML = "Movement Abilities :  <span style=\"color:white;\"> <bullet>Flying</bullet></span><br>";
                }





            }

            movementDiv.setAttribute("id", "movement" + a);

            for (k in jsonUnits.units[i].abilities) {
                addAbilityslot(jsonUnits.units[i].abilities[k].slug);

            }

            if (jsonUnits.units[i].status_resistance != "0") {
                addstatusResistanceSlot(jsonUnits.units[i].status_resistance);
            }

            for (z in jsonUnits.units[i].resistances) {
                addResistanceSlot(jsonUnits.units[i].resistances[z].slug, jsonUnits.units[i].resistance);



                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("BLIGHT") != -1) {
                    additionalBlight = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }
                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("FIRE") != -1) {
                    additionalFire = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }
                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("FROST") != -1) {
                    additionalFrost = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }

                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("LIGHTNING") != -1) {
                    additionalShock = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }
                if (jsonUnits.units[i].resistances[z].slug.toUpperCase().indexOf("SPIRIT") != -1) {
                    additionalSpirit = ReturnWeaknessOrResistanceNumber(jsonUnits.units[i].resistances[z].slug);
                }



            }

            tier.innerHTML = "Tier " + romanize(jsonUnits.units[i].tier) + ": " + jsonUnits.units[i].upkeep;

            var summonInfo = canBeSummoned(jsonUnits.units[i].id);
            if (summonInfo.length > 0) {
                tier.innerHTML += "<br> Summoned: " + getSummonedUpkeep(jsonUnits.units[i].tier, "");
                var p = "";
                for (p in summonInfo) {
                    var castcost = "";
                    if (summonInfo[p].tactical === true) {
                        castcost = summonInfo[p].operation_point_cost + "<casttactical></casttactical>";
                    } else {
                        castcost = summonInfo[p].operation_point_cost + "<caststrategic></caststrategic>";
                    }
                    prodcost.innerHTML += "<br> Spell: " + summonInfo[p].casting_cost + castcost;
                }

            }


            var lowUpkeep = false;
            var faithfulUpkeep = false;
            var x = "";
            for (x in jsonUnits.units[i].primary_passives) {
                addPassiveslot(jsonUnits.units[i].primary_passives[x].slug);

                if (jsonUnits.units[i].primary_passives[x].slug.indexOf("low_maintenance") != -1) {
                    tier.innerHTML = "Tier " + romanize(jsonUnits.units[i].tier) + ": " + ReduceUpkeepPercentage(jsonUnits.units[i].upkeep, 0.75);
                    var lowUpkeep = true;

                    if (summonInfo.length > 0) {
                        tier.innerHTML += "<br> Summoned: " + getSummonedUpkeep(jsonUnits.units[i].tier, 0.75);


                    }

                }

                if (jsonUnits.units[i].primary_passives[x].slug.indexOf("faithful") != -1) {
                    tier.innerHTML = "Tier " + romanize(jsonUnits.units[i].tier) + ": " + ReduceUpkeepPercentage(jsonUnits.units[i].upkeep, 0.9);
                    var faithfulUpkeep = true;

                    if (summonInfo.length > 0) {
                        tier.innerHTML += "<br> Summoned: " + getSummonedUpkeep(jsonUnits.units[i].tier, 0.9);



                    }
                }
            }





            var y = "";
            for (y in jsonUnits.units[i].secondary_passives) {
                if (jsonUnits.units[i].secondary_passives[y].slug.indexOf("magic_origin") != -1) {
                    if (lowUpkeep === true) {
                        tier.innerHTML = "Tier " + romanize(jsonUnits.units[i].tier) + ": " + getSummonedUpkeep(jsonUnits.units[i].tier, 0.75);
                    } else if (faithfulUpkeep === true) {
                        tier.innerHTML = "Tier " + romanize(jsonUnits.units[i].tier) + ": " + getSummonedUpkeep(jsonUnits.units[i].tier, 0.9);
                    } else {
                        tier.innerHTML = "Tier " + romanize(jsonUnits.units[i].tier) + ": " + getSummonedUpkeep(jsonUnits.units[i].tier, "");
                    }


                    if (summonInfo.length > 0) {

                        var p = "";
                        for (p in summonInfo) {
                            var castcost = "";
                            if (summonInfo[p].tactical === true) {
                                castcost = summonInfo[p].operation_point_cost + "<casttactical></casttactical>";
                            } else {
                                castcost = summonInfo[p].operation_point_cost + "<caststrategic></caststrategic>";
                            }
                            prodcost.innerHTML = "<br> Spell: " + summonInfo[p].casting_cost + castcost;
                        }


                    }

                }
            }



            y = "";


            var resistanceholder = document.getElementById("resistanceholder");
            resistanceholder.setAttribute("id", "resistanceholder" + a);




            var resistanceDiv = document.getElementById("resistanceReduction");
            resistanceDiv.innerHTML = "Blight :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalBlight) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalBlight != undefined) {
                if (additionalBlight > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalBlight + "<defenseblight></defenseblight>";
                if (additionalBlight === "immune") {
                    resistanceDiv.innerHTML = "Blight: Immune";
                }
            }

            resistanceDiv.innerHTML += ")<br>";

            resistanceDiv.innerHTML += "Shock :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalShock) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalShock != undefined) {
                if (additionalShock > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalShock + "<defenselightning></defenselightning>";
            }

            resistanceDiv.innerHTML += ")<br>";


            resistanceDiv.innerHTML += "Fire :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalFire) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalFire != undefined) {
                if (additionalFire > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalFire + "<defensefire></defensefire>";
            }

            resistanceDiv.innerHTML += ")<br>";

            resistanceDiv.innerHTML += "Spirit :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalSpirit) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalSpirit != undefined) {
                if (additionalSpirit > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalSpirit + "<defensespirit></defensespirit>";
            }

            resistanceDiv.innerHTML += ")<br>";

            resistanceDiv.innerHTML += "Frost :  <span style=\"color:white;\">" + GetDamageReductionPercentage(jsonUnits.units[i].resistance, additionalFrost) + "</span> ( From <span style=\"color:white;\">" + jsonUnits.units[i].resistance + "</span> <resistance> </resistance>";
            if (additionalFrost != undefined) {
                if (additionalFrost > 0) {
                    resistanceDiv.innerHTML += "+";
                }
                resistanceDiv.innerHTML += additionalFrost + "<defensefrost></defensefrost>";
            }

            resistanceDiv.innerHTML += ")";


            resistanceDiv.setAttribute("id", "resistanceReduction" + a);


            document.getElementById("unitabholder").setAttribute("id", "unitabholder" + a);

            document.getElementById("unitstat").setAttribute("id", "unitstat" + a);


            document.getElementById("unit_role").setAttribute("id", "unit_role" + a);
            addLevelUpInfo(jsonUnits.units[i], a);

            // backtrack origin;
            backtrackUnitOrigins(a, name);
            tier.setAttribute("id", "tier" + a);
            document.getElementById("originHolder").setAttribute("id", "originHolder" + a);




            found = true;
            // break;
        }

    }
    if (found === false) {
        console.log("Couldn't find unit: " + a + i);
    }
}



function canBeSummoned(id) {
    var i = "";
    var k = "";
    var summonInf = new Array();
    for (i in jsonSpells.spells) {
        if ('summoned_units' in jsonSpells.spells[i]) {

            for (k in jsonSpells.spells[i].summoned_units) {

                if (jsonSpells.spells[i].summoned_units[k].slug === id) {
                    summonInf.push(jsonSpells.spells[i]);

                }
            }
        }

    }
    return summonInf;
}

function getSummonedUpkeep(tier, lowMaintenance) {
    if (tier === 1) {
        if (lowMaintenance != "") {
            return ReduceUpkeepPercentage("8<mana></mana>", lowMaintenance);
        } else {
            return "8<mana></mana>";
        }

    }
    if (tier === 2) {
        if (lowMaintenance != "") {
            return ReduceUpkeepPercentage("12<mana></mana>", lowMaintenance);
        } else {
            return "12<mana></mana>";
        }
    }
    if (tier === 3) {
        if (lowMaintenance != "") {
            return ReduceUpkeepPercentage("20<mana></mana>", lowMaintenance);
        } else {
            return "20<mana></mana>";
        }
    }
    if (tier === 4) {
        if (lowMaintenance != "") {
            return ReduceUpkeepPercentage("30<mana></mana> 3<influence></influence>", lowMaintenance);
        } else {
            return "30<mana></mana> 3<influence></influence>";
        }
    }
    if (tier === 5) {
        if (lowMaintenance != "") {
            return ReduceUpkeepPercentage("60<mana></mana> 7<influence></influence>", lowMaintenance);
        } else {
            return "60<mana></mana> 7<influence></influence>";
        }
    }
}


function backtrackUnitOrigins(unitID, name) {
    var holder = document.getElementById("originHolder");
    var culture = (CheckIfInCulture(unitID));
    if (culture != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";

        const capitalized =
            culture.charAt(0).toUpperCase() +
            culture.slice(1);

        spa.innerHTML = "Culture Unit from <hyperlink>" + capitalized + "</<hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/Text/" + culture + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/" + capitalized + "Units.html\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }
    var tomes = CheckIfInTomes(unitID);
    if (tomes != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";



        spa.innerHTML = "Unit production unlocked from Tier <hyperlink>" + romanize(tomes.tier) + " - " + showAffinitySymbols(tomes) + " " + tomes.name + "</<hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/TomeIcons/" + tomes.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?tome=" + tomes.id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

    var spells = CheckIfInSpells(unitID, name);
    var x = ""
    for (x in spells) {


        var btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        var imag = document.createElement("IMG");
        var spa = document.createElement("SPAN");
        spa.className = "tooltiptext";

        var tierandnameoftome = backtraceTomeNameAndTier(spells[x].id);
        if (tierandnameoftome != "") {
            spa.innerHTML = "Unit mentioned in Spell: <hyperlink>" + spells[x].name + "</hyperlink> <br>in Tier <hyperlink>" + romanize(tierandnameoftome.tier) + " - " + showAffinitySymbols(tierandnameoftome) + " " + tierandnameoftome.name + "</hyperlink>";
        } else {
            spa.innerHTML = "Unit mentioned in Spell: <hyperlink>" + spells[x].name + "</<hyperlink>";
        }


        imag.setAttribute("src", "/aow4db/Icons/SpellIcons/" + spells[x].id + ".png");


        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");



        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?spell=" + spells[x].id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

    var siege = CheckIfInSiege(name);
    if (siege != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Unit mentioned in Siege Project <hyperlink> " + siege.name + "</hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/SiegeIcons/" + siege.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?siege=" + siege.id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

    var struc = CheckIfInStructure(name)

    if (struc != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Unit mentioned in Structure <hyperlink> " + struc.name + "</hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/UpgradeIcons/" + struc.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?structure=" + struc.id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }




    var wonder = CheckIfInAncientWonder(unitID);
    if (wonder != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Rally Unit unlocked from <hyperlink>" +
            wonder.type + "</<hyperlink> : <hyperlink>" + wonder.name + "</<hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/StructurePics/" + wonder.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?wonder=" + wonder.id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

    var tree = CheckIfInEmpireTree(name);
    if (tree != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Unit mentioned in <hyperlink>" +
            tree.category + " " + tree.required_level + "</<hyperlink> : <hyperlink>" + tree.name + "</<hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/EmpireProgressionIcons/" + tree.id + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/EmpireTree.html \"target = \"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);


        holder.appendChild(btn);
        // add icon with mouseover

    }

    var unitAbility = CheckIfFromAbility(name);
    if (unitAbility != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Unit mentioned in Ability <hyperlink>" +
            unitAbility[1].name + "</hyperlink> of Unit <hyperlink>" + unitAbility[0].name + "</hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/Abilities/" + unitAbility[1].slug + ".png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Units.html?unit=" + unitAbility[0].id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

    var heroSkill = CheckIfFromHeroSkill(name);
    if (heroSkill != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Unit mentioned in Hero Skill <hyperlink>" +
            heroSkill[1].name + "</hyperlink>";
        if (heroSkill[0] != "") {
            imag.setAttribute("src", "/aow4db/Icons/Abilities/" + heroSkill[0].icon + ".png");
        } else {
            imag.setAttribute("src", "/aow4db/Icons/HeroSkillIcons/" + heroSkill[1].icon + ".png");
        }

        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?skill=" + heroSkill[1].id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }

    var evolve = CheckIfEvolveTarget(unitID)
    if (evolve != "") {
        btn = document.createElement("DIV");
        btn.className = "unittype_icon";
        imag = document.createElement("IMG");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";


        spa.innerHTML = "Evolved from Unit <hyperlink>" +
            evolve.name + "</<hyperlink>";
        imag.setAttribute("src", "/aow4db/Icons/Abilities/evolve.png");
        imag.setAttribute('onerror', "this.setAttribute('src','/aow4db/Icons/Text/mp.png')");
        imag.setAttribute("width", "60");
        imag.setAttribute("height", "60");
        btn.appendChild(imag);
        var wrap = btn.innerHTML;
        btn.innerHTML = "<a href=\"/aow4db/HTML/Units.html?unit=" + evolve.id + "\" target=\"_blank\">" + wrap + "</a>"
        btn.appendChild(spa);

        holder.appendChild(btn);
        // add icon with mouseover

    }



}




function CheckIfInCulture(unitID) {
    var culture = "";
    if (highCultureUnits.includes(unitID)) {
        culture = "high";
    }
    if (mysticCultureUnits.includes(unitID)) {
        culture = "mystic";
    }
    if (darkCultureUnits.includes(unitID)) {
        culture = "dark";
    }
    if (feudalCultureUnits.includes(unitID)) {
        culture = "feudal";
    }
    if (industriousCultureUnits.includes(unitID)) {
        culture = "industrious";
    }
    if (barbarianCultureUnits.includes(unitID)) {
        culture = "barbarian";
    }
    return culture;
}


function showAffinitySymbols(tomes) {
    var affinitiesdual = tomes.affinities.split(", ");

    var allAffinity = "";
    var i = "";
    for (i in affinitiesdual) {
        var affinities = affinitiesdual[i].split(" ");

        if (affinities[1] === "2") {

            allAffinity += affinities[0];
        }
        allAffinity += affinities[0];

    }
    return allAffinity;
}

function CheckIfInSpells(unitID, unitName) {
    var spell = new Array();
    for (i in jsonSpells.spells) {

        if ('summoned_units' in jsonSpells.spells[i]) {
            for (k in jsonSpells.spells[i].summoned_units) {
                if (unitID === jsonSpells.spells[i].summoned_units[k].slug) {
                    if (!isInArray(spell, jsonSpells.spells[i])) {
                        spell.push(jsonSpells.spells[i]);
                    }

                }
            }

        }
        if (jsonSpells.spells[i].description.indexOf(">" + unitName) != -1) {
            if (!isInArray(spell, jsonSpells.spells[i])) {

                spell.push(jsonSpells.spells[i]);
            }



        }
    }




    return spell;
}

function CheckIfFromAbility(unitName) {
    var ability = "";

    for (i in jsonUnitAbilities.abilities) {

        if (unitName === "Fire Runestone") {
            unitName = "Runestone";
        }
        if (jsonUnitAbilities.abilities[i].description.indexOf(" " + unitName) != -1) {


            ability = jsonUnitAbilities.abilities[i];




        }
    }

    var unitslugLookup = "";
    if (ability != "") {
        for (j in jsonUnits.units) {

            for (k in jsonUnits.units[j].abilities) {

                if (jsonUnits.units[j].abilities[k].slug === ability.slug) {

                    unitslugLookup = new Array();
                    unitslugLookup.push(jsonUnits.units[j]);
                    unitslugLookup.push(ability);
                }
            }
            for (l in jsonUnits.units[j].primary_passives) {

                if (jsonUnits.units[j].primary_passives[l].slug === ability.slug) {

                    unitslugLookup = new Array();
                    unitslugLookup.push(jsonUnits.units[j]);
                    unitslugLookup.push(ability);
                }
            }
        }
    }



    return unitslugLookup;
}

function CheckIfFromHeroSkill(unitName) {
    var resultslist = "";
    var hero = "";

    for (i in jsonUnitAbilities.abilities) {


        if (jsonUnitAbilities.abilities[i].description.indexOf(unitName) != -1) {


            hero = jsonUnitAbilities.abilities[i];




        }
    }



    for (j in jsonHeroSkills.skills) {
        if (hero != "") {
            if ('abilities' in jsonHeroSkills.skills[j]) {
                for (k in jsonHeroSkills.skills[j].abilities) {

                    if (jsonHeroSkills.skills[j].abilities[k].slug === hero.slug) {
                        resultslist = new Array();
                        resultslist.push(hero);
                        resultslist.push(jsonHeroSkills.skills[j]);


                    }
                }
            }


        } else {
            for (k in jsonHeroSkills.skills[j].description) {

                if (jsonHeroSkills.skills[j].description.indexOf(unitName) != -1) {
                    resultslist = new Array();
                    resultslist.push(hero);
                    resultslist.push(jsonHeroSkills.skills[j]);


                }
            }

        }

    }



    return resultslist;
}


function CheckIfInSiege(unitName) {
    var siege = "";
    for (i in jsonSiegeProjects.projects) {

        if (jsonSiegeProjects.projects[i].description.indexOf(">" + unitName) != -1) {

            siege = jsonSiegeProjects.projects[i];

        }




    }
    return siege;
}

function CheckIfInStructure(unitName) {
    var structure = "";
    for (i in jsonStructureUpgrades.structures) {
        if (unitName === "Warg") {
            unitName = "Warg<";
        }
        if (unitName === "Archer") {
            unitName = "Archer<";
        }
        if (jsonStructureUpgrades.structures[i].prediction_description.indexOf(">" + unitName) != -1) {

            structure = jsonStructureUpgrades.structures[i];

        }

        if (jsonStructureUpgrades.structures[i].description.indexOf(">" + unitName) != -1) {

            structure = jsonStructureUpgrades.structures[i];

        }




    }
    return structure;
}

function CheckIfInTomes(unitID) {
    var tome = "";

    if (unitID == "young_frost_dragon" || unitID == "young_obsidian_dragon" || unitID == "young_golden_dragon") {
        unitID = "young_fire_dragon";
    }
    for (i in jsonTomes.tomes) {
        for (k in jsonTomes.tomes[i].skills) {
            if ('unit_slug' in jsonTomes.tomes[i].skills[k]) {
                if (unitID === jsonTomes.tomes[i].skills[k].unit_slug) {


                    tome = jsonTomes.tomes[i];
                }
            }


        }

    }
    return tome;
}

function CheckIfInEmpireTree(unitNameUnique) {
    var tree = "";
    var i, k = "";
    for (i in jsonEmpire.empirenodes) {

        if (jsonEmpire.empirenodes[i].description.indexOf(">" + unitNameUnique) != -1) {


            tree = jsonEmpire.empirenodes[i];
        }



    }




    return tree;
}

function CheckIfEvolveTarget(unitID) {
    var evolve = "";
    var i, k = "";
    for (i in jsonUnits.units) {

        if ('evolve_target' in jsonUnits.units[i]) {


            if (unitID === jsonUnits.units[i].evolve_target) {
                evolve = jsonUnits.units[i];

            }


        }



    }
    return evolve;
}

function CheckIfInAncientWonder(unitID) {
    var wonder = "";
    var i, k = "";
    for (i in jsonWorldStructures.structures) {

        if ('unit_unlocks' in jsonWorldStructures.structures[i]) {

            for (k in jsonWorldStructures.structures[i].unit_unlocks) {

                if (unitID === jsonWorldStructures.structures[i].unit_unlocks[k].slug) {
                    wonder = jsonWorldStructures.structures[i];
                }
            }


        }



    }
    return wonder;
}

function ReduceUpkeepPercentage(value, percentage) {
    var number = value.split("<");
    var reducedUpkeep = Math.round(percentage * parseInt(number[0]));
    var comb = reducedUpkeep + "<" + number[1] + "<" + number[2];
    if (number.length > 2) {
        comb += "<" + number[3] + "<" + +number[4];
    }
    return comb;
}

function ReturnWeaknessOrResistanceNumber(slug) {

    if (slug.indexOf("weakness") !== -1) {
        var split = slug.split("weakness_");
        abilityDam = "-" + split[1];
    }
    if (slug.indexOf("resistance") !== -1) {
        var split = slug.split("resistance_");
        abilityDam = split[1];
    }
    if (slug.indexOf("immunity") !== -1) {
        abilityDam = "immune";
    }

    return abilityDam;

}

function GetDamageReductionPercentage(number, additionalNumber) {
    if (additionalNumber === undefined) {
        additionalNumber = 0;
    }
    var combinedDefense = parseInt(number) + parseInt(additionalNumber);

    if (combinedDefense >= 0) {
        var defensePercentage = 1 - Math.pow(0.9, combinedDefense);
    } else {

        var defensePercentage = -(1 - Math.pow(0.9, -combinedDefense));
    }

    var percentage = Math.round(defensePercentage * 100);
    if (percentage > 0) {
        percentage = "<span style=\"color:lawngreen\">" + percentage + "%</span>";
    }
    if (percentage < 0) {
        percentage = "<span style=\"color:red\">" + percentage + "%</span>";
    }

    if (additionalNumber === "x") {
        percentage = "Immune";
    }
    return percentage;
}

function addLevelUpInfo(units, a) {
    var levelup = document.getElementById("levelup");
    levelup.setAttribute("id", "levelup" + a);
    evolveTarget = units.evolve_target;

    if (units.tier === 1) {
        xpNeeded = 4;
    }
    if (units.tier === 2) {
        xpNeeded = 6;
    }
    if (units.tier === 3) {
        xpNeeded = 8;
    }
    if (units.tier === 4) {
        xpNeeded = 10;
    }
    if (units.tier === 5) {
        xpNeeded = 12;
    }

    var levelText = "";
    levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_soldier.png\" width='20'\"> Soldier - " + xpNeeded + "<xp></xp></p>";
    for (i in units.medal_rewards_2) {
        levelText += "<bullet>" + lookupSlug(units.medal_rewards_2[i].slug) + "</bullet>";

    }
    levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_veteran.png\" width='20'\"> Veteran - " + (xpNeeded * 2) + "<xp></xp></p>";
    for (i in units.medal_rewards_3) {
        levelText += "<bullet>" + lookupSlug(units.medal_rewards_3[i].slug) + "</bullet>";

    }
    levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_elite.png\" width='20'\"> Elite - " + (xpNeeded * 3) + "<xp></xp></p>";

    for (i in units.medal_rewards_4) {

        if (units.medal_rewards_4[i].slug.indexOf("medal") != -1) {
            levelText += "<p class=\"levelup_medal\">" + "<bullet>" + lookupSlug(units.medal_rewards_4[i].slug);
            levelText += "<span class=\"tooltiptext\" style=\"font-size=20px\">" + lookupSlugDescription(units.medal_rewards_4[i].slug) + "</span>  </p> </bullet> ";
        } else {
            levelText += "<bullet>" + lookupSlug(units.medal_rewards_4[i].slug) + "</bullet>";
        }

    }
    if (evolveTarget != undefined) {
        levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_champion.png\" width='20'\"> Champion - " + (xpNeeded * 4) + "<xp></xp></p>";
        levelText += "<bullet> Evolves into <hyperlink> <a href=\"/aow4db/HTML/Units.html?unit=" + evolveTarget + "\" target=\"_blank\">" + lookupUnit(evolveTarget) + "</a></hyperlink></bullet>";
    }

    if (evolveTarget === undefined) {


        levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_champion.png\" width='20'\"> Champion - " + (xpNeeded * 4) + "<xp></xp></p>";

        for (i in units.medal_rewards_5) {
            levelText += "<bullet>" + lookupSlug(units.medal_rewards_5[i].slug) + "</bullet>";

        }

        levelText += "<p style=\"  color: #aadb9c;\"> <img src=\"/aow4db/Icons/Text/medal_legend.png\" width='20'\"> Legend - " + (xpNeeded * 10) + "<xp></xp></p>";
        for (i in units.medal_rewards_6) {
            if (units.medal_rewards_6[i].slug.indexOf("medal") != -1) {
                levelText += "<p class=\"levelup_medal\">" + "<bullet>" + lookupSlug(units.medal_rewards_6[i].slug);
                levelText += "<span class=\"tooltiptext\" style=\"font-size=20px\">" + lookupSlugDescription(units.medal_rewards_6[i].slug) + "</span>  </p> </bullet> ";
            } else {
                levelText += "<bullet>" + lookupSlug(units.medal_rewards_6[i].slug) + "</bullet>";
            }


        }
    }

    levelup.innerHTML = levelText;


}

function lookupUnit(id) {
    for (j in jsonUnits.units) {
        if (id === jsonUnits.units[j].id) {
            return jsonUnits.units[j].name;
        }

    }
    return "Couldn't find this";
}

function lookupSlugDescription(slug) {
    for (j in jsonUnitAbilities.abilities) {
        if (slug === jsonUnitAbilities.abilities[j].slug) {

            if (slug === "legend_medal_killing_momentum") {
                return "Unit regains Action Points when killing another unit. Works once per Turn";
            } else {
                return jsonUnitAbilities.abilities[j].description;
            }

        }

    }
    return "Couldn't find this";
}

function lookupSlug(slug) {
    for (j in jsonUnitAbilities.abilities) {
        if (slug === jsonUnitAbilities.abilities[j].slug) {
            return jsonUnitAbilities.abilities[j].name;
        }

    }
    return "Couldn't find this";
}

function romanize(num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
               "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
               "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function deromanize(str) {
    var str = str.toUpperCase();
    var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    var token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    var key = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var num = 0,
        m;
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) num += key[m[0]];
    return num;
}


function showSiegeProject(id, showOrigin) {

    var modName, description, cost, type, tier, i = "";
    var found = false;

    for (i in jsonSiegeProjects.projects) {
        if (id === jsonSiegeProjects.projects[i].name) {


            modName = document.getElementById("modname");
            modName.innerHTML = jsonSiegeProjects.projects[i].name.toUpperCase();
            modName.setAttribute("id", "modname" + jsonSiegeProjects.projects[i].name);
            descriptionDiv = document.getElementById("moddescription");
            description = jsonSiegeProjects.projects[i].description;

            description += "<br>Fortification Damage:<br> +" + jsonSiegeProjects.projects[i].siege_health_damage + " <siegehealthdamage></siegehealthdamage> Fortification Damage";

            imagelink = document.getElementById("modicon");


            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + jsonSiegeProjects.projects[i].name);


            imagelink.setAttribute("src", "/aow4db/Icons/SiegeIcons/" + jsonSiegeProjects.projects[i].id + ".png");
            imagelink.setAttribute("id", "modicon" + jsonSiegeProjects.projects[i].name);
            descriptionDiv.innerHTML = description;
            descriptionDiv.setAttribute("id", "moddescription" + jsonSiegeProjects.projects[i].name);

            tier = document.getElementById("modtier");

            tier.innerHTML = "<garrison></garrison> Siege Project";

            tier.setAttribute("id", "modtier" + jsonSiegeProjects.projects[i].name);

            cost = document.getElementById("modcost");
            cost.innerHTML = "Cost:<br>" + jsonSiegeProjects.projects[i].cost;
            cost.setAttribute("id", "modcost" + jsonSiegeProjects.projects[i].name);


            var tierSpell = backtraceTomeOriginAndTier(jsonSiegeProjects.projects[i].name, showOrigin);

            if (tierSpell != undefined) {
                var splitspell = tierSpell.split(",");
                tier.innerHTML += " Tier " + romanize(splitspell[0]);
                if (DLCDragonDawn.indexOf(splitspell[1]) != -1 && showOrigin) {
                    var newDivForMount = document.createElement("DIV");
                    newDivForMount.className = "mountToolTip";
                    newDivForMount.setAttribute("style", "text-transform: none;width: 1px;left: -32px;position: relative;margin-left: 30px;height: 20px;float: left;");
                    imag = document.createElement("IMG");
                    imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
                    imag.setAttribute("height", "30px");

                    spa = document.createElement("SPAN");
                    spa.className = "tooltiptext";

                    spa.innerHTML = "Part of the Dragon Dawn DLC";

                    newDivForMount.appendChild(imag);
                    newDivForMount.appendChild(spa);
                    //newDivForMount.setAttribute("style", "    text-transform: none;width: 1px;margin-left: 30px;height: 20px;float: left;");
                    // get position of button



                    modName.append(newDivForMount);


                }
            }

            var tomeOrigin = document.getElementById("originTome");
            tomeOrigin.setAttribute("id", "originTome" + id);
            var tomeOriginIcon = document.getElementById("originTomeIcon");
            tomeOriginIcon.setAttribute("id", "originTomeIcon" + id);
            found = true;


        }
        if (id === jsonSiegeProjects.projects[i].id) {


            modName = document.getElementById("modname");
            modName.innerHTML = jsonSiegeProjects.projects[i].name.toUpperCase();
            modName.setAttribute("id", "modname" + jsonSiegeProjects.projects[i].name);
            descriptionDiv = document.getElementById("moddescription");
            description = jsonSiegeProjects.projects[i].description;

            description += "<br>Fortification Damage:<br> +" + jsonSiegeProjects.projects[i].siege_health_damage + " <siegehealthdamage></siegehealthdamage> Fortification Damage";

            imagelink = document.getElementById("modicon");


            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + jsonSiegeProjects.projects[i].name);


            imagelink.setAttribute("src", "/aow4db/Icons/SiegeIcons/" + jsonSiegeProjects.projects[i].id + ".png");
            imagelink.setAttribute("id", "modicon" + jsonSiegeProjects.projects[i].name);
            descriptionDiv.innerHTML = description;
            descriptionDiv.setAttribute("id", "modicon" + jsonSiegeProjects.projects[i].name);

            tier = document.getElementById("modtier");

            tier.innerHTML = "<garrison></garrison> Siege Project";

            tier.setAttribute("id", "modtier" + jsonSiegeProjects.projects[i].name);

            cost = document.getElementById("modcost");
            cost.innerHTML = "Cost:<br>" + jsonSiegeProjects.projects[i].cost;
            cost.setAttribute("id", "modcost" + jsonSiegeProjects.projects[i].name);



            var tierSpell = backtraceTomeOriginAndTier(jsonSiegeProjects.projects[i].id, showOrigin);

            if (tierSpell != undefined) {
                var splitspell = tierSpell.split(",");
                tier.innerHTML += " Tier " + romanize(splitspell[0]);
                if (DLCDragonDawn.indexOf(splitspell[1]) != -1 && showOrigin) {
                    var newDivForMount = document.createElement("DIV");
                    newDivForMount.className = "mountToolTip";
                    newDivForMount.setAttribute("style", "text-transform: none;width: 1px;left: -32px;position: relative;margin-left: 30px;height: 20px;float: left;");
                    imag = document.createElement("IMG");
                    imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
                    imag.setAttribute("height", "30px");

                    spa = document.createElement("SPAN");
                    spa.className = "tooltiptext";

                    spa.innerHTML = "Part of the Dragon Dawn DLC";

                    newDivForMount.appendChild(imag);
                    newDivForMount.appendChild(spa);
                    //newDivForMount.setAttribute("style", "    text-transform: none;width: 1px;margin-left: 30px;height: 20px;float: left;");
                    // get position of button



                    modName.append(newDivForMount);


                }
            }

            var tomeOrigin = document.getElementById("originTome");
            tomeOrigin.setAttribute("id", "originTome" + id);
            var tomeOriginIcon = document.getElementById("originTomeIcon");
            tomeOriginIcon.setAttribute("id", "originTomeIcon" + id);


            found = true;


        }

    }



}


function showTome(a, div) {
    var modName, description, cost, type, tier, k, j, l, descriptionDiv = "";
    var found = false;
    for (j in jsonTomes.tomes) {
        if (a === jsonTomes.tomes[j].id) {


            modName = document.getElementById("tomename");
            modName.innerHTML = "";




            modName.innerHTML += jsonTomes.tomes[j].name;

            if (DLCDragonDawn.indexOf(a) != -1) {
                var newDivForMount = document.createElement("DIV");
                newDivForMount.className = "mountToolTip";

                imag = document.createElement("IMG");
                imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
                imag.setAttribute("height", "30px");

                spa = document.createElement("SPAN");
                spa.className = "tooltiptext";

                spa.innerHTML = "Part of the Dragon Dawn DLC";

                newDivForMount.appendChild(imag);
                newDivForMount.appendChild(spa);
                newDivForMount.setAttribute("style", "    text-transform: none;width: 1px;margin-left: 30px;height: 20px;float: left;");
                // get position of button



                modName.append(newDivForMount);
            }

            modName.setAttribute("id", "tomename" + a);
            descriptionDiv = document.getElementById("tomedescription");
            description = jsonTomes.tomes[j].gameplay_description;
            if ('affinities' in jsonTomes.tomes[j]) {
                var affinitiesdual = jsonTomes.tomes[j].affinities.split(", ");

                var allAffinity = "";
                for (i in affinitiesdual) {
                    var affinities = affinitiesdual[i].split(" ");
                    allAffinity += affinities[0];

                }


                descriptionDiv.innerHTML = "Tier " + romanize(jsonTomes.tomes[j].tier) + " " + allAffinity + " " + "<br>" + description;
            } else {
                descriptionDiv.innerHTML = description;
            }



            descriptionDiv.setAttribute("id", "tomedescription" + a);
            loreDescription = jsonTomes.tomes[j].lore_description;
            loreDescription = loreDescription.replace(String.fromCharCode(92), "");
            loreDescription = loreDescription.replace(String.fromCharCode(92), "");

            loreDescription += "<br> -" + jsonTomes.tomes[j].lore_author;
            descriptionLoreDiv = document.getElementById("tomeloredescription");
            descriptionLoreDiv.innerHTML = loreDescription;

            unitTypesDiv = document.getElementById("initialBonusList");

            var div = document.createElement("DIV");

            if ('affinities' in jsonTomes.tomes[j]) {
                var affinitiesdual = jsonTomes.tomes[j].affinities.split(", ");

                var allAffinity = "";
                for (i in affinitiesdual) {
                    var affinities = affinitiesdual[i].split(" ");
                    allAffinity += affinities[1] + affinities[0];

                }
                div.innerHTML = "+" + allAffinity + " Affinity"
                unitTypesDiv.appendChild(div);
            }
            var l = "";
            if ('hero_skills' in jsonTomes.tomes[j]) {

                for (l in jsonTomes.tomes[j].hero_skills) {
                    if (l != 0) {
                        if (jsonTomes.tomes[j].hero_skills[l].slug === jsonTomes.tomes[j].hero_skills[l - 1].slug) {
                            break;
                        }
                    }
                    var div = document.createElement("DIV");
                    div.className = "initialBonusText";
                    var name = GetHeroSkillName(jsonTomes.tomes[j].hero_skills[l].slug);
                    div.innerHTML = "<hero></hero>" + name;






                    var heroSkillIconAndDesc = GetHeroSkillDescription(jsonTomes.tomes[j].hero_skills[l].slug);

                    // its a ability
                    if (heroSkillIconAndDesc[0] != "") {

                        var spa2 = GetAbilityInfo(heroSkillIconAndDesc[0]);


                        spa2.className = "tooltiptext";
                    } else {
                        // its a passive
                        var spa2 = CreatePassiveSlotToolTip(heroSkillIconAndDesc[1].icon, heroSkillIconAndDesc[1].name, heroSkillIconAndDesc[1].description);
                        spa2.className = "tooltiptext";
                    }

                    var title = document.createElement("SPAN");
                    title.innerHTML = heroSkillIconAndDesc[1].name.toUpperCase();
                    title.setAttribute("style", "color:#deb887 ");


                    title.innerHTML += "<br>" + heroSkillIconAndDesc[1].category_name + " - " + heroSkillIconAndDesc[1].level_name + "<br><br>";

                    spa2.prepend(title);


                    div.appendChild(spa2);
                    unitTypesDiv.appendChild(div);
                }

            }
            var l = "";
            if ('upgrades' in jsonTomes.tomes[j]) {
                for (l in jsonTomes.tomes[j].upgrades) {

                    var div = document.createElement("DIV");
                    div.className = "initialBonusText";
                    var name = GetStructureName(jsonTomes.tomes[j].upgrades[l].slug);
                    div.innerHTML = name;

                    var spa = document.createElement("SPAN");
                    spa.className = "tooltiptext";
                    spa.innerHTML = "<span style=\"color: #deb887 ;text-transform: uppercase\">" + name + "</span>" + GetStructureDescription(jsonTomes.tomes[j].upgrades[l].slug);

                    div.appendChild(spa);
                    unitTypesDiv.appendChild(div);

                }

            }
            var l = "";
            if ('passives' in jsonTomes.tomes[j]) {
                for (l in jsonTomes.tomes[j].passives) {
                    var div = document.createElement("DIV");
                    div.className = "initialBonusText";

                    div.innerHTML = jsonTomes.tomes[j].passives[l].name;

                    var spa = document.createElement("SPAN");
                    spa.className = "tooltiptext";
                    spa.innerHTML = jsonTomes.tomes[j].passives[l].type + "<br>";
                    spa.innerHTML += jsonTomes.tomes[j].passives[l].description;
                    div.appendChild(spa);

                    unitTypesDiv.appendChild(div);



                }

            }
            // casting points
            var div = document.createElement("DIV");
            div.className = "initialBonusText";
            if (jsonTomes.tomes[j].tier === "1" || jsonTomes.tomes[j].tier === "2") {
                var amount = 5;
            }
            if (jsonTomes.tomes[j].tier === "3" || jsonTomes.tomes[j].tier === "4") {
                var amount = 10;
            }
            if (jsonTomes.tomes[j].tier === "5") {
                var amount = 15;
            }

            if (amount != undefined) {
                div.innerHTML = "+" + amount + "<casttactical></casttactical>" + "+" + amount + "<caststrategic></caststrategic>";
            }

            unitTypesDiv.appendChild(div);

            unitTypesDiv.setAttribute("id", "initialBonusList" + a);



            descriptionLoreDiv.setAttribute("id", "tomeloredescription" + a);
            skillHolder = document.getElementById("tome_unlocks");

            for (k in jsonTomes.tomes[j].skills) {
                if ('spell_slug' in jsonTomes.tomes[j].skills[k]) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);
                    showSpell(jsonTomes.tomes[j].skills[k].spell_slug, false);
                }
                if ('unit_slug' in jsonTomes.tomes[j].skills[k]) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);

                    showUnitUnlock(jsonTomes.tomes[j].skills[k]);
                }

                if ('upgrade_slug' in jsonTomes.tomes[j].skills[k]) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);
                    showStructure(jsonTomes.tomes[j].skills[k].upgrade_slug, false);
                }
                if (jsonTomes.tomes[j].skills[k].type.indexOf("Siege") != -1) {
                    var iDiv = spell_card_template.content.cloneNode(true);
                    skillHolder.appendChild(iDiv);
                    showSiegeProject(jsonTomes.tomes[j].skills[k].name, false);
                }

            }
            skillHolder.setAttribute("id", "tome_unlocks" + a);



            imagelink = document.getElementById("tomeicon");
            imagelink.setAttribute("src", "/aow4db/Icons/TomeIcons/" + a + ".png");
            imagelink.setAttribute("id", "tomeicon" + a);

            // backtraceTomeOriginAndTier(jsonSpells.spells[j].id);


            found = true;
        }
    }
    if (found === false) {
        console.log("Couldn't find tome: " + a);
    }
}

function GetAbilityInfo(ability) {
    if ('accuracy' in ability) {
        var abilityName = ability.name.toUpperCase();
        if (ability.requisites === undefined) {
            var abilityReq = "";
        } else {
            // var abilityReq = "";
            //for (k in ability.requisites) {
            //  if (k === 0) {
            //    abilityReq = "(";
            //}
            //abilityReq += ability.requisites[k].requisite;
            //if (k != ability.requisites.length - 1) {
            //  abilityReq += ",";
            //} else {
            //  abilityReq += ")";
            //}
            //}
            var abilityReq = ability.requisites;
        }


        var abilityMod = "";



        for (l in ability.modifiers) {
            abilityName += "&#11049";
            abilityMod += "<bullet>" + ability.modifiers[l].name + "<br>";
            abilityMod += ability.modifiers[l].description + "</bullet><br>";


        }

        // add notes


        var abilityNote = "";
        for (l in ability.notes) {
            if (ability.notes[l] === undefined) {

            } else {
                abilityNote += "<bullet>" + ability.notes[l].note + "</bullet>";

            }

        }





        abilityRange = ability.range + "<range></range>";
        abilityAcc = ability.accuracy + "<accuracy></accuracy>";

        var abilityIconType = GetAbilityBackground(ability.damage);
        var spa = GetAbilityToolTip(ability, abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq);
    } else {
        var spa = CreatePassiveSlotToolTip(ability.icon, ability.name, ability.description);
    }
    return spa;
}



function GetStructureName(structureID) {
    for (j in jsonStructureUpgrades.structures) {
        if (jsonStructureUpgrades.structures[j].id.indexOf(structureID) != -1) {
            return jsonStructureUpgrades.structures[j].name;
        }
    }
}

function GetHeroSkillName(skillID) {
    for (j in jsonHeroSkills.skills) {
        if (jsonHeroSkills.skills[j].id.indexOf(skillID) != -1) {
            return jsonHeroSkills.skills[j].name;
        }
    }
}

function GetHeroSkillDescription(skillID) {
    var array = ["", ""];
    for (j in jsonHeroSkills.skills) {
        if (jsonHeroSkills.skills[j].id.indexOf(skillID) != -1) {
            if ('abilities' in jsonHeroSkills.skills[j]) {
                for (k in jsonUnitAbilities.abilities) {
                    if (jsonUnitAbilities.abilities[k].slug.indexOf(jsonHeroSkills.skills[j].abilities[0].slug) != -1) {
                        array[0] = jsonUnitAbilities.abilities[k];


                    }
                }
            }
            array[1] = jsonHeroSkills.skills[j];

            return array;

        }

    }
}



function GetStructureDescription(structureID) {
    for (j in jsonStructureUpgrades.structures) {
        if (jsonStructureUpgrades.structures[j].id.indexOf(structureID) != -1) {
            return jsonStructureUpgrades.structures[j].description;
        }
    }
}

function showStructure(a, showOrigin) {
    var modName, description, cost, type, tier, j, nameString = "";
    var found = false;
    for (j in jsonStructureUpgrades.structures) {
        if (a === jsonStructureUpgrades.structures[j].id) {
            // exception
            if (a === "_teleporter___teleporter") {
                if (jsonStructureUpgrades.structures[j].is_sector_upgrade === false) {
                    continue;
                }
            }
            modName = document.getElementById("modname");
            nameString = "";
            nameString = jsonStructureUpgrades.structures[j].name.toUpperCase();

            if (nameString.indexOf("<br>")) {
                nameString = nameString.replace("<br>", "");
                nameString = nameString.replace("<br>", "");
            }



            modName.innerHTML = nameString;
            // backtracktome
            var tomeNameandTier = backtraceStructureToTomeNameAndTier(a);


            modName.setAttribute("id", "modname" + a);
            modName.className = "mod_name";
            descriptionDiv = document.getElementById("moddescription");
            description = "";

            if (jsonStructureUpgrades.structures[j].requirement_description != "") {
                description = jsonStructureUpgrades.structures[j].requirement_description + "<br>";
            }
            description += jsonStructureUpgrades.structures[j].description;


            if (jsonStructureUpgrades.structures[j].prediction_description != "") {
                description += "<br>" + jsonStructureUpgrades.structures[j].prediction_description;
            }


            imagelink = document.getElementById("modicon");

            if (a.startsWith("_")) {
                a = a.replace("_", "");
            }

            imagelink.setAttribute("src", "/aow4db/Icons/UpgradeIcons/" + a + ".png");
            if (a.indexOf("town_hall_iii_") != -1) {
                description += "<br><br> Unlocks T3 Culture Units";
            }
            if (a.indexOf("town_hall_ii_") != -1) {
                description += "<br><br> Unlocks T2 Culture Units";
            }
            imagelink.setAttribute("id", "modicon" + a);
            descriptionDiv.innerHTML = description;


            descriptionDiv.setAttribute("id", "modicon" + a);

            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);
            unitTypesDiv.setAttribute("style", "float: left;display: grid;grid-template-columns: 200px 200px;font-size: 12px;");

            tier = document.getElementById("modtier");
            if (jsonStructureUpgrades.structures[j].is_sector_upgrade) {
                if (tomeNameandTier != "") {
                    if (tomeNameandTier[1] != 0) {
                        tier.innerHTML = "<br> Tier " + romanize(tomeNameandTier[1]) + " - " + tomeNameandTier[0] + "<br>";
                    } else {
                        tier.innerHTML = "<br>" + tomeNameandTier[0] + "<br>";
                    }

                }
                tier.innerHTML += " Province Improvement";

            } else {
                tier.innerHTML = "Building";
            }
            tier.setAttribute("id", "modtier" + a);

            cost = document.getElementById("modcost");
            cost.className = "spell_cost";
            cost.innerHTML = "Build Cost:<br>" + jsonStructureUpgrades.structures[j].cost;
            cost.setAttribute("id", "modcost" + a);

            var name = backtraceTomeOriginAndTierForStructure(a, showOrigin);

            if (DLCDragonDawn.indexOf(tomeNameandTier[2]) != -1) {
                var newDivForMount = document.createElement("DIV");
                newDivForMount.className = "mountToolTip";
                newDivForMount.setAttribute("style", "text-transform: none;width: 1px;left: -32px;position: relative;margin-left: 30px;height: 20px;float: left;");
                imag = document.createElement("IMG");
                imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
                imag.setAttribute("height", "30px");

                spa = document.createElement("SPAN");
                spa.className = "tooltiptext";

                spa.innerHTML = "Part of the Dragon Dawn DLC";

                newDivForMount.appendChild(imag);
                newDivForMount.appendChild(spa);
                //newDivForMount.setAttribute("style", "    text-transform: none;width: 1px;margin-left: 30px;height: 20px;float: left;");
                // get position of button



                modName.append(newDivForMount);


            }

            var tomeOrigin = document.getElementById("originTome");
            tomeOrigin.setAttribute("id", "originTome" + a.id);
            var tomeOriginIcon = document.getElementById("originTomeIcon");
            tomeOriginIcon.setAttribute("id", "originTomeIcon" + a.id);

            if (a.indexOf("wildlife_sanctuary") != -1) {
                // unlock warg, razorback, hunter spider, goretustk piglet
                descriptionDiv.innerHTML += "<br>Unlocks Production of:";
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "goretusk_piglet" + "\" target=\"_blank\">" + GetUnitTierAndName("goretusk_piglet") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "hunter_spider" + "\" target=\"_blank\">" + GetUnitTierAndName("hunter_spider") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "razorback" + "\" target=\"_blank\">" + GetUnitTierAndName("razorback") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "warg" + "\" target=\"_blank\">" + GetUnitTierAndName("warg") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
            }

            if (a.indexOf("demon_gate") != -1) {
                // unlock warg, razorback, hunter spider, goretustk piglet
                descriptionDiv.innerHTML += "<br>Unlocks Production of:";
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "inferno_puppy" + "\" target=\"_blank\">" + GetUnitTierAndName("inferno_puppy") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "gremlin" + "\" target=\"_blank\">" + GetUnitTierAndName("gremlin") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "inferno_hound" + "\" target=\"_blank\">" + GetUnitTierAndName("inferno_hound") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "chaos_eater" + "\" target=\"_blank\">" + GetUnitTierAndName("chaos_eater") + "</a>" + "</bullet>";
                unitTypesDiv.append(div);
            }


            found = true;
        }
    }
    if (found === false) {
        console.log("Couldn't find mod: " + a);
    }
}

function showWorldStructure(a) {
    var modName, description, cost, type, tier, j, nameString = "";
    var found = false;
    for (j in jsonWorldStructures.structures) {
        if (a === jsonWorldStructures.structures[j].id) {

            modName = document.getElementById("modname");
            nameString = "";
            nameString = jsonWorldStructures.structures[j].name.toUpperCase();

            if (nameString.indexOf("<br>")) {
                nameString = nameString.replace("<br>", "");
                nameString = nameString.replace("<br>", "");
            }
            modName.innerHTML = nameString;
            modName.setAttribute("id", "modname" + a);
            modName.className = "mod_name";
            descriptionDiv = document.getElementById("moddescription");
            descriptionDiv.setAttribute("style", "max-width:560px; width:560px");
            description = "";

            if (jsonWorldStructures.structures[j].type.indexOf("wonder") != -1) {
                description = jsonWorldStructures.structures[j].type + "<br>";
            } else {

            }


            description += jsonWorldStructures.structures[j].description;


            if (jsonWorldStructures.structures[j].prediction_description != "") {
                description += "<br>" + jsonStructureUpgrades.structures[j].prediction_description;
            }



            imagelink = document.getElementById("modicon");





            if (jsonWorldStructures.structures[j].type.indexOf("wonder") != -1) {
                imagelink.remove();

            } else {
                imagelink.setAttribute("src", "/aow4db/Icons/WorldStructures/" + a + ".png");
                imagelink.setAttribute("id", "modicon" + a);
                imagelink.setAttribute("style", "background-image: none");

            }
            descriptionDiv.innerHTML = "";
            if (jsonWorldStructures.structures[j].type.indexOf("Ancient") != 1) {
                descriptionDiv.innerHTML += "Combat Enchantments depend on story event choices when entering the Ancient Wonder. <br><br>";
            }
            unitTypesDiv = document.getElementById("affectUnitTypes");

            unitTypesDiv.setAttribute("style", "float: left;display: grid;grid-template-columns: 200px 200px;font-size: 12px;");
            FindCombatEnchantment(a);

            if ('unit_unlocks' in jsonWorldStructures.structures[j]) {
                description += "<br>Rally Units:<br>";
                for (x in jsonWorldStructures.structures[j].unit_unlocks) {

                    var div = document.createElement("DIV");
                    div.setAttribute("style", "margin-right: 20px;");
                    div.innerHTML = "<a href=\"/aow4db/HTML/Units.html?unit=" + jsonWorldStructures.structures[j].unit_unlocks[x].slug + "\" target=\"_blank\">" + GetUnitTierAndName(jsonWorldStructures.structures[j].unit_unlocks[x].slug) + "</a>" + "</bullet>";
                    unitTypesDiv.appendChild(div);
                }
            }
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

            descriptionDiv.innerHTML += description;


            descriptionDiv.setAttribute("id", "modicon" + a);



            preview = document.getElementById("structurepreview");
            preview.setAttribute("src", "/aow4db/Icons/StructurePics/" + a + ".png");
            preview.setAttribute("id", "structurepreview" + a);



            tier = document.getElementById("modtier");

            tier.setAttribute("id", "modtier" + a);
            tier.innerHTML = "";

            cost = document.getElementById("modcost");

            var tomeOrigin = document.getElementById("originTome");
            var tomeOriginIcon = document.getElementById("originTomeIcon");
            tomeOrigin.setAttribute("id", "originTome" + a);
            tomeOriginIcon.setAttribute("id", "originTomeIcon" + a);

            cost.setAttribute("id", "modcost" + a);
            cost.innerHTML = "";

            // find combat enchantment
            found = true;
        }
    }
    if (found === false) {
        console.log("Couldn't find structure world: " + a);
    }
}

function FindCombatEnchantment(id) {

    var i = "";
    for (i in jsonCombatEnchantments.enchantments) {
        if (jsonCombatEnchantments.enchantments[i].origin_structure === id) {
            info = document.createElement("DIV");


            info.innerHTML = "<button type=\"button\" class=\"collapsible\"  onclick=\"SetUpCombatEnc()\"> Combat Enchantment - " + jsonCombatEnchantments.enchantments[i].name + "</button>";
            var collapsibleC = document.createElement("DIV");
            collapsibleC.className = "combatEnchantment";


            var div = document.createElement("DIV");
            div.innerHTML = "<img style=\"float:left; height:80px; padding:10px\" src=\"/aow4db/Icons/CombatEnchantments/" + jsonCombatEnchantments.enchantments[i].id + ".png\"><p style=\"color: #d7c297;>" + "<span style=\"font-size=20px;\">" + jsonCombatEnchantments.enchantments[i].name.toUpperCase() + "</p>" +
                "</br>" + jsonCombatEnchantments.enchantments[i].description;

            collapsibleC.append(div);
            info.append(collapsibleC);
            descriptionDiv.append(info);

        }
    }

}

function ShowDestinyTraits() {
    var modName, description, cost, type, tier, j, nameString = "";
    var found = false;


    for (j in jsonDestiny.traits) {
        a = jsonDestiny.traits[j].id;
        var doc = document.getElementById("dataHolder");

        var iDiv = spell_card_template.content.cloneNode(true);
        doc.appendChild(iDiv);



        modName = document.getElementById("modname");
        nameString = "";
        nameString = jsonDestiny.traits[j].name.toUpperCase();
        nameString += "<br>" + jsonDestiny.traits[j].category;

        modName.innerHTML = nameString;
        // backtracktome


        modName.setAttribute("id", "modname" + a);
        modName.className = "mod_name";
        descriptionDiv = document.getElementById("moddescription");
        description = "Trigger: <br>";


        description += jsonDestiny.traits[j].trigger;


        imagelink = document.getElementById("modicon");

        if (a.startsWith("_")) {
            a = a.replace("_", "");
        }

        imagelink.setAttribute("src", "/aow4db/Icons/EmpireProgressionIcons/" + a + ".png");
        imagelink.setAttribute("id", "modicon" + a);
        imagelink.setAttribute("style", "background-image: none");
        descriptionDiv.innerHTML = description;
        descriptionDiv.setAttribute("id", "modicon" + a);
        descriptionDiv.setAttribute("style", "max-width: 380px");

        unitTypesDiv = document.getElementById("affectUnitTypes");
        unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

        descriptionDiv.innerHTML += "<br><br>Effect: <br>";

        for (l in jsonDestiny.traits[j].gains) {
            var div = document.createElement("DIV");
            div.innerHTML = "<bullet>" + jsonDestiny.traits[j].gains[l].description + "</bullet>"
            descriptionDiv.appendChild(div);
        }


        tier = document.getElementById("modtier");

        tier.setAttribute("id", "modtier" + a);
        tier.innerHTML = "";

        cost = document.getElementById("modcost");
        cost.innerHTML = "";

        cost.setAttribute("id", "modcost" + a);




        found = true;

    }
}


function showDestinyTrait(trait) {
    var modName, description, cost, type, tier, j, nameString = "";
    var found = false;


    for (j in jsonDestiny.traits) {
        if (trait == jsonDestiny.traits[j].id) {


            a = jsonDestiny.traits[j].id;



            modName = document.getElementById("modname");
            nameString = "";
            nameString = jsonDestiny.traits[j].name.toUpperCase();
            nameString += "<br>" + jsonDestiny.traits[j].category;

            modName.innerHTML = nameString;
            // backtracktome


            modName.setAttribute("id", "modname" + a);
            modName.className = "mod_name";
            descriptionDiv = document.getElementById("moddescription");
            description = "Trigger: <br>";


            description += jsonDestiny.traits[j].trigger;


            imagelink = document.getElementById("modicon");

            if (a.startsWith("_")) {
                a = a.replace("_", "");
            }

            imagelink.setAttribute("src", "/aow4db/Icons/EmpireProgressionIcons/" + a + ".png");
            imagelink.setAttribute("id", "modicon" + a);
            imagelink.setAttribute("style", "background-image: none");
            descriptionDiv.innerHTML = description;
            descriptionDiv.setAttribute("id", "modicon" + a);
            descriptionDiv.setAttribute("style", "max-width: 380px");

            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

            descriptionDiv.innerHTML += "<br><br>Effect: <br>";

            for (l in jsonDestiny.traits[j].gains) {
                var div = document.createElement("DIV");
                div.innerHTML = "<bullet>" + jsonDestiny.traits[j].gains[l].description + "</bullet>"
                descriptionDiv.appendChild(div);
            }


            tier = document.getElementById("modtier");

            tier.setAttribute("id", "modtier" + a);
            tier.innerHTML = "";

            cost = document.getElementById("modcost");
            cost.innerHTML = "";

            cost.setAttribute("id", "modcost" + a);




            found = true;
        }

    }
}

function showEmpireTree(a) {
    var modName, description, cost, type, tier, j, nameString = "";
    var found = false;
    for (j in jsonEmpire.empirenodes) {
        if (a === jsonEmpire.empirenodes[j].id) {

            modName = document.getElementById("modname");
            nameString = "";
            nameString = jsonEmpire.empirenodes[j].name.toUpperCase();
            nameString += "<br>" + jsonEmpire.empirenodes[j].category;

            modName.innerHTML = nameString;
            // backtracktome


            modName.setAttribute("id", "modname" + a);
            modName.className = "mod_name";
            descriptionDiv = document.getElementById("moddescription");
            description = "";


            description += jsonEmpire.empirenodes[j].description;


            imagelink = document.getElementById("modicon");

            if (a.startsWith("_")) {
                a = a.replace("_", "");
            }

            imagelink.setAttribute("src", "/aow4db/Icons/EmpireProgressionIcons/" + a + ".png");
            imagelink.setAttribute("id", "modicon" + a);
            descriptionDiv.innerHTML = description;
            descriptionDiv.setAttribute("id", "modicon" + a);

            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

            tier = document.getElementById("modtier");

            tier.setAttribute("id", "modtier" + a);
            tier.innerHTML = "XP required: " + jsonEmpire.empirenodes[j].required_xp + jsonEmpire.empirenodes[j].required_affinity;

            cost = document.getElementById("modcost");

            cost.setAttribute("id", "modcost" + a);
            cost.innerHTML = "Cost: " + jsonEmpire.empirenodes[j].cost;



            found = true;
        }
    }
    if (found === false) {
        console.log("Couldn't find mod: " + a);
    }
}


function GetCostUnit(id) {
    for (i in jsonUnits.units) {
        if (id === jsonUnits.units[i].id) {
            return jsonUnits.units[i].cost;
        }
    }

}

function showUnitUnlock(a) {
    var modName, description, cost, type, tier, j = "";
    var found = false;



    modName = document.getElementById("modname");
    modName.innerHTML = a.name.toUpperCase();
    modName.setAttribute("id", "modname" + a);
    descriptionDiv = document.getElementById("moddescription");

    description = a.description;



    imagelink = document.getElementById("modicon");

    unitTypesDiv = document.getElementById("affectUnitTypes");

    if (a.name == "Young Dragon") {
        var alldragons = ["young_fire_dragon", "young_frost_dragon", "young_obsidian_dragon", "young_golden_dragon"];
        var i = "";
        for (i in alldragons) {
            var div = document.createElement("DIV");
            div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + alldragons[i] + "\" target=\"_blank\">" + GetUnitTierAndName(alldragons[i]) + "</a>" + "</bullet>";
            unitTypesDiv.appendChild(div);
        }

        unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);
    } else {
        var div = document.createElement("DIV");
        div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + a.unit_slug + "\" target=\"_blank\">" + GetUnitTierAndName(a.unit_slug) + "</a>" + "</bullet>";
        unitTypesDiv.appendChild(div);

        unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);
    }



    imagelink.setAttribute("src", "/aow4db/Icons/SpellIcons/" + a.unit_slug + ".png");
    imagelink.setAttribute("id", "modicon" + a);
    descriptionDiv.innerHTML = description;
    descriptionDiv.setAttribute("id", "modicon" + a);

    tier = document.getElementById("modtier");

    tier.innerHTML = "Unit Unlock";

    tier.setAttribute("id", "modtier" + a);

    cost = document.getElementById("modcost");
    cost.innerHTML = "Recruit Cost:<br>" + GetCostUnit(a.unit_slug);

    cost.setAttribute("id", "modcost" + a);


    found = true;


}



function showSpell(a, showOrigin) {
    var modName, description, cost, type, tier = "";
    var found = false;
    for (j in jsonSpells.spells) {
        if (a === jsonSpells.spells[j].id) {

            modName = document.getElementById("modname");
            modName.innerHTML = jsonSpells.spells[j].name.toUpperCase();
            modName.setAttribute("id", "modname" + a);
            description = "";
            descriptionDiv = document.getElementById("moddescription");

            if ('upkeep' in jsonSpells.spells[j]) {
                description = "Upkeep: " + jsonSpells.spells[j].upkeep + "<br><br>";

            }

            description += jsonSpells.spells[j].description;

            unitTypesDiv = document.getElementById("affectUnitTypes");


            if (jsonSpells.spells[j].enchantment_requisites != undefined) {
                description += "<br>Affected Unit Types: <br>";
            }
            for (l in jsonSpells.spells[j].enchantment_requisites) {
                var div = document.createElement("DIV");
                div.setAttribute("style", "margin-right: 20px;");
                div.innerHTML = "<bullet>" + jsonSpells.spells[j].enchantment_requisites[l].requisite + "</bullet>"
                unitTypesDiv.appendChild(div);
            }



            if ('summoned_units' in jsonSpells.spells[j]) {
                description += "<br>Summoned Units:<br>";
                for (x in jsonSpells.spells[j].summoned_units) {
                    var div = document.createElement("DIV");
                    div.setAttribute("style", "margin-right: 20px;");
                    div.innerHTML = "<a href=\"/aow4db/HTML/Units.html?unit=" + jsonSpells.spells[j].summoned_units[x].slug + "\" target=\"_blank\">" + GetUnitTierAndName(jsonSpells.spells[j].summoned_units[x].slug) + "</a>";
                    unitTypesDiv.appendChild(div);
                }
            }

            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

            descriptionDiv.innerHTML = (description);
            if (a === "summon_greater_animal") {
                // extra info
                info = document.createElement("DIV");


                info.innerHTML = "<button type=\"button\" class=\"collapsible\"  onclick=\"SetUpSpawnTable()\">Spawn Chances</button>";
                var collapsibleC = document.createElement("DIV");
                collapsibleC.classList = "content";
                var div = document.createElement("DIV");

                div.innerHTML = "<bulletlist>Default: " + "<bullet>20% Hunter Spider Matriarch</bullet><bullet>20% Dread Spider Matriarch </bullet><bullet>20% Spirit Wolf </bullet><bullet>20% Goretusk Matriarch</bullet><bullet>20% Unicorn</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Underground/Cavern Floor:" + "<bullet>40% Caustic Worm</bullet><bullet>20% Hunter Spider Matriarch</bullet><bullet>20% Dread Spider Matriarch</bullet><bullet>20% Vampire Spider Matriarch</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");

                div.innerHTML = "<bulletlist>Cold(Arctic/Snow/Frozen):" + "<bullet>25% Ice Spider Matriarch</bullet><bullet>25% White Wolf</bullet><bullet>25% Goretusk Matriarch</bullet><bullet>25% Thunderbird</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Desert(Desert/Desolate/Sand):" + "<bullet>60% Phoenix</bullet><bullet>40% Nightmare</bullet>" + "</bulletlist>";
                collapsibleC.append(div);

                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Water:" + "<bullet>75% Deep-sea Nimu</bullet><bullet>25% Kraken</bullet>" + "</bulletlist>";
                collapsibleC.append(div);
                info.append(collapsibleC);
                descriptionDiv.append(info);
            }

            if (a === "summon_wild_animal") {
                // extra info
                info = document.createElement("DIV");


                info.innerHTML = "<button type=\"button\" class=\"collapsible\"  onclick=\"SetUpSpawnTable()\">Spawn Chances</button>";
                var collapsibleC = document.createElement("DIV");
                collapsibleC.classList = "content";
                var div = document.createElement("DIV");

                div.innerHTML = "<bulletlist>Default: " + "<bullet>29% Grimbeak Crows</bullet><bullet>29% Goretusk Piglet </bullet><bullet>14% Vampire Spider Hatchling </bullet><bullet>14% Dread Spider Hatchlig</bullet><bullet>7% Hunter Spider</bullet><bullet>7% Warg</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Underground/Cavern Floor:" + "<bullet>40% Dread Spider Hatchling</bullet><bullet>40% Young Caustic Worm</bullet><bullet>10% Hunter Spider</bullet><bullet>10% Warg</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");

                div.innerHTML = "<bulletlist>Cold(Arctic/Snow/Frozen):" + "<bullet>43% Goretusk Piglet</bullet><bullet>43% Grimbeak Crows</bullet><bullet>14% Ice Spider</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Desert(Desert/Desolate/Sand):" + "<bullet>37% Inferno Puppy</bullet><bullet>37% Grimbeak Crows</bullet><bullet>12% Carrion Bird</bullet><bullet>12% Inferno Hound</bullet>" + "</bulletlist>";
                collapsibleC.append(div);

                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Water:" + "<bullet>40% Nimu</bullet><bullet>40% Penguin</bullet><bullet>20% Kraken Spawn</bullet>" + "</bulletlist>";
                collapsibleC.append(div);
                info.append(collapsibleC);
                descriptionDiv.append(info);
            }

            if (a === "awaken_the_forest") {
                // extra info
                info = document.createElement("DIV");


                info.innerHTML = "<button type=\"button\" class=\"collapsible\"  onclick=\"SetUpSpawnTable()\">Spawn Chances</button>";
                var collapsibleC = document.createElement("DIV");
                collapsibleC.classList = "content";
                var div = document.createElement("DIV");

                div.innerHTML = "<bulletlist>Low Tier(50%): " + "<bullet>40% Entwined Thrall</bullet><bullet>40% Warg</bullet><bullet>20% Entwined Protector </bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Mid Tier(50%):" + "<bullet>33% Entwined Protector</bullet><bullet>33% Goretusk Matriarch</bullet><bullet>33% Entwined Scourge</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                info.append(collapsibleC);
                descriptionDiv.append(info);
            }

            if (a === "demonic_summoning") {
                // extra info
                info = document.createElement("DIV");


                info.innerHTML = "<button type=\"button\" class=\"collapsible\"  onclick=\"SetUpSpawnTable()\">Spawn Chances</button>";
                var collapsibleC = document.createElement("DIV");
                collapsibleC.classList = "content";
                var div = document.createElement("DIV");

                div.innerHTML = "<bulletlist>" + "<bullet>42% Nightmare</bullet><bullet>29% Skald</bullet><bullet>29% Chaos Eater </bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);

                info.append(collapsibleC);
                descriptionDiv.append(info);
            }


            if (a === "raise_undead_army") {
                // extra info
                info = document.createElement("DIV");


                info.innerHTML = "<button type=\"button\" class=\"collapsible\"  onclick=\"SetUpSpawnTable()\">Spawn Chances</button>";
                var collapsibleC = document.createElement("DIV");
                collapsibleC.classList = "content";
                var div = document.createElement("DIV");

                div.innerHTML = "<bulletlist>Low Tier(50%): " + "<bullet>100% Skeleton</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                var div = document.createElement("DIV");
                div.innerHTML = "<bulletlist>Mid Tier(50%):" + "<bullet>33% Skeleton</bullet><bullet>33% Bone Golem</bullet><bullet>33% Banshee</bullet>" + "</bulletlist><br>";
                collapsibleC.append(div);
                info.append(collapsibleC);
                descriptionDiv.append(info);
            }


            descriptionDiv.setAttribute("id", "moddescription" + a);
            //type = document.getElementById("modtype");
            //type.innerHTML = "Mod Type: " + jsonSpells.spells[j].type;
            //type.setAttribute("id", "modtype" + a);
            tier = document.getElementById("modtier");
            tier.innerHTML = jsonSpells.spells[j].spellType;
            tier.setAttribute("id", "modtier" + a);

            cost = document.getElementById("modcost");
            cost.innerHTML = "Casting Cost:<br>" + jsonSpells.spells[j].casting_cost;

            if (jsonSpells.spells[j].tactical === true) {
                cost.innerHTML += " " + jsonSpells.spells[j].operation_point_cost + "<casttactical></casttactical>"
            } else {
                cost.innerHTML += " " + jsonSpells.spells[j].operation_point_cost + "<caststrategic></caststrategic>"
            }
            cost.setAttribute("id", "modcost" + a);

            imagelink = document.getElementById("modicon");



            imagelink.setAttribute("src", "/aow4db/Icons/SpellIcons/" + a + ".png");
            imagelink.setAttribute("id", "modicon" + a);
            var tierSpell = backtraceTomeOriginAndTier(jsonSpells.spells[j].id, showOrigin);

            if (tierSpell != undefined) {
                var splitspell = tierSpell.split(",");
                tier.innerHTML += " Tier " + romanize(splitspell[0]);
                if (DLCDragonDawn.indexOf(splitspell[1]) != -1 && showOrigin) {
                    var newDivForMount = document.createElement("DIV");
                    newDivForMount.className = "mountToolTip";
                    newDivForMount.setAttribute("style", "text-transform: none;width: 1px;left: -32px;position: relative;margin-left: 30px;height: 20px;float: left;");
                    imag = document.createElement("IMG");
                    imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
                    imag.setAttribute("height", "30px");

                    spa = document.createElement("SPAN");
                    spa.className = "tooltiptext";

                    spa.innerHTML = "Part of the Dragon Dawn DLC";

                    newDivForMount.appendChild(imag);
                    newDivForMount.appendChild(spa);
                    //newDivForMount.setAttribute("style", "    text-transform: none;width: 1px;margin-left: 30px;height: 20px;float: left;");
                    // get position of button



                    modName.append(newDivForMount);


                }
            }



            if (showOrigin === true) {

                var tomeOrigin = document.getElementById("originTome");
                tomeOrigin.setAttribute("id", "originTome" + jsonSpells.spells[j].id);
                var tomeOriginIcon = document.getElementById("originTomeIcon");
                tomeOriginIcon.setAttribute("id", "originTomeIcon" + jsonSpells.spells[j].id);

            }



            found = true;
        }
    }
    if (found === false) {
        console.log("Couldn't find mod: " + a);
    }
}

function FindUnitsWithSecondaryPassive(trait) {
    var unitsList = new Array();
    for (i in jsonUnits.units) {
        for (j in jsonUnits.units[i].secondary_passives) {
            if (jsonUnits.units[i].secondary_passives[j].slug === trait) {
                if (!isInArray(unitsList, jsonUnits.units[i].id)) {
                    unitsList.push(jsonUnits.units[i]);
                }

            }

        }
    }


    unitsList.sort((a, b) => a.tier - b.tier);

    // Define the maximum length of each subarray
    const maxLength = 10;

    // Split the array into smaller arrays by age
    var splitArrays = new Array();
    var currentArray = new Array();

    if (unitsList.length > maxLength) {


        unitsList.forEach((item, index) => {
            currentArray.push(item);

            // Check if it's the last item or the age changes
            if (
                index === unitsList.length - 1 ||
                unitsList[index + 1].tier !== item.tier
            ) {
                splitArrays.push(currentArray);
                currentArray = [];
            }
        });
    } else {
        splitArrays.push(unitsList);
    }

    var sortedUnitListArray = new Array();

    for (z in splitArrays) {

        var unitsSorted = new Array();
        for (x in splitArrays[z]) {
            unitsSorted.push(splitArrays[z][x].id)
        }
        sortedUnitListArray.push(unitsSorted);
    }





    return sortedUnitListArray;
}



function showItem(a) {
    var modName, description, cost, type, tier = "";
    var found = false;
    var l = "";
    var j = "";
    var i = "";


    modName = document.getElementById("modname");
    modName.innerHTML = a.name.toUpperCase();
    modName.innerHTML += "<br>" + a.slot;


    modName.setAttribute("id", "modname" + a.id);
    descriptionDiv = document.getElementById("moddescription");






    descriptionDiv.innerHTML = "";
    if ('description' in a) {
        descriptionDiv.innerHTML = a.description + "<br>";
    }

    var lookup;
    if ('ability_slugs' in a) {
        for (l in a.ability_slugs) {

            var lookup = a.ability_slugs[l].slug;

            for (j in jsonUnitAbilities.abilities) {
                if (jsonUnitAbilities.abilities[j].slug.indexOf(lookup) != -1) {
                    var abilityName = jsonUnitAbilities.abilities[j].name;

                    //   description = jsonUnitAbilities.abilities[j].description;

                    if ('accuracy' in jsonUnitAbilities.abilities[j]) {
                        if (jsonUnitAbilities.abilities[j].requisites === undefined) {
                            var abilityReq = "";
                        } else {
                            var abilityReq = jsonUnitAbilities.abilities[j].requisites;

                        }


                        var abilityMod = "";



                        for (l in jsonUnitAbilities.abilities[j].modifiers) {
                            abilityName += "&#11049";
                            var name = jsonUnitAbilities.abilities[j].modifiers[l].name.replace("^N", "");
                            name = name.replace("^n", "");
                            abilityMod += "<bullet>" + name + "<br>";
                            abilityMod += jsonUnitAbilities.abilities[j].modifiers[l].description + "</bullet><br>";
                        }



                        // add notes


                        var abilityNote = "";
                        for (l in jsonUnitAbilities.abilities[j].notes) {
                            if (jsonUnitAbilities.abilities[j].notes[l] === undefined) {

                            } else {
                                abilityNote += "<bullet>" + jsonUnitAbilities.abilities[j].notes[l].note + "</bullet>";

                            }

                        }





                        abilityRange = jsonUnitAbilities.abilities[j].range + "<range></range>";
                        abilityAcc = jsonUnitAbilities.abilities[j].accuracy + "<accuracy></accuracy>";

                        var abilityIconType = GetAbilityBackground(jsonUnitAbilities.abilities[j].damage);
                        var spa = GetAbilityToolTip(jsonUnitAbilities.abilities[j], abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq);
                    } else {
                        var spa = CreatePassiveSlotToolTip(jsonUnitAbilities.abilities[j].icon, jsonUnitAbilities.abilities[j].name, jsonUnitAbilities.abilities[j].description);
                    }






                    spa.className = "itemAbility";

                    spa.setAttribute("style", "width: 450px");






                    found = true;

                    descriptionDiv.append(spa);

                    break;

                }

            }

        }
    }




    unitTypesDiv = document.getElementById("affectUnitTypes");
    unitTypesDiv.setAttribute("id", "affectUnitTypes" + a.id);

    var div = document.createElement("DIV");

    for (i in a.disabled_slots) {
        var div = document.createElement("DIV");
        div.innerHTML = "&#11049" + a.disabled_slots[i].slot_name;
        unitTypesDiv.appendChild(div);
    }
    if (a.disabled_slots.length > 0) {
        descriptionDiv.innerHTML += "Disabled slots: <br>";
    }

    descriptionDiv.setAttribute("id", "moddescription" + a.id);
    //type = document.getElementById("modtype");
    //type.innerHTML = "Mod Type: " + jsonSpells.spells[j].type;
    //type.setAttribute("id", "modtype" + a);
    tier = document.getElementById("modtier");
    tier.innerHTML = a.tier;
    tier.setAttribute("id", "modtier" + a.id);

    cost = document.getElementById("modcost");
    cost.innerHTML = "";


    cost.setAttribute("id", "modcost" + a.id);


    imagelink = document.getElementById("modicon");
    imagelink.remove();

    var tomeOriginIcon = document.getElementById("originTomeIcon");
    tomeOriginIcon.setAttribute("src", "/aow4db/Icons/Abilities/" + a.icon + ".png");
    tomeOriginIcon.setAttribute("height", "130px");
    tomeOriginIcon.setAttribute("style", "margin-left:40px");
    tomeOriginIcon.setAttribute("id", "modicon" + a.id);






}

function showTrait(a) {
    var modName, description, cost, type, tier = "";
    var found = false;
    var i = "";
    for (i in jsonFactionCreation.traits) {
        if (jsonFactionCreation.traits[i].id === a) {

            modName = document.getElementById("modname");
            modName.innerHTML = jsonFactionCreation.traits[i].name.toUpperCase();



            modName.setAttribute("id", "modname" + a);
            descriptionDiv = document.getElementById("moddescription");



            if (DLCDragonDawn.indexOf(a) != -1) {
                var newDivForMount = document.createElement("DIV");
                newDivForMount.className = "mountToolTip";

                imag = document.createElement("IMG");
                imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
                imag.setAttribute("height", "30px");

                spa = document.createElement("SPAN");
                spa.className = "tooltiptext";

                spa.innerHTML = "Part of the Dragon Dawn DLC";

                newDivForMount.appendChild(imag);
                newDivForMount.appendChild(spa);
                newDivForMount.setAttribute("style", "text-transform: none;width: 1px;left: -32px;position: relative;margin-left: 30px;height: 20px;float: left;");
                // get position of button



                modName.append(newDivForMount);
            }


            descriptionDiv.innerHTML = "";






            unitTypesDiv = document.getElementById("affectUnitTypes");
            unitTypesDiv.setAttribute("id", "affectUnitTypes" + a);

            var div = document.createElement("DIV");
            descriptionDiv.innerHTML = jsonFactionCreation.traits[i].description;

            descriptionDiv.setAttribute("id", "moddescription" + a);



            tier = document.getElementById("modtier");
            tier.innerHTML = "";
            if ('affinity' in jsonFactionCreation.traits[i]) {
                var splitAff = jsonFactionCreation.traits[i].affinity.split(",");
                var j = "";
                for (j in splitAff) {
                    tier.innerHTML += "<empire" + splitAff[j] + "> </empire" + splitAff[j] + ">";
                }



            }
            tier.setAttribute("id", "modtier" + a);

            cost = document.getElementById("modcost");
            cost.innerHTML = "";


            cost.setAttribute("id", "modcost" + a);


            imagelink = document.getElementById("modicon");
            imagelink.setAttribute("src", "/aow4db/Icons/FactionCreation/" + a + ".png");
            imagelink.setAttribute("style", "background-image:none");
            imagelink.setAttribute("id", "modicon" + a);

            var tomeOriginIcon = document.getElementById("originTomeIcon");

            tomeOriginIcon.setAttribute("id", "modicon" + a.id);
        }
    }

}


function showSkill(a, checkInAbilities, icon_slug, category, level, group_name) {
    var modName, description, cost, type, tier = "";
    var found = false;

    if (checkInAbilities != "") {
        for (j in jsonUnitAbilities.abilities) {
            if (jsonUnitAbilities.abilities[j].slug === a.abilities[0].slug) {
                var abilityName = jsonUnitAbilities.abilities[j].name;
                modName = document.getElementById("modname");
                modName.innerHTML = a.name.toUpperCase();


                modName.setAttribute("id", "modname" + a.id);

                if (category != undefined) {
                    if (category.indexOf("Dragon") != -1) {

                        var newDivForMount = AddDLCTag();
                        modName.append(newDivForMount);
                    }
                }
                if (a.id.indexOf("_transformation") != -1 || a.id.indexOf("_aspect") != -1) {

                    // get position of button


                    var newDivForMount = AddDLCTag();
                    modName.append(newDivForMount);
                }

                descriptionDiv = document.getElementById("moddescription");

                //   description = jsonUnitAbilities.abilities[j].description;

                if ('accuracy' in jsonUnitAbilities.abilities[j]) {
                    if (jsonUnitAbilities.abilities[j].requisites === undefined) {
                        var abilityReq = "";
                    } else {

                        var abilityReq = jsonUnitAbilities.abilities[j].requisites;

                    }



                    var abilityMod = "";



                    for (l in jsonUnitAbilities.abilities[j].modifiers) {
                        abilityName += "&#11049";
                        abilityMod += "<bullet>" + jsonUnitAbilities.abilities[j].modifiers[l].name + "<br>";
                        abilityMod += jsonUnitAbilities.abilities[j].modifiers[l].description + "</bullet><br>";
                    }



                    // add notes


                    var abilityNote = "";
                    for (l in jsonUnitAbilities.abilities[j].notes) {
                        if (jsonUnitAbilities.abilities[j].notes[l] === undefined) {

                        } else {
                            abilityNote += "<bullet>" + jsonUnitAbilities.abilities[j].notes[l].note + "</bullet>";

                        }

                    }





                    abilityRange = jsonUnitAbilities.abilities[j].range + "<range></range>";
                    abilityAcc = jsonUnitAbilities.abilities[j].accuracy + "<accuracy></accuracy>";

                    var abilityIconType = GetAbilityBackground(jsonUnitAbilities.abilities[j].damage);
                    var spa = GetAbilityToolTip(jsonUnitAbilities.abilities[j], abilityName, abilityIconType, abilityAcc, abilityRange, abilityMod, abilityNote, abilityReq);
                } else {
                    var spa = CreatePassiveSlotToolTip(jsonUnitAbilities.abilities[j].icon, jsonUnitAbilities.abilities[j].name, jsonUnitAbilities.abilities[j].description);
                }






                spa.className = "itemAbility";
                spa.setAttribute("style", "width:380px");
                unitTypesDiv = document.getElementById("affectUnitTypes");



                unitTypesDiv.setAttribute("id", "affectUnitTypes" + a.id);
                descriptionDiv.innerHTML = "";
                descriptionDiv.append(spa);


                if (a.id === "summon_elemental") {

                    descriptionDiv.innerHTML += "<br>Summoned Units:";
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "tide_spirit" + "\" target=\"_blank\">" + GetUnitTierAndName("tide_spirit") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "storm_spirit" + "\" target=\"_blank\">" + GetUnitTierAndName("storm_spirit") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "magma_spirit" + "\" target=\"_blank\">" + GetUnitTierAndName("magma_spirit") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "snow_spirit" + "\" target=\"_blank\">" + GetUnitTierAndName("snow_spirit") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "stone_spirit" + "\" target=\"_blank\">" + GetUnitTierAndName("stone_spirit") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                }

                if (a.id === "summon_animal") {

                    descriptionDiv.innerHTML += "<br>Summoned Units:";
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "unicorn" + "\" target=\"_blank\">" + GetUnitTierAndName("unicorn") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "nightmare" + "\" target=\"_blank\">" + GetUnitTierAndName("nightmare") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "thunderbird" + "\" target=\"_blank\">" + GetUnitTierAndName("thunderbird") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "goretusk_matriarch" + "\" target=\"_blank\">" + GetUnitTierAndName("goretusk_matriarch") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "caustic_worm" + "\" target=\"_blank\">" + GetUnitTierAndName("caustic_worm") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                }


                if (a.id === "summon_undead") {

                    descriptionDiv.innerHTML += "<br>Summoned Units:";

                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "corrupt_soul" + "\" target=\"_blank\">" + GetUnitTierAndName("corrupt_soul") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);

                    var div = document.createElement("DIV");
                    div.innerHTML = "<bullet>" + "<a href=\"/aow4db/HTML/Units.html?unit=" + "banshee" + "\" target=\"_blank\">" + GetUnitTierAndName("banshee") + "</a>" + "</bullet>";
                    unitTypesDiv.append(div);
                }

                descriptionDiv.setAttribute("id", "moddescription" + a.id);
                //type = document.getElementById("modtype");
                //type.innerHTML = "Mod Type: " + jsonSpells.spells[j].type;
                //type.setAttribute("id", "modtype" + a);
                tier = document.getElementById("modtier");
                tier.innerHTML = "";
                if (category != undefined) {
                    tier.innerHTML += "<br>" + category + " - " + level;
                    tier.innerHTML += "<br>" + group_name;
                }
                tier.setAttribute("id", "modtier" + a.id);

                cost = document.getElementById("modcost");
                cost.innerHTML = "";


                cost.setAttribute("id", "modcost" + a.id);


                imagelink = document.getElementById("modicon");
                if (a.type === "signature") {
                    imagelink.className = "smallerIcon";
                    imagelink.setAttribute("src", "/aow4db/Icons/Abilities/" + icon_slug + ".png");
                    imagelink.setAttribute("id", "modicon" + a.id);
                    spa.setAttribute("style", "width: 360px");

                } else {

                    imagelink.remove();
                }


                var id = FindHeroSkillOrigin(a.id);
                if (DLCDragonDawn.indexOf(id) != -1) {
                    var newDivForMount = AddDLCTag();
                    modName.append(newDivForMount);
                }
                var tomeOrigin = document.getElementById("originTome");
                tomeOrigin.setAttribute("id", "originTome" + a.id);
                var tomeOriginIcon = document.getElementById("originTomeIcon");
                tomeOriginIcon.setAttribute("id", "originTomeIcon" + a.id);



                found = true;
                return;
            }
        }
    } else {
        for (j in jsonHeroSkills.skills) {
            if (jsonHeroSkills.skills[j].id === a.id) {

                modName = document.getElementById("modname");

                modName.innerHTML = jsonHeroSkills.skills[j].name.toUpperCase();


                modName.setAttribute("id", "modname" + a.id);
                descriptionDiv = document.getElementById("moddescription");

                description = jsonHeroSkills.skills[j].description;

                unitTypesDiv = document.getElementById("affectUnitTypes");



                unitTypesDiv.setAttribute("id", "affectUnitTypes" + a.id);

                var spa = CreatePassiveSlotToolTip(jsonHeroSkills.skills[j].icon, jsonHeroSkills.skills[j].name, jsonHeroSkills.skills[j].description);
                spa.className = "itemAbility";
                descriptionDiv.innerHTML = "";

                descriptionDiv.append(spa);

                descriptionDiv.setAttribute("id", "moddescription" + a.id);
                //type = document.getElementById("modtype");
                //type.innerHTML = "Mod Type: " + jsonSpells.spells[j].type;
                //type.setAttribute("id", "modtype" + a);
                tier = document.getElementById("modtier");
                tier.innerHTML = "";
                if (category != undefined) {
                    tier.innerHTML += "<br>" + category + " - " + level;
                }
                tier.setAttribute("id", "modtier" + a.id);

                cost = document.getElementById("modcost");
                cost.innerHTML = "";


                cost.setAttribute("id", "modcost" + a.id);

                imagelink = document.getElementById("modicon");
                var id = FindHeroSkillOrigin(a.id);
                var tomeOrigin = document.getElementById("originTome");
                var tomeOriginIcon = document.getElementById("originTomeIcon");
                tomeOrigin.setAttribute("id", "originTome" + a.id);
                tomeOriginIcon.setAttribute("id", "originTomeIcon" + a.id);


                imagelink.remove();

                if (category != undefined) {
                    if (category.indexOf("Dragon") != -1) {

                        var newDivForMount = AddDLCTag();
                        modName.append(newDivForMount);
                    }
                }
                if (a.id.indexOf("_transformation") != -1 || a.id.indexOf("_aspect") != -1) {

                    // get position of button


                    var newDivForMount = AddDLCTag();
                    modName.append(newDivForMount);
                }

                if (DLCDragonDawn.indexOf(id) != -1) {
                    var newDivForMount = AddDLCTag();
                    modName.append(newDivForMount);
                }


                found = true;
                return;
            }
        }
    }

    if (found === false) {
        console.log("Couldn't find skill: " + a.id);
    }
}

function AddDLCTag() {
    var newDivForMount = document.createElement("DIV");
    newDivForMount.className = "mountToolTip";

    imag = document.createElement("IMG");
    imag.setAttribute("src", "/aow4db/Icons/Text/DragonDawn2.png");
    imag.setAttribute("height", "30px");

    spa = document.createElement("SPAN");
    spa.className = "tooltiptext";

    spa.innerHTML = "Part of the Dragon Dawn DLC";

    newDivForMount.appendChild(imag);
    newDivForMount.appendChild(spa);
    newDivForMount.setAttribute("style", "text-transform: none;width: 1px;left: -32px;position: relative;margin-left: 30px;height: 20px;float: left;");
    return newDivForMount;
}

function FindHeroSkillOrigin(id) {
    for (j in jsonTomes.tomes) {
        {
            if ('hero_skills' in jsonTomes.tomes[j]) {
                for (k in jsonTomes.tomes[j].hero_skills) {
                    if (jsonTomes.tomes[j].hero_skills[k].slug === id) {

                        var tomeOrigin = document.getElementById("originTome");
                        if ('affinities' in jsonTomes.tomes[j]) {
                            tomeOrigin.innerHTML = jsonTomes.tomes[j].affinities + "<br>";
                        }
                        tomeOrigin.innerHTML += romanize(jsonTomes.tomes[j].tier) + " - " + jsonTomes.tomes[j].name;
                        var tomeOriginIcon = document.getElementById("originTomeIcon");
                        tomeOriginIcon.setAttribute("src", "/aow4db/Icons/TomeIcons/" + jsonTomes.tomes[j].id + ".png");
                        var wrap = tomeOrigin.innerHTML;
                        tomeOrigin.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?tome=" + jsonTomes.tomes[j].id + "\" target=\"_blank\">" + wrap + "</a>"
                        return jsonTomes.tomes[j].id;
                    }



                }
            }

        }
    }
}

function backtraceTomeOriginAndTierForStructure(structure, showorigin) {
    var returning = "";
    for (j in jsonTomes.tomes) {

        for (k in jsonTomes.tomes[j].skills) {
            if (jsonTomes.tomes[j].skills[k].upgrade_slug === structure) {
                if (showorigin) {



                    var tomeOrigin = document.getElementById("originTome");
                    if ('affinities' in jsonTomes.tomes[j]) {


                        tomeOrigin.innerHTML = showAffinitySymbols(jsonTomes.tomes[j]);

                        tomeOrigin.innerHTML += "<br>";


                    }
                    tomeOrigin.innerHTML += romanize(jsonTomes.tomes[j].tier) + " - " + jsonTomes.tomes[j].name;
                    var tomeOriginIcon = document.getElementById("originTomeIcon");
                    tomeOriginIcon.setAttribute("src", "/aow4db/Icons/TomeIcons/" + jsonTomes.tomes[j].id + ".png");
                    var wrap = tomeOrigin.innerHTML;
                    tomeOrigin.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?tome=" + jsonTomes.tomes[j].id + "\" target=\"_blank\">" + wrap + "</a>";

                    returning = jsonTomes.tomes[j].id;
                }
            }


        }
    }
    return returning;
}


function uppercaseTextBetweenHyperlinks(str, elments) {
    const regex = /<hyperlink>(.*?)<\/hyperlink>/g;
    const replacedString = str.replace(regex, (match, p1) => `<hyperlink>${LookUpHyperLink(p1, elments)}</hyperlink>`);

    return replacedString;
}


function findDescriptionByName(name, nameElements) {

    for (let i = 0; i < nameElements.length; i++) {
        const nameElement = nameElements[i];
        const text = nameElement.innerText.trim().replace(/\[\w+\/\]/g, '');

        const modifiedStr = name.slice(0, -1);
        if (text.trim() === name.trim() || text.trim() === modifiedStr.trim()) {
            const parentElement = nameElement.parentElement;
            const prevElement = parentElement.previousElementSibling;
            const prevPrevElement = prevElement && prevElement.previousElementSibling;

            const nameText = parentElement.firstElementChild.innerText.trim();
            const descText = nameText.replace('@NAME', '@DESCRIPTION');

            if (prevElement && prevElement.querySelector('.src').innerText.trim() === descText) {
                return prevElement.querySelector('.tra').innerText.trim();
            } else if (prevPrevElement && prevPrevElement.querySelector('.src').innerText.trim() === descText) {
                return prevPrevElement.querySelector('.tra').innerText.trim();
            }
        }
    }

    return null;
}




function parseDescriptionWithHyperlink(string, elements) {
    var replacedText = string;

    replacedText = uppercaseTextBetweenHyperlinks(string, elements);




    return replacedText;
}

function replaceTagsWithString(str) {
    const regex = /<(\/?)([^>]+)>/g;
    const replacedString = str.replace(regex, "");

    return replacedString;
}

function InitializeLoca() {

    const parser = new DOMParser();
    const doc = parser.parseFromString(savedHtmlContent, 'text/html');

    const nameElements = doc.getElementsByClassName('tra');
    const nameLength = name.length;


    const elementsWithDescription = document.querySelectorAll('[id*="description"]');


    // Iterate over the matched elements
    elementsWithDescription.forEach(function (element) {
        // Check if element's innerHTML contains <hyperlink>
        if (element.innerHTML.includes('<hyperlink>')) {
            // Replace <hyperlink> with desired content

            element.innerHTML = parseDescriptionWithHyperlink(element.innerHTML, nameElements);
        }
    });


}

function LookUpHyperLink(str, elements, elementsLength) {
    var hyperlinkSpan = str;
    var description = "";
    // Example usage in a browser environment



    const noTagsName = replaceTagsWithString(str);

    description = findDescriptionByName(noTagsName, elements, elementsLength);





    if (description != null) {
        description = description.replace(/\[(\w+)\/?\]/g, "<$1></$1>");
        spa = document.createElement("SPAN");
        spa.className = "tooltiptext";

        spa.innerHTML = "<span style=\"font-size=20px; text-transform:uppercase; color:#deb887 ;\">" + str + "</span> <br>" + description;
        hyperlinkSpan = "<span class=\"hyperlink\" style=\"color:aliceblue\">" + str + "<span class=\"tooltiphyperlink\">" + spa.innerHTML + "</span>" + "</span>";
    }

    return hyperlinkSpan;
}






function backtraceTomeOriginAndTier(spell, showorigin) {
    if (spell === "create_bone_golem" && showorigin) {
        var tomeOrigin = document.getElementById("originTome");
        tomeOrigin.innerHTML = "<empireshadow></empireshadow><empireshadow></empireshadow> <br> II - Tome of Souls";

        var tomeOriginIcon = document.getElementById("originTomeIcon");
        tomeOriginIcon.setAttribute("src", "/aow4db/Icons/TomeIcons/tome_of_souls.png");
        var wrap = tomeOrigin.innerHTML;
        tomeOrigin.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?tome=tome_of_souls\" target=\"_blank\">" + wrap + "</a>"
    } else {
        for (j in jsonTomes.tomes) {
            {
                for (k in jsonTomes.tomes[j].skills) {
                    if (jsonTomes.tomes[j].skills[k].spell_slug === spell) {
                        if (showorigin) {




                            var tomeOrigin = document.getElementById("originTome");
                            if ('affinities' in jsonTomes.tomes[j]) {


                                tomeOrigin.innerHTML = showAffinitySymbols(jsonTomes.tomes[j]);

                                tomeOrigin.innerHTML += "<br>";
                            }

                            tomeOrigin.innerHTML += romanize(jsonTomes.tomes[j].tier) + " - " + jsonTomes.tomes[j].name;

                            var tomeOriginIcon = document.getElementById("originTomeIcon");
                            tomeOriginIcon.setAttribute("src", "/aow4db/Icons/TomeIcons/" + jsonTomes.tomes[j].id + ".png");
                            var wrap = tomeOrigin.innerHTML;
                            tomeOrigin.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?tome=" + jsonTomes.tomes[j].id + "\" target=\"_blank\">" + wrap + "</a>"



                        }

                        return jsonTomes.tomes[j].skills[k].tier + "," + jsonTomes.tomes[j].id;
                    }

                    if (jsonTomes.tomes[j].skills[k].siege_project_slug === spell || jsonTomes.tomes[j].skills[k].name === spell) {
                        if (showorigin) {
                            var tomeOrigin = document.getElementById("originTome");
                            if ('affinities' in jsonTomes.tomes[j]) {
                                var affinitiesdual = jsonTomes.tomes[j].affinities.split(", ");

                                var allAffinity = "";
                                for (i in affinitiesdual) {
                                    var affinities = affinitiesdual[i].split(" ");
                                    if (affinities[1] === 2) {
                                        allAffinity += affinities[0];
                                    }
                                    allAffinity += affinities[0];

                                }

                                tomeOrigin.innerHTML = allAffinity;

                                tomeOrigin.innerHTML += "<br>";
                            }

                            tomeOrigin.innerHTML += romanize(jsonTomes.tomes[j].tier) + " - " + jsonTomes.tomes[j].name;
                            var tomeOriginIcon = document.getElementById("originTomeIcon");
                            tomeOriginIcon.setAttribute("src", "/aow4db/Icons/TomeIcons/" + jsonTomes.tomes[j].id + ".png");
                            var wrap = tomeOrigin.innerHTML;
                            tomeOrigin.innerHTML = "<a href=\"/aow4db/HTML/Spells.html?tome=" + jsonTomes.tomes[j].id + "\" target=\"_blank\">" + wrap + "</a>"



                        }

                        return jsonTomes.tomes[j].skills[k].tier + "," + jsonTomes.tomes[j].id;
                    }
                }
            }
        }
    }
}



function backtraceStructureToTomeNameAndTier(structure) {
    var array = new Array();

    for (j in jsonTomes.tomes) {


        if ('upgrades' in jsonTomes.tomes[j]) {
            for (k in jsonTomes.tomes[j].upgrades)
                if (structure.indexOf(jsonTomes.tomes[j].upgrades[k].slug) != -1) {
                    if (structure.indexOf("wildlife_sanctuary") != -1) {

                        array.push("2 <empirenature></empirenature> Tome of Beasts");
                    } else {
                        if ('affinities' in jsonTomes.tomes[j]) {
                            array.push(jsonTomes.tomes[j].affinities + " " + jsonTomes.tomes[j].name);
                        } else {
                            array.push(jsonTomes.tomes[j].name);
                        }
                    }
                    if (structure.indexOf("wildlife_sanctuary") != -1) {
                        array.push(1);
                    } else {
                        array.push(jsonTomes.tomes[j].tier);
                    }

                    array.push(jsonTomes.tomes[j].id);
                    return array;
                }
        }
    }

    return "";
}

function backtraceTomeNameAndTier(spell) {

    for (j in jsonTomes.tomes) {
        {
            for (k in jsonTomes.tomes[j].skills) {
                if (jsonTomes.tomes[j].skills[k].spell_slug === spell) {


                    return jsonTomes.tomes[j];


                }
            }
        }
    }
    return "";
}



function addAbilityList(a) {
    var dam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {
            if (jsonUnitAbilities.abilities[j].damage) {
                dam = jsonUnitAbilities.abilities[j].damage;
            }
            return jsonUnitAbilities.abilities[j].name + dam + "<br>"
        }
    }
}

function addTypesList(a) {
    var dam = "";
    for (j in jsonUnitAbilities.abilities) {
        if (a === jsonUnitAbilities.abilities[j].slug) {

            return jsonUnitAbilities.abilities[j].name + "<br>"
        }
    }
}
